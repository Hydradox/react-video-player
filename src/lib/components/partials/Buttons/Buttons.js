// Versions
import ButtonsMouse from './ButtonsMouse/ButtonsMouse';
import ButtonsTouch from './ButtonsTouch/ButtonsTouch';


function Buttons(props) {
    const selectButtonType = () => {
        if (props.isTouchDevice()) {
            // return <ButtonsTouch {...props} />;
            return <ButtonsMouse {...props} />;
        } else {
            return <ButtonsMouse {...props} />;
        }
    }

    return (
        selectButtonType()
    )
}


export default Buttons;