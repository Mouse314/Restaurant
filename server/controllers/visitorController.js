const {Visitor, Order, Table} = require('../models/models');
const ApiError = require('../error/ApiError');

class visitorController {
    async create(req, res, next) {
        try {
            const {name, phone, sex} = req.body;
            const visitor = await Visitor.create({name, phone, sex});
            return res.json(visitor);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const visitor = await Visitor.findAll();
        return res.json(visitor);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const visitor = await Visitor.findOne(
            {
                where: {id},
                include: [{model: Order, as: 'orders'},
                    {model: Table, as: 'tables'}
                ]
            }
        );
        return res.json(visitor);
    }
}

module.exports = new visitorController();