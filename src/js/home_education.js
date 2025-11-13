document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('dev')) {
        window.isDev = true;
    } else {
        window.isDev = false;
    }

    const dataContainer = document.querySelector('.data-container');
    if (window.isDev) {
        dataContainer.style.display = 'block';
    } else {
        dataContainer.style.display = 'none';
    }

    // 获取数据容器中的数据
    const newsData = getDataFromWindow(1); // 窗口1 - 新闻/活动预告
    const enrollmentData = getDataFromWindow(2); // 窗口2 - 招生/新闻速递
    const brandData = getDataFromWindow(3); // 窗口3 - 品牌/卓越服务
    const recommendedData = getDataFromWindow(4); // 窗口4 - 推荐/典型案例
    const academicData = getDataFromWindow(5);
    
    // 填充各个内容区域
    populateEventPreview(newsData);
    populateAllianceNews(enrollmentData);
    populateCollegeBusiness(brandData);
    populateIdenticalExamples(recommendedData);
    populateAcademicExamples(academicData);
});

// 从指定窗口获取数据
function getDataFromWindow(windowNumber) {
    const window = document.querySelector(`div[frag="窗口${windowNumber}"]`);
    if (!window) return [];
    
    const items = window.querySelectorAll('li');
    const data = [];
    
    items.forEach(item => {
        const itemData = {
            id: item.getAttribute('data-id'),
            url: item.getAttribute('data-url'),
            title: stripHtmlTags(item.getAttribute('data-title')),
            subtitle: stripHtmlTags(item.getAttribute('data-subtitle')),
            image: item.getAttribute('data-image'),
            time: item.getAttribute('data-time'),
            category: stripHtmlTags(item.getAttribute('data-category')),
            content: stripHtmlTags(item.getAttribute('data-content'))
        };
        data.push(itemData);
    });
    
    return data;
}

// 去除HTML标签，保留纯文本
function stripHtmlTags(html) {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// 填充学术成果区域
function populateAcademicExamples(data) {
    if (!data || data.length === 0) return;

    const academicList = document.querySelector('.academic-content');
    if (!academicList) return;

    const displayData = data.slice(0, 4); // 取前4条数据

    academicList.innerHTML = ''; // 清空现有内容

    displayData.forEach(item => {
        return academicList.innerHTML += `
        <div class="academic-item">
            <img class="academic-img" src="${item.image}" alt="" />
            <div class="academic-text">
              <div class="academic-title">
                ${item.title}
              </div>
              <div class="academic-subtitle">
                ${item.subtitle || item.content || ''}
              </div>
              <div class="academic-date">${item.time}</div>
            </div>
          </div>
        `
    });
}

// 填充活动预告区域
function populateEventPreview(data) {
    if (!data || data.length === 0) return;
    
    // 按栏目分组数据
    const groupedData = {};
    data.forEach(item => {
        const category = item.category || '其他';
        if (!groupedData[category]) {
            groupedData[category] = [];
        }
        groupedData[category].push(item);
    });
    
    // 获取所有栏目
    const categories = Object.keys(groupedData);
    console.log('所有可用的栏目:', categories);
    console.log('分组后的数据:', groupedData);
    
    // 获取左侧标题项
    const titleItems = document.querySelectorAll('.event-preview-title-item');
    
    // 找到第一个有数据的栏目并渲染
    let firstCategoryWithData = null;
    titleItems.forEach((titleItem) => {
        const titleElement = titleItem.querySelector('.title');
        const categoryName = titleElement ? titleElement.textContent.trim() : '';
        if (!firstCategoryWithData && groupedData[categoryName]) {
            firstCategoryWithData = categoryName;
        }
    });
    
    if (firstCategoryWithData) {
        console.log('初始加载的栏目:', firstCategoryWithData);
        renderEventPreviewContent(groupedData[firstCategoryWithData]);
        // 给第一个有数据的栏目添加 active 类
        titleItems.forEach((titleItem) => {
            const titleElement = titleItem.querySelector('.title');
            const categoryName = titleElement ? titleElement.textContent.trim() : '';
            if (categoryName === firstCategoryWithData) {
                titleItem.classList.add('active');
            } else {
                titleItem.classList.remove('active');
            }
        });
    }
    
    // 绑定标题项点击事件
    titleItems.forEach((titleItem) => {
        titleItem.addEventListener('click', function() {
            // 获取当前点击的栏目名称（从 HTML 中读取）
            const titleElement = this.querySelector('.title');
            const categoryName = titleElement ? titleElement.textContent.trim() : '';
            
            console.log('当前选中的栏目:', categoryName);
            console.log('该栏目的数据:', groupedData[categoryName]);
            
            // 检查该栏目是否有数据
            if (groupedData[categoryName]) {
                // 移除所有active类
                titleItems.forEach(item => item.classList.remove('active'));
                // 添加当前active类
                this.classList.add('active');
                
                // 渲染对应的内容
                renderEventPreviewContent(groupedData[categoryName]);
            } else {
                console.warn('栏目"' + categoryName + '"没有数据');
                // 可选：清空内容区域或显示"暂无数据"
                const contentList = document.querySelector('.event-preview-content-list');
                if (contentList) {
                    contentList.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">暂无数据</div>';
                }
            }
        });
    });
}

// 渲染活动预告内容
function renderEventPreviewContent(items) {
    const contentList = document.querySelector('.event-preview-content-list');
    if (!contentList) return;
    
    // 清空现有内容
    contentList.innerHTML = '';
    
    // 检测是否只有一条内容
    const isSingleItem = items.length === 1;
    
    // 取前3条数据
    const displayData = items.slice(0, 3);
    
    displayData.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.className = 'event-preview-content-item';
        
        // 如果只有一条内容，添加特殊样式类
        if (isSingleItem) {
            contentItem.classList.add('single-item');
        }
        
        contentItem.onclick = () => window.location.href = item.url;
        
        // 根据是否为单条内容决定HTML结构
        if (isSingleItem) {
            // 单条内容：照片 → 标题 → 查看更多
            contentItem.innerHTML = `
                ${item.image ? `<div class="event-preview-content-item-image"><img src="${item.image}" alt="${item.title}"></div>` : '<div class="event-preview-content-item-image"></div>'}
                <div class="event-preview-content-single-item-content">
                <div class="event-preview-content-item-title">${item.title}</div>
                <div class="event-preview-content-item-more">查看更多 →</div>
                </div>
            `;
        } else {
            // 多条内容：保持原有结构
            contentItem.innerHTML = `
                <div class="event-preview-content-item-title">${item.title}</div>
                <div class="event-preview-content-item-description">${item.content}</div>
                ${item.image ? `<div class="event-preview-content-item-image"><img src="${item.image}" alt="${item.title}"></div>` : '<div class="event-preview-content-item-image"></div>'}
                <div class="event-preview-content-item-more">查看更多 →</div>
            `;
        }
        
        contentList.appendChild(contentItem);
    });
}

