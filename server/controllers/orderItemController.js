const {OrderItem} = require('../models/models');
const ApiError = require('../error/ApiError');

class orderItemController {
    async create(req, res, next) {
        try {
            const {orderId, menuitemId, quantity} = req.body;
            const orderItem = await OrderItem.create({orderId, menuitemId, quantity});
            return res.json(orderItem);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {orderId, menuItemId} = req.query;
        let orderItem;
        if (!orderId && !menuItemId){
            orderItem = await OrderItem.findAll();
        }
        else if (orderId && !menuItemId){
            orderItem = await OrderItem.findAll({where:{orderId}});
        }
        else if (!orderId && menuItemId){
            orderItem = await OrderItem.findAll({where:{menuItemId}});
        }
        else if (orderId && menuItemId){
            orderItem = await OrderItem.findAll({where:{orderId, menuItemId}});
        }
        return res.json(orderItem);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const menuItem = await OrderItem.findOne(
            {
                where: {id}
            }
        );
        return res.json(menuItem);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const orderitem = await OrderItem.findByPk(id);
            if (!orderitem) return next(ApiError.badRequest(e.message));
            
            await orderitem.update(req.body);
            return res.json(orderitem);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const orderitem = await OrderItem.findByPk(id);
            if (!orderitem) return next(ApiError.badRequest(e.message));
    
            await orderitem.destroy();
            return res.json({"message": `OrderItem id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await OrderItem.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new orderItemController();