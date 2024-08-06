import { io } from 'socket.io-client';

// const socket = io('http://localhost:3000');
const socket = io('https://live-polling-system-eebrdobbo-udaykalses-projects.vercel.app');


export const createPoll = (poll) => {
  socket.emit('createPoll', poll);
};

export const endPoll = () => {
  socket.emit('endPoll');
};

export const joinPoll = (name) => {
  socket.emit('joinPoll', name);
};

export const submitAnswer = (answer) => {
  socket.emit('submitAnswer', answer);
};

export const onNewPoll = (callback) => {
  socket.on('newPoll', callback);
};

export const onPollResults = (callback) => {
  socket.on('pollResults', callback);
};
