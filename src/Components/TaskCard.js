import React from "react";

function TaskCard({ task, column, columns, setColumns }) {

  const deleteTask = () => {
    const updatedColumns = columns.map(col =>
      col.id === column.id
        ? {
            ...col,
            tasks: col.tasks.filter(t => t.id !== task.id)
          }
        : col
    );

    setColumns(updatedColumns);
  };

  const moveRight = () => {
    const currentIndex = columns.findIndex(c => c.id === column.id);
    if (currentIndex === columns.length - 1) return;

    const nextColumn = columns[currentIndex + 1];

    const updatedColumns = columns.map(col => {
      if (col.id === column.id) {
        return {
          ...col,
          tasks: col.tasks.filter(t => t.id !== task.id)
        };
      }
      if (col.id === nextColumn.id) {
        return {
          ...col,
          tasks: [...col.tasks, task]
        };
      }
      return col;
    });

    setColumns(updatedColumns);
  };

  return (
    <div className="task">
      <p>{task.title}</p>
      <button onClick={deleteTask}>Delete</button>
      <button onClick={moveRight}>➡ Move</button>
    </div>
  );
}

export default TaskCard;