import { selectFilterInput } from "../todoListFilterInput/filterInputSlice";

export const addTodo = (item) => {
    return { 
        type: 'todoList/addTodo',
        payload: item
    };
}
export const removeTodo = (item) => {
    return { 
        type: 'todoList/removeTodo',
        payload: item
    };
}

const initialTodoList = [];
export const todoListReducer = (todoList = initialTodoList, action) => {
    switch (action.type) {
        case 'todoList/addTodo':
            return [...todoList, action.payload];
        case 'todoList/removeTodo':
            return todoList.filter(item => {return item !== action.payload});
        default:
            return todoList;
    }
}

export const selectTodoList = (state) => state.todoList;
export const selectFilteredTodoList = (state) => {
    const todoList = selectTodoList(state);
    const filterInput = selectFilterInput(state);
    return todoList.filter((item) => {
        return item.toLowerCase().includes(filterInput.toLowerCase());
    });
}