import React, { useState } from "react";

function TaskCard({ task, column, columns, setColumns }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);

  const idx = columns.findIndex(c => c.id === column.id);

  const moveTask = (dir) => {
    const targetCol = columns[idx + dir];
    setColumns(columns.map(col => {
      if (col.id === column.id) return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) };
      if (col.id === targetCol.id) return { ...col, tasks: [...col.tasks, task] };
      return col;
    }));
  };

  const saveEdit = () => {
    if (!tempTitle.trim()) return setIsEditing(false);
    setColumns(columns.map(col =>
      col.id === column.id ? {
        ...col, tasks: col.tasks.map(t => t.id === task.id ? { ...t, title: tempTitle } : t)
      } : col
    ));
    setIsEditing(false);
  };

  return (
    <tr className="task-row">
      <td className="task-cell">
        {isEditing ? (
          <input 
            className="edit-input"
            value={tempTitle} 
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={saveEdit}
            autoFocus 
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{task.title}</span>
        )}
      </td>
      <td className="task-actions">
        <div className="action-buttons">
          <button className="btn-sm" onClick={() => moveTask(-1)} disabled={idx === 0}>←</button>
          <button className="btn-sm" onClick={() => moveTask(1)} disabled={idx === columns.length - 1}>→</button>
          <button className="btn-sm danger" onClick={() => {
            if(window.confirm("Delete task?")) {
               setColumns(columns.map(c => c.id === column.id ? {...c, tasks: c.tasks.filter(t => t.id !== task.id)} : c))
            }
          }}>✕</button>
        </div>
      </td>
    </tr>
  );
}

export default TaskCard;