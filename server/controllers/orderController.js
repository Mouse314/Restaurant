const {Order, MenuItem, Payment} = require('../models/models');
const ApiError = require('../error/ApiError');

class orderController {
    async create(req, res, next) {
        try {
            const {visitorId, tableId, datetime, status} = req.body;
            const order = await Order.create({visitorId, tableId, datetime, status});
            return res.json(order);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {visitorId, tableId} = req.query;
        let orders;
        if (!visitorId && !tableId){
            orders = await Order.findAll();
        }
        else if (visitorId && !tableId){
            orders = await Order.findAll({where:{visitorId}});
        }
        else if (!visitorId && tableId){
            orders = await Order.findAll({where:{tableId}});
        }
        else if (visitorId && tableId){
            orders = await Order.findAll({where:{visitorId, tableId}});
        }
        return res.json(orders);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const order = await Order.findOne(
            {
                where: {id},
                include: [
                    {model: MenuItem, as: 'dishes'},
                    {model: Payment, as: 'payment'}
                ]
            }
        );
        return res.json(order);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const order = await Order.findByPk(id);
            if (!order) return next(ApiError.badRequest(e.message));
            
            await order.update(req.body);
            return res.json(order);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const order = await Order.findByPk(id);
            if (!order) return next(ApiError.badRequest(e.message));
    
            await order.destroy();
            return res.json({"message": `Order id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await Order.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new orderController();