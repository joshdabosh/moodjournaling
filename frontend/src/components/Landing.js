import desk from "../images/wood.png"
import addPaper from "../images/addPaper.png"
import stack from "../images/stack.png"
import "../style/landing.css"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Landing({visible, appState, setAppState}) {
    const [showAddPile, setAddPile] = useState(true)
    useEffect(() => {
        if(appState != 2 && appState != 3) {
            setTimeout(() => {
                setAddPile(true)
            }, 500)
            
        }
    },[appState])
    return(
        <> {visible &&
        <div>
            <img src={desk} id="desk"/>
            <img src={addPaper} id="journalPaper" onClick={() =>{
                setAddPile(false)
                setTimeout(() => {
                    setAppState(3)
                }, 700)
                
            }
            } />
            <AnimatePresence>
                { showAddPile && <motion.img src={stack} id="addPile" onClick={() => {
                    setAddPile((false))
                    setTimeout(() => {
                        setAppState(2)
                    }, 700)}}
                animate={{
                    y:0,
                    transition: { duration: 0.7},
                    rotate: -10
                }}
                initial={{
                    y:1000
                }}
                exit={{
                    rotate:-10,
                    y:1000,
                    scale:0.9,
                    transition: { duration: 1},
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                    scale:1.2,
                    transition: { duration: 0.2},
                }}
                ></motion.img>}
            </AnimatePresence>
            
        </div>
        }
        </>
    )
}
