$(function () {
  var swiper = new Swiper(".swiper-banner", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
