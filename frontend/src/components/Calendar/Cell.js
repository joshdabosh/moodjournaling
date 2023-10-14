import { motion } from "framer-motion"

const Cell = ({ color, index }) => {
    return (
        <motion.div
            style={{
                display: "inline-block",
                backgroundColor: color,
                borderRadius: "10px",
                width: "2em",
                height: "2em",
                gridRow: Math.trunc(index/7)+1,
                gridColumn: (index % 7)+1
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                ease: [0.17, 0.5, 0.83, 1],
                duration: 0.75,
                delay: index/50
            }}
        />
    )
}

export default Cell