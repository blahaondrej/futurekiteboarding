$(document).ready(function () {

    function clearForm() {
        $('.js-input').val("");
    }

    // formulář footer

    $('.js-request-form-bottom').on('submit', function (e) {
        e.preventDefault();

        $.post('./newsletter.php', $(this).serialize(), function (response) {
            if (response == 1) {
                $('.form__wrapper--thankyou').show();
                $(".submit__button").attr("disabled", true);
                $('#contactForm-bottom')[0].reset();
                clearForm();

            } else {
                $('.form__wrapper--error').show();
            }

        });
    });

    // formulář get in touch

    $('.js-request-form-contact').on('submit', function (e) {
        e.preventDefault();

        $.post('./contact.php', $(this).serialize(), function (response) {
            if (response == 1) {
                $('.form__wrapper--thankyou').show();
                $(".submit__button").attr("disabled", true);
                $('#contactForm-bottom')[0].reset();
                clearForm();

            } else {
                $('.form__wrapper--error').show();
            }

        });
    });


});
