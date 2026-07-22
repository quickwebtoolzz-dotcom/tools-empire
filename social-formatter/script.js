// --- 1. CORE TOOL LOGIC ---
function formatAndCopy() {
    const input = document.getElementById('input-text').value;
    
    if (!input) {
        alert("Please write some text first!");
        return;
    }

    // This replaces empty lines with a Zero-Width Space (&#8203;) 
    // which forces Instagram to keep the line break!
    const formattedText = input.replace(/(?:\r\n|\r|\n)/g, '\u200B\n');

    // Copy to clipboard
    navigator.clipboard.writeText(formattedText).then(() => {
        const msg = document.getElementById('success-msg');
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 3000);
        
        // TRIGGER THE NEWTON DROP ANIMATION!
        triggerEmojiDrop();
    });
}

// --- 2. THE MOUSE FOLLOWER ANIMATION ---
const follower = document.createElement('div');
follower.id = 'follower';
follower.innerText = '🐟'; // The little fish
document.body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
    follower.style.left = (e.clientX + 15) + 'px';
    follower.style.top = (e.clientY + 15) + 'px';
});

// For mobile users (follows the finger tap)
document.addEventListener('touchmove', (e) => {
    follower.style.left = (e.touches[0].clientX + 15) + 'px';
    follower.style.top = (e.touches[0].clientY + 15) + 'px';
});

// --- 3. THE "NEWTON" FALLING EMOJI ANIMATION ---
function triggerEmojiDrop() {
    const emojis = ['✨', '🚀', '💬', '💙', '🔥'];
    
    for (let i = 0; i < 30; i++) {
        let el = document.createElement('div');
        el.className = 'falling-emoji';
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random starting positions at the top of the screen
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-50px';
        
        // Random sizes
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        // Animation settings (falls down over 2 to 4 seconds)
        const fallDuration = Math.random() * 2 + 2; 
        el.style.transition = `top ${fallDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${fallDuration}s linear`;
        
        document.body.appendChild(el);
        
        // Start falling slightly after creation
        setTimeout(() => {
            el.style.top = '120vh'; // Fall past the bottom of the screen
            el.style.transform = `rotate(${Math.random() * 720}deg)`; // Spin while falling
        }, 50);
        
        // Delete the emoji after it falls so it doesn't crash the browser
        setTimeout(() => {
            el.remove();
        }, fallDuration * 1000);
    }
}
