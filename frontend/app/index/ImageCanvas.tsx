import { useCallback, useEffect, useRef } from "react";

const ImageCanvas = () => {
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
    image.src = "/test.png"
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
      console.log(size.current)
    }
    updateImage();

    window.addEventListener("wheel", (event) => {
      console.log("scroll")
      const scrollEvent = event as WheelEvent;
      const isUp = scrollEvent.deltaY > 0;

      const delta = scrollEvent.deltaY * .0005;
      console.log(event, scrollEvent.deltaY)
      size.current = constrain(size.current + delta, 0.25, .9);

      updateImage();
    });
  }, []);

  useEffect(() => {
    drawImg()
  }, [canvasRef, drawImg]);

  const constrain = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max)
  }

  return <canvas ref={canvasRef}></canvas>
}

export default ImageCanvas;