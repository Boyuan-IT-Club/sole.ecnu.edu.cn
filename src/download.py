from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time
import re
import os
import json

# 配置Edge浏览器选项
edge_options = Options()
# edge_options.add_argument("--headless")  # 无头模式
# edge_options.add_argument("--disable-gpu")
edge_options.add_argument("--no-sandbox")
edge_options.add_argument("--disable-features=EdgeLlm")  # 显式禁用Edge LLM
# 创建Edge WebDriver实例
driver = webdriver.Edge(
    service=Service(
        executable_path="D:\DevTools\WebDriver\msedgedriver.exe"),
    options=edge_options
)
# 目标URL
target_url = "https://www.sole.ecnu.edu.cn/yh/menu#"  # 替换为目标网址
# 打开网页
driver.get(target_url)
time.sleep(2)  # 等待加载

# 登录
account = "xymenhu"
password = "Lf5Cwanh#u"

# 选择账号登录
driver.find_element(
    By.XPATH, "/html/body/div/div/div[1]/div[2]/div[1]/a[2]").click()
# 输入账号密码
account_input = driver.find_element(
    By.XPATH, "/html/body/div/div/div[1]/div[2]/div[2]/div[2]/form/div[1]/input")
account_input.click()
account_input.send_keys(account)
password_input = driver.find_element(
    By.XPATH, "/html/body/div/div/div[1]/div[2]/div[2]/div[2]/form/div[2]/input")
password_input.click()
password_input.send_keys(password)
# verify code
verify_input = driver.find_element(
    By.XPATH, "/html/body/div/div/div[1]/div[2]/div[2]/div[2]/form/div[3]/input")
verify_input.click()
verify_code = input("verify code:")
verify_input.send_keys(verify_code)
# login
driver.find_element(
    By.XPATH, "/html/body/div/div/div[1]/div[2]/div[2]/div[2]/form/div[4]/button").click()

# mannually go to the article managing page
input("continue: ")
articles = []
with open("articles2.json", "r", encoding="utf-8") as f:
    articles = json.load(f) 
# get all article link
maxPage = 59
for page in range(1, maxPage):
    pageUrl = f"https://www.sole.ecnu.edu.cn/admin/news/index?page={page}&typeid=0&pid=0"
    driver.get(pageUrl)
    # all edit links
    all_edit_links = driver.find_elements(By.XPATH, "//a[text()='编辑']")
    onclicks = [link.get_attribute("onclick") for link in all_edit_links]
    for onclick in onclicks:  # "toEdit(2550,932);"
        match = re.search(r"toEdit\((\d+),(\d+)\)", onclick)
        id = match.group(1)
        typeId = match.group(2)
        oneUrl = f"https://www.sole.ecnu.edu.cn/admin/news/updateNewsById?id={id}&typeid={typeId}&pid=0&refer=%2Fadmin%2Fnews%2Findex%3Fpage%3D3%26typeid%3D0%26pid%3D0"
        driver.get(oneUrl)
        # handle one
        try:
            classify = driver.find_element(
                By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[1]/div[2]/p").text
        except Exception:
            classify = ""
        title = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[2]/input").get_attribute("value")
        link = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[3]/input").get_attribute("value")
        # red = driver.find_element(By.XPATH,"").text
        author = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[5]/input").text
        publish_time = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[6]/input").get_attribute("value")
        logo = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[8]/div[2]/div[1]/img").get_attribute("src")
        # 定位 iframe 元素
        iframe = driver.find_element(
            By.XPATH, "/html/body/div[2]/div[2]/div/form/div/div[7]/div[2]/div/div[2]/iframe")
        driver.switch_to.frame(iframe)
        # 获取 iframe 内部的完整 HTML（保留格式）
        content = driver.find_element(
            By.TAG_NAME, "body").get_attribute("outerHTML")
        # 切换回主页面（重要！）
        driver.switch_to.default_content()
        article = {
            "id": len(articles),
            "classify": classify,
            "title": title,
            "link": link,
            "author": author,
            "publish_time": publish_time,
            "content": content,
            "logo": logo,
        }
        articles.append(article)
        with open("articles2.json", "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=4)
