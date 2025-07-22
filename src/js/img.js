document.addEventListener('DOMContentLoaded', function () {
  const imgs = document.querySelectorAll('.article img');

  imgs.forEach(img => {
    // 清除 img 的 style 属性
    img.removeAttribute('style');

    const parent = img.parentElement;

    // 情况 1：img 的父元素是 <p> 且 p 只有这一个子元素
    if (parent && parent.tagName === 'P' && parent.children.length === 1) {
      parent.removeAttribute('style');
    }

    // 情况 2：img 的父元素是 <span>，span 的父元素是 <p>，且 p 只有这一个子元素（span）
    if (
      parent &&
      parent.tagName === 'SPAN' &&
      parent.parentElement &&
      parent.parentElement.tagName === 'P' &&
      parent.parentElement.children.length === 1
    ) {
      parent.parentElement.removeAttribute('style');
    }
  });
});
