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
        if (currentTag === tagItem.children[0].textContent) {
            tagItem.classList.add('active');
        }
    });

    // const activeTag = document.querySelectorAll('.active')[2];
    // const activeTagLink = activeTag.querySelector('a');

    // if (activeTagLink) {
    // activeTagLink.href = '/_s952/49608/list.psp';

    // activeTagLink.addEventListener('click', function(e) {
    //     e.preventDefault(); // 防止默认跳转
    //     window.location.href = '/_s952/49608/list.psp';
    // });
    const activeTag = document.querySelectorAll('.active')[2];
// console.log('activeTag:', activeTag);

if (!activeTag) {
    console.warn('activeTag is not found.');
} else {
    const activeTagLink = activeTag.querySelector('a');
    //console.log('activeTagLink:', activeTagLink);

    if (!activeTagLink) {
        console.warn('activeTagLink <a> not found inside activeTag.');
    } else {
        // 打印原始 href
        //console.log('Original href:', activeTagLink.href);

        // 修改 href
        activeTagLink.href = '/_s952/49608/list.psp';
        //console.log('Modified href:', activeTagLink.href);

        

        // 添加点击事件
        activeTagLink.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转
            //console.log('Link clicked. Redirecting...');
            window.location.href = '/_s952/49608/list.psp';
        });
    }
}
}

);

document.addEventListener('click', function(event) {
    const pathName = document.querySelector('.path-name');
    let currentTag = pathName.children[4].textContent;
    const tagItems = document.querySelectorAll('.tag-item');

    tagItems.forEach(tagItem => {
        if (currentTag === tagItem.children[0].textContent) {
            tagItem.classList.add('active');
        }
    });

    
});


