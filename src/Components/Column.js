import React from "react";
import TaskCard from "./TaskCard";

function Column({ column, columns, setColumns }) {
  
  const addTask = () => {
    const title = prompt("Enter task name:");
    if (!title) return;

    const updatedColumns = columns.map(col =>
      col.id === column.id
        ? { ...col, tasks: [...col.tasks, { id: Date.now(), title }] }
        : col
    );
    setColumns(updatedColumns);
  };

  const deleteColumn = () => {
    if (columns.length === 1) return alert("At least one column is required");
    if (!window.confirm("Delete this column?")) return;

    setColumns(columns.filter(col => col.id !== column.id));
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <button className="delete-column-btn" onClick={deleteColumn}>×</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Description</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {column.tasks.map(task => (
            <tr key={task.id}>
              <TaskCard
                task={task}
                column={column}
                columns={columns}
                setColumns={setColumns}
              />
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-task-btn" onClick={addTask}>+ Add Task</button>
    </div>
  );
}

export default Column;