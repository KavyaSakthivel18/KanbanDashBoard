import React from "react";
import TaskCard from "./TaskCard";

function Column({ column, columns, setColumns }) {

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

  return (
    <div className="column">
      <h3>{column.title}</h3>

      {column.tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          columns={columns}
          setColumns={setColumns}
        />
      ))}

      <button onClick={addTask}>+ Add Task</button>
    </div>
  );
}

export default Column;