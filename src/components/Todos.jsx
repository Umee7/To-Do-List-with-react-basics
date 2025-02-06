import '../App.css'
/* eslint-disable react/prop-types */

export default function Todos({ todoList, deleteTask, newTodo, setNewTodo, saveTodo, toggleTodo }) {

  return (
    <div>
      {todoList.map((todo) => {
          return (
            <li key={todo.id} style={{backgroundColor: todo.edit && "#85c1e9"}}>
              {todo.edit ? 
              <input className='inpt' value={newTodo} placeholder={todo.title}
              onChange={(e)=>setNewTodo(e.target.value)}/> : todo.title }
              <div>
                {todo.edit ? (<button className="edit-btn" onClick={()=>saveTodo(todo.id, todo.title)}>Save</button>) :
                (<button className="edit-btn" onClick={()=>toggleTodo(todo.id)}>Edit</button>)}              
                 <button onClick={()=>deleteTask(todo.id, todo.title)}>Complete</button>
              </div>              
            </li>
          )
        })}
    </div>
  )
}
