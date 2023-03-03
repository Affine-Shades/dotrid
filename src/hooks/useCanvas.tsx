import { useRef } from "react";

interface PaintCallback {
  (canvasc: HTMLCanvasElement, contextc: CanvasRenderingContext2D): void;
}

function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function updateCanvas(callback: PaintCallback) {
    let canvas = canvasRef.current;
    if (!canvas) return;
    let context = canvas.getContext("2d");
    if (!context) return;

    callback(canvas, context);
  }

  return [canvasRef, updateCanvas] as const;
}

export default useCanvas;
