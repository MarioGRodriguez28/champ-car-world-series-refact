'use strict'

// Audio files used in the game. 
const crashSound = new Audio('../sounds/crash-6711.mp3')
const backgroundAudio = new Audio('../sounds/impulse-132715.mp3')
backgroundAudio.loop = true

// Data object with game settings.
const data = {
  fps: 25,
  speed: 25,
  speedDiff: 10,
  canvas: {
    width: 320,
    height: 480,
  },
  car1: {
    width: 80,
    height: 120,
    turn: 35,
    image: carrito('../images/RacingCar1.png'),
    position: {
      x: 120,
      y: 340,
    },
  },
  car2: {
    width: 80,
    height: 120,
    distance: 320,
    image: carrito('../images/RacingCar3.png'),
  },
  line: {
    width: 10,
    height: 50,
    distance: 100,
    pos1: 105,
    pos2: 205,
    color: '#efefef',
  },
  moves: [20, 120, 220],
  score: 1,
  grace: 10,
  increaseSpeedTime: 5000,
}

// letiables used during the game.
let game = false
let die = false
let car1Move = 0
let car1Turn = 0
let score = 0
let increaseSpeed = -1
let lines = []
let car1 = []
let car2 = []
let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let instruction = document.querySelector('#instruction')
let scoreText = document.querySelector('#score')
let lose = document.querySelector('#lose')
let gameoverScreen = document.querySelector('#gameover-screen')

// Show game over screen.
function showGameOver() {
  gameoverScreen.style.display = 'block'
}

// Play background audio.
function playBackgroundAudio() {
  backgroundAudio.pause()
  backgroundAudio.currentTime = 0
  backgroundAudio.play()
}

// Pause background audio.
function pauseBackgroundAudio() {
  backgroundAudio.pause()
  backgroundAudio.currentTime = 0
}

// Handle keydown event, move car and start game.
window.addEventListener('keydown', function (evt) {
  evt.preventDefault()

  if (!game) {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      game = true
      instruction.style.display = 'none'
      lose.style.display = 'none'
      playBackgroundAudio()

      initialize()
    }
  }

  if (car1Move <= 0 && car1Turn <= 0) {
    if (evt.keyCode === 37) {
      if (car1[0] === data.moves[1]) {
        car1Move = data.moves[0]
        car1Turn = 1
      } else if (car1[0] === data.moves[2]) {
        car1Move = data.moves[1]
        car1Turn = 1
      }
    } else if (evt.keyCode === 39) {
      if (car1[0] === data.moves[0]) {
        car1Move = data.moves[1]
        car1Turn = 2
      } else if (car1[0] === data.moves[1]) {
        car1Move = data.moves[2]
        car1Turn = 2
      }
    }
  }
})

// Load image from file.
function carrito(value) {
  let img = new Image()
  img.src = value
  return img
}

// Clear canvas.
function clearCanvas() {
  context.clearRect(0, 0, data.canvas.width, data.canvas.height)
}

// Initialize line objects.
function initLines() {
  let y = data.canvas.height - data.line.height

  while (y >= 0) {
    lines.push([
      [data.line.pos1, y, data.line.width, data.line.height],
      [data.line.pos2, y, data.line.width, data.line.height],
    ])

    y -= data.line.distance
  }
}

// Iniialize player's car object.
function initCar1() {
  car1 = [
    data.car1.position.x,
    data.car1.position.y,
    data.car1.width,
    data.car1.height,
  ]
}

// Initialize opposite cars objects.
function initCar2() {
  for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
    let random = data.moves[Math.floor(Math.random() * 3)]

    if (car2.length > 0) {
      if (random === car2[car2.length - 1][1]) {
        i--
      } else {
        car2.push([random, data.car2.height * -1])
      }
    } else {
      car2.push([random, data.car2.height * -1])
    }
  }
}

// Draw lines for the road.
function drawLines() {
  let remove = false

  context.fillStyle = data.line.color

  for (let i = 0; i < lines.length; i++) {
    context.fillRect(
      lines[i][0][0],
      lines[i][0][1],
      lines[i][0][2],
      lines[i][0][3],
    )
    context.fillRect(
      lines[i][1][0],
      lines[i][1][1],
      lines[i][1][2],
      lines[i][1][3],
    )

    if (lines[i][0][1] > data.canvas.height) {
      remove = i
    } else {
      lines[i][0][1] += data.speed + data.speedDiff + increaseSpeed
      lines[i][1][1] += data.speed + data.speedDiff + increaseSpeed
    }
  }

  if (lines[lines.length - 1][0][1] > data.line.distance - data.line.height) {
    lines.push([
      [
        data.line.pos1,
        data.line.height * -1,
        data.line.width,
        data.line.height,
      ],
      [
        data.line.pos2,
        data.line.height * -1,
        data.line.width,
        data.line.height,
      ],
    ])
  }

  if (remove) {
    lines.splice(remove, 1)
  }
}

// Draw player's car.
function drawCar1() {
  if (car1Move > 0 && car1Turn > 0) {
    if (car1Turn === 1) {
      if (car1[0] > car1Move) {
        car1[0] -= data.car1.turn
      } else {
        car1[0] = car1Move
        car1Move = 0
        car1Turn = 0
      }
    } else if (car1Turn === 2) {
      if (car1[0] < car1Move) {
        car1[0] += data.car1.turn
      } else {
        car1[0] = car1Move
        car1Move = 0
        car1Turn = 0
      }
    }
  }
  context.drawImage(data.car1.image, car1[0], car1[1], car1[2], car1[3])
}

// Draw opposite cars.
function drawCar2() {
  let remove = false

  for (let i = 0; i < car2.length; i++) {
    if (car2[i][1] > data.canvas.height) {
      remove = i
    } else {
      car2[i][1] += data.speed - data.speedDiff + increaseSpeed
    }
    context.drawImage(
      data.car2.image,
      car2[i][0],
      car2[i][1],
      data.car2.width,
      data.car2.height,
    )
  }

  if (car2[car2.length - 1][1] > data.car2.distance) {
    initCar2()
  }

  if (remove) {
    car2.splice(remove, 1)
  }
}

// Check collision. Ends game if collision is detected.
function collision() {
  for (let i = 0; i < car2.length; i++) {
    if (
      car1[0] + data.grace <= car2[i][0] + data.car2.width &&
      car1[0] + data.car1.width - data.grace >= car2[i][0] &&
      car1[1] + data.grace <= car2[i][1] + data.car2.height &&
      car1[1] + data.car2.height - data.grace >= car2[i][1]
    ) {
      die = true
      game = false
      instruction.style.display = 'block'
      lose.style.display = 'block'
      showGameOver()
      pauseBackgroundAudio()
      crashSound.play()
    }
  }
}

// Increment score on each frame.
function incrementScore() {
  score += data.score

  scoreText.innerHTML = score
}

// Render each frame.
function render(callback) {
  setTimeout(function () {
    requestAnimationFrame(render)

    if (
      (Math.round(performance.now() / 100) * 100) % data.increaseSpeedTime ===
      0
    ) {
      increaseSpeed++
    }

    if (!die && game) {
      clearCanvas()
      drawLines()
      drawCar1()
      drawCar2()
      collision()
      incrementScore()
    }
  }, 1000 / data.fps)

}

function initialize() {
  gameoverScreen.style.display = 'none'
  die = false
  score = 0
  car1Move = 0
  car1Turn = 0
  increaseSpeed = -1
  lines = []
  car1 = []
  car2 = []

  initLines()
  initCar1()
  initCar2()
  clearCanvas()
}

render()
