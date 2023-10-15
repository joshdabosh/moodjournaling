import { useState } from "react";
import paper from "../images/paper.png"
import imagePlaceholder from "../images/polaroid.png"
import directions from "../images/colorpencilpaper.png"
import pencils from "../images/pencils.png"
import pen from "../images/pen.png"
import eraser from "../images/eraser.png"
import paperclip from "../images/paperclip.png"
import inputPaper from "../images/inputpaper.png"
import pencilcase from "../images/pencilcase.png"

import { motion, AnimatePresence  } from "framer-motion"
import "../style/add.css"

export default function Add({visible}){
    const [inputValue, setInputValue] = useState('');

    // 1 = low, 8 = high
    const [moodValue, setMoodValue] = useState(8);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

    const submitEntry = (event) => {
        fetch("http://127.0.0.1:5000/new_entry", {
            method: "POST",
            mode: "cors",
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
    console.log(inputValue);
    console.log(window.outerHeight);
    console.log(window.outerWidth);
    return(
        <AnimatePresence>
            {visible && < motion.div className="addPaper"
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
                y:700
            }}
            transition={{
                duration: 0.6, 
            }}
            exit={{
                y:700
            }}
            />}
            {visible && <motion.img className="pencilcase" src={pencilcase} key="test123"
            animate={{
                rotate:35,
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
            }}/>}
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
                rotate:-360,
                y:300
            }}
            transition={{
                duration: 0.6
            }}
            exit={{
                y:300
            }}></motion.img>}
            {visible && <motion.img className="paperclip" src={paperclip} key="paperclip2"
            animate={{
                rotate:35,
                y:0
            }}
            initial={{
                rotate:360,
                y:300
            }}
            transition={{
                duration: 0.6
            }}
            exit={{
                y:300
            }}></motion.img>}
        </AnimatePresence >
    )
}
