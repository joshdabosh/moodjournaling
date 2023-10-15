import BulletinBoard from '../../images/bulletinboard.png'
import Calendar from '../Calendar'
import ShelfBear from '../../images/shelf.png'

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

const Background = ({style, scrollAmount, authenticated}) => {
    return (
        <div style={{...style}}>
            <div style={{
                backgroundColor: "grey",
                position: "absolute",
                height: `${computeHeight(scrollAmount)}px`,
                width: "100vw",
                bottom: 0
            }}>
            </div>

            {/* {authenticated &&
                <Calendar style={{
                    zIndex:1,
                    left: `calc((100vw - 200px) / 2)`,
                }}/>
            } */}


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
                        calendarWidth={computeWidth(scrollAmount)/3}
                    />
                }
            </div>
        </div>
    )
}

export default Background