import { Routes } from "react-router-dom";
import ClientRoutes from "./client/routes";

function App() {
  return (
    <Routes>
      {ClientRoutes}
      {ClientRoutes}
    </Routes>
  )
}

export default App;
