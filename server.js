require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const expect = require('chai');
const socket = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());
//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 


// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle player movement
  socket.on('move', (direction) => {
    // Update player position and emit to all clients
    io.emit('playerMoved', { playerId: socket.id, direction });
  });
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const listener  = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
