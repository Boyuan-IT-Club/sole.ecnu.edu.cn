document.addEventListener('DOMContentLoaded', function () {
    // 处理 .month-date 元素
    var monthDateElements = document.querySelectorAll('.month-date');

    monthDateElements.forEach(function (element) {
        var date = element.textContent;
        var month = date.split('-')[1];
        var day = date.split('-')[2];
        element.textContent = month + '-' + day;
    });
    
    // 处理 .year 元素
    var yearElements = document.querySelectorAll('.year');
    yearElements.forEach(function (element) {
        var date = element.textContent;
        var year = date.split('-')[0];
        element.textContent = year;
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // 获取所有 class="line" 的 h2 元素
  const h2Elements = document.querySelectorAll('h2.line');
  
  // 定义截取字符长度的函数（根据屏幕宽度返回 15 或 20）
  function getMaxLength() {
    return window.matchMedia('(max-width: 600px)').matches ? 15 : 20;
  }
  
  // 处理 a 标签的文本替换
  function processATags(aTags) {
    const maxLength = getMaxLength();
    aTags.forEach(function(a) {
      const title = a.getAttribute('title');
      if (title) {
        const shortText = title.length > maxLength 
          ? title.substring(0, maxLength) + '...' 
          : title;
        a.textContent = shortText;
      }
    });
  }
  
  // 初始处理
  h2Elements.forEach(function(h2) {
    const aTags = h2.querySelectorAll('a');
    processATags(aTags);
  });
  
  // 监听窗口大小变化，动态调整
  window.addEventListener('resize', function() {
    h2Elements.forEach(function(h2) {
      const aTags = h2.querySelectorAll('a');
      processATags(aTags);
    });
  });
});
