// Add an event listener to the "Add Timer" button that triggers when the button is clicked
document.getElementById('addTimerBtn').addEventListener('click', function() {
    // Get the target date and time from the input field and convert it to a timestamp
    const targetDate = new Date(document.getElementById('datetime').value).getTime();

    // If the target date is not a valid number (invalid date), show an alert and stop the function
    if (isNaN(targetDate)) {
        alert("Please select a valid date and time.");
        return;
    }

    // Generate a unique ID for the timer using the current timestamp
    const timerId = 'timer-' + Date.now();
    
    // Create the HTML elements for the timer and add them to the page
    createTimerElement(timerId);
    
    // Start the countdown for the timer using the target date
    startCountdown(timerId, targetDate);
});

// Function to create the HTML structure for a new timer
function createTimerElement(timerId) {
    // Create a new div element to contain the timer
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-display'; // Assign a class for styling
    timerContainer.id = timerId; // Assign the unique ID to the timer container

    // Set the inner HTML of the timer container, including the countdown placeholders
    timerContainer.innerHTML = `
        <p>Time Remaining:</p>
        <div class="countdown">
            <span id="${timerId}-days">00</span> Days 
            <span id="${timerId}-hours">00</span> Hours 
            <span id="${timerId}-minutes">00</span> Minutes 
            <span id="${timerId}-seconds">00</span> Seconds
        </div>
    `;

    // Append the new timer container to the existing timers container on the page
    document.getElementById('timersContainer').appendChild(timerContainer);
}

// Function to start the countdown for a specific timer
function startCountdown(timerId, targetDate) {
    // Set an interval to update the countdown every second (1000 milliseconds)
    const countdownInterval = setInterval(function() {
        // Get the current date and time in milliseconds
        const now = new Date().getTime();
        
        // Calculate the time remaining by subtracting the current time from the target time
        const timeRemaining = targetDate - now;

        // If the countdown has reached zero or less, stop the interval and display "Time's Up!"
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval); // Stop the countdown
            document.getElementById(timerId).querySelector('.countdown').innerHTML = "Time's Up!";
        } else {
            // Calculate the days, hours, minutes, and seconds remaining
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Update the countdown display with the calculated values
            updateCountdown(`${timerId}-days`, days);
            updateCountdown(`${timerId}-hours`, hours);
            updateCountdown(`${timerId}-minutes`, minutes);
            updateCountdown(`${timerId}-seconds`, seconds);
        }
    }, 1000); // End of setInterval function
}

// Function to update a specific part of the countdown (days, hours, minutes, or seconds)
function updateCountdown(id, value) {
    // Get the HTML element by its ID
    const element = document.getElementById(id);
    
    // Update the text content of the element with the new value, padded to 2 digits
    element.textContent = String(value).padStart(2, '0');
    
    // Reset any existing animation to allow the flash effect to reapply
    element.style.animation = 'none'; // Remove current animation
    element.offsetHeight; // Trigger a reflow, necessary to restart the animation
    element.style.animation = ''; // Reapply the flash animation
}
