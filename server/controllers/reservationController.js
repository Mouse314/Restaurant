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
}

module.exports = new reservationController();