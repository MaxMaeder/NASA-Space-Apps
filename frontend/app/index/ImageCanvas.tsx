import { useCallback, useEffect, useRef } from "react";

import constrain from "../util/constrain";
import { useElementSize } from "usehooks-ts";

type ImageCanvasType = {
  imgSrc: string
}

const ImageCanvas = ({imgSrc}: ImageCanvasType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRef, { width: cWidth, height: cHeight }] = useElementSize();
  const size = useRef(.8);
  
  const drawImg = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.src = imgSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    canvas.height = cHeight;
    canvas.width = cWidth;
    
    const updateImage = () => {
      const maxD = Math.min(cHeight, cWidth);

      const w = maxD * size.current;
      const h = maxD * size.current;

      const l = canvas.width * .5 - w * .5;
      const t = canvas.height * .5 - h * .5;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, l, t, w, h);
    }
    updateImage();

    window.addEventListener("wheel", (event) => {
      event.preventDefault();
      const scrollEvent = event as WheelEvent;

      const delta = scrollEvent.deltaY * .0005;
      size.current = constrain(size.current + delta, 0.25, .9);

      updateImage();
    });
  }, [cHeight, cWidth, imgSrc]);

  useEffect(() => {
    drawImg();
  }, [canvasRef, drawImg, imgSrc]);

  return (
    <div ref={containerRef} className="z-10 h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ImageCanvas;