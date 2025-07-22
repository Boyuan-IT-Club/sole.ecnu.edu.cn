import json
s = set()
un = []
with open("parsed_articles2.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

for a in articles:
    if a['title']+a['publish_time'] in s:
        print(f'{a["id"]} is duplicated')
    else:
        s.add(a['title']+a['publish_time'])
        if a['classify'] == "学院新闻":
            a['id'] = len(un)
            un.append(a)
with open("parsed_articles2_un.json", "w", encoding="utf-8") as f:
    json.dump(un, f, ensure_ascii=False, indent=4)
