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