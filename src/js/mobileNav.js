document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    mobileNavToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const pinpaiCards = document.querySelectorAll('.pinpai-card');
    pinpaiCards.forEach(card => {
        card.addEventListener('click', function() {
            window.location.href = card.id;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    //点击名字为党政建设的导航栏栏目跳转到对应页面
    const menulink = document.querySelectorAll('.menu-link');
    menulink.forEach(link => {
        if (link.textContent.trim() === '党建工作') {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = '/_s952/dzjs/main.psp';
            });
        }
    });
});