const {Payment} = require('../models/models');
const ApiError = require('../error/ApiError');

class paymentController {
    async create(req, res, next) {
        try {
            const {orderId, amount, payment_method, datetime} = req.body;
            const payment = await Payment.create({orderId, amount, payment_method, datetime});
            return res.json(payment);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {orderId} = req.query;
        let payments;
        if (!orderId){
            payments = await Payment.findAll();
        }
        else {
            payments = await Payment.findAll({where:{orderId}});
        }
        return res.json(payments);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const payment = await Payment.findOne(
            {
                where: {id}
            }
        );
        return res.json(payment);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const payment = await Payment.findByPk(id);
            if (!payment) return next(ApiError.badRequest(e.message));
            
            await payment.update(req.body);
            return res.json(payment);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const payment = await Payment.findByPk(id);
            if (!payment) return next(ApiError.badRequest(e.message));
    
            await payment.destroy();
            return res.json({"message": `Payment id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await Payment.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new paymentController();