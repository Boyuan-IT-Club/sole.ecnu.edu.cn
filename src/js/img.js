document.addEventListener('DOMContentLoaded', function () {
  const titleDiv = document.querySelector('.column-current-title-content');
  
  if (titleDiv) {
    // 获取栏目名称（去除多余空格）
    const columnName = titleDiv.textContent.trim();

    // 判断栏目名称是否为 "学院新闻"
    if (columnName === '学院新闻') {
      // 找到所有 .article 下的 img
      const imgs = document.querySelectorAll('.article img');
      
      imgs.forEach(img => {
        // 清除 img 的 style 属性
        img.removeAttribute('style');
      });
    }
  }
});
