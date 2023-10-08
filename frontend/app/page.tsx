"use client";

import play, { stopPlaying } from './tone/sonification';
import { useCallback, useEffect, useRef, useState } from 'react';

import BackgroundImage from './index/BackgroundImage';
import Button from './components/button';
import ImageCanvas from './index/ImageCanvas';
import constrain from './util/constrain';
import images from "./images"

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imgNum, setImgNum] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const preImgNum = useRef(0);
  const isPlayingRef = useRef(false);

  const playSongs = useCallback(async() => {
    if (!hasInteracted) return;

    if (preImgNum.current == imgNum && !isPlaying) {
      stopPlaying();
      return;
    }
    preImgNum.current = imgNum;

    let imgObj = images[imgNum];
    const response = await fetch(imgObj.data)
    const data = await response.json();
    
    stopPlaying();
    await new Promise(r => setTimeout(r, 500));
    await play(data);

    if (isPlayingRef.current) {
      let _imgNum = imgNum;
      _imgNum++;
      if (_imgNum >= images.length)
        _imgNum = 0;
      setImgNum(_imgNum)
    }
  }, [hasInteracted, isPlaying, imgNum])

  useEffect(() => {
    playSongs();
  }, [playSongs])

  const changeImg = (i: number) => {
    if (!hasInteracted)
      setHasInteracted(true);
    setImgNum(constrain(imgNum + i, 0, images.length - 1));
    setIsPlaying(false);
    isPlayingRef.current = false;
  }

  const togglePlaying = () => {
    if (!hasInteracted)
      setHasInteracted(true);
    setIsPlaying(!isPlaying);
    isPlayingRef.current = !isPlaying;
  }

  return (
    <div className="flex flex-col overflow-hidden relative h-full">
      <ImageCanvas imgSrc={images[imgNum].image} />
      <BackgroundImage imgSrc={images[imgNum].image}/>

      <div className="absolute bottom-10 w-full z-20">
        <div className="flex justify-center space-x-4">
          <Button text="< Previous" onClick={() => changeImg(-1)} />
          <Button text={isPlaying ? "Stop ⏹︎" : "Start ⏵︎"} onClick={togglePlaying} />
          <Button text="Restart ⏹︎" onClick={() => setImgNum(0)} />
          <Button text="Next >" onClick={() => changeImg(1)} />
        </div>
      </div>
    </div>
  )
}
