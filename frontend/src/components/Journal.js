import { motion, AnimatePresence  } from "framer-motion"
import { forwardRef, useRef, useEffect, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import left1 from "../images/left1.png"
import right1 from "../images/right1.png"
import background from "../images/journal.png"
import tree from "../images/tree.jpg"

import "../style/journal.css"



export default function Journal({visible, toggleVisible}) {
    const getEntryForDate = async (date) => {
        let response = await fetch("http://127.0.0.1:5050/get_entry", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: currentDate.toISOString()
            })
        })
        let entry = await response.json()
        return entry
    }
    const [currentDate, setCurrentDate] = useState(Date.now())
    const [entries, setEntries] = useState([])
    const handleDateSwitch = async (direction) => {
        setCurrentDate(currentDate + 1000 * 60 * 60 * 24)
        /*
        if (entries.length == 0) {
            setEntries([
                await getEntryForDate(Date.now - 1000 * 60 * 60 * 24),
                await getEntryForDate(Date.now),
                await getEntryForDate(Date.now + 1000 * 60 * 60 * 24),
            ])
            return
        }
        if (entries[0][1]) {}
        */
    }
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
                    {makePages(objects)}
                </HTMLFlipBook>
            </motion.div>}
        </AnimatePresence>
        
            
          
    )
}
const Page = forwardRef((props, ref) => {
    return (
      <div className={props.className} ref={ref}> 
        <img className="journalBackground" src={props.format}></img>
        
        <p className="entry">{props.entry}</p>
        <img src={tree} className="aiImage"></img>
        {props.className == "page right" && <img src={tree} className="aiImage2"/>}
      </div>
    );
  });

let objects = [
    {
        entry: "I hate my life because my wife stole the kids and won the divorce settlement and killed my great grandma's husband",
        image: tree
    }, 
    {
        entry: "I hung out with friends today and had a good time",
        image: tree
    }, 
    {
        entry: "oooh ooh ah ah",
        image: tree
    },
    {
        entry: "hehehe haw hehehe haw hehehe haw hehehe ahw",
        image: tree
    },
    {
        entry:"The quick brown fox jumped over the lazy dog and decided to eat his own poo wow this is such a craazy story frong",
        image: tree
    }
]
console.log("pages")
console.log(makePages(objects))
function makePages(objects){
    var counter = 1;
    
    const pages = objects.map((object) => {
        var classname;
        var format;
        if(counter % 2 == 0) {
            classname = "page right"
            format = right1
        } else {
            classname = "page left"
            format = left1
        }
        return (
            <Page 
                className={classname} 
                number={counter++} 
                format={format}
                image={objects.image}
                entry={object.entry}
            ></Page>
        )
    })
    return pages
}


  
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
