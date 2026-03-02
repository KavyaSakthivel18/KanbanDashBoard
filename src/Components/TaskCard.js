import React, { useState } from "react";

function TaskCard({ task, column, columns, setColumns }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const currentIndex = columns.findIndex(c => c.id === column.id);

  const updateColumns = (newCols) => setColumns(newCols);

  const deleteTask = () => {
    updateColumns(columns.map(col => 
      col.id === column.id ? { ...col, tasks: col.tasks.filter(t => t.id !== task.id) } : col
    ));
  };

  const move = (direction) => {
    const targetCol = columns[currentIndex + direction];
    updateColumns(columns.map(col => {
      if (col.id === column.id) return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) };
      if (col.id === targetCol.id) return { ...col, tasks: [...col.tasks, task] };
      return col;
    }));
  };

  const saveEdit = () => {
    if (!newTitle.trim()) return;
    updateColumns(columns.map(col =>
      col.id === column.id ? {
        ...col, tasks: col.tasks.map(t => t.id === task.id ? { ...t, title: newTitle } : t)
      } : col
    ));
    setIsEditing(false);
  };

  return (
    <>
      <td className="task-title-cell">
        {isEditing ? (
          <input 
            className="edit-input"
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            autoFocus
          />
        ) : (
          task.title
        )}
      </td>
      <td className="task-actions-cell">
        <div className="button-group">
          {isEditing ? (
            <button className="save-btn" onClick={saveEdit}>Save</button>
          ) : (
            <>
              <button className="icon-btn" onClick={() => setIsEditing(true)}>✏️</button>
              <button className="icon-btn del" onClick={deleteTask}>🗑</button>
              {currentIndex > 0 && <button className="icon-btn" onClick={() => move(-1)}>⬅</button>}
              {currentIndex < columns.length - 1 && <button className="icon-btn" onClick={() => move(1)}>➡</button>}
            </>
          )}
        </div>
      </td>
    </>
  );
}

export default TaskCard;