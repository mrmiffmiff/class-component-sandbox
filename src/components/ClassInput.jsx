/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ClassCount from './ClassCount';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editInputVal: null,
      editingTodoIndex: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
    this.endEdit = this.endEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(indexOfTodoToDelete) {
    const newTodos = this.state.todos.toSpliced(indexOfTodoToDelete, 1);
    this.setState((state) => ({
      ...state,
      todos: newTodos,
    }));
  }

  startEdit(indexOfTodoToEdit) {
    this.setState((state) => ({
      ...state,
      editingTodoIndex: indexOfTodoToEdit,
      editInputVal: state.todos[indexOfTodoToEdit],
    }));
  }

  handleEditInputChange(e) {
    this.setState((state) => ({
      ...state,
      editInputVal: e.target.value,
    }));
  }

  endEdit() {
    const newTodos = this.state.todos.slice();
    newTodos[this.state.editingTodoIndex] = this.state.editInputVal;
    this.setState((state) => ({
      ...state,
      todos: newTodos,
      editInputVal: null,
      editingTodoIndex: null,
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit" disabled={this.state.editingTodoIndex !== null}>Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ClassCount
          todos={this.state.todos}
        />
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={todo}>
              {(this.state.editingTodoIndex === index) ? (
                <>
                  <input
                    type='text'
                    name='class-task-edit'
                    value={this.state.editInputVal}
                    onChange={this.handleEditInputChange}
                  />
                  <button type='button' onClick={this.endEdit}>Resubmit</button>
                </>
              ) : (
                <>
                  {todo}
                  <button type="button" onClick={() => this.startEdit(index)} disabled={this.state.editingTodoIndex !== null && this.state.editingTodoIndex !== index}>Edit</button>
                  <button type='button' onClick={() => this.handleDelete(index)} disabled={this.state.editingTodoIndex !== null}>X</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
