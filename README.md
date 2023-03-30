## Game Instructions

This is a game built with Javascript where you navigate your car through a busy highway while dodging other vehicles driving in the opposite direction. If you collide with any of the oncoming cars, the game ends. Your objective is to gain as many points as possible.

## How to Play

Press the `Enter` or `Spacebar` key to begin the game. Use the `Left` and `Right` arrow keys to navigate your car on the road and avoid collisions with the opposing cars. Gain as many points as possible. If you collide with any of the cars driving in the opposite direction, the game ends.

## Code Breakdown

### Files
- `index.html`: This file contains the HTML markup for the webpage.
- `stylesheet/style.css`: This file contains the CSS styles for the webpage.
- `images/Champ_Car_logo.svg.png`: This file contains the logo for the Champ Car World Series.
- `images/game-over.png`: This file contains the image used on the game over screen.
- `javascript/script.js`: This file contains the JavaScript code for the game.

The main file `script.js` contains:
- Audio files used in the game.
- A data object with game settings.
- Variables used during gameplay.
- Functions to show/hide game over screen, play/pause background audio, move the player’s car, load images, initialize objects, clear canvas, draw objects, detect collision, increment score, and render the game.
- A function to set up the game and initialize objects and variables.
- A render function that runs each frame.



### Setup
- Clone or download the repository.
- Open the `index.html` file in a web browser.

### How to Play
- Press "Enter" key to start the game.
- Use the "Left" Arrow key to move left and the "Right" Arrow key to move right.
- Avoid the obstacles and try to get as far as possible.
- The game ends when you hit an obstacle.

This is a CSS code that provides styling to the HTML elements of a web page. The code applies the following properties:

* `padding` and `margin`: set to `0` for all HTML elements.
* `background-image`: a road forest image that is set as the background to the body element.
* `.container`: an element that is positioned absolutely at 25% from the top and 50% from the left of the viewport. It has a flexbox layout that vertically and horizontally aligns its children. 
* `#canvas`: This is the main game area that is displayed in the center of the `.container`. The element has a flexbox layout that centers its children. It has a linear gradient background and is given a box-shadow property. The outline property is also set to none.
* `#score`: An element that shows the game score. It is positioned absolutely at the top-left corner of the game screen and has a text shadow effect.
* `#instruction`: An element that shows the game instructions. It is positioned absolutely at 60% from the top and 20% from the left of the viewport. Its text is bold and has a maximum width set to 50%. It also has a text shadow effect.
* `#lose`: An element that displays a message when the game is over. It is positioned absolutely at 150px from the top and 30px from the left corner. It is initially hidden and only displayed when the game ends.
* `img`: An element that displays an image with a width of 200 pixels and an auto-calculated height. It also has bottom margin of 20 pixels.
* `#gameover-screen`: An element that is displayed when the game is over. It is positioned absolutely and aligned at the center of the viewport vertically using `top:45%` and transforms the element's position by 50% of its own height using `transform:` 

To use this CSS code, simply copy it and paste it in your style sheet. You can also modify the properties to suit your needs. This code provides visual styling for a game screen, including the background, game area, and score display among other elements. You can also use this code as a reference for creating your own styling for game screens. 

Remember to link the style sheet to your HTML file using the `<link>` tag in the `<head>` section.