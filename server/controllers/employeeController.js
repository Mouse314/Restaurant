const {Employee} = require('../models/models');
const ApiError = require('../error/ApiError');

class employeeController {
    async create(req, res, next) {
        try {
            const {name, position, phone} = req.body;
            const employee = await Employee.create({name, position, phone});
            return res.json(employee);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const employees = await Employee.findAll();
        return res.json(employees);
    }
    
    async getOne(req, res) {
        const {id} = req.params;
        const employee = await Employee.findOne(
            {
                where: {id}
            }
        );
        return res.json(employee);
    }

    async update (req, res, next) {
        try {
            const {id} = req.params;
            const employee = await Employee.findByPk(id);
            if (!employee) return next(ApiError.badRequest(e.message));
            
            await employee.update(req.body);
            return res.json(employee);
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async delete (req, res, next) {
        try {
            const {id} = req.params;
            const employee = await Employee.findByPk(id);
            if (!employee) return next(ApiError.badRequest(e.message));
    
            await employee.destroy();
            return res.json({"message": `Employee id:${id} successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async deleteAll (req, res, next) {
        try {
            await Employee.destroy({where: {}});
            return res.json({"message": `All creatures successfully deleted`});
        }
        catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new employeeController();