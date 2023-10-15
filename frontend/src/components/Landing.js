import desk from "../images/wood.png"
import addPaper from "../images/addPaper.png"
import "../style/landing.css"
export default function Landing({visible, setAppState}) {
    return(
        <> {visible &&
        <div>
            <img src={desk} id="desk"/>
            <img src={addPaper} id="addPaper" onClick={() => setAppState(2)}/>
            <img src={addPaper} id="journalPaper" onClick={() => setAppState(3)}/>
        </div>
        }
        </>
    )
}
