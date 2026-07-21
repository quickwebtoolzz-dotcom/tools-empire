// Tool Logic
function cleanText() {
    const input = document.getElementById('inputText').value;
    if (!input) return;

    // The AI Math: Splits by double-enters (real paragraphs), 
    // removes single-enters (broken PDF lines), and puts it back together.
    const paragraphs = input.split(/\n\s*\n/);
    const cleanedParagraphs = paragraphs.map(p => p.replace(/\n/g, ' '));
    const finalText = cleanedParagraphs.join('\n\n');

    document.getElementById('outputText').value = finalText;
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

// Minigame Logic (Catch the Dot)
let score = 0;
function catchDot() {
    score++;
    document.getElementById('score-text').innerText = `Score: ${score}`;
    
    const dot = document.getElementById('dot');
    const gameArea = document.getElementById('game-area');
    
    // Calculate random positions inside the box
    const maxX = gameArea.clientWidth - dot.clientWidth;
    const maxY = gameArea.clientHeight - dot.clientHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    dot.style.left = randomX + 'px';
    dot.style.top = randomY + 'px';
    
    // Change color randomly
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502'];
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
}
