import { Player } from "./Player.mjs";
import Collectible from "./Collectible.mjs";
const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

// Initialize player
const player = new Player({
  x: canvas.width / 2,
  y: canvas.height / 2,
  score: 0,
  id: socket.id, // Assuming socket.id represents a unique identifier for the player
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
  const collectibleColor = "pink"
  const collectible = new Collectible({ x, y, value, collectibleColor });
  collectibles.push(collectible);
}

// Add a random collectible every second
setInterval(addRandomCollectible, 1000);

// Function to draw collectibles with random colors
function drawCollectibles() {
  collectibles.forEach(collectible => {
    context.fillStyle = collectible.color; // Use the collectible's color
    context.beginPath();
    context.arc(collectible.x, collectible.y, 5, 0, Math.PI * 2);
    context.fill();
  });
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
    context.fillStyle = getRandomColor(); // Example color, replace with your own
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, Math.PI * 2);
    context.fill();
  });
}

// Function to detect collision between two objects
function collisionDetection(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2) < 15; // Adjust collision radius as needed
}

// Event listener for playerMoved event from server
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
  collectibles.forEach((collectible, index) => {
    if (collisionDetection(player, collectible)) {
      // Handle collision logic (e.g., increase player's score)
      player.score += collectible.value;
      // Remove the collected collectible from the array
      collectibles.splice(index, 1);
    }
  });

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
