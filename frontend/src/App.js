import { useState } from "react";
import Add from "./Add";
import Landing from "./Landing";

export default function App() {
    const [add, setAdd] = useState(false);
    function toggleAdd() {
        setAdd(prev => !prev);
    }
    return (
        <div>
            <Landing toggleAdd={toggleAdd}/>
            { add && <Add />}
        </div>
    )
}