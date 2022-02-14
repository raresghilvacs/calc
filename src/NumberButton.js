import { ACTIONS } from './App';

export const NumberButton = ({ dispatch, number, backgroundColors }) => {
    let colors;
    if (backgroundColors && backgroundColors.size) {
        colors = backgroundColors.get(number);
    }

    return (
        <button
            className="operand"
            style={colors ? { backgroundColor: `rgb(${colors.red}, ${colors.green}, ${colors.blue})` } : {}}
            onClick={() => dispatch({ type: ACTIONS.WRITE_NUMBER, payload: { number } })}
        >
            {number}
        </button>
    );
}