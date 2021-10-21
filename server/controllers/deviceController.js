const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class DeviceController {
    async create(req, res, next) {
        //возможна потенциальная ошибка
        try{
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg" //генерация уникального имени с пакетом uuid
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //файл после получения в эту папку переместить
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                //передача данных в теле запроса возвращает строковые значения
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit ||9
        let offset = page * limit - limit
        //если параметры не указаны - возврат всех девайсов,
        //указан хотя бы 1 - фильтрация
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) { //получение по id определённого девайса со всеми характеристиками
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}
module.exports = new DeviceController()