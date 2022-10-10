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

    fetchEshopSettings().then(() => {
        console.log(products);
        console.log(settings);

        cartComponent.setConfig({
            email: 'info@futurekiteboarding.com',
            whatsapp: 'https://wa.me/420775526626',
            logo: 'future.svg',
            shop: 'FUTURE Kiteboarding',
            // style: 'kitelement',
            style: 'future',
            stepBarDelimiter: '–',
            products,
            settings
        });
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
