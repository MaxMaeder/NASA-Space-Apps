"use client";
import { motion } from 'framer-motion';

export default function Button(props: { text: string, onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.9 }}
            className={"border-2 border-slate-600 bg-slate-800 text-lg p-1 px-2 rounded-lg w-fit cursor-pointer"}
            onClick={props.onClick}
        >{props.text}</motion.div>
    )
}
