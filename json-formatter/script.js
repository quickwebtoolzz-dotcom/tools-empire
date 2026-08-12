function formatJSON() {
    const inputArea = document.getElementById('input-json');
    const outputArea = document.getElementById('output-json');
    const statusMsg = document.getElementById('status-msg');
    
    const rawData = inputArea.value.trim();

    if (!rawData) {
        statusMsg.innerText = "Please paste some JSON first.";
        statusMsg.style.color = "#8b949e";
        return;
    }

    try {
        // This is the brain: It tries to parse the text into a real JSON object
        const parsedData = JSON.parse(rawData);
        
        // If successful, it stringifies it with 4 spaces of indentation (pretty print)
        const formattedData = JSON.stringify(parsedData, null, 4);
        
        outputArea.value = formattedData;
        
        statusMsg.innerText = "✅ Valid JSON! Formatted successfully.";
        statusMsg.style.color = "#7ee787"; // Success Green
        statusMsg.style.borderColor = "#238636";
        
    } catch (error) {
        // If the JSON is broken (missing a comma, bracket, etc.), it catches the error!
        outputArea.value = "";
        statusMsg.innerText = "❌ Invalid JSON: " + error.message;
        statusMsg.style.color = "#ff7b72"; // Error Red
        statusMsg.style.borderColor = "#da3633";
    }
}

function clearFields() {
    document.getElementById('input-json').value = "";
    document.getElementById('output-json').value = "";
    const statusMsg = document.getElementById('status-msg');
    statusMsg.innerText = "Ready.";
    statusMsg.style.color = "#c9d1d9";
    statusMsg.style.borderColor = "#30363d";
}

function copyJSON() {
    const outputText = document.getElementById('output-json').value;
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText).then(() => {
        const statusMsg = document.getElementById('status-msg');
        statusMsg.innerText = "📋 Copied to clipboard!";
        statusMsg.style.color = "#58a6ff";
        statusMsg.style.borderColor = "#1f6feb";
    });
}
