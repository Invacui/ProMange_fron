import {Routes,Route} from "react-router-dom";
import Add_task from "./components/Dashboard/TabComponents/KanbanBoard/Add_task";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import InvalidUser from "./pages/InvalidUser";
import SharedTask from "./pages/SharedTask";
import ProtectedRoute from "./services/ProtectedRoute";
import "./style/scroll.css"

function App() {
  return (
    <Routes>
      < Route path="/" element={<Auth/>}/>
      < Route path="/data/sharedTask/:id" element={<SharedTask/>}/>
      <Route path="/dashboard" element={<ProtectedRoute component={Dashboard}/>}/>
      
      < Route path="/*" element={<InvalidUser/>}/>
    </Routes>
  
  );
}

export default App;