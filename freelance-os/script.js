// --- TAB SWITCHING LOGIC ---
function switchTab(tabId) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active-content'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active-content');
}

// --- FEATURE 1: RATE CALCULATOR ---
function calculateRate() {
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const bizCosts = parseFloat(document.getElementById('biz-costs').value) || 0;
    const savings = parseFloat(document.getElementById('savings').value) || 0;
    const hoursPerWeek = parseFloat(document.getElementById('hours').value) || 0;

    if (hoursPerWeek === 0) {
        alert("Please enter how many hours you want to work!");
        return;
    }

    // Total monthly money needed
    const totalNeeded = expenses + bizCosts + savings;
    
    // Add 20% for taxes
    const totalWithTax = totalNeeded * 1.20;

    // Average 4.33 weeks in a month
    const hoursPerMonth = hoursPerWeek * 4.33;

    // Final Hourly Rate
    const hourlyRate = (totalWithTax / hoursPerMonth).toFixed(2);

    document.getElementById('final-rate').innerText = `$${hourlyRate} / hr`;
    document.getElementById('rate-result').style.display = 'block';
}

// --- FEATURE 2: INVOICE GENERATOR ---
function generateInvoice() {
    const myName = document.getElementById('my-name').value || "Freelancer";
    const clientName = document.getElementById('client-name').value || "Client";
    const service = document.getElementById('service').value || "Services Rendered";
    const amount = document.getElementById('amount').value || "0.00";
    const date = new Date().toLocaleDateString();

    // Create a temporary print area in the HTML
    const printDiv = document.createElement('div');
    printDiv.id = 'print-area';
    printDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 40px;">
            <h1 style="color: #0f52ba; margin-bottom: 0;">INVOICE</h1>
            <p style="color: #666; margin-top: 5px;">Date: ${date}</p>
            
            <div style="display: flex; justify-content: space-between; margin-top: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px;">
                <div>
                    <h3 style="margin: 0; color: #333;">FROM:</h3>
                    <p style="margin: 5px 0;">${myName}</p>
                </div>
                <div style="text-align: right;">
                    <h3 style="margin: 0; color: #333;">BILL TO:</h3>
                    <p style="margin: 5px 0;">${clientName}</p>
                </div>
            </div>
            
            <table style="width: 100%; margin-top: 30px; border-collapse: collapse;">
                <tr style="background: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">Total</th>
                </tr>
                <tr>
                    <td style="padding: 15px 12px; border-bottom: 1px solid #eee;">${service}</td>
                    <td style="padding: 15px 12px; text-align: right; border-bottom: 1px solid #eee; font-weight: bold;">$${parseFloat(amount).toFixed(2)}</td>
                </tr>
            </table>
            
            <div style="text-align: right; margin-top: 30px;">
                <h2 style="color: #10b981;">Total Due: $${parseFloat(amount).toFixed(2)}</h2>
            </div>
            <p style="text-align: center; margin-top: 50px; color: #888; font-size: 12px;">Thank you for your business!</p>
        </div>
    `;

    document.body.appendChild(printDiv);
    
    // Trigger the browser's native Print/Save as PDF window
    window.print();
    
    // Clean up the temporary div after printing
    setTimeout(() => {
        document.body.removeChild(printDiv);
    }, 1000);
}
