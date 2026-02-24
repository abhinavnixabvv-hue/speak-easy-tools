import { useRef, useEffect } from "react";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

// Hand landmark connections for drawing skeleton
const HAND_CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],    // Thumb
  [0,5],[5,6],[6,7],[7,8],    // Index
  [0,9],[9,10],[10,11],[11,12], // Middle
  [0,13],[13,14],[14,15],[15,16], // Ring
  [0,17],[17,18],[18,19],[19,20], // Pinky
  [5,9],[9,13],[13,17],        // Palm
];

interface HandLandmarkCanvasProps {
  landmarks: NormalizedLandmark[][];
  width: number;
  height: number;
}

export function HandLandmarkCanvas({ landmarks, width, height }: HandLandmarkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    for (const hand of landmarks) {
      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.7)";
      ctx.lineWidth = 3;

      if (HAND_CONNECTIONS) {
        for (const conn of HAND_CONNECTIONS) {
          const start = hand[conn[0]];
          const end = hand[conn[1]];
          if (start && end) {
            ctx.beginPath();
            ctx.moveTo(start.x * width, start.y * height);
            ctx.lineTo(end.x * width, end.y * height);
            ctx.stroke();
          }
        }
      }

      // Draw landmarks
      for (const lm of hand) {
        ctx.beginPath();
        ctx.arc(lm.x * width, lm.y * height, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(239, 68, 68, 0.9)";
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }, [landmarks, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
