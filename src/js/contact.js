$(document).ready(function () {

    function clearForm() {
        $('.js-input').val("");
    }

    // formulář footer

    $('.js-request-form-bottom').on('submit', function (e) {
        e.preventDefault();
        const $submitButton = $(".submit__button");
        $submitButton.attr("disabled", true);
        const $element = $(this).parents('.newsletter');
        $.ajax({
            url: 'https://admin.kitelementshop.com/admin/api/newsletter/',
            type: "POST",
            headers: {
                'able-origin': 'https://futurekiteboarding.com'
            },
            data: $(this).serialize(),
            success: function (response) {
                if (response.status) {
                    const $thankYou = $element.find('.form__wrapper--thankyou');
                    $thankYou.fadeIn(500);
                    $submitButton.attr("disabled", false);
                    setTimeout(() => {
                        $thankYou.fadeOut(500);
                    }, 2000);
                    $('#contactForm-bottom')[0].reset();
                    clearForm();
                }
            },
            error: function (error) {
                const $error = $element.find('.form__wrapper--error');
                $error.html(error['responseJSON'].message);
                $error.fadeIn(500);
                $submitButton.attr("disabled", false);
                setTimeout(() => {
                    $error.fadeOut(500);
                }, 5000);
            }
        });
    });

    // formulář get in touch

    $('.js-request-form-contact').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: 'https://admin.kitelementshop.com/admin/api/contact-form/',
            type: "POST",
            headers: {
                'able-origin': 'https://futurekiteboarding.com'
            },
            data: $(this).serialize(),
            success: function (response) {
                const $submitButton = $(".submit__button");
                if (response.status) {
                    const $thankYou = $('.form__wrapper--thankyou');
                    $thankYou.fadeIn(500);
                    $submitButton.attr("disabled", true);
                    setTimeout(() => {
                        $submitButton.attr("disabled", false);
                        $thankYou.fadeOut(500);
                    }, 5000);
                    $('#contactForm')[0].reset();
                    clearForm();
                }
            },
            error: function (error) {
                const $submitButton = $(".submit__button");
                const $error = $('.form__wrapper--error');
                $error.fadeIn(500);
                setTimeout(() => {
                    $submitButton.attr("disabled", false);
                    $error.fadeOut(500);
                }, 5000);
            }
        });
    });


});
