"use client";

import BackgroundImage from './index/BackgroundImage';
import Button from './components/button';
import Chart from 'chart.js/auto';
// import Header from "./index/header";
import Image from 'next/image'
import ImageCanvas from './index/ImageCanvas';
import constrain from './util/constrain';
import { motion } from 'framer-motion';
import { useState } from 'react';

const config = {
  type: 'line',
  data: {},
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  },
};

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
        {/*<p className={"text-sm text-slate-800 px-3 mb-2"}>Created for the Nasa Space Apps hackathon fall, 2023 - By Aishani Das-Ghosh, Jeremy Kintana, Max Maeder, Rahul Hathwar</p>*/}
      </div>
    </div>
  )
}
