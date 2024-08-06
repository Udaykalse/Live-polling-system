const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://live-polling-system-o2vvcnup0-udaykalses-projects.vercel.app'], // Allow both local and production URLs
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: ['http://localhost:5173', 'https://live-polling-system-o2vvcnup0-udaykalses-projects.vercel.app'], // Allow both local and production URLs
}));


let currentPoll = null;
let pollResults = {
  correctAnswer: '',
  results: [],
};

io.on('connection', (socket) => {
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
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
