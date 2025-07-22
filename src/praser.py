from bs4 import BeautifulSoup
import json
import requests
articles = []
with open("parsed_articles2_done.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

# for article in articles:
#     # if article["logo"]:
#     #     # response = requests.get(article["logo"])
#     #     # with open(f"./imgs/{article["id"]}.png", "wb") as f:
#     #     #     f.write(response.content)
#     #     print(
#     #         f"down logo for article {article["id"]} at ./imgs/{article["id"]}.png")

#     soup = BeautifulSoup(article["content"], 'html.parser')
#     for img in soup.find_all('img'):
#         if 'src' in img.attrs:  # 检查是否有src属性
#             if img['src'].startswith('/'):
#                 img['src'] = "https://www.sole.ecnu.edu.cn" + img['src']
#         if '_src' in img.attrs:  # 检查是否有src属性
#             if img['_src'].startswith('/'):
#                 img['_src'] = "https://www.sole.ecnu.edu.cn" + img['_src']
#         else:
#             print(f"article{article["id"]} has img without src")
#     article["content"] = soup.prettify().replace('\n', '')
#     with open("parsed_articles2.json", "w", encoding="utf-8") as f:
#         json.dump(articles, f, ensure_ascii=False, indent=4)
with open("articles2.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

for article in articles:
    soup = BeautifulSoup(article["content"], 'html.parser')
    article["content"] = soup.prettify().replace('<span>', '')
    with open("parsed_articles2.json", "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)
