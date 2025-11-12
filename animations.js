document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Staggered fade-in for hero section
    const fadeInText1 = document.querySelector('.fade-in-text-1');
    const fadeInText2 = document.querySelector('.fade-in-text-2');
    const fadeInText3 = document.querySelector('.fade-in-text-3');

    if (fadeInText1) {
        setTimeout(() => {
            fadeInText1.classList.add('is-visible');
        }, 100);
    }
    if (fadeInText2) {
        setTimeout(() => {
            fadeInText2.classList.add('is-visible');
        }, 600); // Delay for the second text
    }
    if (fadeInText3) {
        setTimeout(() => {
            fadeInText3.classList.add('is-visible');
        }, 1100); // Delay for the third text
    }

    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
