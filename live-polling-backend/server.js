// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: 'http://localhost:5173', // URL of your frontend
    methods: ['GET', 'POST'],
  },
});

// CORS settings to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173' // URL of your frontend
}));

let currentPoll = null;
let pollResults = {
  correctAnswer: '',
  results: [],
};

// Handling socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createPoll', (poll) => {
    currentPoll = poll;
    pollResults = {
      correctAnswer: poll.correctAnswer,
      results: poll.options.map((option) => ({ answer: option, count: 0, percentage: 0 })),
    };
    io.emit('newPoll', currentPoll);
  });

  socket.on('endPoll', () => {
    io.emit('pollResults', pollResults);
    currentPoll = null;
  });

  socket.on('joinPoll', (name) => {
    if (currentPoll) {
      socket.emit('newPoll', currentPoll);
    }
  });

  socket.on('submitAnswer', (answer) => {
    const result = pollResults.results.find((res) => res.answer === answer.answer);
    if (result) {
      result.count += 1;
      result.percentage = ((result.count / pollResults.results.length) * 100).toFixed(2);
      io.emit('pollResults', pollResults);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
