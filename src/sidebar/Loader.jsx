// Loader.js
import React from "react";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: conic-gradient(
          from 0deg,
          #ff6b6b,
          #f7c34f,
          #4fd1c5,
          #3498db,
          #ff6b6b
        );
        mask-image: radial-gradient(
          farthest-side,
          #0000 calc(100% - 7px),
          #000 0
        );
        animation: rotate 1s linear infinite;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Loader;
