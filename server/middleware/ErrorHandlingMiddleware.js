const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) { //ошибка, запрос, ответ, передача управления
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Шайтан-машина с шайтан-ошибкой"})
}