function generateGradient() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const angle = document.getElementById('angle').value;
    
    // Update the angle text
    document.getElementById('angle-val').innerText = angle;
    
    // Create the CSS string
    const cssString = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    
    // Update the live background of the website
    document.body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    
    // Update the text box
    document.getElementById('css-code').innerText = cssString;
}

function copyCSS() {
    const cssText = document.getElementById('css-code').innerText;
    navigator.clipboard.writeText(cssText).then(() => {
        const msg = document.getElementById('success-msg');
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 2000);
    });
}

function randomGradient() {
    // Generate random hex colors
    const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomAngle = Math.floor(Math.random() * 360);
    
    // Set the inputs to the new random values
    document.getElementById('color1').value = randomColor1;
    document.getElementById('color2').value = randomColor2;
    document.getElementById('angle').value = randomAngle;
    
    // Trigger the update
    generateGradient();
}
