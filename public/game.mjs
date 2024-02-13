import { Player } from "./Player.mjs";
import Collectible from "./Collectible.mjs";
const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize player
const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  score: 0,
  id: socket.id, // Assuming socket.id represents a unique identifier for the player
  color: getRandomColor(),
});

// Initialize an empty object to store player objects
const players = {};

// Initialize an array to store collectible objects
const collectibles = [];

// Game logic goes here
// Define key codes for arrow keys and WASD
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

// Map key codes to directions
const keyToDirection = {
  [KEY_UP]: "up",
  [KEY_DOWN]: "down",
  [KEY_LEFT]: "left",
  [KEY_RIGHT]: "right",
  [KEY_W]: "up",
  [KEY_A]: "left",
  [KEY_S]: "down",
  [KEY_D]: "right",
};

// Function to add a new random collectible
function addRandomCollectible() {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  const value = Math.floor(Math.random() * 10) + 1; // Random value between 1 and 10
  const collectibleColor = "pink";
  const collectible = new Collectible({ x, y, value, collectibleColor });
  collectibles.push(collectible);
}

// Add a random collectible every second
setInterval(addRandomCollectible, 1000);

// Function to draw collectibles with random colors
function drawCollectibles() {
  collectibles.forEach((collectible) => {
    const color = getRandomColor();
    context.fillStyle = color; // Use the collectible's color
    context.beginPath();
    context.arc(collectible.x, collectible.y, 5, 0, Math.PI * 2);
    context.fill();
  });
}

// Event listener for keydown event
document.addEventListener("keydown", (event) => {
  const direction = keyToDirection[event.keyCode];
  if (direction) {
    // Move player locally
    player.movePlayer(direction, 5);

    // Emit move event to the server
    socket.emit("move", { dir: direction, speed: 5 });
  }
});

// Function to draw all players on the canvas
function drawPlayers() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each player
  Object.values(players).forEach((player) => {
    const color = getRandomColor();
    context.fillStyle = color;
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, Math.PI * 2);
    context.fill();
  });
}

// Function to draw the scoreboard
function drawScoreboard(scores) {
  // Get the scoreboard element
  const scoreboardElement = document.getElementById("scoreboard");
  // Clear the existing scoreboard
  scoreboardElement.innerHTML = "";

  // Sort scores by rank
  scores.sort((a, b) => a.rank - b.rank);

  // Create HTML elements for each player's score and rank
  scores.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.textContent = `Player ${player.id}: Score - ${player.score}, ${player.rank}`;
    scoreboardElement.appendChild(playerElement);
  });
}

// Function to detect collision between player and collectibles
function collisionDetection(player, collectibles) {
  for (let i = 0; i < collectibles.length; i++) {
    const collectible = collectibles[i];

    if (player.collision(collectible)) {
      return { collided: true, index: i }; // Return collision and collectible index
    }
  }
  return { collided: false, index: -1 }; // No collision detected
}

// Event listener for playerMoved event from server

// Event listener for receiving updated scores from the server
socket.on("scores", (scores) => {
  // Draw the updated scoreboard
  drawScoreboard(scores);
});

socket.on("playerMoved", ({ id, x, y }) => {
  // Check if the player already exists
  if (!players[id]) {
    // Create a new player object if it doesn't exist
    players[id] = new Player({ x, y, score: 0, id });
  } else {
    // Update existing player's position
    players[id].x = x;
    players[id].y = y;
  }

  // Check for collisions with collectibles
  const collisionResult = collisionDetection(players[id], collectibles);
  if (collisionResult.collided) {
    // Handle collision logic (e.g., increase player's score)
    player.score += collectibles[collisionResult.index].value;
    // Remove the collected collectible from the array
    collectibles.splice(collisionResult.index, 1);
  }

  // Draw all players and collectibles on the canvas
  drawPlayers();
  drawCollectibles();
});

// Event listener for playerPosition event from server
socket.on("playerPosition", ({ id, x, y }) => {
  // Check if the player already exists
  if (!players[id]) {
    // Create a new player object if it doesn't exist
    players[id] = new Player({ x, y, score: 0, id });
  } else {
    // Update existing player's position
    players[id].x = x;
    players[id].y = y;
  }

  // Draw all players on the canvas
  drawPlayers();
});

// Event listener for playerDisconnected event from server
socket.on("playerDisconnected", (id) => {
  // Remove disconnected player from the players object
  delete players[id];
});
