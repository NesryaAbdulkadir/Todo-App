import React, { Fragment, useEffect, useState } from "react";
import { todoElements } from "../../config";
import Form from "../Form";
import Card from "../Card";
import { Delete, Edit } from "lucide-react";
import DropArea from "../DropArea";

const initialFormData = {
  todo: "",
};

export default function Todo() {
  const [todoData, setTodoData] = useState(initialFormData);
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (!localTodos) return;
    const oldTodos = JSON.parse(localTodos);
    setTodos(oldTodos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoData.Todo) {
      if (editedTodo) {
        const updateTodo = todos.map((todo) =>
          todo.id === editedTodo ? { ...todo, todo: todoData.Todo } : todo
        );
        setTodos(updateTodo);
        setEditedTodo(null);
      } else {
        setTodos([
          ...todos,
          { id: todos.length + 1, todo: todoData.Todo, completed: false },
        ]);
      }
    }
    setTodoData(initialFormData);
  };

  useEffect(() => {
    addToLocalStorage();
  }, [todos]);

  function addToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function toggleTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
    addToLocalStorage();
  }

  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    console.log(id);

    console.log("todopEdit", todoToEdit.todo);

    if (todoToEdit) {
      setTodoData({ Todo: todoToEdit.todo });
      setEditedTodo(id);
    }
  }

  function onDrag(position) {
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = todos[activeCard];
    const updatedTodos = todos.filter((task, index) => index !== activeCard);
    updatedTodos.splice(position, 0, taskToMove);
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-container">
      <Form
        formControl={todoElements}
        formData={todoData}
        setFormData={setTodoData}
        btnText={editedTodo ? " Edit Task" : "Add Task"}
        handleSubmit={handleSubmit}
        className={"form-container"}
        inputClassName={"todo-input"}
        ButtonClassName={"todo-btn"}
      />
      <ul className="todo-card-container">
        <DropArea onDrop={() => onDrag(0)} />

        {todos?.length > 0
          ? todos.map((todo, index) => (
              <Fragment key={index}>
                <div
                  className={
                    "todo-cards" + (todo.completed ? " completed" : "")
                  }
                  draggable
                  onDragStart={() => setActiveCard(index)}
                  onDragEnd={() => setActiveCard(null)}
                >
                  <Card
                    className={"todo-card"}
                    content={todo.todo}
                    onClick={() => toggleTodo(todo.id)}
                  />
                  <div className="todo-card-actions">
                    <Delete onClick={() => handleDelete(todo.id)} />
                    <Edit onClick={() => handleEdit(todo.id)} />
                  </div>
                </div>
                <DropArea onDrop={() => onDrag(index + 1)} />
              </Fragment>
            ))
          : null}
      </ul>
    </div>
  );
}
