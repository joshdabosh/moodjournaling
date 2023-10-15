import { useState } from "react";
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

export default function Add({visible}){
    const [inputValue, setInputValue] = useState('');
    // 1 = low, 8 = high
    const [moodValue, setMoodValue] = useState(0);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};
    
    console.log(moodValue);
    const submitEntry = (event) => {
        fetch("http://127.0.0.1:5050/new_entry", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mood: moodValue,
                entry: inputValue
            })
        })
    }
    console.log(inputValue);
    console.log(window.outerHeight);
    console.log(window.outerWidth);

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
                    <textarea  maxLength={50} type="text"  value={inputValue} onChange={handleChange} />
                </form>
                    <img src={inputPaper} id="paperImage"/>
                    <button onClick={submitEntry}> ky5 </button>
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
            animate={{
                rotate:-35,
                y:0
            }}
            initial={{
                rotate:75,
                y:300
            }}
            transition={{
                duration: 0.6
            }}
            exit={{
                y:300
            }}></motion.img>}
            {visible && <motion.img className="paperclip" src={paperclip} key="paperclip"
            animate={{
                rotate:75,
                y:0
            }}
            initial={{
                rotate:-45,
                y:1000
            }}
            transition={{
                duration: 0.6
            }}
            exit={{
                y:1000,
                duration: 1
            }}></motion.img>}
            {visible && <motion.img className="paperclip2" src={paperclip} key="paperclip2"
            animate={{
                rotate:35,
                y:0
            }}
            initial={{
                rotate:-20,
                y:1200
            }}
            transition={{
                duration: 0.7
            }}
            exit={{
                y:1000
            }}></motion.img>}
            {visible && <motion.img className="pen" src={pen} key="pencil"
            animate={{
                rotate:-0,
                y:0
            }}
            initial={{
                rotate:-20,
                y:1000
            }}
            transition={{
                duration: 0.6
            }}
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
