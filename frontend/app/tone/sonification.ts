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
const CHOSEN_CHORD = 12;

const octaves = ["1", "2", "3", "4", "5", "6", "7", "8"];
const NUM_NOTES = octaves.length;

const vibrato = new Tone.Vibrato(5, 0.1).toDestination();
const synth = new Tone.PolySynth().toDestination();
synth.connect(vibrato);
const TEMPO_DELAY = 250;

let queueIndex = 0;
let queue: Tone.FrequencyClass[][] = [];

export function loadData(data:string) {
    const stars = JSON.parse(data);

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
        const note1 = Tone.Frequency(allChords[CHOSEN_CHORD][0] + octave.toString());
        const note2 = Tone.Frequency(allChords[CHOSEN_CHORD][1] + octave.toString());
        const note3 = Tone.Frequency(allChords[CHOSEN_CHORD][2] + octave.toString());
        const notes = [note1, note2, note3];

        queue.push(notes);
    });
}

function playSequence() {
    setTimeout(() => {
        synth.triggerAttackRelease(queue[queueIndex], "0.2s");

        queueIndex++;
        if(queueIndex < queue.length) {
            playSequence();
        }
    }, TEMPO_DELAY);
}

export async function play() {
    return new Promise((resolve, reject) => {
        playSequence();
        queueIndex = 0;
        resolve("Done!");
    })
}