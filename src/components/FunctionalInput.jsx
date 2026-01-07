import React, { useState } from 'react';
import FunctionalCount from './FunctionalCount';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');
  const [editInputVal, setEditInputVal] = useState(null);
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal('');
  };

  function handleDelete(indexOfTodoToDelete) {
    const newTodos = todos.toSpliced(indexOfTodoToDelete, 1);
    setTodos(newTodos);
  }

  function startEdit(indexOfTodoToEdit) {
    setEditingTodoIndex(indexOfTodoToEdit);
    setEditInputVal(todos[indexOfTodoToEdit]);
  }

  function handleEditInputChange(e) {
    setEditInputVal(e.target.value);
  }

  function endEdit() {
    const newTodos = todos.slice();
    newTodos[editingTodoIndex] = editInputVal;
    setTodos(newTodos);
    setEditInputVal(null);
    setEditingTodoIndex(null);
  }

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={editingTodoIndex !== null}>Submit</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <FunctionalCount
        todos={todos}
      />
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            {(editingTodoIndex === index) ? (
              <>
                <input
                  type='text'
                  name='task-edit'
                  value={editInputVal}
                  onChange={handleEditInputChange}
                />
                <button type='button' onClick={endEdit}>Resubmit</button>
              </>
            ) : (
              <>
                {todo}
                <button type='button' onClick={() => startEdit(index)} disabled={editingTodoIndex !== null && editingTodoIndex !== index}>Edit</button>
                <button type='button' onClick={() => handleDelete(index)} disabled={editingTodoIndex !== null}>X</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
