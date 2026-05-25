document.addEventListener("DOMContentLoaded", function () {
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const mainNav = document.getElementById("mainNav");

  mobileNavToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const desiredOrder = [
    "首页",
    "学院概况",
    "党建工作",
    "国际本科",
    "同等学力",
    "教师培训",
    "社会培训",
    "家庭教育",
    "学历教育",
    "自学考试",
    "华师云校",
  ];

  const linkOverrides = {
    学院概况: "https://solemh.ecnu.edu.cn/49610/list.htm",
    教师培训: "https://solemh.ecnu.edu.cn/jspxejjm/main.htm",
    社会培训: "https://solemh.ecnu.edu.cn/shpxejym/main.htm",
  };

  const navRoot = document.querySelector("#mainNav nav ul");
  if (!navRoot) return;

  const topLevelItems = Array.from(navRoot.children).filter(
    (item) => item.tagName === "LI",
  );
  const itemByName = new Map();

  topLevelItems.forEach((item) => {
    const anchor = item.querySelector(":scope > a");
    if (!anchor) return;
    const title = anchor.textContent.trim();
    if (title) {
      itemByName.set(title, item);
      if (linkOverrides[title]) {
        anchor.href = linkOverrides[title];
        anchor.target = "_blank";
      }
    }
  });

  const reorderedItems = [];
  desiredOrder.forEach((title) => {
    if (itemByName.has(title)) {
      reorderedItems.push(itemByName.get(title));
      itemByName.delete(title);
    }
  });

  // Keep any non-configured items (e.g. 联系我们) after configured tabs.
  reorderedItems.push(...itemByName.values());

  reorderedItems.forEach((item) => navRoot.appendChild(item));
});

document.addEventListener("DOMContentLoaded", function () {
  const pinpaiCards = document.querySelectorAll(".pinpai-card");
  pinpaiCards.forEach((card) => {
    card.addEventListener("click", function () {
      window.location.href = card.id;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  //点击名字为党政建设的导航栏栏目跳转到对应页面
  const menulink = document.querySelectorAll(".menu-link");
  menulink.forEach((link) => {
    if (link.textContent.trim() === "党建工作") {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "/_s952/dzjs/main.psp";
      });
    }
  });
});
