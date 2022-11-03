$(document).ready(function () {

    function clearForm() {
        $('.js-input').val("");
    }

    // formulář footer

    $('.js-request-form-bottom').on('submit', function (e) {
        e.preventDefault();

        $.post('https://www.kitelementshop.com/admin/api/newsletter/', $(this).serialize(), function (response) {
            const $submitButton = $(".submit__button");
            if (response.status) {
                const $thankYou = $('.form__wrapper--thankyou');
                $thankYou.fadeIn(500);
                $submitButton.attr("disabled", true);
                setTimeout(() => {
                    $submitButton.attr("disabled", false);
                    $thankYou.fadeOut(500);
                }, 5000);
                $('#contactForm-bottom')[0].reset();
                clearForm();
            }
        }).fail(function (error) {
            const $submitButton = $(".submit__button");
            const $error = $('.form__wrapper--error');
            $error.fadeIn(500);
            setTimeout(() => {
                $submitButton.attr("disabled", false);
                $error.fadeOut(500);
            }, 5000);
        });
    });

    // formulář get in touch

    $('.js-request-form-contact').on('submit', function (e) {
        e.preventDefault();

        $.post('https://www.kitelementshop.com/admin/api/contact-form/', $(this).serialize(), function (response) {
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
        }).fail(function (error) {
            const $submitButton = $(".submit__button");
            const $error = $('.form__wrapper--error');
            $error.fadeIn(500);
            setTimeout(() => {
                $submitButton.attr("disabled", false);
                $error.fadeOut(500);
            }, 5000);
        });
    });


});
