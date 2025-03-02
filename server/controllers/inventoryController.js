const {Inventory, MenuItem} = require('../models/models');
const ApiError = require('../error/ApiError');

class inventoryController {
    async create(req, res, next) {
        try {
            const {name, quantity, unit} = req.body;
            const inventory = await Inventory.create({name, quantity, unit});
            return res.json(inventory);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const inventory = await Inventory.findAll();
        return res.json(inventory);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const inventory = await Inventory.findOne(
            {
                where: {id},
                include: [
                    {model: MenuItem, as: 'dishes'}
                ]
            }
        );

        return res.json(inventory);
    }
}

module.exports = new inventoryController();