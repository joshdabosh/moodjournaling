import BulletinBoard from '../../images/bulletinboard.png'
import Calendar from '../Calendar'
import ShelfBear from '../../images/shelf.png'
import Carpet from "../../images/carpet.png"
import ScrollPoster from "../../images/scrollposter.png"

const computeTopDisplacement = (amt) => {
    return 20-(amt-4000)/10
}

const computeDegrees = (amt) => {
    return -(amt-4000)/80
}

const computeWidth = (amt) => {
    return 1000 + (amt-4000)/15
}

const computeHeight = (amt) => {
    return 250 + (amt-4000)/12
}

const Background = ({style, scrollAmount, authenticated, forceRefetch}) => {
    return (
        <div style={{...style}}>
            <div style={{
                position: "absolute",
                height: `${computeHeight(scrollAmount)/2}px`,
                width: "100vw",
                bottom: 0
            }}>
                <img src={Carpet} style={{position: "absolute", width: "100vw", }} />
            </div>

            <div
                style={{
                    position: "absolute",
                    width: `${computeWidth(scrollAmount)}px`,
                    left: `calc((100vw - ${computeWidth(scrollAmount)}px) / 2)`,
                    top: `${computeTopDisplacement(scrollAmount)}px`,
                    transform: `perspective(500vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
                    transformOrigin: "top",
                }}
            >
                <img src={ShelfBear}
                    style={{
                        position: "absolute",
                        right: `calc(0px - (100vw - (1000px + ${-computeWidth(scrollAmount)/2+500}px)) / 2)`,
                        zIndex: 2,
                        top: `${computeTopDisplacement(scrollAmount)/5}px`,
                        width: `calc((${computeWidth(scrollAmount)}px) / 5)`,
                        transform: `perspective(300vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
                    }}
                />

                <img src={BulletinBoard} style={{
                    width: "100%",
                    position: "absolute"
                }}/>

                {authenticated &&
                    <Calendar
                        style={{
                            position: "absolute",
                            top: "50px",
                            left: `calc((100% - (${computeWidth(scrollAmount)}px / 3)) / 2)`,
                            width: `calc((${computeWidth(scrollAmount)}px) / 3)`
                        }}
                        forceRefetch={forceRefetch}
                        calendarWidth={computeWidth(scrollAmount)/3}
                    />
                }
                
                {!authenticated &&
                    <img src={ScrollPoster} 
                        style={{
                            position: "absolute",
                            top: "100px",
                            left: `calc((100% - (${computeWidth(scrollAmount)}px / 10)) / 2)`,
                            width: `calc((${computeWidth(scrollAmount)}px) / 10)`
                        }}
                    />
                }
            </div>
        </div>
    )
}

export default Background