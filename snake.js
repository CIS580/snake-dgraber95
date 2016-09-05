/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var pixelSize = 10;
var pixelGap = 2;
var canvasPixelWidth = Math.floor(frontBuffer.width/(pixelSize + pixelGap));
var canvasPixelHeight = Math.floor(frontBuffer.height/(pixelSize + pixelGap));
var appleX = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelWidth)) + pixelGap;
var appleY = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelHeight)) + pixelGap;
var snake = [[pixelGap,pixelGap]];
var accumulatedTime = 0;
var input = {
	up: false,
	down: false,
	left: false,
	right: true
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;
  
  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
	var snakeHead = snake[snake.length-1];
	accumulatedTime += elapsedTime;
	if(accumulatedTime >= 100){
		accumulatedTime = 0;
		if(input.up){
			snake.push([snakeHead[0], snakeHead[1] - (pixelGap + pixelSize) ]);
		}
		else if(input.left){
			snake.push([snakeHead[0] - (pixelGap + pixelSize), snakeHead[1] ]);
		}
		else if(input.right){
			snake.push([snakeHead[0] + (pixelGap + pixelSize), snakeHead[1] ]);
		}
		else if(input.down){
			snake.push([snakeHead[0], snakeHead[1] + (pixelGap + pixelSize) ]);
		}
	snake.shift();
	}
	
	
	
  // TODO: Spawn an apple periodically
  // TODO: Grow the snake periodically
  // TODO: Move the snake
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
	backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  
  // TODO: Draw the game objects into the backBuffer
	backCtx.fillStyle = "red";
	backCtx.fillRect(appleX, appleY, pixelSize, pixelSize);
	
	backCtx.fillStyle = "green";
	for(var i = 0; i < snake.length; i++){
		backCtx.fillRect(snake[i][0], snake[i][1], pixelSize, pixelSize);
	}
}


window.onkeydown = function(event){
	switch(event.keyCode){
		// UP
		case 38:
		case 87:
			accumulatedTime = 100;
			event.preventDefault();
			if(!input.down){
				input.up = true;
				input.left = false;
				input.right = false;
				input.down = false;	
			}			
			break;
		// LEFT
		case 37:
		case 65: 
			accumulatedTime = 100;
			event.preventDefault();
			if(!input.right){
				input.up = false;
				input.left = true;
				input.right = false;
				input.down = false;	
			}
			break;
		// RIGHT
		case 39:
		case 68:
			accumulatedTime = 100;
			event.preventDefault();
			if(!input.left){
				input.up = false;
				input.left = false;
				input.right = true;
				input.down = false;	
			}
			break;
		// DOWN
		case 40:
		case 83:
			accumulatedTime = 100;
			event.preventDefault();
			if(!input.up){
				input.up = false;
				input.left = false;
				input.right = false;
				input.down = true;	
			}
			break;
	}
}


/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function newApple(){
	var tempX = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelWidth)) + pixelGap;
	var tempY = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelHeight)) + pixelGap;
}
// document.body.innerHTML +='<div style="color:red;font-size:200%"><br>' + numberd + '</div>';

/* Launch the game */
window.requestAnimationFrame(loop);
