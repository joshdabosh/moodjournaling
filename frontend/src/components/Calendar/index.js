import React, { useState, useEffect } from "react"

import Cell from "./Cell"
import BlankCalendar from "../../images/calendar.png"

import Colored1 from "./images/coloredin1.png"
import Colored2 from "./images/coloredin2.png"
import Colored3 from "./images/coloredin3.png"
import Colored4 from "./images/coloredin4.png"
import Colored5 from "./images/coloredin5.png"
import Colored6 from "./images/coloredin6.png"
import Colored7 from "./images/coloredin7.png"
import Colored8 from "./images/coloredin8.png"

const colorsList = ["#fff996",
    "#e7ff96",
    "#c7ff96",
    "#96ffad",
    "#96ffdb",
    "#96f0ff",
    "#96d4ff",
    "#96b6ff"
]

const SCRIBBLES = [Colored1, Colored2, Colored3, Colored4, Colored5, Colored6, Colored7, Colored8]

const Calendar = ({style, calendarWidth}) => {
    const [calendarData, setCalendarData] = useState([])

    const fetchCalendarData = async () => {
        const {results} = await fetch("http://localhost:5000/get_calendar", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: new Date().toISOString().replace(/\.\d{3}Z$/gm, '')
            })
        }).then(e => e.json())

        setCalendarData(results)
    }

    useEffect(() => {
        fetchCalendarData()
    }, [])
    
    return (
        <div style={{...style, position:"relative"}}>
            <img src={BlankCalendar} style={{"position":"absolute", width:"100%"}}/>
            {calendarData.map((value, index) => {
                return (
                    <React.Fragment key={index}>
                        {value && 
                            <Cell src={SCRIBBLES[value[1]]} index={index} calendarWidth={calendarWidth}/>
                        }
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Calendar
