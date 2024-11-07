document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.name').classList.add('show');
});

const rainContainer = document.querySelector('.rain');
const symbols = "!@#$%^&*()<>?";
let accumulatedDrops = 0; // Counter to limit accumulation at the bottom

function createRaindrop() {
    // Create raindrop element
    const drop = document.createElement('div');
    drop.classList.add('drop');
    
    // Set random symbol, position, and size
    drop.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    drop.style.left = Math.random() * 100 + '%';
    drop.style.fontSize = (0.8 + Math.random() * 1.2) + 'em';

    // Adjust speed by decreasing the animation duration (faster fall)
    const minDuration = 0.5;  // Minimum duration in seconds
    const maxDuration = 1;    // Maximum duration in seconds
    drop.style.animationDuration = (minDuration + Math.random() * (maxDuration - minDuration)) + 's';

    // Append drop to rain container
    rainContainer.appendChild(drop);

    // Decide if this drop will accumulate at the bottom
    const shouldAccumulate = accumulatedDrops < 200; // Increased density limit
    const animationDuration = parseFloat(drop.style.animationDuration) * 1000; // Convert to milliseconds

    // Use setTimeout to simulate animation end
    setTimeout(() => {
        if (shouldAccumulate) {
            drop.classList.remove('drop');
            drop.classList.add('settled');
            accumulatedDrops++;
            console.log(accumulatedDrops);
        } else {
            drop.remove();
        }
    }, animationDuration); // Trigger after animation duration
}

// Generate multiple raindrops at a faster interval (higher density)
setInterval(createRaindrop, 50);  // Increased frequency of raindrops
setInterval(createRaindrop, 30); 
setInterval(createRaindrop, 150); 