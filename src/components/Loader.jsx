import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full animate-spin">
        </div>
        {/* Inner ring */}
        <div className="w-16 h-16 border-4 border-t-purple-500 rounded-full animate-spin absolute top-0 left-0">
        </div>
        {/* Loading text */}
        <div className="mt-8 text-purple-500 text-center font-semibold">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader; 