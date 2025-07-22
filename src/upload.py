from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import re
import os
import json
import requests

def dive_in_iframe(driver):
    iframe = driver.find_element(
        By.XPATH, "/html/body/div[2]/div[2]/div/iframe")
    driver.switch_to.frame(iframe)
    iframe = driver.find_element(
        By.XPATH, "/html/body/div[2]/div/iframe")
    driver.switch_to.frame(iframe)
    iframe = driver.find_element(
        By.XPATH, "/html/body/div[1]/div/div/div[2]/div[1]/div/iframe")
    driver.switch_to.frame(iframe)
    return driver

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
target_url = "https://wzq.ecnu.edu.cn/index.jsp?_p=YXM9OTUy"  # 替换为目标网址
# open the article manager
driver.get(target_url)
articles = []
with open("parsed_articles2_done.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

# 10235101438
# Htlzh2341
input("open:")

# switch to exact iframe
main_window = driver.current_window_handle
dive_in_iframe(driver)
# click the create new
createButton = driver.find_element(
    By.XPATH, "/html/body/div[1]/div/div/div/div[2]/div[3]/a[1]")
logs = []
for article in articles[108:]:
    driver.switch_to.window(main_window)
    dive_in_iframe(driver)
    createButton.click()
    # find the sub-window
    all_windows = driver.window_handles
    for window in all_windows:
        if window != main_window:
            new_window = window
            break
    driver.switch_to.window(new_window)
    time.sleep(1)
    try:
        print(f"handle the article {article['id']}: {article['title']}")
        # title
        title = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[3]/div[1]/div/input"))
        )
        title.clear()
        title.send_keys(article["title"])

        # content
        content_iframe = driver.find_element(
            By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/div[3]/div[2]/div/div/div/div[2]/iframe")
        driver.switch_to.frame(content_iframe)
        contetn_body = driver.find_element(By.XPATH, "/html/body")
        contetn_body.click()
        driver.execute_script("arguments[0].innerHTML = '';", contetn_body)
        driver.execute_script(
            f"arguments[0].innerHTML = `{article["content"]}`;", contetn_body)
        driver.switch_to.default_content()

        # publish time
        publishTime = driver.find_element(
            By.XPATH, "/html/body/div[1]/div/div/div/div[3]/div/div[2]/div[1]/div/div[1]/div[2]/div/div/form/div[1]/div/div[2]/div/div/div/div/input")
        driver.execute_script(
            "arguments[0].removeAttribute('readonly');", publishTime)
        ActionChains(driver)\
        .click(publishTime)\
        .key_down(Keys.CONTROL)\
        .send_keys("a")\
        .key_up(Keys.CONTROL)\
        .send_keys(Keys.DELETE)\
        .send_keys(article["publish_time"])\
        .send_keys(Keys.ENTER)\
        .perform()

        # author
        author = driver.find_element(
            By.XPATH, "/html/body/div[1]/div/div/div/div[3]/div/div[2]/div[1]/div/div[1]/div[2]/div/div/form/div[2]/div/div[2]/div/div/input")
        author.clear()
        author.send_keys(article["author"])

        # classify
        classify = driver.find_element(
            By.XPATH, "/html/body/div[1]/div/div/div/div[3]/div/div[2]/div[1]/div/div[1]/div[2]/div/div/form/div[7]/div/div[2]/div/div/div/div[1]/input")
        classify.clear()
        classify.send_keys(article["classify"])

        # link
        if article["link"] != "":
            linkButton = driver.find_element(
                By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div[2]/div[1]/div/div/form/div[5]/div[1]/div/div[4]/label/span[1]/input").click()
            link = driver.find_element(
                By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div[2]/div[1]/div/div/form/div[5]/div[5]/span/input")
            link.clear()
            link.send_keys(article["link"])

        # logo
        logo = driver.find_element(By.XPATH,"/html/body/div[1]/div/div/div/div[1]/div[2]/div[1]/div/div/form/div[2]/div/div[2]/div/div/div/div[2]/div[1]/span/div/span/input")
        if article["logo"] is not None:
            logo.send_keys(f'D:\Projects\club\开放教育学院爬虫\imgs\{article["id"]}.png')
        elif "local_logo" in article:
            logo.send_keys(f'D:\Projects\club\开放教育学院爬虫\imgs\content_img{article["id"]}.png')
        else:
            print(f'{article['id']}: {article['title']} has no img')
            input('confinue')
        time.sleep(2)
        # upload
        upload = driver.find_element(By.XPATH,"/html/body/div[1]/div/div/div/div[1]/div[3]/div[2]/div/div[5]/button")
        upload.click()
        WebDriverWait(driver, 60).until(
            EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), '文章发布成功，是否继续添加文章?')]"))
        )
        driver.close()
    except Exception as e: 
        log = f"{article["id"]}:{article["title"]} have some exception\n"
        print(log)
        input('confinue')
        logs.append(log)
with open("upload.txt", "w", encoding="utf-8") as f:
    f.write("".join(logs))