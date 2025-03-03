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

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const inventory = await Inventory.findByPk(id);
            if (!inventory) return next(ApiError.badRequest(e.message));
            
            await inventory.update(req.body);
            return res.json(inventory);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const inventory = await Inventory.findByPk(id);
            if (!inventory) return next(ApiError.badRequest(e.message));
    
            await inventory.destroy();
            return res.json({"message": `Inventory id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await Inventory.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new inventoryController();