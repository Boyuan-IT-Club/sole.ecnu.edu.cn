document.addEventListener('DOMContentLoaded', function() {
    const tagContentVisible = document.querySelectorAll('#tag-content-visible');
    let tagList = [];
    
    // 从表格结构中获取所有标签
    const tagContents = document.querySelectorAll('.tag-content');
    
    tagContents.forEach(tagContent => {
        const tagItems = tagContent.querySelectorAll('.tag-item');
        tagItems.forEach(tagItem => {
            const link = tagItem.querySelector('a');
            if (link) {
                tagList.push({
                    href: link.getAttribute('href'),
                    text: link.querySelector('.tag-name').textContent.trim()
                });
            }
        });
    });
    // 生成可见的标签列表
    if (tagList.length > 0) {
        const tagListHTML = tagList.map(tag => 
            `<li class="tag-item"><a href="${tag.href}" target="_self">${tag.text}</a></li>`
        ).join('');
        
        tagContentVisible.forEach(tagContentVisible => {
            tagContentVisible.innerHTML = `<ul class="tag-list">${tagListHTML}</ul>`;
        });
    }
});


