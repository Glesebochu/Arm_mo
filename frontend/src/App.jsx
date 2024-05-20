import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./output.css";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";

import Home from "./Pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home/>
    </>
  );
}

export default App;
