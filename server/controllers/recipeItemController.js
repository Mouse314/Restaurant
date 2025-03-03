const {RecipeItem} = require('../models/models');
const ApiError = require('../error/ApiError');

class recipeItemController {
    async create(req, res, next) {
        try {
            const {menuitemId, inventoryId, quantity} = req.body;
            const recipeItem = await RecipeItem.create({menuitemId, inventoryId, quantity});
            return res.json(recipeItem);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {orderId: inventoryId, menuItemId} = req.query;
        let recipeItem;
        if (!inventoryId && !menuItemId){
            recipeItem = await RecipeItem.findAll();
        }
        else if (inventoryId && !menuItemId){
            recipeItem = await RecipeItem.findAll({where:{inventoryId}});
        }
        else if (!inventoryId && menuItemId){
            recipeItem = await RecipeItem.findAll({where:{menuItemId}});
        }
        else if (inventoryId && menuItemId){
            recipeItem = await RecipeItem.findAll({where:{inventoryId, menuItemId}});
        }
        return res.json(recipeItem);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const recipeItem = await RecipeItem.findOne(
            {
                where: {id}
            }
        );
        return res.json(recipeItem);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const recipeItem = await RecipeItem.findByPk(id);
            if (!recipeItem) return next(ApiError.badRequest(e.message));
            
            await recipeItem.update(req.body);
            return res.json(recipeItem);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const recipeItem = await RecipeItem.findByPk(id);
            if (!recipeItem) return next(ApiError.badRequest(e.message));
    
            await recipeItem.destroy();
            return res.json({"message": `RecipeItem id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await RecipeItem.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new recipeItemController();