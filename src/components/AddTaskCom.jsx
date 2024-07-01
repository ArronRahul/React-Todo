import './AddTaskCom.css';
import './DeleteTaskForm'

const AddTaskCom = ({ task, index, editTask, deleteOpen, toggleCompleted }) => {
  const isPastDue = new Date(task.date) < new Date();

  const handleCheckboxChange = () => {
    toggleCompleted(index);
  };

  return (
    <div className="task-x">
      <div className="inner-taskspace">
        <div className="custom-checkbox-container">
          <input
            type="checkbox"
            id={`customCheckbox${index}`}
            className="custom-checkbox"
            checked={task.completedValue}
            onChange={handleCheckboxChange}
          />
          <label className="custom-checkbox-label" htmlFor={`customCheckbox${index}`}></label>
        </div>
        <div className="task-card">
          <div className="task-header">
            <div className="name-tik">
              <p className="task-name">{task.title}</p>
              <span className={task.completedValue ? 'span-green' : 'span-yellow'}></span>
            </div>
            <div className="edit-delete">
              <img
                className="edit-icon"
                src="src/assets/edit.svg"
                onClick={() => editTask(index)}
                alt="Edit"
              />
              <img
                className="delete-icon"
                onClick={() => deleteOpen(index)}
                src="src/assets/delete.svg"
                alt="Delete"
              />
            </div>
          </div>
          <p className="task-paragraph">{task.description}</p>
          <div className={isPastDue ? 'past-due' : 'col-date'}>
            <img
              className="col-img"
              alt="Calendar"
              src={isPastDue ? "src/assets/calendarred.svg" : "src/assets/calendar.svg"}
            />
            <p className={isPastDue ? 'by-date-red' : 'by-date'}>by {task.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskCom;
