import React, { useState } from "react";
import Column from "./Components/Column";
import "./App.css";

const initialData = [
  { id: 1, title: "To Do", tasks: [{ id: 101, title: "Task 1" }] },
  { id: 2, title: "In Progress", tasks: [] },
  { id: 3, title: "Done", tasks: [] },
];

function App() {
  const [columns, setColumns] = useState(initialData);

  const addColumn = () => {
    const title = prompt("Enter column name:");
    if (!title) return;
    setColumns([...columns, { id: Date.now(), title, tasks: [] }]);
  };

  return (
    <div className="app-container">
      <h1>Project Board</h1>
      <button className="global-add-btn" onClick={addColumn}>+ Add Column</button>
      <div className="board">
        {columns.map((col) => (
          <Column 
            key={col.id} 
            column={col} 
            columns={columns} 
            setColumns={setColumns} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;