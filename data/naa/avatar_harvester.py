#!/usr/bin/python

import json
import numpy
import re
import requests
from similarity.levenshtein import Levenshtein

base_url = 'http://naa.getgoodmap.com/search-orgs-only'
pages = 29

links = []
for page in range(1, pages+1):
    print(page)
    url = base_url if page == 1 else '%s?page=%s' % (base_url, page)
    res = requests.get(url)
    content = res.text
    links += re.findall('<img src="(.*?)"', content)

link_lut = {}
for link in links:
    name = '.'.join(link.split('/')[-1].split('.')[:-1])
    link_lut[name] = link

with open('naa/orgs.json') as fp:
    orgs = json.loads(fp.read())

with open('naa/avatar_links.json') as fp:
    link_lut = json.loads(fp.read())

levenshtein = Levenshtein()


def find_closest_link(orig_name):
    name = re.sub('[^a-z]', '', orig_name.lower())
    names = list(link_lut.keys())
    scores = [levenshtein.distance(re.sub('[^a-z]', '', candidate.lower()), name) for candidate in names]
    min_index = numpy.argmin(scores)
    score = scores[min_index]
    print('%s,%s,%s' % (score, orig_name, names[min_index]))
    return score, link_lut[names[min_index]]


link_lut2 = {}
data = numpy.zeros(len(orgs), dtype=[('score',numpy.float64), ('index', numpy.int64)])
for i in range(len(orgs)):
    orig_name = orgs[i]['name']
    score, orig_avatar = find_closest_link(orig_name)
    name = ''.join(char for char in orig_name if ord(char) < 128)
    avatar = ''.join(char for char in orig_avatar if ord(char) < 128)
    data[i] = (score, i)
    link_lut2[i] = (orig_name, orig_avatar)

data = numpy.sort(data, order=['score'])
with open('naa/avatar_links.json', 'w') as fp:
    fp.write('[\n')
    for i in range(len(data)):
        record = data[i]
        score = record['score']
        index = record['index']
        name, avatar = link_lut2[index]
        suffix = ',' if i < len(data)-1 else ''
        fp.write('{"score": %s,"name": "%s", "avatar": "%s"}%s\n' % (score, name, avatar, suffix))

    fp.write(']')
