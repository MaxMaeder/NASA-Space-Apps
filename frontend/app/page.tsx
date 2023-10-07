"use client";

import Button from './components/button';
import Chart from 'chart.js/auto';
import Header from "./index/header";
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
    <div className="flex flex-col overflow-hidden relative">
      <ImageCanvas imgSrc={images[imgNum]} />

      <div className="absolute bottom-10 w-full flex justify-center space-x-4">
        <Button text="< Previous" onClick={() => changeImg(-1)} />
        <Button text="Start ⏵︎" onClick={() => {}} />
        <Button text="Restart ⏹︎" onClick={() => {}} />
        <Button text="Next >" onClick={() => changeImg(1)} />
      </div>
    {/*
      <div>
        <div className={"w-full flex flex-row mt-0 font-mono font-semibold space-x-2 px-4 text-slate-400"}>
          <Button text="Preset Datasets" onClick={() => {}} />
          <Button text="Upload a custom data set..." onClick={() => {}} />
          <Button text="Render" onClick={() => {}} />
        </div>

        <div className={"flex flex-row w-full mt-4 pt-4 px-4 space-x-4"}>
          <div className={"w-1/2"}>
            <div className={"border-2 border-slate-800 rounded-lg p-4"}>
              <div className={"bg-nasa w-full h-96"}></div>
            </div>

            <div className={"flex flex-row mt-4 font-mono font-semibold space-x-2 justify-between text-slate-400"}>
              <div className={"flex flex-row space-x-2"}>
                <Button text="<< First" onClick={() => {}} />
                <Button text="< Previous" onClick={() => {}} />
              </div>

              <div className={"flex flex-row space-x-2"}>
                <Button text="Next >" onClick={() => {}} />
                <Button text="Last >>" onClick={() => {}} />
              </div>
            </div>
          </div>

          <div>
            <div className={"flex flex-row font-mono font-semibold space-x-2 justify-end text-slate-400"}>
            <Button text="Start ⏵︎" onClick={() => {}} />
            <Button text="Restart ⏹︎" onClick={() => {}} />
            </div>

            { Chart }
            { {config && <canvas id="myChart" width="400" height="400"></canvas>} }
          </div>
        </div>
  </div>*/}

      <p className={"text-sm text-slate-800 px-3 mb-2"}>Created for the Nasa Space Apps hackathon fall, 2023 - By Aishani Das-Ghosh, Jeremy Kintana, Max Maeder, Rahul Hathwar</p>
    </div>
  )
}
