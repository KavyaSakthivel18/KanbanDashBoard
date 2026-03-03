import React from "react";
import TaskCard from "./TaskCard";

function Column({ column, columns, setColumns }) {
  
  const addTask = () => {
    const title = prompt("Task description:");
    if (!title?.trim()) return;

    setColumns(columns.map(col =>
      col.id === column.id
        ? { ...col, tasks: [...col.tasks, { id: Date.now(), title }] }
        : col
    ));
  };

  const deleteColumn = () => {
    if (columns.length === 1) return alert("Must have at least one column.");
    if (window.confirm(`Delete "${column.title}"?`)) {
      setColumns(columns.filter(col => col.id !== column.id));
    }
  };

  return (
    <section className="column-card">
      <div className="column-header">
        <h3>{column.title} <span className="badge">{column.tasks.length}</span></h3>
        <button className="btn-icon delete" onClick={deleteColumn} title="Delete Column">🗑</button>
      </div>

      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {column.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                column={column}
                columns={columns}
                setColumns={setColumns}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-add-task" onClick={addTask}>+ Add Item</button>
    </section>
  );
}

export default Column;