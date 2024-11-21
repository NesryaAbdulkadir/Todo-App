import React, { useEffect, useState } from "react";
import { todoElements } from "../../config";
import Form from "../Form";
import Card from "../Card";
import { Delete, Edit } from "lucide-react";

const initialFormData = {
  todo: "",
};

export default function Todo() {
  const [todoData, setTodoData] = useState(initialFormData);
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoData.Todo) {
      if (editedTodo) {
        console.log("edited", editedTodo);

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

  function toggleTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function handleDelete(id) {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  }

  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    console.log(id);

    console.log("todopEdit", todoToEdit.todo);

    if (todoToEdit) {
      setTodoData({ Todo: todoToEdit.todo });
      setEditedTodo(id);
      console.log("Edit", editedTodo);
    }
  }
  console.log("data", todoData);

  return (
    <div>
      <Form
        formControl={todoElements}
        formData={todoData}
        setFormData={setTodoData}
        btnText={"Add Task"}
        handleSubmit={handleSubmit}
        className={"form-container"}
        inputClassName={"todo-input"}
        ButtonClassName={"todo-btn"}
      />
      <ul className="todo-card-container">
        {todos?.length > 0
          ? todos.map((todo, index) => (
              <div
                key={index}
                className={"todo-cards" + (todo.completed ? " completed" : "")}
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
            ))
          : null}
      </ul>
    </div>
  );
}
