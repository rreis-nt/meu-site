// Star Trail Effect with alternating colors
document.addEventListener('DOMContentLoaded', function() {
    const trail = [];
    const maxTrail = 20;
    const colors = ['#ff0000', '#ff0000', '#ff0000', '#ffd700', '#ffd700']; // Red, Red, Red, Gold, Gold
    let colorIndex = 0;

    document.addEventListener('mousemove', function(e) {
        const star = document.createElement('div');
        star.innerHTML = '★';
        star.style.position = 'absolute';
        star.style.left = e.pageX + 'px';
        star.style.top = e.pageY + 'px';
        star.style.color = colors[colorIndex];
        star.style.fontSize = '20px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.animation = 'fadeOut 1s forwards';

        document.body.appendChild(star);
        trail.push(star);

        colorIndex = (colorIndex + 1) % colors.length;

        if (trail.length > maxTrail) {
            const oldStar = trail.shift();
            if (oldStar.parentNode) {
                oldStar.parentNode.removeChild(oldStar);
            }
        }

        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 1000);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(style);
});
