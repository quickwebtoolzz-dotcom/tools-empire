// --- PASSWORD GENERATOR LOGIC ---
function updateLength() {
    document.getElementById('length-val').innerText = document.getElementById('length').value;
}

function generatePassword() {
    const length = document.getElementById('length').value;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = lower;
    if (hasUpper) chars += upper;
    if (hasNumbers) chars += numbers;
    if (hasSymbols) chars += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('result').innerText = password;
    document.getElementById('result').style.color = "#fff";
}

// --- ARCADE MINIGAME LOGIC (CATCH THE BALL) ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let basket = { x: 150, y: 180, width: 60, height: 10 };
let balls = [];
let gameSpeed = 2;

// Move basket with mouse
canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    basket.x = mouseX - basket.width / 2;
    // Keep basket inside canvas
    if (basket.x < 0) basket.x = 0;
    if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
});

function spawnBall() {
    balls.push({
        x: Math.random() * (canvas.width - 10) + 5,
        y: 0,
        radius: 5,
        color: ['#ff0055', '#00e5ff', '#ffff00'][Math.floor(Math.random() * 3)]
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Basket
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Update and Draw Balls
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        b.y += gameSpeed;

        // Draw Ball
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();

        // Check Collision (Caught the ball!)
        if (b.y + b.radius >= basket.y && b.y - b.radius <= basket.y + basket.height &&
            b.x >= basket.x && b.x <= basket.x + basket.width) {
            score += 10;
            document.getElementById('score-board').innerText = "Score: " + score;
            balls.splice(i, 1);
            i--;
            // Speed up slightly as you play
            gameSpeed += 0.05; 
        } 
        // Missed the ball
        else if (b.y > canvas.height) {
            balls.splice(i, 1);
            i--;
            score = Math.max(0, score - 5); // Lose 5 points if you miss!
            document.getElementById('score-board').innerText = "Score: " + score;
        }
    }

    requestAnimationFrame(updateGame);
}

// Start Game Loop
setInterval(spawnBall, 1000); // Spawn a new ball every 1 second
updateGame();
