const {Reservation} = require('../models/models');
const ApiError = require('../error/ApiError');

class reservationController {
    async create(req, res, next) {
        try {
            const {visitorId, tableId, datetime, status} = req.body;
            const reservation = await Reservation.create({visitorId, tableId, datetime, status});
            return res.json(reservation);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {visitorId, tableId} = req.query;
        let reservations;
        if (!visitorId && !tableId){
            reservations = await Reservation.findAll();
        }
        else if (visitorId && !tableId){
            reservations = await Reservation.findAll({where:{visitorId}});
        }
        else if (!visitorId && tableId){
            reservations = await Reservation.findAll({where:{tableId}});
        }
        else if (visitorId && tableId){
            reservations = await Reservation.findAll({where:{visitorId, tableId}});
        }
        return res.json(reservations);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const reservation = await Reservation.findOne(
            {
                where: {id}
            }
        );
        return res.json(reservation);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const reservation = await Reservation.findByPk(id);
            if (!reservation) return next(ApiError.badRequest(e.message));
            
            await reservation.update(req.body);
            return res.json(reservation);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const reservation = await Reservation.findByPk(id);
            if (!reservation) return next(ApiError.badRequest(e.message));
    
            await reservation.destroy();
            return res.json({"message": `Reservation id:${id} successfully deleted`});
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

module.exports = new reservationController();