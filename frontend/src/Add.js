import { useState } from "react";
import paper from "./images/paper.png"
import imagePlaceholder from "./images/polaroid.png"
import pencils from "./images/pencils.png"
import "./add.css"

export default function Add(){
    const  [inputValue, setInputValue] =  useState('');

	const  handleChange = (event) => {
		setInputValue(event.target.value);
	};
    console.log(inputValue);
    return(
        <div>
            <div className="paper">
            <form>
                <textarea  maxLength={50} type="text"  value={inputValue} onChange={handleChange} />
            </form>
                <img src={paper} id="paperImage"/>
            </div>
            <img className="imagePlaceholder" src={imagePlaceholder}></img>
            <img className="pencils" src={pencils}/>
        </div>
    )
    
}