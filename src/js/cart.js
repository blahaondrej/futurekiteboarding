let products = [];
let settings = {};
let selectedCurrency;

function fetchEshopSettings() {
    return fetch('https://www.kitelementshop.com/admin/api/products/', {
        headers: {
            'able-origin': 'https://futurekiteboarding.com'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            products = Object.values(data['products']);
            settings = data['settings'];
        })
        .catch(error => console.error(error));
}


$(document).ready(function () {
    /**
     * Angular web component for shopping cart
     */
    const cartComponent = document.getElementsByTagName('app-kshop-cart')[0];

    /**
     *  Products shared
     */
    const getProductCodeFromElement = ($element, firstSize = false) => {
        const productCode = $element.data('product-code');
        const colorCode = $element.find('.product__colors .active').data('color');
        let sizeCode;
        if (firstSize) {
            sizeCode = $element.find('.product__size > span').data('size');
        } else {
            sizeCode = $element.find('.product__size > div.active').data('size');
        }
        return `${productCode}_${colorCode}_${sizeCode}`;
    };

    const getProduct = (finalCode) => {
        return products.find(p => p.code === finalCode);
    };

    /**
     *  Products swiper
     */

    const handleProductsSwiper = () => {
        $('section.products .product').each((index, element) => {
            setProductInSwiperFromElement($(element));
        });
    };

    // zmena obrazku podle tlacitka barvy
    $('body').on('mouseover', '.products .product__colors div', function () {
        $('.product__colors div.active').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.product__content').find('.product__image img').removeClass('active');
        $(this).parents('.product__content').find(`.product__image img[data-color=${$(this).data('color')}]`).addClass('active');
        setProductInSwiperFromElement($(this).parents('.product'));
    });

    const setProductInSwiperFromElement = ($element) => {
        const finalCode = getProductCodeFromElement($element, true);
        const product = getProduct(finalCode);
        const currencyString = selectedCurrency || 'eur';
        const currencySymbol = currencyString === 'usd' ? '$' : '€';
        if (!product) {
            console.error(`Product swiper! Product with code ${finalCode} not found!`);
            return;
        }
        $element.find('.product__price--inside-eu .current-price').html(`${product[currencyString].price} ${currencySymbol}`);
        $element.find('.product__price--outside-eu .current-price').html(`${product[currencyString].priceNoTax} ${currencySymbol}`);
        if (product[currencyString]['priceStrike']) {
            $element.find('.product__price--inside-eu .old-price').html(`${product[currencyString]['priceStrike']} ${currencySymbol}`);
        } else {
            $element.find('.product__price--inside-eu .old-price').html(``);
        }

        if (product[currencyString]['priceNoTaxStrike']) {
            $element.find('.product__price--outside-eu .old-price').html(`${product[currencyString]['priceNoTaxStrike']} ${currencySymbol}`);
        } else {
            $element.find('.product__price--outside-eu .old-price').html(``);
        }
        setProductBadges($element, product);
    };


    const setProductBadges = ($element, {tags, iksTag}) => {
        let badgesHtml = '';
        if (iksTag) {
            badgesHtml += `<div class="product__badge" style="background-color: #00c3ff;"><span>TESTED BY</span> <img class="iksurfmag" src="./images/iksurfmag.png" alt="iksurfmag"></div>`;
        }
        for (const tag of tags) {
            badgesHtml += `<div class="product__badge" style="background-color: ${tag.color};">${tag.label}</div>`;
        }
        $element.find('.product__badges').html(badgesHtml);
    };

    /**
     *  Products detail
     */
    // Detail - select size
    $("body").on('click', '.product-detail .product-description__sizes div', function () {
        $(".product-description__sizes div").removeClass("active");
        $(this).addClass("active");
        setProductInDetailFromElement($(this).parents('.product-detail'), false);
    });

    // zmena obrazku podle tlacitka barvy - detail produktu
    $('body').on('click', '.product-description__colors div', function () {
        $('.product-description__colors div').removeClass('active');
        $(this).addClass('active');
        $('.product-gallery').removeClass('active');
        $(`.product-gallery[data-color=${$(this).data('color')}]`).addClass('active');
        setProductInDetailFromElement($(this).parents('.product-detail'), false);
    });

    $('.product-description__button--addToCart').on('click', function () {
        cartComponent.addProductToCart(getProductCodeFromElement($(this).parents('.product-detail')));
        cartComponent.toggleIsOpened(true);
    })

    $(".product-description__button--notify").on('click', function () {
        $("body").removeClass("no-scroll").addClass("loaded");
        $(".notifyme").addClass("active").removeClass("hidden").find('#product').val(getProductCodeFromElement($(this).parents('.product-detail')));
    });

    $("#notifyForm").on('submit', function (e) {
        const $element = $(this);
        e.preventDefault();
        console.log($(this).serialize());
        $.post('https://www.kitelementshop.com/admin/api/notify-me/', $(this).serialize(), function (response) {
            if (response.status) {
                const $thankYou = $element.find('.thankyou');
                $thankYou.fadeIn(500);
                setTimeout(() => {
                    $thankYou.fadeOut(500);
                    $(".notifyme").removeClass("active");
                    $("body").addClass("loaded");
                }, 2000);
            }
        }).fail(function (error) {
            const $error = $element.find('.error');
            $error.html(error['responseJSON'].message);
            $error.fadeIn(500);
            setTimeout(() => {
                $error.fadeOut(500);
            }, 5000);
        });
    });

    const availabilityList = {
        onStock: 'instock',
        outOfStock: 'outstock',
        soon: 'soon',
        preOrder: 'preorder',
    };

    const availabilityListLabel = {
        onStock: 'IN STOCK',
        outOfStock: 'OUT OF STOCK',
        soon: 'SOON',
        preOrder: 'PRE-ORDER',
    };

    const getProductDescriptionNoteClassSuffix = (availability) => {
        return availabilityList[availability];
    };

    const getProductDescriptionNoteLabel = (availability) => {
        return availabilityListLabel[availability];
    };

    const setProductDetailButtons = ($element, {availability}) => {
        $element.find('.product-description__button--addToCart').hide();
        $element.find('.product-description__button--notify').hide();
        switch (availability) {
            case 'onStock':
            case 'preOrder':
                $element.find('.product-description__button--addToCart').show();
                break;
            case 'soon':
                $element.find('.product-description__button--notify').show();
                break;
            case 'outOfStock':
                break;
            default:
                break;
        }
    };

    const setProductInDetailFromElement = ($element, findFirstInStock) => {
        console.log('findFirstInStock', findFirstInStock);
        selectSizeAndColorFromQueryParams($element);
        const finalCode = getProductCodeFromElement($element);
        const product = getProduct(finalCode);
        if (findFirstInStock && product['availability'] !== 'onStock') {
            const previousElement = $element.find('.product__size > div.active').prev();
            if (previousElement.length) {
                $('.product__size > div.active').removeClass('active');
                previousElement.addClass('active');
                $('.product-detail').each((index, element) => {
                    setProductInDetailFromElement($(element), true);
                });
                return;
            }
        }

        const currencyString = selectedCurrency || 'eur';
        const currencySymbol = currencyString === 'usd' ? '$' : '€';
        if (!product) {
            console.error(`Product Detail! Product with code ${finalCode} not found!`);
            return;
        }

        $element.find('.product-description__prices--eu .product-new-price').html(`${product[currencyString].price} ${currencySymbol}`);
        $element.find('.product-description__prices--world .product-new-price').html(`${product[currencyString].priceNoTax} ${currencySymbol}`);

        if (product[currencyString]['priceStrike']) {
            $element.find('.product-description__prices--eu .product-old-price').html(`${product[currencyString]['priceStrike']} ${currencySymbol}`);
        } else {
            $element.find('.product-description__prices--eu .product-old-price').html(``);
        }

        if (product[currencyString]['priceNoTaxStrike']) {
            $element.find('.product-description__prices--world .product-old-price').html(`${product[currencyString]['priceNoTaxStrike']} ${currencySymbol}`);
        } else {
            $element.find('.product-description__prices--world .product-old-price').html(``);
        }

        if (product['actionDescription']) {
            $element.find('.sale-until').html(product['actionDescription']);
        } else {
            $element.find('.sale-until').html('');
        }

        if (product['availability']) {
            $element.find('.product-description__note').html(`
                <span class="product-description__note--${getProductDescriptionNoteClassSuffix(product['availability'])}">${getProductDescriptionNoteLabel(product['availability'])} ${product['availabilityNote'] || ''}</span>
            `);
        } else {
            $element.find('.product-description__note').html(``);
        }
        setProductBadges($element, product);
        setProductDetailButtons($element, product);
    };

    const handleProductDetail = () => {

        $('.product-detail').each((index, element) => {
            setProductInDetailFromElement($(element), true);
        });
    };


    const selectSizeAndColorFromQueryParams = ($element) => {
        const params = new URLSearchParams(window.location.search);
        const size = params.get('size');
        const color = params.get('color');
        window.history.pushState({}, document.title, window.location.pathname);
        if (color) {
            $element.find(`.product-description__colors .active`).removeClass('active');
            $element.find(`.product-description__colors *[data-color*=${CSS.escape(color)}]`).addClass('active');
            $('.product-gallery').removeClass('active');
            $(`.product-gallery[data-color=${color}]`).addClass('active');
        }
        if (size) {
            $element.find(`.product-description__sizes .active`).removeClass('active');
            $element.find(`.product-description__sizes *[data-size*=${CSS.escape(size)}]`).addClass('active');
        }
    };


    fetchEshopSettings().then(() => {
        cartComponent.setConfig({
            email: 'info@futurekiteboarding.com',
            whatsapp: 'https://wa.me/420775526626',
            logo: 'future.svg',
            shop: 'FUTURE Kiteboarding',
            style: 'future',
            stepBarDelimiter: '–',
            urls: {
                homepage: 'https://futurekiteboarding.com/',
                termsAndConditions: 'https://futurekiteboarding.com/terms-and-conditions',
                privacyPolicy: 'https://futurekiteboarding.com/privacy-policy'
            },
            products,
            settings
        });

        handleCurrency();
        handleProductsSwiper();
        handleProductDetail();
    });


    const toggleCartButton = document.getElementById('toggle-cart');
    toggleCartButton.onclick = () => {
        cartComponent.toggleIsOpened();
    }

    cartComponent.addEventListener('toggleEvent', ({detail}) => {
        if (detail.isOpened) {
            toggleCartButton.classList.add('active');
        } else {
            toggleCartButton.classList.remove('active');
        }
    });

    cartComponent.addEventListener('productCountEvent', ({detail}) => {
        const productsCountElements = document.getElementsByClassName('products-count');
        for (const element of productsCountElements) {
            element.innerText = detail.count;
        }
    });

    cartComponent.addEventListener('currencyChanged', ({detail}) => {
        selectedCurrency = detail.currency;
        localStorage.setItem('selectedCurrency', selectedCurrency);
        handleProductsSwiper();
        handleProductDetail();
    });

    /**
     *  Currency
     */

    const handleCurrency = () => {
        selectedCurrency = localStorage.getItem("selectedCurrency");
        if (!selectedCurrency) {
            cartComponent.setCurrency('eur');
            $(".currency").addClass("active");
        } else {
            cartComponent.setCurrency(selectedCurrency);
            hideCurrencyDialog();
            setTimeout(() => {
                handleNewsletterDialog();
            }, 10000);
        }
        $('.currency__button').on('click', function () {
            hideCurrencyDialog();
            selectedCurrency = $(this).data("currency");
            cartComponent.setCurrency(selectedCurrency);
            localStorage.setItem("selectedCurrency", selectedCurrency);
            handleProductsSwiper();
            setTimeout(() => {
                handleNewsletterDialog();
            }, 10000);
        });
    };


    const hideCurrencyDialog = () => {
        $(".currency")
            .removeClass("active")
            .addClass("hidden");
        $("body")
            .removeClass("no-scroll")
            .addClass("loaded");
    };


    /**
     *  Newsletter dialog
     */

    const handleNewsletterDialog = () => {
        if ($('main').hasClass('homepage')) {
            return;
        }

        const newsletterDialogShown = localStorage.getItem("newsletterDialogShown");
        if (!newsletterDialogShown) {
            $('.newsletter-popup').addClass('active');
        }

        $('.newsletter-popup__close').on('click', function () {
            hideNewsletterDialog();
        });

        $('#newsletterForm').on('submit', function (e) {
            e.preventDefault();
            const $element = $(this);
            $.ajax({
                url: 'https://www.kitelementshop.com/admin/api/newsletter/',
                type: "POST",
                headers: {
                    'able-origin': 'https://futurekiteboarding.com'
                },
                data: $(this).serialize(),
                success: function (response) {
                    if (response.status) {
                        const $thankYou = $element.find('.thankyou');
                        $thankYou.fadeIn(500);
                        setTimeout(() => {
                            $thankYou.fadeOut(500);
                            hideNewsletterDialog();
                        }, 2000);
                    }
                },
                error: function (error) {
                    const $error = $element.find('.error');
                    $error.html(error['responseJSON'].message);
                    $error.fadeIn(500);
                    setTimeout(() => {
                        $error.fadeOut(500);
                    }, 5000);
                }
            });

        });
    };


    const hideNewsletterDialog = () => {
        localStorage.setItem("newsletterDialogShown", 'true');
        $(".newsletter-popup")
            .removeClass("active")
            .addClass("hidden");
        $("body")
            .removeClass("no-scroll")
            .addClass("loaded");
    };

});

