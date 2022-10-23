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


window.onload = () => {
    const cartComponent = document.getElementsByTagName('app-kshop-cart')[0];

    // CURRENCY
    const handleCurrency = () => {
        selectedCurrency = localStorage.getItem("selectedCurrency");
        if (!selectedCurrency) {
            $(".currency").addClass("active");
        } else {
            cartComponent.setCurrency(selectedCurrency);
            showCurrencyDialog();
        }
        $('.currency__button').on('click', function () {
            hideCurrencyDialog();
            selectedCurrency = $(this).data("currency");
            cartComponent.setCurrency(selectedCurrency);
            localStorage.setItem("selectedCurrency", selectedCurrency);
        })
    };

    const showCurrencyDialog = () => {
        $(".currency").removeClass("active");
        $("body")
            .removeClass("no-scroll")
            .addClass("loaded");
    };

    const hideCurrencyDialog = () => {
        $(".currency")
            .removeClass("active")
            .addClass("hidden");
        $("body")
            .removeClass("no-scroll")
            .addClass("loaded");
    };
    //

    const setProductInSwiperFromElement = (element) => {
        const $element = $(element);
        const finalCode = getProductCodeFromElement($element);
        const product = products.find(p => p.code === finalCode);
        const currencySymbol = selectedCurrency === 'usd' ? '$' : '€';
        if (!product) {
            console.error(`Product with code ${finalCode} not found!`);
            return;
        }
        $element.find('.product__price--inside-eu .current-price').html(`${product[selectedCurrency].price} ${currencySymbol}`);
        $element.find('.product__price--outside-eu .current-price').html(`${product[selectedCurrency].priceNoTax} ${currencySymbol}`);
        if (product[selectedCurrency]['priceStrike']) {
            $element.find('.product__price--inside-eu .old-price').html(`${product[selectedCurrency]['priceStrike']} ${currencySymbol}`);
            $element.find('.product__price--outside-eu .old-price').html(`${product[selectedCurrency]['priceStrike']} ${currencySymbol}`);
        }
        setProductBadges($element, product);
    };

    const getProductCodeFromElement = ($element) => {
        const productCode = $element.data('product-code');
        const colorCode = $element.find('.product__colors .active').data('color');
        const firstSizeCode = $element.find('.product__size span').data('size');
        return `${productCode}_${colorCode}_${firstSizeCode}`;
    };

    const setProductBadges = ($element, product) => {
        let badgesHtml = '';
        for (const tag of product.tags) {
            badgesHtml += `<div class="product__badge" style="background-color: ${tag.color};">${tag.label}</div>`;
        }
        $element.find('.product__badges').html(badgesHtml);
    };

    // Products swiper
    const handleProductsSwiper = () => {
        $('section.products .product').each((index, element) => {
            setProductInSwiperFromElement(element);
        });

        // zmena obrazku podle tlacitka barvy
        $('.product__colors div').on('mouseover', function () {
            $('.product__colors div.active').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.product__content').find('.product__image img').removeClass('active');
            $(this).parents('.product__content').find(`.product__image img[data-color=${$(this).data('color')}]`).addClass('active');
            setProductInSwiperFromElement($(this).parents('.product'));
        });
    };

    fetchEshopSettings().then(() => {

        console.log(products);
        console.log(settings);

        cartComponent.setConfig({
            email: 'info@futurekiteboarding.com',
            whatsapp: 'https://wa.me/420775526626',
            logo: 'future.svg',
            shop: 'FUTURE Kiteboarding',
            style: 'future',
            stepBarDelimiter: '–',
            products,
            settings
        });

        handleCurrency();
        handleProductsSwiper();
    });


    const toggleCartButton = document.getElementById('toggle-cart');
    console.log(toggleCartButton);
    toggleCartButton.onclick = () => {
        cartComponent.toggleIsOpened();
    }

    cartComponent.addEventListener('toggleEvent', ({detail}) => {
        console.log('toggleEvent', detail);
        if (detail.isOpened) {
            toggleCartButton.classList.add('active');
        } else {
            toggleCartButton.classList.remove('active');
        }
    });

    cartComponent.addEventListener('productCountEvent', ({detail}) => {
        console.log('productCountEvent', detail);
        const productsCountElements = document.getElementsByClassName('products-count');
        for (const element of productsCountElements) {
            element.innerText = detail.count;
        }
    });

    cartComponent.addEventListener('productAddEvent', ({detail}) => {
        console.log('productAddEvent', detail);
    });
}

