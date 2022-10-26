import Swiper from "swiper/swiper-bundle";

$(document).ready(function () {

    var homepageSwiperText = new Swiper('.homepage-swiper-text', {
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: false
    });

    var homepageSwiper = new Swiper('.homepage-swiper', {
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        paginationClickable: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.top-pagination',
            type: 'bullets',
            clickable: true
        },
        on: {
            slideChange: function () {
                homepageSwiperText.slideTo(this.activeIndex);
            }
        }
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

    var detailSwiper = new Swiper('.detail-swiper', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 3000
        },
        speed: 1000,
        pagination: {
            el: '.detail-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var detailSwiperBottom = new Swiper('.detail-swiper-bottom', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 3000
        },
        speed: 1000,
        pagination: {
            el: '.detail-pagination-bottom',
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
                speed: 1800
            },
            // when window width is >= 640px
            1200: {
                slidesPerView: 2.5,
                spaceBetween: 40,
                speed: 1800
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 40,
                speed: 1800
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
            delay: 6000,
            disableOnInteraction: false,
        },
        allowTouchMove: false
    });

    // swiper tech text

    var techNames = ['01', '02', '03', '04', '05', '06', '07'];
    var techSwiper = new Swiper('.tech-swiper', {
        // If we need pagination
        effect: 'fade',
        autoplay: {
            delay: 6000,
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

    var galleryThumbsMuchoRed = new Swiper('.gallery-thumbs-1', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoRed = new Swiper('.gallery-top-1', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoRed,
        }
    });

    var galleryThumbsMuchoBlue = new Swiper('.gallery-thumbs-2', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoBlue = new Swiper('.gallery-top-2', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoBlue,
        }
    });

    var galleryThumbsMuchoYellow = new Swiper('.gallery-thumbs-3', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoYellow = new Swiper('.gallery-top-3', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: galleryThumbsMuchoYellow,
        }
    });

    var galleryThumbsMuchoYellow = new Swiper('.gallery-thumbs-4', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    var galleryTopMuchoYellow = new Swiper('.gallery-top-4', {
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
