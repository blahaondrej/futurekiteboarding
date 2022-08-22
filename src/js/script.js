// remove hover on touch

function hasTouch() {
    return 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0
        || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets

    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

$(document).ready(function () {

/*    setTimeout(function () {
        $("body").addClass("loaded");
    }, 1000);*/

    // Preloader

/*    function preloader() {
        setTimeout(function(){
            $('body').addClass('loaded');
            $('body').removeClass('no-scroll');
        }, 2000);
    }
    if ( ! sessionStorage.getItem( 'doNotShow' ) ) {
        sessionStorage.setItem( 'doNotShow', true );
        preloader();
    } else {
        $ ('.loader').hide(0);
        $('body').removeClass('no-scroll');
    }*/

    // Select currency

    $(".currency__button").click(function() {
        $("body").removeClass("no-scroll");
        $(".currency").removeClass("active");
        $(".currency").addClass("hidden");
        $("body").addClass("loaded");
        localStorage.setItem("selectedCurrency",  $(this).data("currency"));
        console.log(localStorage);
    });

    if (localStorage.getItem("selectedCurrency") === null) {
        $(".currency").addClass("active");
    } else {
        $(".currency").removeClass("active");
        $("body").removeClass("no-scroll");
        $("body").addClass("loaded");
    }

    // Detail - select cize
    $(".product-description__sizes div").click(function() {
        $(".product-description__sizes div").removeClass("active");
        $(this).addClass("active");
    });

    $(".header__open").click(function() {
        var menuButtonText = $('.header__open span').text();
        $(".header__menu").toggleClass("active");
        $("body").toggleClass("active");
        $('.header__open span').text(menuButtonText == 'Menu' ? 'Close' : 'Menu');
    });

    if ($(window).width() > 599) {
        $('.homepage-overlay__bottom').height($(window).height() - $('.homepage-overlay__motive svg').height() +20);
    }


    // zmena obrazku podle tlacitka barvy
    $('.product__colors div').on('mouseover', function () {
        $('.product__colors div').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.product__content').find('.product__image img').removeClass('active');
        $(this).parents('.product__content').find(`.product__image img[data-color=${$(this).data('color')}]`).addClass('active');
    });

    // zmena obrazku podle tlacitka barvy - detail produktu
    $('.product-description__colors div').on('click', function () {
        $('.product-description__colors div').removeClass('active');
        $(this).addClass('active');
        $('.product-gallery').removeClass('active');
        $(`.product-gallery[data-color=${$(this).data('color')}]`).addClass('active');
    });

});

$( window ).resize(function() {
    if ($(window).width() > 599) {
        $('.homepage-overlay__bottom').height($(window).height() - $('.homepage-overlay__motive svg').height() +20);
    }
});