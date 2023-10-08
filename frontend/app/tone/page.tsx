"use client";

import play from "./sonification"

const stars = require('./my_plot.json');

export default function TonePage() {
    return (
        <main>
            <button onClick={() => play(stars)}>
                Play!
            </button>
        </main>
    );
}

// import * as Tone from 'tone';

// type Star = {
//     x: number;
//     y: number;
//     size: number;
// }

// const stars = require('./my_plot.json');
// // Sort from left x to right x
// stars.sort((a: Star, b: Star) => {
//     return a.x - b.x;
// });

// const notes = ["A0", "B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7", "D7", "E7", "F7", "G7", "A7", "B7", "C8"];

// const majorChords = [
//     ["C", "E", "G"],
//     ["D", "F#", "A"],
//     ["E", "G#", "B"],
//     ["F", "A", "C"],
//     ["G", "B", "D"],
//     ["A", "C#", "E"],
//     ["B", "D#", "F#"],
// ];

// const minorChords = [
//     ["C", "D#", "G"],
//     ["D", "F", "A"],
//     ["E", "G", "B"],
//     ["F", "G#", "C"],
//     ["G", "A#", "D"],
//     ["A", "C", "E"],
//     ["B", "D", "F#"],
// ];

// const octaves = ["1", "2", "3", "4", "5", "6", "7", "8"];

// // function chordToToneFrequency(chord:String[]) {
// //     return chord.map(note => Tone.Frequency(note.toString()));
// // }
// const allChords:String[][] = [...majorChords, ...minorChords];

// const sampler = new Tone.Sampler({
//     urls: {
//         A0: "A0.mp3",
//         C1: "C1.mp3",
//         "D#1": "Ds1.mp3",
//         "F#1": "Fs1.mp3",
//         A1: "A1.mp3",
//         C2: "C2.mp3",
//         "D#2": "Ds2.mp3",
//         "F#2": "Fs2.mp3",
//         A2: "A2.mp3",
//         C3: "C3.mp3",
//         "D#3": "Ds3.mp3",
//         "F#3": "Fs3.mp3",
//         A3: "A3.mp3",
//         C4: "C4.mp3",
//         "D#4": "Ds4.mp3",
//         "F#4": "Fs4.mp3",
//         A4: "A4.mp3",
//         C5: "C5.mp3",
//         "D#5": "Ds5.mp3",
//         "F#5": "Fs5.mp3",
//         A5: "A5.mp3",
//         C6: "C6.mp3",
//         "D#6": "Ds6.mp3",
//         "F#6": "Fs6.mp3",
//         A6: "A6.mp3",
//         C7: "C7.mp3",
//         "D#7": "Ds7.mp3",
//         "F#7": "Fs7.mp3",
//         A7: "A7.mp3",
//         C8: "C8.mp3"
//     },

//     release: 10,

//     baseUrl: "https://tonejs.github.io/audio/salamander/"
// }).toDestination();

// export default function TonePage() {
//     const NUM_NOTES= 8;
//     const CHOSEN_CHORD = 12;

//     var minY = stars[0].y, maxY = stars[0].y;
//     var array1 = stars.map((star: Star) => star.y);
//     array1.forEach((element: number) => {
//         minY = Math.min(minY, element);
//         maxY = Math.max(maxY, element);
//     });
//     const step = Math.round((maxY - minY) / NUM_NOTES);

//     var movingAverage = [0, 0, 0, 0, 0];

//     let queue: String[][] = [];
//     let queueIndex = 0;

//     stars.forEach((element: Star) => {
//         let number = Math.round((element.y - minY) / step);
//         if (number > NUM_NOTES - 1) { number = NUM_NOTES - 1; }

//         movingAverage.shift();
//         movingAverage.push(number);

//         let movingAverageTotal = 0;
//         movingAverage.forEach((yPos: number) => {
//             movingAverageTotal += yPos;
//         });
//         let octaveFromMovingAverage = Math.round(movingAverageTotal / 5);

//         console.log(octaveFromMovingAverage);

//         const octave = octaves[octaveFromMovingAverage];
//         const note1 = Tone.Frequency(allChords[CHOSEN_CHORD][0] + octave.toString());
//         const note2 = Tone.Frequency(allChords[CHOSEN_CHORD][1] + octave.toString());
//         const note3 = Tone.Frequency(allChords[CHOSEN_CHORD][2] + octave.toString());
//         const notes = [note1, note2, note3];

//         queue.push(notes);
//         // queue.push(allChords[12])
//     });

//     const play = () => {
//         playSequence();
//         queueIndex = 0;
//     }

//     function playSequence() {
//         setTimeout(() => {
//             // sampler.triggerAttackRelease(queue[queueIndex].toString(), "0.1s");
//             // const reverb = new Tone.Reverb(100).toDestination();
//             const vibrato = new Tone.Vibrato(5, 0.1).toDestination();
//             const synth = new Tone.PolySynth().toDestination();
//             synth.connect(vibrato);
//             // const octave = Math.round(Math.random() * 4) + 1;
//             // const note1 = Tone.Frequency(queue[queueIndex][0].toString() + octave.toString());
//             // const note2 = Tone.Frequency(queue[queueIndex][1].toString() + octave.toString());
//             // const note3 = Tone.Frequency(queue[queueIndex][2].toString() + octave.toString());
//             // const notes = [note1, note2, note3];
//             synth.triggerAttackRelease(queue[queueIndex], "0.2s");

//             queueIndex++;
//             if(queueIndex < queue.length) {
//                 playSequence();
//             }

//             // if(xIndex >= json[i].x) {
//             //     let number = Math.round((json[i].y - minY) / step);
//             //     if (number >= 52) { number = 51; }
                
//             //     movingAverage.shift();
//             //     movingAverage.push(number);
//             //     var total = 0;
//             //     movingAverage.forEach((element: number) => {
//             //         total += element;
//             //     });
//             //     total = Math.round(total / 5);
//             //     console.log(movingAverage, notes[total], total, i);
                

//             //     // sampler.triggerAttackRelease(notes[number], "0.1s");

//             //     const synth = new Tone.PolySynth().toDestination();
//             //     // synth.triggerAttackRelease(notes[number], "0.5s");
//             //     synth.triggerAttackRelease(["C5", "D#5", "G5"], "0.25s");
//             //     i++;
//             // }

//             // xIndex++;
//             // if (xIndex < maxX) {
//             //     playSequence();
//             // }
//         }, 250);
//     }

//     return (
//         <main>
//             <div>Test</div>

//             <button onClick={play}>Play</button>
//         </main>
//     );
// }