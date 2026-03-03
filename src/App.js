import React, { useState, useEffect } from "react";
import Column from "./Components/Column";
import "./App.css";

const initialData = [
  { id: 1, title: "To Do", tasks: [] },
  { id: 2, title: "In Progress", tasks: [] },
  { id: 3, title: "Done", tasks: [] },
];

function App() {
  // R5: Local Storage Persistence
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban-data");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    const title = prompt("Enter column name:");
    if (!title?.trim()) return;
    setColumns([...columns, { id: Date.now(), title, tasks: [] }]);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Kanban Flow</h1>
        <button className="btn-primary" onClick={addColumn}>+ New Column</button>
      </header>
      
      <main className="board">
        {columns.map((col) => (
          <Column 
            key={col.id} 
            column={col} 
            columns={columns} 
            setColumns={setColumns} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;