#!/usr/bin/python

import json
from pymongo import MongoClient

with open('data/countries.json') as fp:
    countries = json.loads(fp.read())

with open('data/users.json') as fp:
    users = json.loads(fp.read())

while True:
    try:
        client = MongoClient('mongodb://mongo:27017/')
        client.server_info()
        break
    except Exception as e:
        print('waiting for mongo')

stability_db = client["stability"]

users_coll = stability_db["users"]
result = users_coll.insert_many(users)

countries_coll = stability_db["countries"]
result = countries_coll.insert_many(countries)

client.close()
