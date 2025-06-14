import React, { useState } from 'react';

const Tasks = ({ Task, completedTasks }) => {
  const [showPending, setShowPending] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const togglePending = () => setShowPending((prev) => !prev);
  const toggleCompleted = () => setShowCompleted((prev) => !prev);

  return (
    <div className="min-w-4xl ml-2 mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
      {/* Pending Tasks */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Pending Tasks</h2>
          <button
            onClick={togglePending}
            className="text-sm px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {showPending ? 'Hide' : 'Show'}
          </button>
        </div>
        {showPending && (
          <ul className="pl-6 space-y-1 text-gray-700 flex flex-col gap-1.5">
            {Task.length > 0 ? (
              Task.map((task, index) => (
                <li key={index} className="hover:text-blue-600">{task.msg}</li>
              ))
            ) : (
              <li className="text-gray-500">No pending tasks</li>
            )}
          </ul>
        )}
      </div>

      {/* Completed Tasks */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Completed Tasks</h2>
          <button
            onClick={toggleCompleted}
            className="text-sm px-4 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            {showCompleted ? 'Hide' : 'Show'}
          </button>
        </div>
        {showCompleted && (
          <ul className="pl-10 space-y-1 text-gray-700 flex flex-col gap-1.5">
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <li key={index} className="line-through hover:text-green-600">
                  {task.msg}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No completed tasks</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
