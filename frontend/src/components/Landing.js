import desk from "../images/wood.png"
import addPaper from "../images/addPaper.png"
import papers from "../images/papers.png"
import stack from "../images/stack.png"
import journalAngle from "../images/journalangle3.png"
import "../style/landing.css"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Landing({visible, appState, setAppState, scrollToBottom, scrollToTop}) {
    const [showAddPile, setAddPile] = useState(true)
    const [showJournalCover, setJournalcover] = useState(true)
    
    useEffect(() => {
        if(appState != 2 && appState != 3) {
            setTimeout(() => {
                scrollToTop()
                setAddPile(true)
                setJournalcover(true)
            }, 500)
        }
    },[appState])
    const [list, setList] = useState({
        journalOut: {
            y:1000,
            transition: { duration: 0.7, delay: 0.3},
            rotate: -10
        },
        stackOut: {
            y:600,
            transition: { duration: 1, delay: 0.3},
            rotate: -10
        }
    })
    return(
        <> {visible &&
        <div>
            <img src={desk} id="desk"/>
            <AnimatePresence>
            {showJournalCover && <motion.img src={journalAngle} id="journalPaper" key="journalcover"onClick={() =>{
                setAddPile(false)
                setJournalcover(false)
                
                setTimeout(() => {
                    scrollToBottom()
                }, 700)
                setTimeout(() => {
                    
                    setAppState(3)
                }, 1000)}}
                animate={{
                    y:0,
                    transition: { duration: 0.7},
                    
                }}
                variants={list}
                initial={{
                    y:1000
                }}
                exit="journalOut"
                whileTap={{ scale: 0.9 }}
                whileHover={{
                    scale:1.2,
                    transition: { duration: 0.2},
                }} />}
                { showAddPile && <motion.img src={stack} id="addPile" onClick={() => {
                    setAddPile((false))
                    setJournalcover((false))
                    setTimeout(() => {
                        scrollToBottom()
                    }, 700)
                    setTimeout(() => {
                        setAppState(2)
                    }, 1000)}}
                animate={{
                    y:0,
                    transition: { duration: 0.7},
                    rotate: -10
                }}
                initial={{
                    y:500
                }}
                exit="stackOut"
                variants={list}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                    scale:1.2,
                    transition: { duration: 0.2},
                }}
                ></motion.img>}
                { showAddPile && <motion.img src={papers} id="papers" key="papers"
                animate={{
                    y:0,
                    transition: { duration: 0.7},
                    rotate: 20
                }}
                initial={{
                    y:600
                }}
                exit={{
                    y:700,
                    transition: { duration: 1, delay: 0.3},
                    rotate: 0
                }}
                variants={list}
                ></motion.img>}
            </AnimatePresence>
            
        </div>
        }
        </>
    )
}
