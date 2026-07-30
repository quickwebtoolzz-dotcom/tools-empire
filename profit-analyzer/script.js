// MODULE 1: Profit Margin
function calcMargin() {
    const cost = parseFloat(document.getElementById('cost').value);
    const price = parseFloat(document.getElementById('price').value);
    const currency = document.getElementById('currency').value; // Get selected currency

    if (isNaN(cost) || isNaN(price) || price === 0) {
        alert("Please enter valid numbers.");
        return;
    }

    const grossProfit = price - cost;
    const marginPercent = (grossProfit / price) * 100;

    // Add the currency symbol dynamically!
    document.getElementById('gross-profit').innerText = `${currency}${grossProfit.toFixed(2)}`;
    document.getElementById('margin-percent').innerText = `${marginPercent.toFixed(2)}%`;
    
    document.getElementById('profit-per-sale').value = grossProfit.toFixed(2);
}

// MODULE 2: Marketing ROI
function calcROI() {
    const spend = parseFloat(document.getElementById('ad-spend').value);
    const rev = parseFloat(document.getElementById('ad-rev').value);

    if (isNaN(spend) || isNaN(rev) || spend === 0) {
        alert("Please enter valid numbers. Ad spend cannot be zero.");
        return;
    }

    const netProfit = rev - spend;
    const roi = (netProfit / spend) * 100;

    const roiElement = document.getElementById('roi-percent');
    roiElement.innerText = `${roi.toFixed(2)}%`;
    
    if (roi < 0) {
        roiElement.style.color = "#ff4d4d"; // Red for loss
    } else {
        roiElement.style.color = "#00d084"; // Green for profit
    }
}

// MODULE 3: Break-Even Point
function calcBreakEven() {
    const fixed = parseFloat(document.getElementById('fixed-costs').value);
    const profitPerSale = parseFloat(document.getElementById('profit-per-sale').value);

    if (isNaN(fixed) || isNaN(profitPerSale) || profitPerSale <= 0) {
        alert("Please enter valid numbers. Profit per sale must be greater than zero.");
        return;
    }

    const unitsNeeded = Math.ceil(fixed / profitPerSale);
    document.getElementById('breakeven-units').innerText = unitsNeeded.toLocaleString();
}
