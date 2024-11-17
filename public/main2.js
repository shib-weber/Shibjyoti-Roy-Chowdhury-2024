
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

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', function() {
        window.scrollTo(0, 0) ;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    window.requestAnimationFrame(() => {
        document.getElementById('input').focus();
    });
});

const predefinedAnswers = {
    'HELP': 'Available commands: \nFEEDBACK: Accepts Feedback\nCREATOR: Shows the Creator\nVERSION: Shows current version\nTIME: Shows time\nEXIT: Resets Termial',
    'CREATOR':'My creator is Shibjyoti Roy Chowdhury',
    'VERSION': 'SHIBDOS version 1.1.0',
    'TIME': new Date().toLocaleTimeString(),
    'EXIT': 'Goodbye!'
};

const feedbackQuestions = [
    "What is your name?",
    "Rate this website (0-5) -- Your feedback is important ?",
    "What did you like the most in this website?",
    "What can we improve?",
    "Any additional comments?"
];

let currentQuestionIndex = 0;
let feedbackData = {};
let inFeedbackSession = false;

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('input');
        const output = document.getElementById('output');
        const userInput = input.value.trim().toUpperCase();

        
        output.innerHTML += `$:\\> ${userInput}\n`;

        if (inFeedbackSession) {
            handleFeedbackSession(userInput, output);
        } else {
            handleOtherCommands(userInput, output);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
}

function handleFeedbackSession(userInput, output) {
    if (currentQuestionIndex < feedbackQuestions.length) {
        if(currentQuestionIndex<3 && userInput==''){
            output.innerHTML +='This field is required\n'
        }
        else if(currentQuestionIndex==1 && Number.isNaN(Number(userInput))){
            output.innerHTML +='A number is required\n'
        }
        else if(currentQuestionIndex==1 && (userInput<0 || userInput>5)){
            output.innerHTML +='A number within range of 0 to 5 is required\n'
        }
        else{
        feedbackData[`answer${currentQuestionIndex + 1}`] = userInput;
        
        currentQuestionIndex++;

        if (currentQuestionIndex < feedbackQuestions.length) {
            output.innerHTML += `${feedbackQuestions[currentQuestionIndex]}\n`;
        } else {
            sub();
            feedbackData = {};
            currentQuestionIndex = 0;
            inFeedbackSession = false;
        }
    }
}       
}

function sub(){
    const output = document.querySelector('.output');
    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    })
    .then(response => response.json())
    .then(data => {
        output.innerHTML += 'Thank you for your feedback!\nRefresh the page to see your feedback\n\n';
        output.scrollTop = output.scrollHeight;
    })
    .catch(error => {
        output.innerHTML += `Error submitting feedback: ${error.message}\n\n`;
    });
}

function handleOtherCommands(userInput, output) {
    if (userInput === 'FEEDBACK') {
        inFeedbackSession = true;
        output.innerHTML += `Entering feedback mode...\n${feedbackQuestions[currentQuestionIndex]}\n`;
    } 
    else if (userInput === 'EXIT') {
        setTimeout(() => output.innerHTML='Type "Help" \n', 1000);
    }
    else if (predefinedAnswers[userInput]) {
        output.innerHTML += `${predefinedAnswers[userInput]}\n\n`;
    } else {
        output.innerHTML += 'Unknown command\n\n';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('output').innerHTML += 'Type "Help" \n';
});


