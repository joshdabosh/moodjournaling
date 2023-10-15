import { useEffect, useState } from "react";
import paper from "../images/paper.png"
import imagePlaceholder from "../images/polaroid.png"
import directions from "../images/colorpencilpaper.png"
import pencils from "../images/pencils.png"
import pen from "../images/pencil.png"
import eraser from "../images/eraser.png"
import paperclip from "../images/paperclip.png"
import inputPaper from "../images/inputpaper.png"
import pencilcase from "../images/pencilcase.png"
import pencil1 from "../images/pencil1.png"
import pencil2 from "../images/pencil2.png"
import pencil3 from "../images/pencil3.png"
import pencil4 from "../images/pencil4.png"
import pencil5 from "../images/pencil5.png"
import pencil6 from "../images/pencil6.png"
import pencil7 from "../images/pencil7.png"
import pencil8 from "../images/pencil8.png"

import { motion, AnimatePresence  } from "framer-motion"
import "../style/add.css"

export default function Add({visible, setAppState, forceRefetch, setForceRefetch}){
    const [inputValue, setInputValue] = useState('');
    // 1 = low, 8 = high
    const [moodValue, setMoodValue] = useState(0);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};
    function wiggle() {
        for(let i = 1; i <= 8; i++){
            setTimeout(() =>{
                setMoodValue(i)
            }, i * 50)
        }
        setTimeout(() => {
            setMoodValue(0)
        }, 9 * 50)
        
    }
    const submitEntry = () => {
        if (moodValue != 0) {
            fetch("http://localhost:5000/new_entry", {
                method: "POST",
                // mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mood: moodValue,
                    entry: inputValue
                })
            })
        }
        
        setTimeout(() => {
            setForceRefetch(!forceRefetch)
        }, 20000)
    }

    let pencilsImages =[pencil1, pencil2, pencil3, pencil4, pencil5, pencil6, pencil7, pencil8]
    let counter = 0;
    let pencils = pencilsImages.map((pencil) => {
        let tempCounter = ++counter;
        return(
                visible && <motion.img src={pencil} className={"pencil + pencil" + counter} key={"pencil" + counter}
                onClick={()=>setMoodValue(tempCounter)}
                whileHover={{
                    y:-24.57,
                    transition: { duration: 0.25},
                  }}
                animate={moodValue==tempCounter ? {y:-24.57} : {y:10}}
                whileTap={{ scale: 0.9 }}
            ></motion.img>
        )
    })
    return(
        <AnimatePresence>
            {visible && <motion.div className="addPaper"
            key="test" 
            animate={{
                y:0
            }} 
            initial={{
                y:800
            }}
            transition={{
                duration: 0.6,
            }}
            exit={{
                y: 800
            }}>
                <form>
                    <textarea placeholder="Enter your feelings here" maxLength={220} type="text"  value={inputValue} onChange={handleChange} />
                </form>
                    <img src={inputPaper} id="paperImage"/>
                    
            </motion.div>}
            
            {visible && <motion.img className="directions" src={directions} key="test22"
            animate={{
                rotate:-20, 
                y:0
            }}
            initial={{
                y:800
            }}
            transition={{
                duration: 0.6, 
            }}
            exit={{
                y:1000
            }}
            />}
            {visible && <motion.img className="eraser" src={eraser} key="eraser"
            onClick={
                ()=> {
                setInputValue("")
                setMoodValue(0)
                }
            
            }
            animate={{
                rotate:-35,
                y:0,
                transition: { duration: 0.5},
            }}
            initial={{
                rotate:75,
                y:300
            }}
            exit={{
                y:1000,
                transition: { duration: 1}
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{
                scale:1.2,
                transition: { duration: 0.2},
            }}
            ></motion.img>}
            {visible && <motion.img className="paperclip" src={paperclip} key="paperclip"
             onClick={
                () => {
                    setAppState(1)
                }
            }
            animate={{
                rotate:75,
                y:0,
                transition: {
                    duration: 0.6
                }
            }}
            initial={{
                rotate:-45,
                y:1000
            }}
            
            whileHover={{
                scale:1.2,
                transition: { duration: 0.2},
            }}
            exit={{
                y:1000,
                transition: { duration: 0.8}
            }}></motion.img>}
            {visible && <motion.img className="paperclip2" src={paperclip} key="paperclip2"
            onClick={
                () => {
                    setAppState(1)
                }
            }
            animate={{
                rotate:35,
                y:0,
                transition: {
                    duration: 0.7
                }
            }}
            initial={{
                rotate:-20,
                y:1200
            }}
            whileHover={{
                scale:1.2,
                transition: { duration: 0.2},
            }}
            exit={{
                y:1000,
                transition: { duration: 0.7},
            }}></motion.img>}
            {visible && <motion.img className="pen" src={pen} key="pencil"
            onClick={
                () => {
                    if(moodValue == 0) {
                        wiggle()
                    } else {
                        submitEntry()
                    
                        setTimeout(()=>{
                            setAppState(1)
                            
                        }, 200)
                        setTimeout(() =>{
                            setInputValue("")
                            setMoodValue(0)
                        }, 250)
                    }
                    
                    
                }
            }
            animate={{
                rotate:-0,
                y:0,
                transition:{
                    duration: 0.7
                }
            }}
            initial={{
                rotate:-20,
                y:1000
            }}
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
            
            exit={{
                y:1000
            }}></motion.img>}
            {visible && <motion.img className="pencilcase" src={pencilcase} key="test123"
            animate={{
                rotate:35,
                y:0
            }}
            initial={{
                rotate:35,
                y:800
            }}
            transition={{
                duration: 0.6
            }}
            exit={{

                y:800
            }}/>}
            {visible && <motion.div className="pencilsWrapper"
            animate={{
                rotate:35,
                y:0,
            }}
            initial={{
                rotate:35,
                y:800
            }}
            transition={{
                duration: 0.6
            }}
            exit={{
                y:800
            }}
            >
                {pencils}
            </motion.div>}
            
        </AnimatePresence >
    )
}
