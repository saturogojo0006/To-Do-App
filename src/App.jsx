import { useState } from 'react'
import './App.css'
import Rightbar from './Rightbar'
import Sidebar from './Sidebar'
import Tasks from './Tasks'

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
    <div className=' flex  flex-row gap-10'>
     <Sidebar    />
     <Rightbar Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
     {/* <Tasks Task={Task} setTask={setTask} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} /> */}
    
    </div>
    </>

  )
}

export default App
