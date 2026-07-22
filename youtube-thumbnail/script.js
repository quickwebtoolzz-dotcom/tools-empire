// --- YT THUMBNAIL LOGIC ---
function getThumbnail() {
    const url = document.getElementById('yt-url').value.trim();
    if (!url) return;

    // AI Regex to find the 11-character YouTube Video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        const videoId = match[2];
        // YouTube stores the highest quality thumbnail at this exact hidden link
        const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
        document.getElementById('thumb-preview').src = imgUrl;
        document.getElementById('download-btn').href = imgUrl;
        document.getElementById('result-area').style.display = 'block';
    } else {
        alert("Please enter a valid YouTube link!");
    }
}

// --- REACTION TIME MINIGAME LOGIC ---
let box = document.getElementById('reaction-box');
let timeText = document.getElementById('reaction-time');
let gameState = 'waiting'; // waiting, ready, testing
let startTime;
let timeoutId;

function boxClicked() {
    if (gameState === 'waiting') {
        // Start the test
        box.style.background = '#dc3545'; // Red
        box.innerText = "Wait for Green...";
        timeText.innerText = "Time: 0 ms";
        gameState = 'ready';
        
        // Random time between 2 and 5 seconds
        let randomDelay = Math.floor(Math.random() * 3000) + 2000;
        
        timeoutId = setTimeout(() => {
            box.style.background = '#28a745'; // Green
            box.innerText = "CLICK NOW!";
            startTime = Date.now();
            gameState = 'testing';
        }, randomDelay);
        
    } else if (gameState === 'ready') {
        // Clicked too early!
        clearTimeout(timeoutId);
        box.style.background = '#0056b3'; // Blue
        box.innerText = "Too early! Click to try again.";
        gameState = 'waiting';
        
    } else if (gameState === 'testing') {
        // Clicked on green!
        let reactionTime = Date.now() - startTime;
        box.style.background = '#0056b3'; // Blue
        box.innerText = "Click to Start";
        timeText.innerText = `Time: ${reactionTime} ms`;
        gameState = 'waiting';
    }
}
