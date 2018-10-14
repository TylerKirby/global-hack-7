#!/usr/bin/python

import copy
import json
import time
from pymongo import MongoClient
from elasticsearch import Elasticsearch
from elasticsearch.client import IngestClient

MONGO_URL = 'mongodb://mongo:27017/'
ELASTIC_URL = 'http://elastic:9200'


class Mongo:
    def __init__(self, db):
        while True:
            try:
                self.client = MongoClient(MONGO_URL)
                self.client.server_info()
                break
            except:
                print('waiting for mongo')
                time.sleep(5)

        self.db = self.client[db]

    def close(self):
        self.client.close()

    def add_all(self, name, docs):
        if name in self.db.list_collection_names():
            print('collection %s already exists' % name)
            return

        print('adding documents to %s' % name)
        collection = self.db[name]
        collection.insert_many(docs)


class Elastic:
    def __init__(self):
        while True:
            try:
                self.client = Elasticsearch([ELASTIC_URL])
                self.client.ping()
                break
            except:
                print('waiting for elastic')
                time.sleep(5)

        self.add_user_mapping()
        self.add_attachment_pipeline()

    def add_all(self, index, doc_type, docs):
        if self.client.indices.exists(index=index) and not self.is_new:
            print('index %s already exists' % index)
            return

        print('adding documents to %s' % index)
        for doc in docs:
            self.client.index(index, doc_type, doc)

    def add_user_mapping(self):
        # need a custom mapping for postcode to keep it from casting to long
        mapping = \
            {
                "mappings": {
                    "users": {
                        "properties": {
                            "location": {
                                "properties": {
                                    "postcode": {
                                        "type": "text"
                                    }
                                }
                            }
                        }
                    }
                }
            }

        res = self.client.indices.create(index='stabilty_users', ignore=400, body=mapping)
        self.is_new = 'error' not in res

    def add_attachment_pipeline(self):
        pipeline = {
            "description" : "Extract attachment information encoded in Base64 with UTF-8 charset",
            "processors" : [
                {
                    "attachment" : {
                        "field" : "attachment"
                    }
                }
            ]
        }

        ingest_client = IngestClient(self.client)
        if self.is_new:
            ingest_client.put_pipeline('attachment', pipeline)


mongo = Mongo('stabilty')
elastic = Elastic()

#
# countries
#

with open('randomuser/countries.json') as fp:
    countries = json.loads(fp.read())
    mongo.add_all('countries', copy.deepcopy(countries))
    elastic.add_all('stabilty_countries', 'countries', countries)

#
# users
#

with open('randomuser/users.json') as fp:
    users = json.loads(fp.read())
    mongo.add_all('users', copy.deepcopy(users))
    elastic.add_all('stabilty_users', 'users', users)

#
# orgs
#

with open('naa/avatar_links.json') as fp:
    avatar_links = json.loads(fp.read())

avatar_lut = dict([(link['name'], link) for link in avatar_links])

with open('naa/orgs.json') as fp:
    orgs = json.loads(fp.read())
    for org in orgs:
        if org['name'] in avatar_lut:
            org['avatar'] = avatar_lut[org['name']]

    mongo.add_all('orgs', copy.deepcopy(orgs))
    elastic.add_all('stabilty_orgs', 'orgs', orgs)

mongo.close()
