let products = [];
let settings = {};

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
        let selectedCurrency = localStorage.getItem("selectedCurrency");
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

    // Products swiper
    const handleProductsSwiper = () => {
        $('section.products .product').each((index, element) => {
            const $element = $(element);
            const productCode = $element.data('product-code');
            const colorCode = $element.find('.product__colors .active').data('color');
            const firstSizeCode = $element.find('.product__size span').data('size');
            const finalCode = `${productCode}_${colorCode}_${firstSizeCode}`;
            console.log('---');
            console.log('finalCode', finalCode);
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

