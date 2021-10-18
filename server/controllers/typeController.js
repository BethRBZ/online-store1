//добавление в DB объектов
const {Type} = require('../models/models')
//обработки каждого случая нет, полноценной валидации тож, чисто сдать на 4
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body //из тела пост-запроса извлечение названия типа
        const type = await Type.create({name}) //передача объекта с нужными полями
        return res.json(type)
    }
    async getAll(req, res) { //получение типов
        const types = await Type.findAll()
        return res.json(types)

    }
}

module.exports = new TypeController()