//добавление в DB объектов
const {Brand} = require('../models/models')
//обработки каждого случая нет, полноценной валидации тож, чисто сдать на 4
const ApiError = require('../error/ApiError');
class BrandController {
    async create(req, res) {
        const {name} = req.body //из тела пост-запроса извлечение названия типа
        const brand = await Brand.create({name}) //передача объекта с нужными полями
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}
module.exports = new BrandController()