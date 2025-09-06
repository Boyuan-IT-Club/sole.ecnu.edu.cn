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

    const pathName = document.querySelector('.path-name');
    let currentTag = pathName.children[4].textContent.trim();
    const tagItems = document.querySelectorAll('.tag-item');
    tagItems.forEach(tagItem => {

        let isActive = false;
        if (currentTag === tagItem.children[0].textContent) {
            tagItem.classList.add('active');
            isActive = true;
        }
        tagItem.addEventListener('click', function(event) {

            if (isActive) {
                tagItem.classList.remove('active');
                isActive = false;
                const activeTagLink = tagItem.querySelector('a');
                if (activeTagLink) {
                    activeTagLink.href = '/_s952/49608/list.psp';
                }
            }
        })
        
        
    });
}
);



document.addEventListener('click', function(event) {
    const pathName = document.querySelector('.path-name');
    let currentTag = pathName.children[4].textContent;
    const tagItems = document.querySelectorAll('.tag-item');

    tagItems.forEach(tagItem => {
        if (currentTag === tagItem.children[0].textContent) {
            tagItem.classList.add('active');

            const activeTagLink = tagItem.querySelector('a');
            if (activeTagLink) {
                activeTagLink.href = '/_s952/49608/list.psp';
            }
        }
        else {
            tagItem.classList.remove('active');
        }
    });

    
});
