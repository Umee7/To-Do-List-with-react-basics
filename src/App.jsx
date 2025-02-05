import { useEffect, useState } from 'react'
import { v4 as UUID } from 'uuid'
import './App.css'

function App() {

  const[todo, setTodo] = useState("");
  const[todoList, setTodoList] = useState([]);
  const[completedTodo, setCompletedTodo] = useState([]);
  const[completedCount, setCompletedCount] = useState(0);


  useEffect(()=>{
    console.log(completedTodo);
  },[completedTodo])

  const addTodo = () => {
    if(todo.length === 0 ) return;
    const todos = {
      id: UUID(),
      title: todo, 
      completed: false,
    }

    setTodoList((prev) => [...prev, todos]);
    setTodo("");
    setCompletedCount((prev) => prev + 1)

  }

  const deleteTask = (id, title) => {

    setTodoList(todoList.filter((todo) => todo.id !== id));
    setCompletedCount(completedTodo.length+1);
    
    const completedTask = {
      id: id,
      title: title,
    }

    todoList.map((todo)=>{
      if (todo.id == id) {
        return setCompletedTodo((prev) => [...prev, completedTask])
      }
    })
  }

  const clearTasks = () => {
    setTodoList([]);
    setCompletedTodo([]);
    setCompletedCount(0);
  }

  const deleteCompleted = (id) => {

    setCompletedTodo(completedTodo.filter((todo) => todo.id !== id));
    setCompletedCount((prev) => {
      if(completedCount === 0){
        return 0;
      } else return prev - 1;
    })
  }

  return (
    <>
      <h1>Todo List</h1>
      <input type='text' value={todo} placeholder='Enter a todo...' onChange={(e)=>setTodo(e.target.value)}/>
      <button onClick={addTodo}>+</button>
      <button onClick={clearTasks}>clear</button>

      <ul>
        
        {todoList.map((todo, key=todo.id) => {
          return (
            <li key={key}>
              {todo.title}
              <button onClick={()=>deleteTask(todo.id, todo.title)}>Completed</button>
            </li>
          )
        })}
      </ul>
      <ul>
        {( completedTodo.length !== 0 ) && <h3>{completedCount} completed</h3> }
      
        {completedTodo.length === 0 && todoList.length  === 0 ? "No Tasks left to do" : completedTodo.map((todo) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <li style={{textDecoration: "line-through"}}>
               {todo.title} 
              <button onClick={()=>deleteCompleted(todo.id)}>Delete</button>
            </li>
          )
        })}

      </ul>
        
      
    </>
  )
}

export default App
