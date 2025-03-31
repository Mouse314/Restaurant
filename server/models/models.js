const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Visitor = sequelize.define('visitor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.DECIMAL, unique: true, allowNull: false},
    sex: {type: DataTypes.ENUM('MALE', 'FEMALE')}
});

const Table = sequelize.define('table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, unique: true},
    capacity: {type: DataTypes.INTEGER},
    status: {type: DataTypes.ENUM('FREE', 'OCCUPIED', 'UNAVAIBLE'), allowNull: false}
});

const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.DECIMAL, unique: true, allowNull: false}
});

const MenuItem = sequelize.define('menuitem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    category: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: true}
});

const Inventory = sequelize.define('inventory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    unit: {type: DataTypes.ENUM('l', 'g', 'kg', 'tea-sp', 'table-sp', 'piece'), allowNull: false}
});




const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    datetime: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.ENUM('CONFIRM', 'DENY', 'INPROCESS'), allowNull: false}
});

const Reservation = sequelize.define('reservation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    datetime: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.ENUM('CONFIRM', 'DENY', 'INPROCESS'), allowNull: false}
});

const OrderItem = sequelize.define('orderitem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
});

const Payment = sequelize.define('payment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    payment_method: {type: DataTypes.ENUM('CASH', 'CASHLESS'), allowNull: false},
    datetime: {type: DataTypes.DATE, allowNull: false}
});

const RecipeItem = sequelize.define('recipeitem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
});




Visitor.hasMany(Order);
Order.belongsTo(Visitor);

Visitor.belongsToMany(Table, {through: Reservation, as: 'tables'});
Table.belongsToMany(Visitor, {through: Reservation, as: 'visitors'});

Table.hasOne(Order);
Order.belongsTo(Table);

Order.belongsToMany(MenuItem, {through: OrderItem, as: 'dishes'});
MenuItem.belongsToMany(Order, {through: OrderItem, as: 'orders'});

Order.hasOne(Payment);
Payment.belongsTo(Order);

MenuItem.belongsToMany(Inventory, {through: RecipeItem, as: 'ingredients'});
Inventory.belongsToMany(MenuItem, {through: RecipeItem, as: 'dishes'});

module.exports = {
    Visitor,
    Table,
    Employee,
    Order,
    Reservation,
    MenuItem,
    Inventory,
    OrderItem,
    Payment,
    RecipeItem
}