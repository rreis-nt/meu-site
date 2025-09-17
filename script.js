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
document.addEventListener('DOMContentLoaded', typeEffect);

/* Dark/Light mode toggle */
const body = document.body;
const toggleButton = document.createElement('button');
toggleButton.style.position = 'fixed';
toggleButton.style.top = '10px';
toggleButton.style.right = '10px';
toggleButton.style.padding = '10px';
toggleButton.style.backgroundColor = '#b22222';
toggleButton.style.color = '#fff';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '5px';
toggleButton.style.cursor = 'pointer';

// Use FontAwesome icons for moon and sun
toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    // Toggle icon between moon and sun
    if (body.classList.contains('light-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }
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

/* Simple Music Player */
const tracks = [
    { title: 'Pink Matter - Frank Ocean', src: 'assets/songs/pink-matter.mp3' }
];

let currentTrackIndex = 0;
const audio = new Audio();
const trackTitle = document.getElementById('track-title');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');

function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
}

loadTrack(currentTrackIndex);

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = '⏸';
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = '⏸';
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

/* Retractable Music Player */
const togglePlayerBtn = document.getElementById('toggle-player');
const musicPlayer = document.getElementById('music-player');
const showPlayerBtn = document.getElementById('show-player');

togglePlayerBtn.addEventListener('click', () => {
    musicPlayer.classList.toggle('hidden');
    togglePlayerBtn.textContent = musicPlayer.classList.contains('hidden') ? '▲' : '▼';
    showPlayerBtn.style.display = musicPlayer.classList.contains('hidden') ? 'block' : 'none';
});

showPlayerBtn.addEventListener('click', () => {
    musicPlayer.classList.remove('hidden');
    togglePlayerBtn.textContent = '▼';
    showPlayerBtn.style.display = 'none';
});

console.log('Welcome to Ryan\'s Cyber Space!');
