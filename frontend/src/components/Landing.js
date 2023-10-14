import desk from "../images/desk.jpg"
import addPaper from "../images/addPaper.png"
import "../style/landing.css"
export default function Landing({toggleAdd}) {
    return(
        <div>
            <img src={desk} id="desk"/>
            <img src={addPaper} id="addPaper" onClick={() => toggleAdd()}/>
        </div>
    )
}