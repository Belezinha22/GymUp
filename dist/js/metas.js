const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));

        dot.classList.add('active');
    });
});

ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 1000,
    delay: 200
})

ScrollReveal().reveal('.card', {
    origin: 'left'
})

ScrollReveal().reveal('.section-desc', {
    origin: 'right'
})

tippy('#iniciantes', {
    content: 'Iniciantes',
    animation: 'fade',
    distance: 15,
    placement: 'left',
    arrow: true,
    followCursor: true
})

tippy('#hipertrofia', {
    content: 'Hipertrofia',
    animation: 'fade',
    distance: 15,
    placement: 'left',
    arrow: true,
    followCursor: true
})

tippy('#E_D', {
    content: 'Emagrecimento e Definição',
    animation: 'fade',
    distance: 15,
    placement: 'left',
    arrow: true,
    followCursor: true
})

tippy('#P_C', {
    content: 'Performance e Condicionamento',
    animation: 'fade',
    distance: 15,
    placement: 'left',
    arrow: true,
    followCursor: true
})

tippy('#B_S', {
    content: 'Bem estar e Saúde',
    animation: 'fade',
    distance: 15,
    placement: 'left',
    arrow: true,
    followCursor: true
})

const chooseBtn = document.querySelectorAll('.BTN')

let choosedBtn = null


chooseBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        choosedBtn = btn.dataset.meta
    })
})

