from bs4 import BeautifulSoup
import json
import requests
articles = []
with open("parsed_articles2_un.json", "r", encoding="utf-8") as f:
    articles = json.load(f)
na = []
for article in articles:
    print(f"handle the article {article['id']}: {article['title']}")
    if article["logo"] is None:
        soup = BeautifulSoup(article["content"], 'html.parser')
        for img in soup.find_all('img'):
            if 'src' in img.attrs:  # 检查是否有src属性
                # response = requests.get(img['src'])
                filename = f"./imgs/content_img{article['id']}.png"
                # with open(filename, "wb") as f:
                    # f.write(response.content)
                article['local_logo'] = filename
            break
        else:
            print(f"article{article["id"]} has no logo and img")
    else:
        response = requests.get(article['logo'])
        filename = f"./imgs/{article['id']}.png"
        with open(filename, "wb") as f:
            f.write(response.content)
    na.append(article)      
with open("parsed_articles2_done.json", "w", encoding="utf-8") as f:
    json.dump(na, f, ensure_ascii=False, indent=4)
