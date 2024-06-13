document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;

    document.querySelector('#prev').addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
        updateCarousel();
    });

    document.querySelector('#next').addEventListener('click', function () {
        currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        inner.style.transform = `translateX(${offset}%)`;
    }
});