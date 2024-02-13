require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const nocache = require("nocache");

const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/assets", express.static(process.cwd() + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());
// For FCC testing purposes and enables the user to connect from outside the hosting platform
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});
// Cybersecurity 
app.use(helmet.noSniff()); 
app.use(helmet.xssFilter()); 
app.use(nocache()); 
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
// Import Player class using dynamic import
const PlayerPromise = import("./public/Player.mjs");

// Index page (static HTML)
app.route("/").get(function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404).type("text").send("Not Found");
});



// Player objects storage
const players = {};
// Array to store collectible objects
const collectibles = [];

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected");
  // Emit current collectible information to the connecting client
  socket.emit("collectibles", collectibles);

  // Create a new player object after Player class is imported
  PlayerPromise.then(({ Player }) => {
    const player = new Player({
      x: Math.floor(Math.random() * 600) + 20,
      y: Math.floor(Math.random() * 440) + 20,
      score: 0,
      id: socket.id,
    });
    players[socket.id] = player;

    // Send player's initial position to all clients
    io.emit("playerPosition", { id: socket.id, x: player.x, y: player.y });

    // Handle player disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
      delete players[socket.id];
      io.emit("playerDisconnected", socket.id);
    });

    // Handle player movement
    socket.on("move", (data) => {
      const { dir, speed } = data;
      players[socket.id].movePlayer(dir, speed);
      io.emit("playerMoved", {
        id: socket.id,
        x: players[socket.id].x,
        y: players[socket.id].y,
      });
    });
  }).catch((error) => {
    console.error("Error loading Player class:", error);
  });
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
server.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function() {
      try {
        runner.run();
      } catch (error) {
        console.log("Tests are not valid:");
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
