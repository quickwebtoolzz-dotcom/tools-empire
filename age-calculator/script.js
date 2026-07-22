let timerInterval;

function startMatrix() {
    const dateVal = document.getElementById('dob-date').value;
    const timeVal = document.getElementById('dob-time').value;
    
    if (!dateVal) {
        alert("System Error: Please enter your birth date.");
        return;
    }

    // Combine date and time into one object
    const dob = new Date(`${dateVal}T${timeVal}`);
    
    // Show the result grid
    document.getElementById('result-area').style.display = 'flex';
    
    // If they click the button twice, clear the old timer
    if(timerInterval) clearInterval(timerInterval);
    
    // Run it immediately once, then set it to loop every 1000 milliseconds (1 second)
    updateTime(dob);
    timerInterval = setInterval(() => updateTime(dob), 1000);
}

function updateTime(dob) {
    const now = new Date();
    let diff = now - dob; // Difference in milliseconds

    if (diff < 0) {
        document.getElementById('result-area').innerHTML = "<p style='color:red;'>Error: You haven't been born yet!</p>";
        clearInterval(timerInterval);
        return;
    }

    // A clever JavaScript trick to extract exact years, months, days from milliseconds
    const ageDate = new Date(diff); 
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    const hours = ageDate.getUTCHours();
    const minutes = ageDate.getUTCMinutes();
    const seconds = ageDate.getUTCSeconds();

    // Push the numbers to the HTML screen
    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}
