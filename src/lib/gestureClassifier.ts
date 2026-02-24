import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

// Landmark indices
const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const MIDDLE_TIP = 12;
const RING_TIP = 16;
const PINKY_TIP = 20;
const INDEX_MCP = 5;
const MIDDLE_MCP = 9;
const RING_MCP = 13;
const PINKY_MCP = 17;
const INDEX_PIP = 6;
const MIDDLE_PIP = 10;
const RING_PIP = 14;
const PINKY_PIP = 18;
const THUMB_IP = 3;

function isFingerExtended(landmarks: NormalizedLandmark[], tip: number, pip: number, mcp: number): boolean {
  return landmarks[tip].y < landmarks[pip].y && landmarks[pip].y < landmarks[mcp].y;
}

function isThumbExtended(landmarks: NormalizedLandmark[]): boolean {
  return landmarks[THUMB_TIP].y < landmarks[THUMB_IP].y;
}

function distance(a: NormalizedLandmark, b: NormalizedLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function classifyGesture(landmarks: NormalizedLandmark[]): string | null {
  if (landmarks.length < 21) return null;

  const indexUp = isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP);
  const middleUp = isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP);
  const ringUp = isFingerExtended(landmarks, RING_TIP, RING_PIP, RING_MCP);
  const pinkyUp = isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP);
  const thumbUp = isThumbExtended(landmarks);

  const allFingersUp = indexUp && middleUp && ringUp && pinkyUp && thumbUp;
  const allFingersClosed = !indexUp && !middleUp && !ringUp && !pinkyUp;

  // Open hand = Hello / Wave
  if (allFingersUp) {
    return "Hello";
  }

  // Thumbs up = Yes / Good
  if (thumbUp && allFingersClosed) {
    return "Yes";
  }

  // Index + middle up, rest closed = Peace / V
  if (indexUp && middleUp && !ringUp && !pinkyUp) {
    return "Peace";
  }

  // Only index up = Point / One
  if (indexUp && !middleUp && !ringUp && !pinkyUp) {
    return "One";
  }

  // Fist = No (closed fist)
  if (!thumbUp && allFingersClosed) {
    return "No";
  }

  // Pinky up only = I Love You (simplified)
  if (pinkyUp && !indexUp && !middleUp && !ringUp && thumbUp) {
    return "I Love You";
  }

  // Thumb + pinky = Call / Phone
  if (thumbUp && pinkyUp && !indexUp && !middleUp && !ringUp) {
    return "Call Me";
  }

  return null;
}
