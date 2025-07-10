document.addEventListener('DOMContentLoaded', function() {
      const nav = document.querySelector('.nav');
      const navContainer = document.querySelector('.nav-container');
      const scrollThreshold = window.innerHeight; // 滚动阈值为一屏高度
      let isFixed = false;
      let lastScrollTop = 0;

      // 初始位置记录
      const initialTop = nav.offsetTop;

      window.addEventListener('scroll', function() {
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