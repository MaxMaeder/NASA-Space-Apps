"use client";

import * as Tone from 'tone'

// //create a synth and connect it to the main output (your speakers)
// const synth = new Tone.Synth().toDestination();

// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

export default function TonePage() {
    const play = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
    }


    return (
        <main>
            <div>Test</div>

            <button onClick={play}>Play</button>
        </main>
    );
}