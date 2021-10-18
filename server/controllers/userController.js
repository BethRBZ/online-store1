const ApiError = require('../error/ApiError')
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) {
        //универсальный handler
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('КТО ЗАДАВАТЬ ID БУДЕТ, ЧЕПУШИЛА?!'))
        }
        res.json(id) //ДОПУЩЕНИЕ! id - обязательный параметр, если он не указан на клиенте -> ошибка
    }
}

module.exports = new UserController()