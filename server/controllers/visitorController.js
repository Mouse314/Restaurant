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
    
    async update (req, res, next) {
        try {
            const {id} = req.params;
            const visitor = await Visitor.findByPk(id);
            if (!visitor) return next(ApiError.badRequest(e.message));
            
            await visitor.update(req.body);
            return res.json(visitor);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const visitor = await Visitor.findByPk(id);
            if (!visitor) return next(ApiError.badRequest(e.message));
    
            await visitor.destroy();
            return res.json({"message": `Visitor id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await Visitor.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new visitorController();