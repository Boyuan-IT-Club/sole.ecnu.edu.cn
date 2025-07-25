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
    console.log('DOM fully loaded for brand section!');

    // 设置观察目标元素
    const targetNode = document.body; // 或者更具体的容器元素

    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };

    // 创建观察者实例
    const observer = new MutationObserver((mutationsList, observer) => {
        // 检查是否已经存在'teacher'类的元素
        const hasTeacherCards = document.querySelectorAll('.teacher').length > 0;

        if (hasTeacherCards) {
            // 如果找到了目标元素，停止观察并执行主逻辑
            observer.disconnect();
            executeMainLogic();
        }
    });

    // 开始观察目标节点
    observer.observe(targetNode, config);

    // 设置超时作为后备方案（防止元素永远不出现）
    const timeout = setTimeout(() => {
        observer.disconnect();
        console.warn('Timeout reached, executing brand logic anyway');
        executeMainLogic();
    }, 5000); // 5秒超时

    // 主逻辑函数
    function executeMainLogic() {
        clearTimeout(timeout); // 清除超时

        const buttons = document.querySelectorAll('.section-part-brand-btn');
        const allCards = document.querySelectorAll('.brand-item');
        console.log('Total brand cards found:', allCards.length);

        allCards.forEach(card => {
            console.log('Brand card classes:', card.classList);
        });

        const typeMap = ['teacher', 'social'];
        const isMobile = window.innerWidth <= 768;

        setTimeout(() => console.log("0.2 秒后打印品牌部分"), 200);

        const maxCardsPerType = isMobile ? 4 : 12;

        function renderDefault() {
            if (!isMobile) {
                typeMap.forEach(type => {
                    let shown = 0;
                    allCards.forEach(card => {
                        console.log(card.classList, type, card.classList.contains(type));
                        console.log('Brand class list:', Array.from(card.classList));
                        console.log(card.className);
                        if (card.classList.contains(type)) {
                            card.style.display = shown < 6 ? 'flex' : 'none';
                            console.log('brand shown');
                            shown++;
                        }
                    });
                });
            } else {
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
        }

        renderDefault();

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const selectedType = typeMap[index];

                // 如果按钮本身已经是 active，则恢复初始状态
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                    renderDefault();  // 恢复三类卡片初始展示
                    return;
                }

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
    }

    // 初始检查，以防元素已经存在
    if (document.querySelectorAll('.teacher').length > 0) {
        observer.disconnect();
        executeMainLogic();
    }
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
        const tomodifyclass = el.closest('.enrollment');

        if (text.includes('国际合作办学')) {
            tomodifyimg.src = '/_upload/tpl/17/77/6007/template6007/icons/enrollment-icon/icon-blue.png';
            tomodifyclass.classList.add('international');
        } else if (text.includes('在职研修')) {
            tomodifyimg.src = '/_upload/tpl/17/77/6007/template6007/icons/enrollment-icon/icon-red.png';
            tomodifyclass.classList.add('on-job');
        } else if (text.includes('社会培训')) {
            tomodifyimg.src = '/_upload/tpl/17/77/6007/template6007/icons/enrollment-icon/icon-purple.png';
            tomodifyclass.classList.add('training');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.text2').forEach(el => {
        const text = el.textContent.trim();
        const tomodifyimg = el.previousElementSibling;
        const tomodifyclass = el.closest('.brand-item');

        if (text.includes('教师培训')) {
            tomodifyimg.src = '/_upload/tpl/17/77/6007/template6007/icons/brand-icon/icon-blue.png';
            tomodifyclass.classList.add('teacher');
        } else if (text.includes('社会培训')) {
            tomodifyimg.src = '/_upload/tpl/17/77/6007/template6007/icons/brand-icon/icon-red.png';
            tomodifyclass.classList.add('social');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const pinpaiCards = document.querySelectorAll('.news-card');
    pinpaiCards.forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = card.id;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const pinpaiCards = document.querySelectorAll('.enrollment');
    pinpaiCards.forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = card.id;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const pinpaiCards = document.querySelectorAll('.brand-item');
    pinpaiCards.forEach(card => {
        card.addEventListener('click', function () {
            window.location.href = card.id;
        });
    });
});
