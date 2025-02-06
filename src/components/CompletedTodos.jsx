/* eslint-disable react/prop-types */

export default function CompletedTodos({completedTodo, deleteCompleted}) {


  return (
    <div>
      {completedTodo.map((todo) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <li style={{backgroundColor: "#52be80 "}}>
               <span style={{textDecoration:"line-through", color: "#fff"}}>{todo.title} </span>
              <button className="clear-btn" onClick={()=>deleteCompleted(todo.id)}>Delete</button>
            </li>
          )
        })}
    </div>
  )
}
