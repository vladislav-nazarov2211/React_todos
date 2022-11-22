import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header'
import TodoForm from './components/TodoForm/TodoForm'
import TodoList from './components/TodoList/TodoList'
import dayjs from 'dayjs'
import { todayInputDate } from './utils'

// Общие стили описаны в index.css, стили, касаемые только компонентов описаны в отдельных файлах .module.css

function App() {

    const [todoArray, setTodoArray] = useState([]) // образец объекта внутри массива: {id: number, title: string, description: string, date: string, done: boolean, expired: boolean}

    let todos = (localStorage.getItem("todos"))
    
    /**
     * Функция проверяет актуальность сроков выполнения задачи
     * @param {array} array принимает массив задач
     * @return {array} вернет массив с изменненым полем "expired", если дата просрочена
     */
    function checkExpired(array) {                                
        setTodoArray([...array].map((item) => {
            if (dayjs(todayInputDate()) > dayjs(item.date)) {
                return {...item, expired: true} 
            } else {
                return {...item, expired: false}
            }
        }))
    }
    
    useEffect(() => {
        if (todos != null) {
            setTodoArray(JSON.parse(localStorage.getItem("todos")))    // проверяем наличие задач в localstorage
        } else {
            setTodoArray([])
        }

        if (todoArray.length > 0) {
            checkExpired(todoArray)
        }
    }, [todoArray.length])

    return (
        <div className="App">
            <Header />
            <TodoForm todoArray={todoArray} setTodoArray={setTodoArray} />
            <TodoList todoArray={todoArray} setTodoArray={setTodoArray} checkExpired={checkExpired} />       
        </div>
    );
}

export default App;
