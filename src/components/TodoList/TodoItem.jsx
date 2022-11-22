import styles from './TodoList.module.css'
import { correctDateItem } from './../../utils'
import { useState } from 'react'
import EditMode from './EditMode'

const TodoItem = (props) => {

    const [editMode, setEditMode] = useState(false) // режим редактирования

    /**
     * Функция удаления задачи
     * @param {number} number принимает id задачи, которую удаляем
     * @return {Array} фильтрует новый массив todoArray, за исключением удалленной задачи
     */
    let deleteItem = (id) => {
        let newArray = [...props.todoArray].filter((item) => item.id != id)
        props.setTodoArray(newArray)
        localStorage.setItem("todos", JSON.stringify(newArray))
    }

    /**
     * Функция отметки выполненной задачи
     * @param {number} number принимает id задачи, которую выполнили
     * @return {Array} фильтрует новый массив todoArray, с изменненым состоянием выполненной задачи 
     */
    let doneItem = (id) => {
        let newArray = [...props.todoArray].filter((item) => {
            if (item.id === id) {
                item.done = !item.done
            }
            return item
        })
        props.setTodoArray(newArray)
        localStorage.setItem("todos", JSON.stringify(newArray))
    }

    return (
        <>
            {editMode ? 
                <EditMode setEditMode={setEditMode} item={props.item} todoArray={props.todoArray} setTodoArray={props.setTodoArray} checkExpired={props.checkExpired} />
            :
                <div className={styles.todoItem}>
                    <div><span>Заголовок: </span>{props.item.title}</div>
                    <div><span>Описание: </span>{props.item.description}</div>
                    <div className={props.item.expired === true & props.item.done === false ? styles.attention : ''}><span>Дата завершения: </span>{correctDateItem(props.item.date)}</div>
                    <div>
                        {props.item.done == false ?
                            <button onClick={() => {doneItem(props.item.id)}} className='btn'>Не выполнено</button>
                        :
                            <button onClick={() => {doneItem(props.item.id)}} className='btn done'>Выполнено</button>
                        }
                    </div>
                    <div>
                        <button onClick={() => {deleteItem(props.item.id)}} className='btn'>Удалить задачу</button>
                    </div>
                    <div className={styles.btnEdit}>
                        <button onClick={() => {setEditMode(true)}} className='btn'>Редактировать задачу</button>
                    </div>
                </div>
            }   
        </>  
    )
}
export default TodoItem