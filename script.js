/* Visitor counter using localStorage */
let visitorCount = localStorage.getItem('visitorCount');
if (visitorCount === null) {
    visitorCount = 1;
} else {
    visitorCount = parseInt(visitorCount) + 1;
}
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitor-count').textContent = visitorCount;

/* Smooth scroll polyfill for older browsers (optional) */
// No additional code needed as CSS scroll-behavior is used

/* Typing effect for header subtitle */
const subtitle = document.querySelector('.hidden-text');
const text = subtitle.textContent;
subtitle.textContent = '';
let index = 0;

function typeEffect() {
    if (index < text.length) {
        subtitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    window.scrollTo(0, 0); // Ensure page starts at top
});



/* Scroll-triggered animations */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

audio.volume = 0.5; // Set low background volume

const modal = document.getElementById('welcome-modal');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    audio.play().catch(() => {});
});

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audio.muted = !audio.muted;
        musicBtn.innerHTML = audio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    }
});

console.log('Welcome to Ryan\'s Cyber Space!');

// Remove hash from URL on page load to reset scroll position to top
window.addEventListener('load', () => {
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    modal.style.display = 'block';
    positionSpeechBalloons();
});

window.addEventListener('resize', () => {
    positionSpeechBalloons();
});

function positionSpeechBalloons() {
    const photo = document.querySelector('.profile-pic');
    const balloons = document.querySelectorAll('.speech-balloon');

    if (!photo || balloons.length === 0) return;

    const photoRect = photo.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    balloons.forEach(balloon => {
        const balloonRect = balloon.getBoundingClientRect();
        const balloonWidth = balloonRect.width;

        if (balloon.classList.contains('left')) {
            // Position balloon so its tip overlaps the right edge of the photo slightly
            let leftPos = photoRect.left - balloonWidth + 20; // 20px overlap
            if (leftPos < 0) leftPos = 0; // prevent going off screen
            balloon.style.left = `${leftPos}px`;
        } else if (balloon.classList.contains('right')) {
            // Position balloon so its tip overlaps the left edge of the photo slightly
            let leftPos = photoRect.right - 20; // 20px overlap
            if (leftPos + balloonWidth > windowWidth) {
                leftPos = windowWidth - balloonWidth;
            }
            balloon.style.left = `${leftPos}px`;
        }
    });
}

// Smooth scroll function with easing
function smoothScrollTo(target, duration = 800) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, start + distance * ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Add click event listeners to nav links for smooth scroll
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement, 1500); // Increased duration for more noticeable scroll
            }
        });
    });
});

// Play music on scroll if paused
// Removed redundant scroll event listener as 'iniciarMusica' handles both click and scroll events
