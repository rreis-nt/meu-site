// Visitor counter using localStorage
let visitorCount = localStorage.getItem('visitorCount');
if (visitorCount === null) {
    visitorCount = 1;
} else {
    visitorCount = parseInt(visitorCount) + 1;
}
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitor-count').textContent = visitorCount;



// Music player placeholder (no songs available)
console.log('Welcome to Ryan\'s Cyber Space!');
