import json
with open("parsed_articles2_done.json", "r", encoding="utf-8") as f:
    all = json.load(f)
with open("articles_data.json", "r", encoding="utf-8") as f:
    done = json.load(f)
done_title = {d["title"]: d for d in done}
undo = []
u = 0
n = 0
for a in all:
    if a['title'] not in done_title:
        print("article:", a['id'], a['title'])
        a['type'] = 'undo'
        u += 1
        undo.append(a)
    else:
        if not done_title[a['title']]['hasThumbImage']:
            print(a['title'], 'no img')
            a['type'] = 'no_img'
            n += 1
            undo.append(a)
    with open("un_upload.json", "w", encoding="utf-8") as f:
        json.dump(undo, f, ensure_ascii=False, indent=4)
print(len(undo), u, n)
