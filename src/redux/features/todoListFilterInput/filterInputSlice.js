export const todoSetFilterInput = (newInput) => {
    return {
        type: 'todoUserInput/updateFilter',
        payload: newInput
    };
};

const initialFilterInput = '';
export const filterInputReducer = (filterInput = initialFilterInput, action) => {
    switch (action.type) {
        case 'todoUserInput/updateFilter':
            return action.payload;
        default:
            return filterInput;
    }
}

export const selectFilterInput = (state) => state.todoFilterInput;