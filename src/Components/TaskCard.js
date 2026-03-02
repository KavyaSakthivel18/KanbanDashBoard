import React, { useState } from "react";

function TaskCard({ task, column, columns, setColumns }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const currentIndex = columns.findIndex(c => c.id === column.id);

  // 🗑 Delete Task
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

  // ➡ Move Right
  const moveRight = () => {
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

  // ⬅ Move Left
  const moveLeft = () => {
    if (currentIndex === 0) return;

    const previousColumn = columns[currentIndex - 1];

    const updatedColumns = columns.map(col => {
      if (col.id === column.id) {
        return {
          ...col,
          tasks: col.tasks.filter(t => t.id !== task.id)
        };
      }
      if (col.id === previousColumn.id) {
        return {
          ...col,
          tasks: [...col.tasks, task]
        };
      }
      return col;
    });

    setColumns(updatedColumns);
  };

  // ✏ Save Edit
  const saveEdit = () => {
    if (!newTitle.trim()) return;

    const updatedColumns = columns.map(col =>
      col.id === column.id
        ? {
            ...col,
            tasks: col.tasks.map(t =>
              t.id === task.id ? { ...t, title: newTitle } : t
            )
          }
        : col
    );

    setColumns(updatedColumns);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteTask}>Delete</button>

          {currentIndex > 0 && (
            <button onClick={moveLeft}>⬅</button>
          )}

          {currentIndex < columns.length - 1 && (
            <button onClick={moveRight}>➡</button>
          )}
        </>
      )}
    </>
  );
}

export default TaskCard;