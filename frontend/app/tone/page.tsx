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

export default function TonePage() {
    const maxX = Math.round(json[json.length - 1].x);
    var minSize = json[0].size, maxSize = json[0].size;
    var array1 = json.map((star: Star) => star.size);
    array1.forEach((element: number) => {
        minSize = Math.min(minSize, element);
        maxSize = Math.max(maxSize, element);
    });
    const step = Math.round((maxSize - minSize) / 125);

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
                const number = Math.round((json[i].size - minSize) / step);
                console.log(number)

                // const osc = new Tone.Oscillator(json[i].y, "sine").toDestination();
                // osc.start();
                // osc.stop("+0.5");

                const synth = new Tone.Synth().toDestination();
                // trigger a note at json[i].y hertz, for log(json[i]) seconds
                synth.triggerAttackRelease(json[i].y, Math.log(json[i].size) + "s");
                i++;
            }

            xIndex++;
            if (xIndex < maxX) {
                playSequence();
            }
        }, 25);
    }

    return (
        <main>
            <div>Test</div>

            <button onClick={play}>Play</button>
        </main>
    );
}