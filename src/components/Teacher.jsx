import React, { useState } from 'react';
import { createPoll, endPoll } from '../socket';

const Teacher = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    createPoll({ question, options, correctAnswer, timeLimit });
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setTimeLimit(60);
  };

  const handleEndPoll = () => {
    endPoll();
  };

  return (
    <div className="teacher flex flex-col items-center w-1/2 p-4">
      <h2 className="text-2xl mb-4">Teacher Section</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Time Limit (seconds)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(Number(e.target.value))}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleCreatePoll}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
      >
        Create Poll
      </button>
      <button
        onClick={handleEndPoll}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        End Poll
      </button>
    </div>
  );
};

export default Teacher;
