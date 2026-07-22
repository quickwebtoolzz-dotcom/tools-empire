// --- WORD COUNTER LOGIC ---
function analyzeText() {
    const text = document.getElementById('text-input').value;
    
    // Character Count
    document.getElementById('char-count').innerText = text.length;
    
    // Word Count (Filters out empty spaces)
    const words = text.trim().split(/\s+/);
    const wordCount = text.trim() === '' ? 0 : words.length;
    document.getElementById('word-count').innerText = wordCount;
    
    // Reading Time (Average 200 words per minute)
    const readTimeMinutes = Math.ceil(wordCount / 200);
    document.getElementById('read-time').innerText = readTimeMinutes + (readTimeMinutes === 1 ? ' min' : ' mins');
}

// --- TYPING MINIGAME LOGIC ---
const wordsList = ["billionaire", "empire", "software", "developer", "algorithm", "startup", "investor", "javascript"];
let currentWord = "ready";
let startTime = 0;
let isTyping = false;

function checkTyping() {
    const input = document.getElementById('type-input').value.toLowerCase();
    
    // Start timer on first letter
    if (!isTyping && input.length === 1) {
        isTyping = true;
        startTime = Date.now();
    }
    
    // Check if word is complete and correct
    if (input === currentWord) {
        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
        document.getElementById('typing-result').innerText = `Time: ${timeTaken}s! Great job!`;
        document.getElementById('typing-result').style.color = "#64ffda";
        
        // Reset for next word
        document.getElementById('type-input').value = "";
        isTyping = false;
        
        // Pick new word
        currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
        document.getElementById('target-word').innerText = currentWord;
    }
}

// Initialize first word
window.onload = () => {
    currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    document.getElementById('target-word').innerText = currentWord;
}
