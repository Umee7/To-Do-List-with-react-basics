/* eslint-disable react/prop-types */

export default function Todos({ todoList, deleteTask  }) {
  return (
    <div>
      {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.title}
              <div>
              <button onClick={()=>deleteTask(todo.id, todo.title)}>Completed</button>
              <button onClick={()=>deleteTask(todo.id, todo.title)}>Completed</button>
              </div>
              
            </li>
          )
        })}
    </div>
  )
}
