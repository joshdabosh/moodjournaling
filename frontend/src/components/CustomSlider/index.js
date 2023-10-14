import { Slider } from "material-ui-slider"
import { useState } from "react"

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
const rgbToHex = (r, g, b) => "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)

const computeHexCode = (val) => {
    if (val > 50) {
        val = 0xffff00 - (Math.trunc(val * 255 / 50) << 16)
    } else {
        val = 0xff0000 + (Math.trunc(val * 255 / 50) << 8)
    }
    return rgbToHex((val & 0xff0000) >> 16, (val & 0xff00) >> 8, (val & 0xff))
}

const CustomSlider = () => {

    const [sliderValue, setSliderValue] = useState(50);

    return (
        <div>
            <Slider
                color={computeHexCode(sliderValue)}
                onChange={setSliderValue}
                defaultValue={50}
            />
        </div>
    )
}

export default CustomSlider