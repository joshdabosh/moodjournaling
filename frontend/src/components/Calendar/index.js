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

const cellColors = [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1]

const Calendar = ({style, calendarWidth}) => {    
    return (
        <div style={{...style, position:"relative"}}>
            <img src={BlankCalendar} style={{"position":"absolute", width:"100%"}}/>
            {cellColors.map((value, index) => (
                <Cell src={SCRIBBLES[value]} key={index} index={index} calendarWidth={calendarWidth}/>
            ))}
        </div>
    )
}

export default Calendar