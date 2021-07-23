import { React, useState } from 'react';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {selectTodoList, selectFilteredTodoList ,addTodo, removeTodo} from '../../redux/features/todoList/todoListSlice';
import {selectUserInput, todoSetUserInput, todoClearUserInput} from '../../redux/features/todoListUserInput/userInputSlice';
import {selectFilterInput, todoSetFilterInput} from '../../redux/features/todoListFilterInput/filterInputSlice'; 
import './TodoList.css';

//Other screens to add: Contact me, MY Sports Schedule (can add all the events coming up from all the sports I like), My projects/experience, My Blog

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(selectTodoList);
  const userInput = useSelector(selectUserInput);
  const filteredTodoList = useSelector(selectFilteredTodoList);
  const filterInput = useSelector(selectFilterInput);
  const [filter, setFilter] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(100000);

  const handleChange = (event) => {
    const input = event.target.value;
    dispatch(todoSetUserInput(input));
  }
  const handleKeyPress = (event) => {
    if (event.code === 'Enter') {
      handleClick();
    }
  }
  const handleClick = () => {
    dispatch(addTodo(userInput));
    dispatch(todoClearUserInput());
  }
  const removeItem = (item) => {
    dispatch(removeTodo(item));
    setHoverIndex(100000);
  }
  const handleFilter = (event) => {
    const input = event.target.value;
    setFilter(true);
    dispatch(todoSetFilterInput(input));
  }
  const handleHover = (index) => {
    setHoverIndex(index);
  }

  return (
    <div className="mainTodoDiv">
      <h1>to-do list.</h1>
      <h5>can make a personal to-do list on this page</h5>
      <h6>features include <strong>adding any task</strong> (using the button or the enter key), <strong>filtering through the list</strong> and <strong>deleting tasks once done</strong> (by clicking the task)</h6>
      <div>
        <input value={userInput} onChange={handleChange} onKeyPress={handleKeyPress} className="input" /> 
        <button onClick={handleClick} style={{ marginLeft: 20}}>Add Item</button>
      </div>
      <p style={{marginTop: 10}}>Filter:</p>
      <div style={{marginTop: -10}}>
        <input value={filterInput} onChange={handleFilter} style={{marginBottom: 20}}/>
      </div>
      {!filter && <ul style={{listStyleType: 'none'}}>
        {todoList.map((item, index) => <li onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(100000)}><button style={styles.listButton} onClick={() => removeItem(item)}>
          <div>
            {hoverIndex !== index && <p style={{fontSize: 20}}>{item}</p>}
            {hoverIndex === index && <p style={{color: '#DB4D6D'}}>Click to delete</p>}
          </div>
        </button></li>)}
      </ul>}
      {filter && <ul style={{listStyleType: 'none'}}>
        {filteredTodoList.map((item, index) => <li onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(100000)}><button style={styles.listButton} onClick={() => removeItem(item)}>
          <div>
            {hoverIndex !== index && <p style={{fontSize: 20}}>{item}</p>}
            {hoverIndex === index && <p style={{color: '#DB4D6D'}}>Click to delete</p>}
          </div>
        </button></li>)}
      </ul>}
    </div>
  )
}
export default TodoList;