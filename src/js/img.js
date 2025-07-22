document.addEventListener('DOMContentLoaded', function () {

    const imgs = document.querySelectorAll('.article img');

    imgs.forEach(img => {
        // 清除 img 的 style 属性
        img.removeAttribute('style');
    });
});
