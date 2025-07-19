document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    mobileNavToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});
