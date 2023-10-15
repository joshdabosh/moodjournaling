import { motion, AnimatePresence  } from "framer-motion"
import { forwardRef, useRef, useEffect, useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import left1 from "../images/left1.png"
import right1 from "../images/right1.png"
import left2 from "../images/left2.png"
import right2 from "../images/right2.png"
import background from "../images/journal.png"
import tree from "../images/tree.jpg"

import "../style/journal.css"



export default function Journal({visible, toggleVisible, setAppState, isUserLoggedIn, forceRefetch}) {
    const getEntryForDate = async (date) => {
        let response = await fetch("http://localhost:5000/get_entry", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: new Date(date).toISOString()
            })
        })
        let entry = await response.json()

        return entry
    }
    const [currentDate, setCurrentDate] = useState(Date.now())
    let temp_objects = [];
    const populate_temp_objects = async (objects) => {
        // objects = []
        for (let i = 0; i <= 50; i++) {
            console.log(i)
            let res = await getEntryForDate(Date.now() - 1000 * 60 * 60 * 24 * (50 - i))
            console.log(res)
            objects.push({
                entry: res.result[2],
                image: res.result[3]
            })
        }
        setObjects(temp_objects)
    }
    useEffect(() => {
        if (visible == false && isUserLoggedIn == true) {
            populate_temp_objects(temp_objects)
        }
    }, [visible, isUserLoggedIn, forceRefetch])
    const [objects, setObjects] = useState(temp_objects
        /*
        [
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
        ]*/
    )
    const handleDateSwitch = async (direction) => {
        setCurrentDate(currentDate - 1000 * 60 * 60 * 24)
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

    let pageFlip = useRef();
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
                setAppState(1);
                // setCurrentDate(0)
            }
            else{
                // console.log(ref)
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
        <>
        
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
                <HTMLFlipBook
                    ref={pageFlip}
                    className="book"
                    width={420}
                    height={550}
                    drawShadow={false} 
                    flippingTime={700}
                    startPage={objects.length-1}
                    /*
                    onFlip={
                        async (e) => {
                            let res = await getEntryForDate()
                            console.log([{
                                entry: res.result[2],
                                image: tree
                            }, ...objects])
                            console.log(res.result[2])
                            let newEntry = [{
                                entry: res.result[2],
                                image: res.result[3]
                            }, ...objects]
                            // setObjects(newEntry)

                            let res2 = await getEntryForDate()
                            console.log(res2.result[2])
                            let newEntry2 = [{
                                entry: res2.result[2],
                                image: res2.result[3]
                            }, ...newEntry]
                            setObjects(newEntry2)
                            // pageFlip.current.pageFlip().turnToPage(pageFlip.current.pageFlip().getCurrentPageIndex() + 1)
                            // console.log(objects)
                        }
                    }
                    */
                >
                    {makePages(objects)}
                </HTMLFlipBook>
            </motion.div>}
        </AnimatePresence>
       </> 
            
          
    )
}
const Page = forwardRef((props, ref) => {
    return (
      <div className={props.className} ref={ref}> 
        <img className="journalBackground" src={props.format}></img>
        
        <p className="entry">{props.entry}</p>
        <img src= {`data:image/jpeg;base64,${props.image}`} className="aiImage"></img>
        {props.className == "page right right1" && <img src={`data:image/jpeg;base64,${props.image}`} className="aiImage2"/>}
      </div>
    );
  });

// console.log(makePages(objects)) 
function makePages(objects){
    console.log(objects.length)
    var counter = 1;
    
    const pages = objects.map((object) => {
        var classname;
        var format;
        if(counter % 4 == 0) {
            classname = "page right right2"
            format = right2
         } else if(counter % 2 == 0) {
            classname = "page right right1"
            format = right1
        } else if(counter % 4 == 1)  {
            classname = "page left left1"
            format = left1
        } else {
            classname = "page left left2"
            format = left2
        }
        return (
            <Page 
                className={classname} 
                number={counter++} 
                format={format}
                image={object.image}
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
