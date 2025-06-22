import React, { useState, useEffect,useRef } from "react";
import { FaCircleNotch } from "react-icons/fa6"
import { MdOutlineCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useDraggable,useDroppable } from "@dnd-kit/core";
import {arrayMove,SortableContext,sortableKeyboardCoordinates,useSortable,   verticalListSortingStrategy,} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


function Draggable({
  Task,
  setTask,
  id,
  msg,
  index,
  completedTasks,
  setchildData,
  setCompletedTasks,
  childData,
}) {
  useEffect(() => {
    setchildData({ id: id, msg: msg });
  }, [completedTasks]);

  const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({ id });
  const {
    setNodeRef: setSortableRef,
    transform: sortableTransform,
    transition,
    isDragging,
    attributes: sortableAttributes,
    listeners: sortableListeners,
  } = useSortable({ id });

  const draggableStyle = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const sortableStyle = {
    transition,
    cursor: "grab",
    userSelect: "none",
  };

  const handleComplete = (e) => {
    const taskDeleted = e.target.closest(".draggable-item").querySelector(".task");
    setCompletedTasks([...completedTasks, { id: { id }, msg: taskDeleted.textContent }]);
    setTask((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    
    setTask((prev) => prev.filter((item) => item.id !== id));
    
  };

  return (
    <div
      ref={setDraggableRef}
      style={draggableStyle}
      key={index}
      id={id}
      className={`draggable-item flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-md mb-2 transition-all duration-50 transform ${
        isDragging ? "scale-95 opacity-50 shadow-lg" : "hover:shadow-lg hover:scale-[1.1]"
      } animate-fade-in`}
    >
      <div className="  flex gap-4 w-full">
        <button
          onClick={handleComplete}
          className="text-gray-500 hover:text-green-500 transition-colors"
        >
          <FaCircleNotch />
        </button>
        <div
          className="task text-gray-800 font-medium select-none"
          ref={setSortableRef}
          style={sortableStyle}
          {...attributes}
          {...listeners}
          {...sortableAttributes}
          {...sortableListeners}
        >
          {msg}
        </div>
      </div>

      <button
        className="text-gray-400 hover:text-red-500 transition-colors text-xl"
        onClick={handleDelete}
      >
        <MdOutlineCancel />
      </button>
    </div>
  );
}


function Droppable( {completedTasks,setCompletedTasks,handleCompleteClear}) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {    
    backgroundColor: isOver ? 'lightgreen' : 'white',   
  };

  return (
    <div 
  className="completed border-2 border-dashed rounded-xl w-[40vw] min-h-[25vh] p-4 transition-colors"
  ref={setNodeRef}
  style={{ backgroundColor: isOver ? '#e6ffed' : 'white' }}
>
  <h2 className="text-center text-lg font-semibold mb-4 text-gray-800">Completed</h2>

  <div className="flex flex-col gap-2">
    {completedTasks.map((task, index) => (
      <div key={index} className="flex items-center gap-2">
        <FaCheckCircle className="text-green-600" />
        <div className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2 flex-1">
          {task.msg}
        </div>
      </div>
    ))}
  </div>

  {completedTasks.length > 0 && (
    <button 
      onClick={handleCompleteClear}
      className="mt-4 w-fit text-sm px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-all"
    >
      Clear
    </button>
  )}
</div>



  )
}


const Content = ({Task,setTask,setId,completedTasks, setCompletedTasks,setchildData, childData}) => {

  const [isDropped,setisDropped]= useState(false);
    console.log()

 
useEffect(() => {
    localStorage.setItem("CompletedTask", JSON.stringify(completedTasks));
  }, [completedTasks]);



const handleCompleteClear=() =>{
  setCompletedTasks([])
}



    return (
         <>
    <div className="flex flex-col gap-6 px-6 py-4">
  <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm w-full">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">In Progress</h2>
    <div className="text-gray-600 text-base">
      {Task.length > 0 ? Task[0].msg : 'No tasks in progress'}
    </div>
  </div>

  <div className="flex gap-4 w-full">
    {/* Pending Column */}
    <div className="border-2 border-blue-100 bg-white rounded-xl p-4 w-1/2 shadow-sm">
      <h2 className="text-center text-lg font-semibold text-blue-700 mb-4">Pending</h2>
      <div className="flex flex-col gap-2">
        <SortableContext items={Task.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {Task.map((body, index) => (
            <Draggable
              key={index}
              id={body.id}
              index={index}
              msg={body.msg}
              setTask={setTask}
              completedTasks={completedTasks}
              setCompletedTasks={setCompletedTasks}
              setchildData={setchildData}
              childData={childData}
            />
          ))}
        </SortableContext>
      </div>
    </div>

    {/* Completed Column */}
    <Droppable
      completedTasks={completedTasks}
      setCompletedTasks={setCompletedTasks}
      handleCompleteClear={handleCompleteClear}
    />
  </div>
</div>


    </>
  )
}

export default Content;