import { motion, AnimatePresence  } from "framer-motion"
import { forwardRef, useRef, useEffect } from "react";
import HTMLFlipBook from 'react-pageflip';
import left1 from "../images/left1.png"
import right1 from "../images/right1.png"
import background from "../images/journal.png"

import "../style/journal.css"



export default function Journal({visible, toggleVisible}) {
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
              toggleVisible();
            }
            else{
                console.log(ref)
            }
          }
          // Bind the event listener
          document.addEventListener("mouseup", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
          };
        }, [ref]);
      }
    const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
    return(
        <AnimatePresence >
            {visible && <motion.div className="bookContainer" animate={{
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
            }} >
                <img ref={wrapperRef} src={background} id="bookBackground"></img>
                <HTMLFlipBook className="book" width={420} height={550} drawShadow={false} flippingTime={700}>
                    <Page number="1" classn="left" image={left1}>Page text</Page>
                    <Page number="2" classn="right" image={right1}>Page text</Page>
                    <Page number="3" classn="left" image={left1}>Page text</Page>
                    <Page number="4" classn="right" image={right1}>Page text</Page>
                    <Page number="5" classn="left" image={left1}>Page text</Page>
                    <Page number="6" classn="right" image={right1} >Page text</Page>
                </HTMLFlipBook>
            </motion.div>}
        </AnimatePresence>
        
            
          
    )
}
function makePages(){

}
const Page = forwardRef((props, ref) => {
    var classname = "page " + props.classn
    console.log(classname)
    return (
      <div className={classname} ref={ref}> 
        <img className="journalBackground" src={props.image}></img>
        <p>{props.entry}</p>
      </div>
    );
  });

  
/* <AnimatePresence >
                {visible && <motion.img src={journalImage} id="journalImage" key="journalImage"
                    animate={{
                        y:0
                    }}
                    initial={{
                        y:700
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    exit={{
                        y:700
                    }}
                />}
                {visible && <motion.p className="entry">Today my wife left me and took the kids. I am the big sad. Please help me</motion.p>}
            </AnimatePresence> */