const {Table, Order, Visitor} = require('../models/models');
const ApiError = require('../error/ApiError');

class tableController {
    async create(req, res, next) {
        try {
            const {number, capacity, status} = req.body;
            const table = await Table.create({number, capacity, status});
            return res.json(table);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const tables = await Table.findAll();
        return res.json(tables);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const table = await Table.findOne(
            {
                where: {id},
                include: [{model: Order, as: 'order'},
                    {model: Visitor, as: 'visitors'}
                ]
            }
        );
        return res.json(table);
    }
}

module.exports = new tableController();