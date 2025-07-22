import json
with open("parsed_articles2_done.json", "r", encoding="utf-8") as f:
    articles = json.load(f)
cnt = 0
t = 0
no = 0
no_imgs = []
for a in articles:
    if a['logo'] != None or 'local_logo' in a:
        cnt += 1
    if a['logo'] is not None or 'local_logo' in a:
        t += 1
    if a['logo'] is None and 'local_logo' not in a:
        no += 1
        no_imgs.append(a)
print(cnt, t, no)
with open("no_imgs.json", "w", encoding="utf-8") as f:
    json.dump(no_imgs, f, ensure_ascii=False, indent=4)
