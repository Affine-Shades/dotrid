import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./canvas.module.css";
import useKeyboard from "../../hooks/useKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  switchColour,
  decreaseShade,
  increaseShade,
} from "../../store/slices/colourSlice";
import useCanvas from "../../hooks/useCanvas";
import { toggleMenu } from "../../store/slices/menuSlice";

interface Coordinate {
  x: number;
  y: number;
}

function Canvas() {
  const dispatch = useDispatch();
  const size = useSelector((state: RootState) => state.size.value);
  const shade = useSelector((state: RootState) => state.colour.currentShade);

  const windowSize = useWindowSize(size);
  const [mainCanvas, updateMainCanvas] = useCanvas();
  const [overlayCanvas, updateOverlayCanvas] = useCanvas();
  const keymap = useKeyboard();

  const [coordinates, setCoordinates] = useState<Coordinate>({
    x: 0,
    y: 0,
  });

  function handleKeyPress() {
    const newPos = [0, 0];

    if (keymap["k"]) {
      newPos[1] += size;
    }
    if (keymap["l"]) {
      newPos[0] += size;
    }
    if (keymap["i"]) {
      newPos[1] -= size;
    }
    if (keymap["j"]) {
      newPos[0] -= size;
    }
    
    const next: Coordinate = {
      x: coordinates.x + newPos[0],
      y: coordinates.y + newPos[1],
    };

    // handling offset
    if (next.x < 0) {
      next.x = windowSize.w - size;
    }
    if (next.x >= windowSize.w) {
      next.x = 0;
    }
    if (next.y < 0) {
      next.y = windowSize.h - size;
    }
    if (next.y >= windowSize.h) {
      next.y = 0;
    }

    if (keymap["f"]) {
      updateMainCanvas((_canvas, context) => {
        context.fillStyle = shade;
        context.fillRect(next.x, next.y, size, size);
      });
    }

    if (keymap["e"]) {
      updateMainCanvas((_canvas, context) => {
        context.fillStyle = "white";
        context.fillRect(next.x, next.y, size, size);
      });
    }

    if (keymap["c"]) {
      dispatch(switchColour());
    }

    if (keymap["s"]) {
      dispatch(increaseShade());
    }

    if (keymap["a"]) {
      dispatch(decreaseShade());
    }

    if (keymap["m"]) {
      dispatch(toggleMenu());
    }

    if (keymap["x"]) {
      updateMainCanvas((canvas, _context) => {
        let encoded = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.setAttribute("href", encoded);
        link.setAttribute("download", "dotgrid-drawing.png");
        link.dispatchEvent(
          new MouseEvent(`click`, {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      });
    }

    setCoordinates({ ...coordinates, ...next });
  }

  // key press
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  // paint overlay canvas
  useEffect(() => {
    updateOverlayCanvas((canvas, context) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const stroke = 2;
      context.strokeStyle = shade;
      context.lineWidth = stroke;
      context.strokeRect(
        coordinates.x - stroke / 2,
        coordinates.y - stroke / 2,
        size + stroke,
        size + stroke
      );
    });
  });

  return (
    <main>
      <canvas
        className={styles.canvas}
        ref={mainCanvas}
        width={windowSize.w}
        height={windowSize.h}
      />            
      <canvas
        className={styles.canvas}
        ref={overlayCanvas}
        width={windowSize.w}
        height={windowSize.h}
      />
    </main>
  );
}

export default Canvas;
