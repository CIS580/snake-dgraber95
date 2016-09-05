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
var growSnakeBy = 4;
var ready = false;
var gameOver = false;
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

    if(!gameOver){

      // TODO: Determine if the snake has eaten its tail
        if((snake.length > 1) && (snakeHead != snake[snake.length-2])){
            for(var i = 0; i < snake.length - 1; i++){
                if((snake[i][0] == snakeHead[0]) && (snake[i][1] == snakeHead[1])){
                    gameOver = true;
                }
            }
        }

      // TODO: Move the snake
        if(accumulatedTime >= 100){
            accumulatedTime = 0;
            ready = true;
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


      // TODO: Determine if the snake has eaten an apple
        if(snakeHead[0] == [appleX] && snakeHead[1] == [appleY]){
      // TODO: Grow the snake periodically
            for(var i = 0; i < growSnakeBy; i++){
                snake.unshift(snake[0]);
            }
      // TODO: Spawn an apple periodically
            newApple();
        }



      // TODO: Determine if the snake has moved out-of-bounds (offscreen)
        if((snakeHead[0] < 0 || snakeHead[0] > frontBuffer.width) ||
            (snakeHead[1] < 0 || snakeHead[1] > frontBuffer.height)){
            gameOver = true;
        }

      // TODO: [Extra Credit] Determine if the snake has run into an obstacle
    }
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
    if(ready){
        switch(event.keyCode){
            // UP
            case 38:
            case 87:
                event.preventDefault();
                if(!input.down && !input.up){
                    accumulatedTime = 100;
                    ready = false;
                    input.up = true;
                    input.left = false;
                    input.right = false;
                    input.down = false; 
                }           
                break;
            // LEFT
            case 37:
            case 65: 
                event.preventDefault();
                if(!input.right && !input.left){
                    accumulatedTime = 100;
                    ready = false;
                    input.up = false;
                    input.left = true;
                    input.right = false;
                    input.down = false; 
                }
                break;
            // RIGHT
            case 39:
            case 68:
                event.preventDefault();
                if(!input.left && !input.right){
                    accumulatedTime = 100;
                    ready = false;
                    input.up = false;
                    input.left = false;
                    input.right = true;
                    input.down = false; 
                }
                break;
            // DOWN
            case 40:
            case 83:
                event.preventDefault();
                if(!input.up && !input.down){
                    accumulatedTime = 100;
                    ready = false;
                    input.up = false;
                    input.left = false;
                    input.right = false;
                    input.down = true;  
                }
                break;
        }
    }
}

function newApple(){
    while(true){
        var tempX = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelWidth)) + pixelGap;
        var tempY = (pixelSize + pixelGap)*Math.floor((Math.random()*canvasPixelHeight)) + pixelGap;
        if( snake.indexOf([tempX, tempY]) == -1){
            appleX = tempX;
            appleY = tempY;
            return;
        }
    }
}
// document.body.innerHTML +='<div style="color:red;font-size:200%"><br>' + numberd + '</div>';

/* Launch the game */
window.requestAnimationFrame(loop);
