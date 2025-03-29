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
            console.error(e);
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

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const menuitem = await MenuItem.findByPk(id);
            if (!menuitem) return next(ApiError.badRequest(e.message));
            
            await menuitem.update(req.body);
            return res.json(menuitem);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const menuitem = await MenuItem.findByPk(id);
            if (!menuitem) return next(ApiError.badRequest(e.message));
    
            await menuitem.destroy();
            return res.json({"message": `MenuItem id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await MenuItem.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new menuitemController();