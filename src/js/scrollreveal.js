import ScrollReveal from "scrollreveal";

var slideUp = {
    distance: '50%',
    origin: 'bottom',
    duration: 1000,
    opacity: 0,
    delay: 100
};

var slideLeft = {
    distance: '50%',
    origin: 'left',
    duration: 1500,
    opacity: 0,
    delay: 100
};

var slideRight = {
    distance: '50%',
    origin: 'right',
    duration: 1500,
    opacity: 0,
    delay: 100
};

ScrollReveal().reveal('.reveal-up', slideUp);
ScrollReveal().reveal('.reveal-left', slideLeft);
ScrollReveal().reveal('.reveal-right', slideRight);
