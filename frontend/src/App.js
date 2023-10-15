import { useState, useEffect } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

import Login from './components/Login'

const DEFAULT_SCROLL_AMT = 4000;

const computeDegrees = (amt) => {
    return 90 - (amt / 100 > 90 ? 90 : amt/100);
}

export default function App() {
    const [appState, setAppState] = useState(1); // 0 = login; 1 = landing; 2 = add; 3 = journal 
    const [add, setAdd] = useState(false);
    const [journal, setJournal] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(DEFAULT_SCROLL_AMT)
    
    function toggleAdd() {
        setAdd(prev => !prev);
    }
    function toggleJournal(){
        setJournal(prev => !prev);
    }

    useEffect(() => {
        const handleScroll = (e) => {
            setScrollAmount((current) => Math.min(Math.max(current + e.deltaY, DEFAULT_SCROLL_AMT), 9000))
        }

        window.addEventListener('wheel', handleScroll)
        
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [])

    return (
        <div style={{
            "transform": `perspective(100vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
            "transformOrigin": "bottom",
            "height":"100vh"
        }}>
            <Login visible={appState == 0} setAppState={setAppState}/>
            <Landing visible={appState != 0} appState={appState} setAppState={setAppState}/>
            <Add visible={appState == 2}/>
            <Journal visible={appState == 3} setAppState={setAppState} />
        </div>
    )
}
