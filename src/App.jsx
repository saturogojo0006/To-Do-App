import { useState } from 'react'
import './App.css'
import Rightbar from './Rightbar'
import Sidebar from './Sidebar'
import Tasks from './Tasks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


 
  


function App() {
 const [Task, setTask] = useState(() => {
        const saved = localStorage.getItem("PendingTask");
        return saved ? JSON.parse(saved) : [];
      });
const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("CompletedTask");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <>

    <Router>
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/task' element={<Tasks Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />} />
          {/* Add more routes here, like for Completed or Important pages */}
         <Route path='/' element={ <Rightbar Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />} />
        
        </Routes>


      </div>
    </Router>
{/*     
    <div className=' flex  flex-row gap-10'>
     <Sidebar Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}   />
     <Rightbar Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
     {/* <Tasks Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} /> */}
    
    
    </>

  )
}

export default App
