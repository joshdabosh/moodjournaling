import { motion } from "framer-motion"

const rowPositions = ["14.05em", "17.6em", "21.8em", "25.4em", "29em"]
const columnPositions = ["0.5em", "4.3em", "8.3em", "12.6em", "16.8em", "21.9em", "25.9em"]
const widths = ["2.3em", "2.6em", "3em", "2.8em", "3.7em", "2.65em", "2.7em"]
const heights = ["2.3em", "3em", "2.4em", "2.5em", "1.9em"]

const Cell = ({ src, index }) => {
    return (
        <motion.img
            style={{
                position: "absolute",
                borderRadius: "10px",
                filter: "brightness(97%)",
                width: widths[(index % 7)],
                height: heights[Math.trunc(index/7)],
                top: rowPositions[Math.trunc(index/7)],
                left: columnPositions[(index % 7)]
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                ease: [0.17, 0.5, 0.83, 1],
                duration: 0.75,
                delay: index/50
            }}
            src={src}
        />
    )
}

export default Cell