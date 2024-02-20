let speed = 0;
let speedPerClick = 1;
let goldenEngineMultiplier = 2; // Multiplier when clicking golden engine
let upgradeCost = 10;
let cursorCost = 10;
let goldenEngineTimeout;
let isAnimating = false; // Flag to indicate if the car is currently animating
let cursors = []; // Array to store cursor elements

// Update speed display
function updateSpeed() {
  document.getElementById('speed').textContent = speed;
}

// Update speed per click display
function updateSpeedPerClick() {
  document.getElementById('speedPerClick').textContent = speedPerClick;
}

// Function to handle clicking on the car
function handleClick(event) {
  // Check if the car is not currently animating
  if (!isAnimating) {
    // Set flag to indicate that the car is animating
    isAnimating = true;
    
    // Add class to trigger the animation
    this.classList.add('clicked');
    
    // Reset animation after 0.5s
    setTimeout(() => {
      this.classList.remove('clicked');
      // Reset flag after the animation completes
      isAnimating = false;
    }, 500);
    
    // Increase speed per click
    speed += speedPerClick;
    updateSpeed();
    
    // Display speed increment feedback
    let clickFeedback = document.createElement('div');
    clickFeedback.textContent = "+" + speedPerClick;
    clickFeedback.classList.add('click-feedback');
    clickFeedback.style.left = event.clientX + 'px';
    clickFeedback.style.top = event.clientY + 'px';
    document.body.appendChild(clickFeedback);
    
    // Remove feedback after 1 second
    setTimeout(() => {
      clickFeedback.remove();
    }, 1000);
  }
}

// Handle clicking on the car to accelerate
document.getElementById('car').addEventListener('click', handleClick);

// Function to buy a cursor upgrade
function buyCursor() {
  if (speed >= cursorCost) {
    // Deduct cost from speed
    speed -= cursorCost;
    updateSpeed();
    
    // Increase speed per click and update display
    speedPerClick++;
    updateSpeedPerClick();
    
    // Add cursor around the car
    let cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.style.left = getRandomPosition();
    cursor.style.top = getRandomPosition();
    document.getElementById('container').appendChild(cursor);
    cursors.push(cursor);
    
    // Increase cursor cost for next purchase
    cursorCost *= 2;
    document.getElementById('cursorCost').textContent = cursorCost;
  } else {
    alert("Not enough speed to buy the cursor upgrade!");
  }
}

// Function to get random position for cursor
function getRandomPosition() {
  return Math.random() * 150 + 'px';
}

// Function to spawn golden engine
function spawnGoldenEngine() {
  let container = document.getElementById('container');
  let goldenEngineDiv = document.getElementById('goldenEngine');
  
  // Randomly decide whether to spawn golden engine
  if (Math.random() < 0.03) { // 3% chance
    // Randomly set position of golden engine
    let posX = Math.random() * (container.clientWidth - 50);
    let posY = Math.random() * (container.clientHeight - 50);
    
    // Set position of golden engine
    goldenEngineDiv.style.left = posX + 'px';
    goldenEngineDiv.style.top = posY + 'px';
    
    goldenEngineDiv.style.display = 'block';
    
    // Set timeout to hide golden engine after some time
    goldenEngineTimeout = setTimeout(function() {
      goldenEngineDiv.style.display = 'none';
    }, 5000); // Hide after 5 seconds
  }
}

// Function to handle clicking on the golden engine
document.getElementById('goldenEngineImg').addEventListener('click', function() {
  // Generate a random multiplier between 2 and 7
  let multiplier = Math.floor(Math.random() * 6) + 2;
  
  // Apply the multiplier to speedPerClick for 1 minute
  let originalSpeedPerClick = speedPerClick;
  speedPerClick *= multiplier;
  updateSpeedPerClick();
  
  // Reset speedPerClick after 1 minute
  setTimeout(function() {
    speedPerClick = originalSpeedPerClick;
    updateSpeedPerClick();
  }, 60000); // 1 minute in milliseconds
  
  // Hide golden engine
  document.getElementById('goldenEngine').style.display = 'none';
});

// Update upgrade cost display initially
document.getElementById('cursorCost').textContent = cursorCost;

// Update speed display initially
updateSpeed();

// Update speed per click display initially
updateSpeedPerClick();

// Automatically spawn golden engine every second
setInterval(function() {
  spawnGoldenEngine();
}, 1000); // Spawn golden engine every second