// 填充新闻速递区域
function populateAllianceNews(data) {
    if (!data || data.length === 0) return;
    
    const newsBody = document.querySelector('.alliance-news-body');
    if (!newsBody) return;
    
    // 填充左侧主要新闻（第1条）
    if (data[0]) {
        const leftSection = newsBody.querySelector('.alliance-news-left');
        const leftContent = newsBody.querySelector('.alliance-news-left-content');
        const leftImage = newsBody.querySelector('.alliance-news-left-image');
        
        if (leftSection) {
            leftSection.onclick = () => window.location.href = data[0].url;
        }
        
        if (leftImage && data[0].image) {
            leftImage.style.backgroundImage = `url(${data[0].image})`;
            leftImage.style.backgroundSize = 'cover';
            leftImage.style.backgroundPosition = 'center';
        }
        
        if (leftContent) {
            leftContent.querySelector('.alliance-news-left-content-tag').textContent = data[0].category || '新闻速递';
            leftContent.querySelector('.alliance-news-left-content-time').textContent = formatDate(data[0].time);
            leftContent.querySelector('.alliance-news-left-content-title').textContent = data[0].title;
            leftContent.querySelector('.alliance-news-left-content-description').textContent = data[0].content || data[0].subtitle || '';
        }
    }
    
    // 填充中间新闻（第2条）
    if (data[1]) {
        const centerSection = newsBody.querySelector('.alliance-news-center');
        const centerContent = newsBody.querySelector('.alliance-news-center-content');
        const centerImage = newsBody.querySelector('.alliance-news-center-image').children[0];
        
        if (centerSection) {
            centerSection.onclick = () => window.location.href = data[1].url;
        }
        
        if (centerImage && data[1].image) {
            centerImage.src = data[1].image;
            centerImage.alt = data[1].title;
        }
        
        if (centerContent) {
            centerContent.querySelector('.alliance-news-center-content-tag').textContent = data[1].category || '新闻速递';
            centerContent.querySelector('.alliance-news-center-content-time').textContent = formatDate(data[1].time);
            centerContent.querySelector('.alliance-news-center-content-title').textContent = data[1].title;
            centerContent.querySelector('.alliance-news-center-content-description').textContent = data[1].content || data[1].subtitle || '';
        }
    }
    
    // 填充右侧新闻列表（第3-6条）
    const rightItems = newsBody.querySelectorAll('.alliance-news-right-item');
    for (let i = 0; i < rightItems.length && i + 2 < data.length; i++) {
        const itemData = data[i + 2];
        const item = rightItems[i];
        
        item.onclick = () => window.location.href = itemData.url;
        
        const img = item.querySelector('.alliance-news-right-item-image img');
        if (img && itemData.image) {
            img.src = itemData.image;
            img.alt = itemData.title;
        }
        
        item.querySelector('.alliance-news-right-item-content-time').textContent = formatDate(itemData.time);
        item.querySelector('.alliance-news-right-item-content-title').textContent = itemData.title;
    }
}

