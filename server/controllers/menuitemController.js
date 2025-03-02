const uuid = require('uuid');
const path = require('path');

const {MenuItem, Order, Inventory} = require('../models/models');
const ApiError = require('../error/ApiError');

class menuitemController {
    async create(req, res, next) {
        try {
            const {name, description, price, category} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename));
            const menuitem = await MenuItem.create({name, description, price, category});
            return res.json(menuitem);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const menuitems = await MenuItem.findAll();
        return res.json(menuitems);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const menuitem = await MenuItem.findOne(
            {
                where: {id},
                include: [
                    {model: Order, as: 'orders'},
                    {model: Inventory, as: 'ingredients'},
                ]
            }
        );

        return res.json(menuitem);
    }
}

module.exports = new menuitemController();