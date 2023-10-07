"use client";

import * as Tone from 'tone';
import Image from 'next/image';
import { browser } from 'process';

type Star = {
    x: number;
    y: number;
    size: number;
}

const json = require('./my_plot.json');
json.sort((a: Star, b: Star) => {
    return a.x - b.x;
});

const notes = ["A0", "B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7", "D7", "E7", "F7", "G7", "A7", "B7", "C8"];

const sampler = new Tone.Sampler({
    urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
    },

    release: 10,

    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

const keys = new Tone.Players({
    urls: {
        0: "A1.mp3",
        1: "Fs5.mp3",
        2: "C7.mp3",
        3: "A6.mp3",
    },
    fadeOut: "64n",
    
    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

export default function TonePage() {
    const maxX = Math.round(json[json.length - 1].x);
    // var minSize = json[0].size, maxSize = json[0].size;
    // var array1 = json.map((star: Star) => star.size);
    // array1.forEach((element: number) => {
    //     minSize = Math.min(minSize, element);
    //     maxSize = Math.max(maxSize, element);
    // });
    // const step = Math.round((maxSize - minSize) / 52);

    var minY = json[0].y, maxY = json[0].y;
    var array1 = json.map((star: Star) => star.y);
    array1.forEach((element: number) => {
        minY = Math.min(minY, element);
        maxY = Math.max(maxY, element);
    });
    const step = Math.round((maxY - minY) / 52);

    var movingAverage = [0, 0, 0, 0, 0];

    let xIndex = 0;
    let i = 0;

    const play = () => {
        playSequence();
        xIndex = 0;
        i = 0;
    }

    function playSequence() {
        setTimeout(() => {
            if(xIndex >= json[i].x) {
                let number = Math.round((json[i].y - minY) / step);
                if (number >= 52) { number = 51; }

                // const vol = new Tone.Volume(-12).toDestination();
                // const osc = new Tone.Oscillator(json[i].y, "sine").toDestination().connect(vol);
                // osc.start();
                // osc.stop("+0.5");
                
                // console.log(number)

                // console.log(notes[number])
                
                movingAverage.shift();
                movingAverage.push(number);
                var total = 0;
                movingAverage.forEach((element: number) => {
                    total += element;
                });
                total = Math.round(total / 5);
                console.log(movingAverage, notes[total], total);
                

                // sampler.triggerAttackRelease(notes[number], "0.1s");

                const synth = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(notes[number], "0.5s");
                i++;
            }

            xIndex++;
            if (xIndex < maxX) {
                playSequence();
            }
        }, 10);
    }

    return (
        <main>
            <div>Test</div>

            <button onClick={play}>Play</button>
        </main>
    );
}