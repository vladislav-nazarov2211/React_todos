/**
 * Функция корректного отображения даты для input
 * @param {never} never
 * @return {string} возвращает дату в формате: "2022-01-01"
 */
export function todayInputDate() {
    let year = new Date().getFullYear();
    let month = (1 + new Date().getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = new Date().getDate().toString();
    day = day.length > 1 ? day : '0' + day; 
    return year + '-' + month + '-' + day 
}

/**
 * Функция для UI отображения
 * @param {string} string принимает дату в виде строки формата "2022-01-01"
 * @return {string} возвращает дату в формате: "01.01.2022"
 */
export function correctDateItem(date) {
    let dateArr = date.split('-')
    let day = dateArr[2]
    let month = dateArr[1]
    let year = dateArr[0]
    return day + '.' + month + '.' + year
}