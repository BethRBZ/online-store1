require('dotenv').config()
const express = require('express') //импорт модуля express
const sequelize = require('./db') //импорт объекта из файла db
const models = require('./models/models') //создание базы данных
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware') //!!идёт и регистрируется в самом конце
const PORT = process.env.PORT || 5000 //порт, где будет работать приложение

const app = express() //объект запуска приложения
app.use(cors())
app.use(express.json()) //приложение могло парсить json формат
app.use('/api', router)

//замыкающий
app.use(errorHandler)


const start = async () => { //асинхронная функция подключения к базе данных
    try{
        await sequelize.authenticate() //установка подключения к базе данных
        await sequelize.sync() //свёрка состояния базы данных со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) //порт, где приложение будет работать
    } catch (e) {
        console.log(e)
    }
}
start()
