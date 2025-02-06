
// eslint-disable-next-line react/prop-types
export default function InputTodo({ setTodo, addTodo, clearTasks, todo }) {
  return (
    <div>
      <h1>To-Do List</h1>
      <input type='text' value={todo} placeholder='Enter a todo...' onChange={(e)=>setTodo(e.target.value)}/>
      <button onClick={addTodo}>+</button>
      <button className="clear-btn" onClick={clearTasks}>clear</button>
    </div>
  )
}
