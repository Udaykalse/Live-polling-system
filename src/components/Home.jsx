// import React from 'react';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-4xl mb-4">Live Polling System</h1>
//       <div>
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
//           onClick={() => navigate('/teacher')}
//         >
//           Teacher
//         </button>
//         <button
//           className="bg-green-500 text-white py-2 px-4 rounded"
//           onClick={() => navigate('/student')}
//         >
//           Student
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;
// // 1c

// import React from "react";
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="home flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl mb-4">Welcome to the Live Polling System</h1>
//       <p className="text-lg">
//         Use the navigation links to switch between Teacher and Student sections.
//       </p>
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <div>
//           <h1 className="text-4xl mb-4">Live Polling System</h1>
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
//             onClick={() => navigate("/teacher")}
//           >
//             Teacher
//           </button>
//           <button
//             className="bg-green-500 text-white py-2 px-4 rounded"
//             onClick={() => navigate("/student")}
//           >
//             Student
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';

const Home = () => {
  return (
    <div className="home flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Welcome to the Live Polling System</h1>
      <p className="text-lg">Use the navigation links to switch between Teacher and Student sections.</p>
    </div>
  );
};

export default Home;
