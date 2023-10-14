import { useState } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

export default function App() {
    const [add, setAdd] = useState(false);
    const [journal, setJournal] = useState(false);
    function toggleAdd() {
        setAdd(prev => !prev);
    }
    function toggleJournal(){
        setJournal(prev => !prev);
    }

    return (
        <div>
            <Landing toggleAdd={toggleAdd}/>
            <Add visible={add}/>
            <Journal visible={journal} />
        </div>
    )
}