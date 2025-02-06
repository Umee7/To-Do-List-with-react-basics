import { useEffect, useState } from 'react'
import { v4 as UUID } from 'uuid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import img5 from './assets/img5.jpg'
import ImageSlider from './ImageSlider'

const client = new QueryClient({});

function App() {

  const[todo, setTodo] = useState("");
  const[todoList, setTodoList] = useState([]);
  const[completedTodo, setCompletedTodo] = useState([]);
  const[completedCount, setCompletedCount] = useState(0);
  const IMAGES = [img1 , img2, img3, img4, img5];



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
    <QueryClientProvider client={client}>
      <div style={{
          maxWidth: "1200px",
          width: "100%",
          aspectRatio: "10 / 3",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "12px",
        }}>
        <ImageSlider images={IMAGES} />
      </div>
        
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
        
      
      </QueryClientProvider>  
    </>
  )
}

export default App
