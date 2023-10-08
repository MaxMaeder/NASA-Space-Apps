// Takes in JSON
// Handles Rest

import * as Tone from 'tone';

type Star = {
    x: number;
    y: number;
    size: number;
}

const majorChords = [
    ["C", "E", "G"],
    ["D", "F#", "A"],
    ["E", "G#", "B"],
    ["F", "A", "C"],
    ["G", "B", "D"],
    ["A", "C#", "E"],
    ["B", "D#", "F#"],
];
const minorChords = [
    ["C", "D#", "G"],
    ["D", "F", "A"],
    ["E", "G", "B"],
    ["F", "G#", "C"],
    ["G", "A#", "D"],
    ["A", "C", "E"],
    ["B", "D", "F#"],
];
const allChords = [...majorChords, ...minorChords];
let chosen_chord = 12;

const octaves = ["1", "2", "3", "4", "5", "6", "7", "8"];
const octaveTimeMultiplier = [1.2, 1, 0.8, 0.7, 0.3, 0.05, 0.01, 0.05];
const NUM_NOTES = octaves.length;

const vibrato = new Tone.Vibrato(5, 0.1).toDestination();
const synth = new Tone.PolySynth().toDestination();
synth.connect(vibrato);

const TEMPO_DELAY = 0.25;
const SHORT_NOTE = 0.75;
const LONG_NOTE = SHORT_NOTE * 2;

let queueIndex = 0;
let queue: Tone.FrequencyClass[][] = [];
let isPlaying = true;

function loadData(data: any) {
    const stars = data;

    var minY = stars[0].y, maxY = stars[0].y;
    var array1 = stars.map((star: Star) => star.y);
    array1.forEach((element: number) => {
        minY = Math.min(minY, element);
        maxY = Math.max(maxY, element);
    });
    const step = Math.round((maxY - minY) / NUM_NOTES);

    let movingAverage = [0, 0, 0, 0, 0];

    // Choosing note based off of y position of star
    stars.forEach((element: Star) => {
        let number = Math.round((element.y - minY) / step);
        if (number > NUM_NOTES - 1) { number = NUM_NOTES - 1; }

        movingAverage.shift();
        movingAverage.push(number);

        let movingAverageTotal = 0;
        movingAverage.forEach((yPos: number) => {
            movingAverageTotal += yPos;
        });
        let octaveFromMovingAverage = Math.round(movingAverageTotal / 5);

        const octave = octaves[octaveFromMovingAverage];
        const note1 = Tone.Frequency(allChords[chosen_chord][0] + octave.toString());
        const note2 = Tone.Frequency(allChords[chosen_chord][1] + octave.toString());
        const note3 = Tone.Frequency(allChords[chosen_chord][2] + octave.toString());
        const notes = [[note1, note2, note3], octaveTimeMultiplier[octaveFromMovingAverage]];   

        queue.push(notes);
    });
}

function playSequence(res?: () => void) {
    // setTimeout(() => {
    //     synth.triggerAttackRelease(queue[queueIndex], "0.2s");

    //     queueIndex++;
    //     if(queueIndex < queue.length && isPlaying) {
    //         playSequence(res);
    //     } else if (res) {
    //         res();
    //     }
    // }, TEMPO_DELAY);
    console.log(Tone.now());
    for(let i = 0; i < queue.length; i++) {
        if((i + 1) % 3 == 1) {
            let note_length = LONG_NOTE;
            synth.triggerAttackRelease(queue[i][0], (queue[i][1]*note_length) + "s", (TEMPO_DELAY*i) + "s");
        } else {
            let note_length = SHORT_NOTE;
            synth.triggerAttackRelease(queue[i][0], (queue[i][1]*note_length) + "s", (TEMPO_DELAY*i) + "s");
        }
    }

    setTimeout(() => {
        if (res) {
            res();
            console.log("Done!")
        }
    }, TEMPO_DELAY*queue.length*1000);
}

export default async function play(data:string) {
    console.log(data);
    loadData(data);
    chosen_chord = 12;
    isPlaying = true;

    await Tone.start();
    return new Promise((resolve, reject) => {
        playSequence(() => resolve("Done!"));
        queueIndex = 0;
    })
}

export function stopPlaying() {
    isPlaying = false;
}