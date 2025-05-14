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
});