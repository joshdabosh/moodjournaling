import { useState } from "react";
import paper from "./images/paper.png"
import imagePlaceholder from "./images/polaroid.png"
import pencils from "./images/pencils.png"
import { motion, AnimatePresence  } from "framer-motion"
import "./add.css"

export default function Add({visible}){
    const  [inputValue, setInputValue] =  useState('');

	const  handleChange = (event) => {
		setInputValue(event.target.value);
	};
    console.log(inputValue);
    return(
        <AnimatePresence>
            {visible && < motion.div className="paper"
            key="test" 
            animate={{
                rotate: 6, 
                y:0
            }} 
            initial={{
                y:800
            }}
            transition={{
                duration: 0.5,
                delay: 0.1,
            }}
            exit={{
                y: 800
            }}>
                <form>
                    <textarea  maxLength={50} type="text"  value={inputValue} onChange={handleChange} />
                </form>
                    <img src={paper} id="paperImage"/>
            </motion.div>}
            
            {visible && <motion.img className="imagePlaceholder" src={imagePlaceholder} key="test22"
            animate={{
                rotate:-9, 
                y:0
            }}
            initial={{
                y:700
            }}
            transition={{
                duration: 0.5, 
            }}
            exit={{
                y:700
            }}
            />}
            {visible && <motion.img className="pencils" src={pencils} key="test123"
            animate={{
                rotate:35,
                y:0
            }}
            initial={{y:300}}
            transition={{
                duration: 0.5
            }}
            exit={{
                y:300
            }}/>}
        </AnimatePresence >
    )
}