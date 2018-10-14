""" Use randomuser.me to generate random profile data. Also generate country data.
"""
import json, requests, random
from random_word import RandomWords

size = 100

random_user_api = 'https://randomuser.me/api/'
country_api = 'https://restcountries.eu/rest/v2/alpha'
country_region_api = 'https://restcountries.eu/rest/v2/region'

country_codes = list(map(str.strip, ' AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US'.split(',')))

country_dist = {
    'europe': 0.145,
    'asia': 0.422,
    'latin america': 0.315,
    'africa': 0.094
}

europe_countries = ['DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'NL']

default_cc = 'TR'

country_regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

ethnicity_map = {
    'IR': 'Persian',
    'BR': 'Branco',
    'TR': 'Turk',
    'DE': 'Germanic',
    'DK': 'Dane',
    'ES': 'Basque',
    'FI': 'Finn',
    'FR': 'French',
    'GB': 'White',
    'IE': 'Irish',
    'NL': 'Dutch'
}

r = RandomWords()

countries = []
for region in country_regions:
    res = requests.get('%s/%s' % (country_region_api, region))
    countries += json.loads(res.text)

country_lut = dict([(country['alpha2Code'], country) for country in countries])

with open('countries.json', 'w') as fp:
    fp.write(json.dumps(countries, indent=2))

users = []
for doc in range(size):
    print(doc)
    val = random.uniform(0, 1)
    if val < 0.094:
        cc = 'IR'
    elif val < 0.094+0.145:
        cc = europe_countries[random.randint(0, len(europe_countries)-1)]
    elif val < 0.094+0.145+0.315:
        cc = 'BR'
    else:
        cc = 'TR'

    res = requests.get('%s?nat=%s' % (random_user_api, cc.lower()))
    user = json.loads(res.text)['results'][0]
    user['location']['country'] = country_lut[cc]['name']

    skills = r.get_random_words(limit=random.randint(1, 10))
    skills = [{'name': skill, 'proficiency': ['beginner', 'intermediate', 'advanced'][random.randint(0, 2)]} for skill in skills]

    user2 = {
        'firstName': user['name']['first'],
        'lastName': user['name']['last'],
        'phoneNumber': user['phone'],
        'email': user['email'],
        'ethnicity': ethnicity_map[cc],
        'country': user['location']['country'],
        'skills': skills
    }

    users.append(user2)

with open('users.json', 'w') as fp:
    fp.write(json.dumps(users, indent=2))
