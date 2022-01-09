import Swiper from "swiper/swiper-bundle";

$(document).ready(function () {
    var homepageSwiper = new Swiper('.homepage-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 2000
        },
        speed: 1000,
        pagination: {
            el: '.top-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var productSwiper = new Swiper('.product-swiper', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 480px
            768: {
                slidesPerView: 1.2,
                spaceBetween: 30
            },
            // when window width is >= 640px
            1200: {
                slidesPerView: 2.5,
                spaceBetween: 40
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        },
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2000
        },
        speed: 2000
    });
});
