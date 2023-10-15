import { motion } from "framer-motion"

const rowPositions = ["12.7em", "16.1em", "20.2em", "23.3em", "26.8em"]
const columnPositions = ["0.2em", "4.3em", "8.7em", "13.3em", "17.5em", "23.2em", "27.6em"]
const widths = ["3.3em", "3.5em", "3.8em", "3.6em", "5.3em", "3.65em", "3.6em"]
const heights = ["2.8em", "3.2em", "2.4em", "2.8em", "2.1em"]

const Cell = ({ src, index, calendarWidth }) => {
    const scaleFactor = calendarWidth / 500 ;
    return (
        <motion.img
            style={{
                position: "absolute",
                borderRadius: "10px",
                filter: "brightness(97%)",
                width: `calc(${widths[(index % 7)]} * ${scaleFactor})`,
                height: `calc(${heights[Math.trunc(index/7)]} * ${scaleFactor})`,
                top: `calc(${rowPositions[Math.trunc(index/7)]} * ${scaleFactor})`,
                left: `calc(${columnPositions[(index % 7)]} * ${scaleFactor})`
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