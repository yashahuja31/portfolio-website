import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 left-0 z-50">
      <div className="canvas-loader"></div>
    </div>
  );
};

export default Loader;