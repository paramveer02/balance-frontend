import React from 'react';
import Indulgences from '../components/Indulgences';

const IndulgencesDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Spacer to demonstrate scroll effect */}
      <div className="h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Scroll Down
          </h1>
          <p className="text-xl text-gray-600">
            Watch the indulgence chips animate as you scroll
          </p>
        </div>
      </div>

      {/* Indulgences Component */}
      <Indulgences />

      {/* Spacer to demonstrate reverse scroll effect */}
      <div className="h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Scroll Up
          </h1>
          <p className="text-xl text-gray-600">
            Watch the animation reverse direction
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndulgencesDemo;
