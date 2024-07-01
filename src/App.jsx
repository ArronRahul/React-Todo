import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import AddTaskCom from './components/AddTaskCom';
import DeleteTaskForm from './components/DeleteTaskForm';
import './App.css';

function App() {
  const [todoModal, setTodoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addToTask, setAddToTask] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const localData = localStorage.getItem('todo');
    if (localData) {
      setAddToTask(JSON.parse(localData));
    }
  }, []);

  const addNewTask = (taskdata, index = null) => {
    let updatedTasks;
    if (index !== null) {
      updatedTasks = addToTask.map((task, i) => (i === index ? taskdata : task));
    } else {
      updatedTasks = [...addToTask, taskdata];
    }
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
    setAddToTask(updatedTasks);
  };

  const taskOpen = () => {
    setTodoModal(true);
  };

  const taskClose = () => {
    setTodoModal(false);
    setEditingTaskIndex(null);
  };

  const deleteOpen = () => {
    setDeleteModal(true);
  };

  const deleteClose = () => {
    setDeleteModal(false);
  };

  const editTask = (index) => {
    setEditingTaskIndex(index);
    setTodoModal(true);
  };

  const deleteTask = (index) => {
    const updatedTasks = addToTask.filter((_, i) => i !== index);
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
    setAddToTask(updatedTasks);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = addToTask.map((task, i) =>
      i === index ? { ...task, completedValue: !task.completedValue } : task
    );
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
    setAddToTask(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = addToTask.filter((task) => !task.completedValue);
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
    console.log(updatedTasks);
    setAddToTask(updatedTasks);
    setDeleteModal(false);
  };

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSortCriteria = (criteria) => {
    setSortCriteria(criteria);
  };

  const updateSortDirection = (direction) => {
    setSortDirection(direction);
  };

  const filteredTasks = addToTask.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (sortCriteria === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return tasks;
    });
  };

  const sortedTasks = sortTasks(filteredTasks);

  const activeTasks = sortedTasks.filter((task) => !task.completedValue);
  const completedTasks = sortedTasks.filter((task) => task.completedValue);

  return (
    <>
      <div className="navbar">
        <h1 className="navbar-heading">My Tasks</h1>
        <button type="button" className="btn btn-primary btn-sm" onClick={taskOpen}>Add New Task</button>
      </div>
      <hr />
      <SearchBar 
        updateSearchQuery={updateSearchQuery} 
        updateSortCriteria={updateSortCriteria} 
        updateSortDirection={updateSortDirection} 
      />
      <div className="added-main">
        <p className="task_heading">Active Tasks</p>
        <div className="task_listing-page" id="task-list">
          <ul>
            {activeTasks.map((task, index) => (
              <AddTaskCom
                key={index}
                task={task}
                index={index}
                deleteOpen={deleteOpen}
                editTask={editTask}
                toggleCompleted={toggleCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="added-main">
        <div className='head-displaycompleted'>
          <p className="task_heading">Completed Tasks</p>
          <button type="button" className="clr-button" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
        </div>
        <div className="task_listing-page" id="completed-task-list">
          <ul>
            {completedTasks.map((task, index) => (
              <AddTaskCom
                key={index}
                task={task}
                index={index}
                editTask={editTask}
                toggleCompleted={toggleCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
      {todoModal && (
        <TaskForm
          taskClose={taskClose}
          addNewTask={addNewTask}
          task={editingTaskIndex !== null ? addToTask[editingTaskIndex] : null}
          taskIndex={editingTaskIndex}
        />
      )}
      {deleteModal && (
        <DeleteTaskForm
          deleteClose={deleteClose}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}

export default App;
