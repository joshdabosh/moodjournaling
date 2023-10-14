import desk from "../images/desk.jpg"
import addPaper from "../images/addPaper.png"
import "../style/landing.css"
export default function Landing({toggleAdd, toggleJournal}) {
    return(
        <div>
            <img src={desk} id="desk"/>
            <img src={addPaper} id="addPaper" onClick={() => toggleAdd()}/>
            <img src={addPaper} id="journalPaper" onClick={() => toggleJournal()}/>
        </div>
    )
}