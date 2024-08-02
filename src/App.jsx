
import React from 'react';
import Teacher from './components/Teacher'; 
import Student from './components/Student'; 

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 p-6 border-r border-gray-300">
        <h1 className="text-3xl font-bold mb-4">Teacher</h1>
        <Teacher />
      </div>

      <div className="w-1/2 bg-gray-200 p-6">
        <h1 className="text-3xl font-bold mb-4">Student</h1>
        <Student />
      </div>
    </div>
  );
};

export default App;
