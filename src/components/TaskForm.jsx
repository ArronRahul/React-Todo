import { useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ taskClose, addNewTask, task, taskIndex }) => {
  useEffect(() => {
    if (task) {
      document.getElementById('head').value = task.title;
      document.getElementById('description').value = task.description;
      document.getElementById('date').value = task.date;
    }
  }, [task]);

  const onSubmit = () => {
    let head = document.getElementById('head').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    const formdata = {
      title: head,
      description: description,
      date: date,
      completedValue: task ? task.completedValue : false
    };
    addNewTask(formdata, taskIndex);
    taskClose();
  };

  return (
    <div className="add-task" id="add-task">
      <div className="add-task-head">
        <p className="add-task-heading">{task ? 'Edit Task' : 'Add Task'}</p>
        <img className="close-icon" src="./src/assets/x.svg" onClick={taskClose} />
      </div>
      <hr />
      <div className="add-task-content">
        <div className="add-task-content-title">
          <p className="add-task-content-heading">Title *</p>
          <input
            type="text"
            className="add-task-content-head"
            id="head"
            placeholder="e.g., Create two ad banners"
          />
        </div>
        <div className="add-task-content-description">
          <p className="add-task-content-description1">Description</p>
          <textarea
            className="add-task-content-textarea"
            id="description"
            placeholder="Add your task description."
          ></textarea>
        </div>
        <div className="add-task-content-date">
          <p className="add-task-content-date1">Date</p>
          <input
            type="date"
            id="date"
            className="add-task-content-date-input"
          />
        </div>
        <hr />
        <div className="add-task-footer">
          <button type="button" className="btn1 btn-primary btn-sm" onClick={taskClose}>Cancel</button>
          <button type="button" className="btn2 btn-primary btn-sm" onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
