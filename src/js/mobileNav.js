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