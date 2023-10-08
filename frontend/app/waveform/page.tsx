"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const delayBetweenBars = 150; // Milliseconds

// Create a queue of buffers
let bufQueue: any = [[25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250],
                    [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
                    [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
                    [75, 150, 225, 300, 375, 450, 525, 600, 675, 750],
                    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    [125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250]];

function createBuffer(newBuf: any[]) {
    // Add buffer to queue
    bufQueue.push(newBuf);
}

export default function Waveform() {
    let [height, setHeight] = useState<number>(240); // Height of container
    let [barHeights, setBarHeights] = useState<number[]>([]); // Array of bar heights [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    useEffect(() => {
        // Set the barHeights state to change to the next buffer in the queue every delayBetweenBars milliseconds
        // If the queue is empty, create a new buffer as a placeholder or filler buffer
        let interval = setInterval(() => {
            if (bufQueue.length > 0) {
                setBarHeights(bufQueue.shift());
            } else {
                createBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }
        }, delayBetweenBars);

        return () => clearInterval(interval);
    }, [barHeights]);

    let constructBars = (): any[] => {
        let barArray: any[] = []; // Return array of bars
    
        let newBar = (freq: number): any => {
            return <motion.div className={"bg-yellow-500 rounded-lg w-full"} style={{"height": 0}}
                animate={{ height: freq > height ? height : freq }}
                transition={{ duration: 0.25 }}
            ></motion.div>;
        }
    
        if (barHeights.length > 0) {
            for (let i = 0; i < barHeights.length; i++) {
                barArray.push(newBar(barHeights[i]));
            }
        }
    
        return barArray;
    }

    return (
        <div className={"w-full bg-slate-400 bg-rounded flex flex-row space-x-2"} style={{"height": height}}>
            { constructBars() }
        </div>
    );
}
