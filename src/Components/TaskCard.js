import React from "react";
import TaskCard from "./TaskCard";

function Column({ column, columns, setColumns }) {

  // ➕ Add Task
  const addTask = () => {
    const title = prompt("Enter task name:");
    if (!title) return;

    const updatedColumns = columns.map(col =>
      col.id === column.id
        ? {
            ...col,
            tasks: [...col.tasks, { id: Date.now(), title }]
          }
        : col
    );

    setColumns(updatedColumns);
  };

  // 🗑 Delete Column
  const deleteColumn = () => {
    if (columns.length === 1) {
      alert("At least one column is required");
      return;
    }

    const confirmDelete = window.confirm("Delete this column?");
    if (!confirmDelete) return;

    const updatedColumns = columns.filter(
      col => col.id !== column.id
    );

    setColumns(updatedColumns);
  };

  return (
    <div className="column">
      <h3>{column.title}</h3>

      <button className="delete-column" onClick={deleteColumn}>
        Delete Column
      </button>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {column.tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <TaskCard
                  task={task}
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-task" onClick={addTask}>
        + Add Task
      </button>
    </div>
  );
}

export default Column;