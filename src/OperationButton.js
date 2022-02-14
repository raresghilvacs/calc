import { ACTIONS } from './App';

export const OperationButton = ({ dispatch, operation }) => {
    return (
        <button
            className="operator"
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
        >
            {operation}
        </button>
    );
}