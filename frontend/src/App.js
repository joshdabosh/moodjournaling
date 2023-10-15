import { useState } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

import Login from './components/Login'

export default function App() {
    const [appState, setAppState] = useState(0); // 0 = login; 1 = landing; 2 = add; 3 = journal 
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
            <Login visible={appState == 0} setAppState={setAppState}/>
            <Landing visible={appState != 0} toggleAdd={toggleAdd} setAppState={setAppState}/>
            <Add visible={appState == 2}/>
            <Journal visible={appState == 3} setAppState={setAppState} />
        </div>
    )
}
