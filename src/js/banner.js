document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.nav');
  const navContainer = document.querySelector('.nav-container');
  const scrollThreshold = window.innerHeight; // 滚动阈值为一屏高度
  let isFixed = false;
  let lastScrollTop = 0;

  // 初始位置记录
  const initialTop = nav.offsetTop;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    // 滚动时的导航栏行为
    if (scrollTop >= scrollThreshold) {
      // 超过阈值，固定导航栏
      if (!isFixed) {
        nav.classList.add('nav-fixed');
        isFixed = true;
      }
    } else {
      // 未超过阈值，恢复导航栏
      if (isFixed) {
        nav.classList.remove('nav-fixed');
        isFixed = false;
      }
    }

    // 下滑时导航栏逐渐消失（未达到阈值时）
    if (scrollTop > 0 && scrollTop < scrollThreshold) {
      const opacity = 1 - (scrollTop / scrollThreshold);
      nav.style.opacity = opacity;
    } else {
      nav.style.opacity = 1;
    }

    lastScrollTop = scrollTop;
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const allTagBoxes = document.querySelectorAll('.tags-box');

  allTagBoxes.forEach(tagBox => {
    const tagsText = tagBox.getAttribute('data-tags');
    if (!tagsText) return;

    const tagArray = tagsText.trim().split(/\s+/); // 兼容多个空格
    const maxTags = 2;
    const displayTags = tagArray.slice(0, maxTags);

    displayTags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tags';
      span.textContent = tag;
      tagBox.appendChild(span);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.section-part-enroll-btn');
  const allCards = document.querySelectorAll('.enrollment');

  const typeMap = ['international', 'on-job', 'training'];
  // 判断是否是移动端（宽度小于等于 768px）
  const isMobile = window.innerWidth <= 768;

  // 设置最大展示数量
  const maxCardsPerType = isMobile ? 6 : 9;
  if (!isMobile) {// 初始：每类最多展示 3 个卡片
    typeMap.forEach(type => {
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(type)) {
          card.style.display = shown < 3 ? 'flex' : 'none';
          shown++;
        }
      });
    });
  } else {
    // 移动端：每类最多展示 2 个卡片
    typeMap.forEach(type => {
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(type)) {
          card.style.display = shown < 2 ? 'flex' : 'none';
          shown++;
        }
      });
    });
  }

  // 绑定每个按钮点击事件
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const selectedType = typeMap[index];

      // 切换按钮高亮
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 显示选中的卡片，隐藏其他
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(selectedType)) {
          card.style.display = shown < maxCardsPerType ? 'flex' : 'none';
          shown++;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.section-part-brand-btn');
  const allCards = document.querySelectorAll('.brand-item');

  const typeMap = ['teacher', 'social'];

  // 判断是否是移动端（宽度小于等于 768px）
  const isMobile = window.innerWidth <= 768;

  // 设置最大展示数量
  const maxCardsPerType = isMobile ? 4 : 12;
  if (!isMobile) {// 初始：每类最多展示 3 个卡片
    typeMap.forEach(type => {
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(type)) {
          card.style.display = shown < 6 ? 'flex' : 'none';
          shown++;
        }
      });
    });
  } else {
    // 移动端：每类最多展示 2 个卡片
    typeMap.forEach(type => {
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(type)) {
          card.style.display = shown < 2 ? 'flex' : 'none';
          shown++;
        }
      });
    });
  }

  // 绑定每个按钮点击事件
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const selectedType = typeMap[index];

      // 切换按钮高亮
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 显示选中的卡片，隐藏其他
      let shown = 0;
      allCards.forEach(card => {
        if (card.classList.contains(selectedType)) {
          card.style.display = shown < maxCardsPerType ? 'flex' : 'none';
          shown++;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('toggleBtn');
  const navOverlay = document.getElementById('side-panel');
  const navClose = document.getElementById('navClose');

  menuToggle.addEventListener('click', () => {
    navOverlay.style.display = 'block';
    document.body.classList.add('no-scroll'); // 禁止主页面滚动
  });

  navClose.addEventListener('click', () => {
    navOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.text').forEach(el => {
    const text = el.textContent.trim();
    const tomodifyimg = el.previousElementSibling;
    const tomodifyclass = el.closest('.enrollmrnt');

    if (text === '国际合作办学') {
      tomodifyimg.src = 'icons/enrollment-icon/icon-blue.png';
      tomodifyclass.classList.add('international');
    } else if (text === '在职研修') {
      tomodifyimg.src = 'icons/enrollment-icon/icon-red.png';
      tomodifyclass.classList.add('on-job');
    } else if (text === '社会培训') {
      tomodifyimg.src = 'icons/enrollment-icon/icon-purple.png';
      tomodifyclass.classList.add('training');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.text2').forEach(el => {
    const text = el.textContent.trim();
    const tomodifyimg = el.previousElementSibling;
    const tomodifyclass = el.closest('.brand-item');

    if (text === '教师培训') {
      tomodifyimg.src = 'icons/brand-icon/icon-blue.png';
      tomodifyclass.classList.add('teacher');
    } else if (text === '社会培训') {
      tomodifyimg.src = 'icons/brand-icon/icon-red.png';
      tomodifyclass.classList.add('social');
    }
  });
});