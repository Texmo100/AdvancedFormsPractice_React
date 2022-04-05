import { useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (prevState, action) => {
    if(action.type === 'INPUT'){
        return { value: action.value, isTouched: prevState.isTouched };
    }

    if(action.type === 'BLUR'){
        return { isTouched: true, value: prevState.value };
    }

    if(action.type === 'RESET'){
        return { isTouched: false, value: '' };
    }

    return initialInputState;
}

const useInput = (validateValue) => {
    const [ inputState, dispatch ] = useReducer(inputStateReducer, initialInputState)

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        const { value } = event.target;
        dispatch({type: 'INPUT', value: value});
    };

    const inputBlurHandler = event => {
        dispatch({type: 'BLUR'});
    }

    const reset = () => {
        dispatch({type: 'RESET'})
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;