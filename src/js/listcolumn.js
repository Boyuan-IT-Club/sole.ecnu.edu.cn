document.addEventListener("DOMContentLoaded", function() {
    const columnItems = document.querySelectorAll('.column-name');
    let isEmpty = true;

    columnItems.forEach(item => {
        if (item.textContent.trim() !== '') {
            isEmpty = false;
        }
    });

    if (isEmpty) {
        document.querySelector('.column-body').style.display = 'none';
    }

    const currentPath = document.querySelector('.current-path');
    const path = document.querySelector('.path-name')
    const pathName = path.lastChild.textContent;
        currentPath.textContent = pathName;

    // 导航栏下拉菜单增强功能
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // 为触摸设备添加点击事件
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // 关闭其他打开的下拉菜单
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
        
        // 为桌面设备添加鼠标事件
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                dropdown.classList.add('hover');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('hover');
            }
        });
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const divs = document.querySelectorAll('.column-current-title > div');
    divs.forEach(div => {
        if (div.textContent.trim().length > 12) {
            div.style.fontSize = 'large';
        }
    });
});
