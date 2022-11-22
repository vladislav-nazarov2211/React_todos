import styles from './TodoList.module.css'
import TodoItem from './TodoItem'

const TodoList = (props) => {
    return (
        <div className={styles.todoList}>
            {props.todoArray.map((item) => {
                return <TodoItem key={item.id} item={item} todoArray={props.todoArray} setTodoArray={props.setTodoArray} checkExpired={props.checkExpired}/>
            }).reverse()}
        </div>
    )
}

export default TodoList