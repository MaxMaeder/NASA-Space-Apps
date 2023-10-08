"use client";

import BackgroundImage from './index/BackgroundImage';
import Button from './components/button';
import ImageCanvas from './index/ImageCanvas';
import constrain from './util/constrain';
import { useState } from 'react';

const images = ["test.png", "test2.png"];


export default function Home() {
  const [imgNum, setImgNum] = useState(0);

  const changeImg = (i: number) => {
    setImgNum(constrain(imgNum + i, 0, images.length - 1));
  }

  return (
    <div className="flex flex-col overflow-hidden relative h-full">
      <ImageCanvas imgSrc={images[imgNum]} />
      <BackgroundImage imgSrc={images[imgNum]}/>

      <div className="absolute bottom-10 w-full z-20">
        <div className="flex justify-center space-x-4">
          <Button text="< Previous" onClick={() => changeImg(-1)} />
          <Button text="Start ⏵︎" onClick={() => {}} />
          <Button text="Restart ⏹︎" onClick={() => {}} />
          <Button text="Next >" onClick={() => changeImg(1)} />
        </div>
      </div>
    </div>
  )
}
