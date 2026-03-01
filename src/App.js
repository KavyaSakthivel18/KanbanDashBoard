import React, { useState, useEffect } from "react";
import Board from "./Components/Board";

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "1", title: "To Do", tasks: [] },
          { id: "2", title: "In Progress", tasks: [] },
          { id: "3", title: "Done", tasks: [] }
        ];
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(columns));
  }, [columns]);

  return (
    <div>
      <h1>Kanban Board</h1>
      <Board columns={columns} setColumns={setColumns} />
    </div>
  );
}

export default App;