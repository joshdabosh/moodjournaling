import desk from "../images/wood.png"
import addPaper from "../images/addPaper.png"
import "../style/landing.css"
export default function Landing({visible, appState, setAppState}) {
    return(
        <> {visible &&
        <div>
            <img src={desk} id="desk"/>
            <img src={addPaper} id="addPaper" onClick={() => { if (appState == 2) { setAppState(1) } else { setAppState(2) }}} />
            <img src={addPaper} id="journalPaper" onClick={() => setAppState(3)}/>
        </div>
        }
        </>
    )
}
