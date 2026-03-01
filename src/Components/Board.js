import React from "react";
import Column from "./Column";

function Board({ columns, setColumns }) {

  const addColumn = () => {
    const title = prompt("Enter column name:");
    if (!title) return;

    const newColumn = {
      id: Date.now().toString(),
      title,
      tasks: []
    };

    setColumns([...columns, newColumn]);
  };

  return (
    <div className="board">
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          columns={columns}
          setColumns={setColumns}
        />
      ))}

      <button onClick={addColumn}>+ Add Column</button>
    </div>
  );
}

export default Board;