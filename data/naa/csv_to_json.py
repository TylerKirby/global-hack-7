#!/usr/bin/python

import csv
import json


def record_to_json(record):
    return dict([(header[i], record[i]) for i in range(len(header))])


with open('orgs.csv') as fp:
    reader = csv.reader(fp)
    rows = [row for row in reader]

assert  len(set([len(row) for row in rows])) == 1

header = rows[0]
rows = rows[1:]

orgs = list(map(record_to_json, rows))

with open('orgs.json', 'w') as fp:
    fp.write(json.dumps(orgs, indent=2))
