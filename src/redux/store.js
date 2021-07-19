//State slices (for now): todoUserInput, todoList.
import { createStore, combineReducers } from "redux";
import { todoListReducer } from "./features/todoList/todoListSlice";
import { userInputReducer } from "./features/todoListUserInput/userInputSlice";
import { filterInputReducer } from "./features/todoListFilterInput/filterInputSlice";

const reducers = {
    todoList: todoListReducer,
    todoUserInput: userInputReducer,
    todoFilterInput: filterInputReducer
};

const store = createStore(combineReducers(reducers), {todoList: [], todoUserInput: '', todoFilterInput: ''});

export default store;