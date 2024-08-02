import React, { useState, useEffect } from 'react';
import { joinPoll, submitAnswer, onNewPoll, onPollResults } from '../socket';

const Student = () => {
  const [name, setName] = useState('');
  const [poll, setPoll] = useState(null);
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState(null);
  const [submittedName, setSubmittedName] = useState(false);

  useEffect(() => {
    if (submittedName) {
      joinPoll(name);

      onNewPoll((newPoll) => {
        setPoll(newPoll);
        setResults(null); 
      });

      onPollResults((pollResults) => {
        setResults(pollResults);
      });
    }
  }, [name, submittedName]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmittedName(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer) {
      submitAnswer({ name, answer });
    }
  };

  const handleNewStudent = () => {
    setName('');
    setAnswer('');
    setPoll(null);
    setResults(null);
    setSubmittedName(false);
  };

  if (!submittedName) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Enter Your Name</h1>
        <form onSubmit={handleNameSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <p className="text-lg text-gray-600">Waiting for a new poll...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 p-6">
      {results ? (
        <div className="bg-white shadow-md rounded p-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Poll Results</h2>
          <p className="mb-4 text-gray-600">
            Correct Answer: <span className="font-bold text-green-600">{results.correctAnswer}</span>
          </p>
          <ul className="list-disc list-inside">
            {results.results.map((result, index) => (
              <li key={index} className="text-gray-700">
                {result.answer}: <span className="font-semibold">{result.count}</span> (<span className="font-semibold">{result.percentage}%</span>)
              </li>
            ))}
          </ul>
          <button 
            onClick={handleNewStudent}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 mt-4"
          >
            New Student
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded p-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{poll.question}</h2>
          <form onSubmit={handleSubmit}>
            {poll.options.map((option, index) => (
              <div key={index} className="mb-4">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="answer"
                  value={option}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`option${index}`} className="text-gray-700">{option}</label>
              </div>
            ))}
            <button 
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
            >
              Submit Answer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Student;
