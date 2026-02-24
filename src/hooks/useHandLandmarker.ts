import { useRef, useCallback, useEffect, useState } from "react";
import { FilesetResolver, HandLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";

export interface HandDetectionResult {
  landmarks: NormalizedLandmark[][];
  handedness: { categoryName: string }[][];
}

export function useHandLandmarker() {
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  const initModel = useCallback(async () => {
    if (handLandmarkerRef.current) {
      setIsModelReady(true);
      return;
    }

    setIsModelLoading(true);
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });
      setIsModelReady(true);
    } catch (err) {
      console.error("Failed to load HandLandmarker model:", err);
    } finally {
      setIsModelLoading(false);
    }
  }, []);

  const detect = useCallback((video: HTMLVideoElement): HandDetectionResult | null => {
    if (!handLandmarkerRef.current || video.readyState < 2) return null;
    try {
      const result = handLandmarkerRef.current.detectForVideo(video, performance.now());
      return {
        landmarks: result.landmarks,
        handedness: result.handednesses as { categoryName: string }[][],
      };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    return () => {
      handLandmarkerRef.current?.close();
      handLandmarkerRef.current = null;
    };
  }, []);

  return { initModel, detect, isModelLoading, isModelReady };
}
