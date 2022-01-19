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

    setTimeout(function () {
        $(".loader").addClass("loader--loaded");
    }, 2000);


/*    function preloader() {
        setTimeout(function(){
            $('body').addClass('loaded');
        }, 2000);
    }
    if ( ! sessionStorage.getItem( 'doNotShow' ) ) {
        sessionStorage.setItem( 'doNotShow', true );
        preloader();
    } else {
        $ ('.loader').hide();
    }*/


    $(".header__open").click(function() {
        var menuButtonText = $('.header__open span').text();
        $(".header__menu").toggleClass("active");
        $("body").toggleClass("active");
        $('.header__open span').text(menuButtonText == 'Menu' ? 'Zavřít' : 'Menu');
    });


});