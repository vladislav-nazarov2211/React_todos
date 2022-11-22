import { useState } from 'react'
import { todayInputDate } from './../../utils'
import styles from './TodoForm.module.css'

const TodoForm = (props) => {

    const [titleValue, setTitleValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [date, setDate] = useState(todayInputDate())
    
    /**
     * Функция добавления новой задачи. Создает новый объект, основанный на данных из useState и добавляет его в массив todoArray
     * @param {Event} Event принимает Event
     * @return {void} 
     */
    let addNewTask = (e) => {
        e.preventDefault() 
        let newTask = {
            id: props.todoArray.length >= 1 ? props.todoArray[props.todoArray.length - 1].id + 1 : 1,
            title: titleValue,
            description: descriptionValue,
            date: date,
            done: false,
            expired: false
        }
        // проверка на пустое поле "Заголовок"
        if (newTask.title != '') {
            localStorage.setItem("todos", JSON.stringify([...props.todoArray].concat(newTask)))
            props.setTodoArray([...props.todoArray].concat(newTask))
            setTitleValue('')
            setDescriptionValue('')
            setDate(todayInputDate())
            
        } else {
            alert('Необходимо ввести хотя бы название задачи!')
        }
    }
        
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.title}>
                    <div className='todo_title'>
                        <input onChange={(e) => {setTitleValue(e.target.value)}} value={titleValue} placeholder='Заголовок:' />
                    </div>

                    <div className='description'>
                        <textarea onChange={(e) => {setDescriptionValue(e.target.value)}} value={descriptionValue} placeholder='Описание:' />
                    </div>
                    
                    <div className='date'>Выберете дату завершения:
                        <input onChange={(e) => {setDate(e.target.value)}} type='date' value={date} />
                    </div>
                </div>
                <button onClick={(e) => {addNewTask(e)}} type='submit' className='btn'>Создать задачу</button>
            </form>
        </div>
    )
}

export default TodoForm


