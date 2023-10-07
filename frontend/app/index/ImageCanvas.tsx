import { useCallback, useEffect, useRef } from "react";

import constrain from "../util/constrain";

type ImageCanvasType = {
  imgSrc: string
}

const ImageCanvas = ({imgSrc}: ImageCanvasType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useRef(.8);
  
  const drawImg = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const cHeight = canvasRect.height;
    const cWidth = canvasRect.width;

    const context = canvas.getContext('2d')
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
      const scrollEvent = event as WheelEvent;

      const delta = scrollEvent.deltaY * .0005;
      size.current = constrain(size.current + delta, 0.25, .9);

      updateImage();
    });
  }, [imgSrc]);

  useEffect(() => {
    drawImg()
  }, [canvasRef, drawImg, imgSrc]);

  return <canvas ref={canvasRef} className="z-10"></canvas>
}

export default ImageCanvas;