import { React, useState } from "react";
import Register from "./components/Register";
import Route from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Route />
    </>
  );
}

export default App;
