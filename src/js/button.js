document.addEventListener('DOMContentLoaded', function() {
    // 这里放你原来的整段代码
    (function() {
        function setActiveBtn() {
            const curr = location.pathname + location.search;
            document.querySelectorAll('.section-part-enroll-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.link === curr);
            });
        }
        setActiveBtn();

        window.addEventListener('popstate', setActiveBtn);
        const originalPush = history.pushState;
        history.pushState = function() {
            originalPush.apply(history, arguments);
            setActiveBtn();
        };
        const originalReplace = history.replaceState;
        history.replaceState = function() {
            originalReplace.apply(history, arguments);
            setActiveBtn();
        };
        window.addEventListener('hashchange', setActiveBtn);
    })();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('section-part-enroll-btn')) {
            location.href = e.target.dataset.link;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 这里放你原来的整段代码
    (function() {
        function setActiveBtn() {
            const curr = location.pathname + location.search;
            document.querySelectorAll('.section-part-brand-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.link === curr);
            });
        }
        setActiveBtn();

        window.addEventListener('popstate', setActiveBtn);
        const originalPush = history.pushState;
        history.pushState = function() {
            originalPush.apply(history, arguments);
            setActiveBtn();
        };
        const originalReplace = history.replaceState;
        history.replaceState = function() {
            originalReplace.apply(history, arguments);
            setActiveBtn();
        };
        window.addEventListener('hashchange', setActiveBtn);
    })();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('section-part-brand-btn')) {
            location.href = e.target.dataset.link;
        }
    });
});

// (function() {
//     // ====== 核心匹配函数 ======
//     function setActiveBtn() {
//         const curr = location.pathname + location.search; // 只比路径+查询串，忽略 hash
//         document.querySelectorAll('.section-part-enroll-btn').forEach(btn => {
//             // 完全相等才算命中
//             btn.classList.toggle('active', btn.dataset.link === curr);
//         });
//     }

//     // ====== 首次高亮 ======
//     setActiveBtn();

//     // ====== 监听三种常见变化 ======
//     // 1. 浏览器前进/后退
//     window.addEventListener('popstate', setActiveBtn);

//     // 2. 劫持 history.pushState
//     const originalPush = history.pushState;
//     history.pushState = function() {
//         originalPush.apply(history, arguments);
//         setActiveBtn();
//     };

//     // 3. 劫持 history.replaceState
//     const originalReplace = history.replaceState;
//     history.replaceState = function() {
//         originalReplace.apply(history, arguments);
//         setActiveBtn();
//     };

//     // 4. 如果项目还用 hash 路由，再补一个
//     window.addEventListener('hashchange', setActiveBtn);
// })();

// document.addEventListener('click', function(e) {
//     // 点到的元素是 .section-part-enroll-btn 就执行
//     if (e.target.classList.contains('section-part-enroll-btn')) {
//         const url = e.target.dataset.link; // 拿到 /_s952/49615/list.psp 这类路径
//         if (url) location.href = url; // 同窗口跳转
//         // 想开新窗口用： window.open(url, '_blank');
//     }
// });