// 填充卓越服务区域
function populateCollegeBusiness(data) {
    if (!data || data.length === 0) return;
    
    // 按栏目分组数据
    const groupedData = {};
    data.forEach(item => {
        const category = item.category || '其他';
        if (!groupedData[category]) {
            groupedData[category] = [];
        }
        groupedData[category].push(item);
    });
    
    // 获取所有栏目
    const categories = Object.keys(groupedData);
    let currentIndex = 0; // 当前选中的栏目索引
    
    // 渲染初始内容（第一个栏目）
    if (categories.length > 0) {
        renderCollegeBusinessContent(groupedData[categories[0]]);
    }
    
    // 绑定目录项点击事件
    const directoryItems = document.querySelectorAll('.college-business-directory-content-item');
    
    // 给初始选中项添加箭头
    if (directoryItems.length > 0) {
        const firstItem = directoryItems[0];
        const arrow = document.createElement('span');
        arrow.textContent = '>';
        firstItem.appendChild(arrow);
    }
    
    // 更新选中项的函数
    function updateSelectedItem(index) {
        // 移除所有first类和箭头
        directoryItems.forEach(el => {
            el.classList.remove('first');
            // 移除所有箭头符号
            const spans = el.querySelectorAll('span');
            spans.forEach(span => {
                if (span.textContent.trim() === '>') {
                    span.remove();
                }
            });
        });
        
        // 添加当前first类
        if (directoryItems[index]) {
            directoryItems[index].classList.add('first');
            
            // 添加箭头符号
            const arrow = document.createElement('span');
            arrow.textContent = '>';
            directoryItems[index].appendChild(arrow);
            
            // 根据索引获取对应的栏目数据
            const categoryName = categories[index];
            if (categoryName && groupedData[categoryName]) {
                renderCollegeBusinessContent(groupedData[categoryName]);
            }
        }
    }
    
    // 绑定目录项点击事件
    directoryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            updateSelectedItem(currentIndex);
        });
    });
    
    // 绑定左右切换按钮
    const switchButtons = document.querySelectorAll('.college-business-directory-content-switch-buttons > div');
    if (switchButtons.length >= 2) {
        // 左按钮 - 上一个
        switchButtons[0].addEventListener('click', function() {
            if (directoryItems.length > 0) {
                currentIndex = (currentIndex - 1 + directoryItems.length) % directoryItems.length;
                updateSelectedItem(currentIndex);
            }
        });
        
        // 右按钮 - 下一个
        switchButtons[1].addEventListener('click', function() {
            if (directoryItems.length > 0) {
                currentIndex = (currentIndex + 1) % directoryItems.length;
                updateSelectedItem(currentIndex);
            }
        });
    }
}

// 渲染卓越服务内容
function renderCollegeBusinessContent(items) {
    const contentContainer = document.querySelector('.college-business-content');
    if (!contentContainer) return;
    
    // 清空现有内容
    contentContainer.innerHTML = '';
    
    // 取前3条数据
    const displayData = items.slice(0, 3);
    
    displayData.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.className = 'college-business-content-item';
        contentItem.onclick = () => window.location.href = item.url;
        
        contentItem.innerHTML = `
            <div class="college-business-content-item-divide-line"></div>
            <div class="college-business-content-item-content-title">${item.title}</div>
            ${item.image ? `<div class="college-business-content-item-content-image"><img src="${item.image}" alt="${item.title}"></div>` : '<div class="college-business-content-item-content-image"></div>'}
            <div class="college-business-content-item-content-description">${item.content || item.subtitle || ''}</div>
            <div class="college-business-content-item-content-more">查看更多 →</div>
        `;
        
        contentContainer.appendChild(contentItem);
    });
}

// 填充典型案例区域
function populateIdenticalExamples(data) {
    if (!data || data.length === 0) return;
    
    // 填充第一个大项（第1条）
    if (data[0]) {
        const firstItem = document.querySelector('.identical-examples-first-item');
        if (firstItem) {
            firstItem.onclick = () => window.location.href = data[0].url;
            
            const img = firstItem.querySelector('.identical-examples-first-item-image img');
            if (img && data[0].image) {
                img.src = data[0].image;
                img.alt = data[0].title;
            }
            
            firstItem.querySelector('.identical-examples-first-item-content-title').textContent = data[0].title;
            firstItem.querySelector('.identical-examples-first-item-content-description').textContent = data[0].content || data[0].subtitle || '';
        }
    }
    
    // 填充列表项（第2-9条）
    const itemList = document.querySelector('.identical-examples-item-list');
    if (itemList) {
        // 清空现有内容
        itemList.innerHTML = '';
        
        // 取第2-5条数据
        const listData = data.slice(1, 5);
        
        listData.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'identical-examples-item';
            listItem.onclick = () => window.location.href = item.url;
            
            listItem.innerHTML = `
                <div class="identical-examples-item-title">${item.title}</div>
                <div class="identical-examples-item-more">→</div>
            `;
            
            itemList.appendChild(listItem);
        });
    }
}

// 格式化日期
function formatDate(dateStr) {
    if (!dateStr) return '';
    // 如果已经是 YYYY.MM.DD 格式，直接返回
    if (dateStr.includes('.')) return dateStr;
    // 如果是 YYYY-MM-DD 格式，转换为 YYYY.MM.DD
    return dateStr.replace(/-/g, '.');
}