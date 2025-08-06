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

    // 设置观察目标元素（通常是包含所有卡片的容器）
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
        // 检查是否已经存在'on-job'类的元素
        const hasOnJobCards = document.querySelectorAll('.on-job').length > 0;

        if (hasOnJobCards) {
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
        console.warn('Timeout reached, executing logic anyway');
        executeMainLogic();
    }, 5000); // 5秒超时

    // 主逻辑函数
    function executeMainLogic() {
        clearTimeout(timeout); // 清除超时

        const buttons = document.querySelectorAll('.section-part-enroll-btn');
        const allCards = document.querySelectorAll('.enrollment');

        allCards.forEach(card => {
            // console.log('Card classes:', card.classList);
        });

        const typeMap = ['international', 'on-job', 'training'];

        const linkMap = ['/_s952/49615/list.psp', '/_s952/49618/list.psp', '/_s952/49619/list.psp'];
        const initialLink = '/_s952/49615/list.psp';
        const isMobile = window.innerWidth <= 768;

        //setTimeout(() => console.log("0.2 秒后打印"), 200);

        const maxCardsPerType = isMobile ? 6 : 9;

        // 初始显示逻辑函数
        function showInitialCards() {
            if (!isMobile) {
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

        // 初始显示卡片
        showInitialCards();

        buttons.forEach((button, index) => {
            // 跟踪按钮的点击状态
            let isActive = false;

            button.addEventListener('click', () => {
                const selectedType = typeMap[index];
                const link = linkMap[index];

                const moreBtn = document.getElementById('enrollment-more-btn');
                const moreBtnSmall = document.getElementById('enrollment-more-btn-small');
                moreBtn.href = link;
                moreBtnSmall.href = link;

                if (isActive) {
                    // 如果按钮已经是激活状态，取消高亮并恢复初始显示
                    button.classList.remove('active');
                    showInitialCards();
                    moreBtn.href = initialLink;
                    moreBtnSmall.href = initialLink;
                } else {
                    // 如果按钮不是激活状态，添加高亮并显示对应类型的卡片
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    let shown = 0;
                    allCards.forEach(card => {
                        if (card.classList.contains(selectedType)) {
                            card.style.display = shown < maxCardsPerType ? 'flex' : 'none';
                            shown++;
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }

                // 切换按钮状态
                isActive = !isActive;
            });
        });
    }

    // 初始检查，以防元素已经存在
    if (document.querySelectorAll('.on-job').length > 0) {
        observer.disconnect();
        executeMainLogic();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    //console.log('DOM fully loaded for brand section!');

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
        //console.log('Total brand cards found:', allCards.length);

        allCards.forEach(card => {
            //console.log('Brand card classes:', card.classList);
        });

        const typeMap = ['teacher', 'social'];
        const linkMap = ['/_s952/49616/list.psp', '/_s952/49621/list.psp'];
        const initialLink = '/_s952/49616/list.psp';
        const isMobile = window.innerWidth <= 768;

        //setTimeout(() => console.log("0.2 秒后打印品牌部分"), 200);

        const maxCardsPerType = isMobile ? 4 : 12;

        // 初始显示逻辑函数
        function showInitialCards() {
            if (!isMobile) {
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

        // 初始显示卡片
        showInitialCards();

        buttons.forEach((button, index) => {
            // 跟踪按钮的点击状态
            let isActive = false;

            button.addEventListener('click', () => {
                const selectedType = typeMap[index];
                const link = linkMap[index];
                const moreBtn = document.getElementById('brand-more-btn');
                const moreBtnSmall = document.getElementById('brand-more-btn-small');
                moreBtn.href = link;
                moreBtnSmall.href = link;

                if (isActive) {
                    // 如果按钮已经是激活状态，取消高亮并恢复初始显示
                    button.classList.remove('active');
                    showInitialCards();
                    moreBtn.href = initialLink;
                    moreBtnSmall.href = initialLink;
                } else {
                    // 如果按钮不是激活状态，添加高亮并显示对应类型的卡片
                    buttons.forEach(btn => btn.classList.remove('active'));

                    button.classList.add('active');

                    let shown = 0;
                    allCards.forEach(card => {
                        if (card.classList.contains(selectedType)) {
                            card.style.display = shown < maxCardsPerType ? 'flex' : 'none';
                            shown++;
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }

                // 切换按钮状态
                isActive = !isActive;
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

        if (text.includes('国际本科')) {
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

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.section-part-enroll-btn');
    const viewAllLink = document.querySelector('.section-btn');
    let currentLink = '/_s952/49615/list.psp'; // 默认链接

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentLink = this.dataset.link; // 记录当前跳转链接
        });
    });

    viewAllLink.addEventListener('click', function (e) {
        window.location.href = currentLink;
        e.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.section-part-brand-btn');
    const viewAllLink = document.querySelector('.section-btn');
    let currentLink = '/_s952/49616/list.psp'; // 默认链接

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentLink = this.dataset.link; // 记录当前跳转链接
        });
    });

    viewAllLink.addEventListener('click', function (e) {
        window.location.href = currentLink;
        e.preventDefault();
    });
});