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

    var wakeboardSwiper = new Swiper('.wakeboard-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 2000
        },
        speed: 1000,
        pagination: {
            el: '.wakeboard-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var homepageSwiper = new Swiper('.detail-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 9999999
        },
        speed: 1000,
        pagination: {
            el: '.detail-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var ambassadorsSwiper = new Swiper('.ambassadors-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 2000
        },
        speed: 1000,
        pagination: {
            el: '.ambassadors-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var brandSwiper = new Swiper('.brand-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 2000
        },
        speed: 1000,
        pagination: {
            el: '.brand-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var facebookSwiper = new Swiper('.facebook-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 1500
        },
        speed: 1000,
    });

    var instagramSwiper = new Swiper('.instagram-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 1800
        },
        speed: 1000,
    });

    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });

    var productSwiper = new Swiper('.product-swiper', {
        loop: true,
        slidesPerView: 1.5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 480px
            768: {
                slidesPerView: 1.8,
                spaceBetween: 30,
                speed: 2000
            },
            // when window width is >= 640px
            1200: {
                slidesPerView: 2.5,
                spaceBetween: 40,
                speed: 2500
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 40,
                speed: 2500
            }
        },
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000
        },
        speed: 1200
    });

    // swiper tech photo

    var techSwiperText = new Swiper('.tech-text-swiper', {
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        allowTouchMove: false
    });

    // swiper tech text

    var techNames = ['01', '02', '03', '04', '05', '06'];
    var techSwiper = new Swiper('.tech-swiper', {
        // If we need pagination
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        paginationClickable: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.tech-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="tech-pagination__number ' + className + '"><span class="name">' + (techNames[index]) + '</span></div>';
            },
        },
        on: {
            slideChange: function () {
                techSwiperText.slideTo(this.activeIndex);
            }
        }
    });

    var galleryThumbsMuchoRed = new Swiper('.gallery-thumbs-mucho-red', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoRed = new Swiper('.gallery-top-mucho-red', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoRed,
        }
    });

    var galleryThumbsMuchoBlue = new Swiper('.gallery-thumbs-mucho-blue', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoBlue = new Swiper('.gallery-top-mucho-blue', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoBlue,
        }
    });

    var galleryThumbsMuchoYellow = new Swiper('.gallery-thumbs-mucho-yellow', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoYellow = new Swiper('.gallery-top-mucho-yellow', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoYellow,
        }
    });
});
