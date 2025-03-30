import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]); // Pending Tasks
  const [completedTasks, setCompletedTasks] = useState([]); // Completed Tasks
  const [newTask, setNewTask] = useState(""); 
  const [taskTime, setTaskTime] = useState(""); 
  const [taskDate, setTaskDate] = useState(""); 
  const [showCompleted, setShowCompleted] = useState(true); // Toggle Completed Tasks

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    let [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; 
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const addTask = () => {
    if (!newTask.trim() || !taskDate.trim() || !taskTime.trim()) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }

    const formattedTime = convertTo12HourFormat(taskTime);
    const task = { text: newTask, date: taskDate, time: formattedTime };
    
    setTasks([...tasks, task]); // Add to pending tasks
    setNewTask(""); 
    setTaskDate("");
    setTaskTime("");

    toast.success("✅ Task added successfully!");
  };

  const removeTask = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
      toast.info("🗑️ Completed Task Removed!");
    } else {
      setTasks(tasks.filter((_, i) => i !== index));
      toast.info("🗑️ Pending Task Removed!");
    }
  };

  const markAsCompleted = (index) => {
    const taskToMove = tasks[index];
    setCompletedTasks([...completedTasks, taskToMove]); // Move to completed tasks
    setTasks(tasks.filter((_, i) => i !== index)); // Remove from pending
    toast.success("✅ Task marked as completed!");
  };
  const backtopendingTask = (index) => {
  const moveBackTask = completedTasks[index]; // Get the task from completedTasks
  setTasks([...tasks, moveBackTask]); // Add it back to pending tasks
  setCompletedTasks(completedTasks.filter((_, i) => i !== index)); // Remove from completedTasks
  toast.info("🔄 Task moved back to Pending!");
};

  return (
    <div className="container mt-5">
      <h1 className="text-success text-center fw-bold">TO-DO LIST</h1>

      <div className="p-4">
        <h3>Add a Task:</h3>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="form-control"
              placeholder="Task name..."
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <button onClick={addTask} className="btn btn-primary w-100">
               Add
            </button>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {tasks.length > 0 && (
        <div className="table-responsive mt-4">
          <h3 className="text-warning">🕒 Pending Tasks</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.text}</td>
                  <td>{task.date}</td>
                  <td>{task.time}</td>
                  <td>
                    <button onClick={() => markAsCompleted(index)} className="btn btn-success btn-sm me-2">
                      ✅ Complete
                    </button>
                    <button onClick={() => removeTask(index, false)} className="btn btn-danger btn-sm">
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toggle Button for Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="text-center mt-4">
          <button 
            className={`btn ${showCompleted ? "btn-danger" : "btn-success"}`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
          </button>
        </div>
      )}

      {/* Completed Tasks */}
      {showCompleted && completedTasks.length > 0 && (
        <div className="table-responsive mt-4">
          <h3 className="text-success">✔️ Completed Tasks</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.text}</td>
                  <td>{task.date}</td>
                  <td>{task.time}</td>
                  <td>
                    <button onClick={() => removeTask(index, true)} className="btn btn-danger btn-sm">
                      🗑️ Remove
                    </button>
                    <button onClick={() => backtopendingTask(index, true)} className="btn btn-warning ms-4 btn-sm">
                       pending
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
