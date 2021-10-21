const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
//генераци токена
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'} //"жизнь" токена
    )

}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}}) //существует ли пользователь с похожим email`ом
        if (candidate) {
            return next(ApiError.badRequest('Произошёл клоунизм - пользователь с таким email`ом уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //хэширование пароля
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body  //получение данных из тела запроса
        const user = await User.findOne({where: {email}}) //проверка на наличие пользователя с таким же email`ом
        if (!user) {
            return next(ApiError.internal('Пользователь не найден, как и смысл жизни'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) //сравнение введённого пароля с имеющимся в БД
        if(!comparePassword) {
            return next(ApiError.internal('Пароль неверный. Кутузка уже выехала за тобой.'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()