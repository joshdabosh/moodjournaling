import { useState } from "react";
import Add from "./Add";
import Landing from "./Landing";
import { motion, AnimatePresence  } from "framer-motion"

export default function App() {
    const [add, setAdd] = useState(false);
    function toggleAdd() {
        setAdd(prev => !prev);
    }
    return (
        <div>
            <Landing toggleAdd={toggleAdd}/>
            <Add visible={add}/>
        </div>
    )
}