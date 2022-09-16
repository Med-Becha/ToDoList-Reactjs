import React from "react";
import { useState } from "react";
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import EditForm from "./components/EditForm";
import useLocalStorage from "./components/hooks/useLocalStorage";

const App = (props) => {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks',[]);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [PreviousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t =>t.id !== id))
  }
  const  updateTask = (task) =>{
    setTasks(prevState => prevState.map(t => (
      t.id === task.id ? {...t, name: task.name}
      : t
    )))
    closeEditMode()
  }

  const closeEditMode = () =>{
    setIsEditing(false)
    PreviousFocusEl.focus()
  }

  const toggleTask = (id) =>{
    setTasks(prevState => prevState.map(t => (
      t.id === id ? {...t, checked: !t.checked}
      : t
    )))
  }
const enterEditMode = (task) =>{
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
}


  return (
    <div className="Container">
      <header>
        <h1>My task list</h1>
      </header>
     {isEditing && (
      <EditForm
        editedTask={editedTask}
        updateTask={updateTask}
        closeEditMode={closeEditMode}
      /> 
      )
    }
      <CustomForm addTask={addTask} />
      {tasks && (<TaskList
       tasks={tasks}
        deleteTask={deleteTask} 
        toggleTask={toggleTask} 
        enterEditMode={enterEditMode}
       
       />)}
    </div>
  );
};

export default App;
