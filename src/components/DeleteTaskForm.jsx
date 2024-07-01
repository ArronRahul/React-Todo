import './DeleteTask.css'

function DeleteTaskForm({deleteTask,deleteClose}) {
    return(
        <div className="delete1">
        <div className="delete-task-form">
        <div className="task-delete">
            <p className="task-delete-heading">Delete Task</p>
            <p className="task-delete-content-heading">Are you sure you want to delete this task?</p>
            <div className="task-delete-footer">
                <button type="button" className="btn11" onClick={deleteClose}>Cancel</button>
                <button type="button" className="btn21" onClick={deleteTask} >Delete</button>
            </div>
            </div>
            </div>
            </div>

    )
}
export default DeleteTaskForm;