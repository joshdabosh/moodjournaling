import { useState, useEffect, useRef } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

import Login from './components/Login'

import Calendar from './components/Calendar'

import Background from './components/Background'

const DEFAULT_SCROLL_AMT = 4000;

const computeDegrees = (amt) => {
    return 90 - (amt / 100 > 90 ? 90 : amt/100);
}

export default function App() {
    const [appState, setAppState] = useState(0) // 0 = login; 1 = landing; 2 = add; 3 = journal 
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
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
                setScrollAmount(4000 +  102.82855943 * Math.pow(i, 1/1.6));
            }, i )
            
        }
    }
    function scrollToTop(){
        if(scrollAmount === DEFAULT_SCROLL_AMT) {
            return;
        }
        for(let i = 0; i <= 500; i++) {
            setTimeout(()=>{
                setScrollAmount(9000 - 102.82855943 * Math.pow(i, 1/1.6));
            }, i )
            
        }
    }
    
    useEffect(() => {
        fetch("http://localhost:5000/authcheck", {
            credentials: 'include'
        }).then(resp => {
            if (resp.ok) {
                setIsUserLoggedIn(true)
                setAppState(1)
            }
        })
    }, [])

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
        <div style={{backgroundColor:"#F4E7CF", width:"100vw", height:"100vh"}}>
            <Background scrollAmount={scrollAmount}/>
            <div style={{
                transform: `perspective(100vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
                transformOrigin: "bottom",
                height: "100vh"
            }}>
                <Login visible={appState == 0} setAppState={setAppState}/>
                <Landing visible={appState != 0} appState={appState} setAppState={setAppState} 
                    scrollToBottom={scrollToBottom} scrollToTop={scrollToTop}/>
                <Add visible={appState == 2} setAppState={setAppState}/>
                <Journal visible={appState == 3} setAppState={setAppState} />
            </div>
        </div>
    )
}
