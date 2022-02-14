import { useReducer } from 'react';
import { NumberButton } from './NumberButton';
import { OperationButton } from './OperationButton';
import './styles.css';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const numberButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

export const ACTIONS = {
  WRITE_NUMBER: 'WriteNumber',
  CLEAR: 'Clear',
  CHOOSE_OPERATION: 'ChooseOperation',
  EVALUATE: 'Evaluate',
  SEEQ_CRAZY: 'SeeqCrazyRandom'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.WRITE_NUMBER:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.number,
          overwrite: false
        }
      }
      if (payload.number === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.number === "." && state.currentOperand?.includes(".")) {
        return state;
      }

      return {
        ...state,
        error: false,
        currentOperand: `${state.currentOperand || ""}${payload.number}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.currentOperand && !state.previousOperand) {
        return state;
      }
      if (!state.currentOperand) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (!state.previousOperand) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.EVALUATE:
      if (!state.currentOperand && !state.previousOperand) {
        return {
          ...state,
          error: 'Check if you have typed in any numbers'
        }
      }
      if (!state.currentOperand && state.previousOperand && state.operation) {
        return state;
      }
      if (state.currentOperand && !state.previousOperand && !state.operation) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(state),
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.SEEQ_CRAZY:
      return {
        ...state,
        backgroundColors: calculateRandomColors()
      }
    default:
      return {
        ...state
      }
  }
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const calculateRandomColors = () => {
  const colors = new Map();

  numberButtons.forEach(element => {
    const red = getRandomInt(0, 255);
    const green = getRandomInt(0, 255);
    const blue = getRandomInt(0, 255);
    colors.set(element, { red, green, blue });
  });

  return colors;
}

function App() {
  const [{ currentOperand, previousOperand, operation, error, backgroundColors }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculatorWrapper">
      <div className="screen">
        {error ?
          <div className="error">{error}</div> :
          <>
            <div className="previous">
              {previousOperand} {operation}
            </div>
            <div className="current">
              {currentOperand}
            </div>
          </>}
      </div>
      <button className="spanTwo" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>Reset</button>
      <OperationButton operation={'/'} dispatch={dispatch} />
      <OperationButton operation={'-'} dispatch={dispatch} />
      <NumberButton number={'7'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'8'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'9'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <OperationButton operation={'+'} dispatch={dispatch} />
      <NumberButton number={'4'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'5'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'6'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <OperationButton operation={'*'} dispatch={dispatch} />
      <NumberButton number={'1'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'2'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'3'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <button className="spanTwoVertical" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      <button className="operand" onClick={() => dispatch({ type: ACTIONS.SEEQ_CRAZY })}>Q</button>
      <NumberButton number={'0'} dispatch={dispatch} backgroundColors={backgroundColors} />
      <NumberButton number={'.'} dispatch={dispatch} backgroundColors={backgroundColors} />
    </div>
  );
}

export default App;
