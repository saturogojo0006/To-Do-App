import React, { useState, useEffect } from "react";
import { CiCircleList } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import Content from "./Content";
import { DndContext ,closestCenter,PointerSensor,useSensor,useSensors,} from "@dnd-kit/core";
import {  arrayMove,  SortableContext,  sortableKeyboardCoordinates,verticalListSortingStrategy,} from "@dnd-kit/sortable";


const Rightbar = ({Task, setTask,completedTasks,setCompletedTasks}) => {
  const [childData,setchildData]= useState([]);
  const today = new Date(); 
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  useEffect(() => {
    localStorage.setItem("PendingTask", JSON.stringify(Task));
  }, [Task]);

  const handleInputClick = () => {
   const input = document.getElementById("taskInput");
  const taskMsg = input.value.trim();
  if (!taskMsg) return;

  const newTask = { id: Date.now().toString(), msg: taskMsg };
  setTask((prev) => [...prev, newTask]);

  input.value = "";
  };

const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputClick();
    }
  };
const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint:{distance:5} }));

 const handleDragEnd = (e) => {
    const { active, over } = e;
console.log("dragend", active.msg);
    if (over && over.id === "droppable") {
      const task = Task.find((t) => t.id === active.id);
      if (task) {
        setTask((prev) => prev.filter((item) => item.id !== active.id));
    setCompletedTasks((prev) => [...prev, { id: task.id, msg: task.msg }]);
      }
    } else if (over && active.id !== over.id) {
      setTask((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };








  return (
    <>
      <div className="rightbar min-w-4xl ml-2  my-10  bg-gray-50 rounded-lg shadow-md " >
        <div className="flex gap-[30vw] ">
          <div className="text-[1.5rem] "> Today</div>
          <div>{formattedDate} </div>
        </div>


       <DndContext sensors={sensors}
      collisionDetection={closestCenter} onDragEnd={(e)=>handleDragEnd(e)}>
        <Content Task={Task} setTask={setTask} setchildData={setchildData} 
        completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}   childData={childData} />
        
        </DndContext>




        <div className="relative left-[5vw] top-[-1.2rem] flex flex-row gap-1.5">
          <div>
            <div className="relative left-3 top-[1.8rem]  text-gray-500 text-xl">
              <CiCircleList />
            </div>
            <input
              type="text"
              id="taskInput"
              className="input  pl-20 pr-4 py-2 h-[2.2rem]"
              placeholder="                                                                   Plan Your Task   " onKeyDown={handleInputKeyDown}
            />
          </div>

          <div
            className="flex gap-2 justify-between items-center rounded-3xl bg-blue-50 p-2 text-[1.5rem]"
            onClick={handleInputClick}
          >
            <div>
             
              <IoMdAdd />
            </div>

            <div>ADD</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
