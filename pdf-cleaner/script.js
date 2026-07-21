// --- PDF CLEANER LOGIC ---
function cleanText() {
    const input = document.getElementById('inputText').value;
    if (!input) return;
    const paragraphs = input.split(/\n\s*\n/);
    const cleanedParagraphs = paragraphs.map(p => p.replace(/\n/g, ' '));
    document.getElementById('outputText').value = cleanedParagraphs.join('\n\n');
    document.getElementById('copyBtn').style.display = 'inline-block';
}

function copyText() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    const btn = document.getElementById('copyBtn');
    btn.innerText = "Copied! ✅";
    setTimeout(() => { btn.innerText = "Copy to Clipboard 📋"; }, 2000);
}

// --- YOUR PRECISION MINIGAME LOGIC ---
let movingBox = document.getElementById('moving-box');
let pos = 0;
let direction = 1;
let speed = 5; // Speed of the block
let gameInterval;
let isPlaying = false;

function startGame() {
    gameInterval = setInterval(() => {
        pos += speed * direction;
        if (pos >= 260 || pos <= 0) direction *= -1; // Bounce off walls
        movingBox.style.left = pos + 'px';
    }, 20);
    isPlaying = true;
}

// Start game automatically on load
window.onload = startGame;

function toggleGame() {
    const btn = document.getElementById('pause-btn');
    if (isPlaying) {
        clearInterval(gameInterval); // Pause the block
        isPlaying = false;
        btn.innerText = "PLAY AGAIN";
        btn.style.backgroundColor = "#28a745"; // Turn button green
        calculateAccuracy();
    } else {
        startGame(); // Resume the block
        btn.innerText = "PAUSE";
        btn.style.backgroundColor = "#ff4757"; // Turn button red
        document.getElementById('accuracy-text').innerText = "Accuracy: 0%";
        document.getElementById('accuracy-text').style.color = "#333";
    }
}

function calculateAccuracy() {
    // Center of the target is at 150px. Center of moving box is pos + 20px.
    let movingCenter = pos + 20;
    let distance = Math.abs(150 - movingCenter);
    
    // Max possible distance is 130px. Calculate percentage.
    let accuracy = Math.max(0, 100 - (distance / 130 * 100));
    accuracy = accuracy.toFixed(1); // Keep 1 decimal place
    
    let text = document.getElementById('accuracy-text');
    text.innerText = `Accuracy: ${accuracy}%`;
    
    // Color Magic: 0% is Red (Hue 0), 100% is Green (Hue 120)
    let hue = (accuracy / 100) * 120;
    text.style.color = `hsl(${hue}, 100%, 45%)`;
}
