import { useState, useEffect, useRef } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

import Login from './components/Login'

import Calendar from './components/Calendar'

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
    function scrollToBottom(){
        for(let i = 0; i <= 500; i++) {
            setTimeout(()=>{
                setScrollAmount(4000 + i * 10);
            }, i )
            
        }
    }
    function scrollToTop(){
        for(let i = 0; i <= 500; i++) {
            setTimeout(()=>{
                setScrollAmount(9000 - i * 10);
            }, i )
            
        }
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
        <>
            <Calendar />
            <div style={{
                "transform": `perspective(100vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
                "transformOrigin": "bottom",
                "height":"100vh"
            }}>
                <Login visible={appState == 0} setAppState={setAppState}/>
                <Landing visible={appState != 0} appState={appState} setAppState={setAppState} 
                    scrollToBottom={scrollToBottom} scrollToTop={scrollToTop}/>
                <Add visible={appState == 2} setAppState={setAppState}/>
                <Journal visible={appState == 3} setAppState={setAppState} />
            </div>
        </>
    )
}
