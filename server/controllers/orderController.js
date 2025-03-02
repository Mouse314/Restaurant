const {Order, MenuItem, Payment, Visitor, Table} = require('../models/models');
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
}

module.exports = new orderController();