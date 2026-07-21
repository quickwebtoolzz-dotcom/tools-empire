// Tool Logic
function generateLink() {
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!phone) {
        alert("Please enter a phone number!");
        return;
    }

    // Clean the phone number (remove + or spaces)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    // Create WhatsApp Link
    let finalUrl = `https://wa.me/${cleanPhone}`;
    if (message) {
        finalUrl += `?text=${encodeURIComponent(message)}`;
    }

    // Show Link
    document.getElementById('final-link').value = finalUrl;
    
    // Generate QR Code using a free API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(finalUrl)}`;
    document.getElementById('qr-code').src = qrUrl;

    // Reveal the result area
    document.getElementById('result-area').style.display = 'block';
}

// Minigame Logic (Dwell Time Booster)
let score = 0;
function popBubble() {
    score++;
    const btn = document.getElementById('pop-btn');
    btn.innerText = `Score: ${score}`;
    
    // Randomize colors to make it addictive
    const colors = ['#ff0a78', '#00e5ff', '#ffb400', '#00ff7f', '#b388ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    btn.style.backgroundColor = randomColor;
    btn.style.boxShadow = `0 0 20px ${randomColor}`;
    
    // Make it shrink and grow
    btn.style.transform = 'scale(0.8)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
}
