import React from "react";
import ReactConfetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const ReactDesignRain = () => {
  // Get the current window size
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      // Position the canvas fixedly to cover the entire viewport
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
      // Set width and height to match the window size
      width={width}
      height={height}
      // Make confetti emit from the bottom center of the screen
      // confettiSource={{ x: width / 2, y: height, w: 10, h: 10 }}
      // Negative velocity to shoot confetti upwards
      initialVelocityY={-10}
      gravity={0.1}
      initialVelocityX={2}
      numberOfPieces={200}
      opacity={1}
      recycle
      run
      wind={0}
    />
  );
};

export default ReactDesignRain;
