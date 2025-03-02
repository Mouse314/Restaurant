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
}

module.exports = new paymentController();