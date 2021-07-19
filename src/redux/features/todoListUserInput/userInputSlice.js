export const todoSetUserInput = (newInput) => {
    return {
        type: 'todoUserInput/updateInput',
        payload: newInput
    };
};

export const todoClearUserInput = () => {
    return {
        type: 'todoUserInput/clearInput'
    }
}

const initialInput = '';
export const userInputReducer = (todoUserInput = initialInput, action) => {
    switch (action.type) {
        case 'todoUserInput/updateInput':
            return action.payload;
        case 'todoUserInput/clearInput':
            return '';
        default:
            return todoUserInput;
    }
};

export const selectUserInput = (state) => state.todoUserInput;