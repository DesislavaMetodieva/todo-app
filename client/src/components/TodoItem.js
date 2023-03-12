import React from "react";
import "./TodoItem.css";
import axios from "axios";

const TodoItem = ({ todo }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5001/${todo.id}`);
    
  };

  const handleUpdate = async () => {
    const updatedTodo = { ...todo, message: "Updated message" };
    await axios.put(`http://localhost:5001/${todo.id}`, updatedTodo);
  };

  return (
    <div className="todoItem">
      <h1>{todo.message}
        <button type="button" onClick={handleUpdate} className="updateBtn">
          Update
        </button>
        <button type="button" onClick={handleDelete} className="deleteBtn">
          Delete
        </button>
      </h1>
    </div>
  );
};

export default TodoItem;

 