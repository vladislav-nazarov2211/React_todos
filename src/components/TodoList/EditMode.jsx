import { useState } from "react"
import styles from './TodoList.module.css'

const EditMode = (props) => {
    const [titleValue, setTitleValue] = useState(props.item.title)
    const [descriptionValue, setDescriptionValue] = useState(props.item.description)
    const [date, setDate] = useState(props.item.date)

    /**
     * Функция сохранения отредактированной задачи
     * @param {number} number принимает id задачи, которую сохраняем
     * @return {Array} возвращает новый массив todoArray, с новыми данными
     */
    let saveMode = (id) => {
        let newArray = [...props.todoArray].map((item) => {
            if (id === item.id) {
                return {...item,
                    title: titleValue,
                    description: descriptionValue,
                    date: date, 
                }
            } else {
                return item
            }
        })
        props.setTodoArray(newArray)
        props.setEditMode(false)
        props.checkExpired(newArray)
        localStorage.setItem("todos", JSON.stringify(newArray))
    }

    return (
        <div className={styles.todoItem}>
            <div className='todo_title'><span>Заголовок: </span>
                <input onChange={(e) => {setTitleValue(e.target.value)}} type="text" value={titleValue}/>
            </div>
            <div className='description'><span>Описание: </span>
                <textarea onChange={(e) => {setDescriptionValue(e.target.value)}} type="text" value={descriptionValue} />
            </div>
            <div className='date'><span>Дата завершения: </span>
                <input onChange={(e) => {setDate(e.target.value)}} type='date' value={date} />
            </div>
            <div>
                <button type='submit' onClick={() => {saveMode(props.item.id)}} className='btn'>Сохранить</button>
            </div>
        </div>
    )    
}

export default EditMode