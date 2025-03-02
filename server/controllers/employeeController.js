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
}

module.exports = new employeeController();