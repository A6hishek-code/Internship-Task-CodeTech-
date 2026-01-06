import { v4 as uuidV4 } from "uuid";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const id = uuidV4();
    window.location.href = `/documents/${id}`;
  }, []);

  return <div>Loading...</div>;
}

export default App;
