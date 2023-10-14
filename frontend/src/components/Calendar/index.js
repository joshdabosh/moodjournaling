import Cell from "./Cell"

const cellColors = ["red", "red", "red", "red", "red", "red", "red", "green", "yellow", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"]

const Calendar = () => {    
    return (
        <div>
            <div style={{
                display: "grid",
                background: "white",
                position: "absolute",
                gridTemplateColumns: "2em 2em 2em 2em 2em 2em 2em",
                gridTemplateRows: "2em 2em 2em 2em 2em",
                height: "12em",
                gridGap: "3px",
                alignContent: "space-between"
            }}>
                {cellColors.map((value, index) => (
                    <Cell color={value} key={index} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Calendar