import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Visitors from "./Visitors";
import Order from "../components/Order";

const objName = 'order';

const Orders = (props) => {
    const [data, setData] = useState(null);
    const [visitors, setVisitors] = useState([]);
    const [tables, setTables] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newOrderForm, setNewOrderForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const [newDish, setNewDish] = useState(null);
    const [dishes, setDishes] = useState(null);

    const [newPayment, setNewPayment] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            let order = await getOne(objName, id);

            Promise.all([
                new Promise(resolve => resolve(order.visitorId ? getOne('visitor', order.visitorId) : {name: "неизвестно"})),
                new Promise(resolve => resolve(order.tableId ? getOne('table', order.tableId) : {number: "неизвестно"})),
            ]).then((result) => {
                const [visitor, table] = result;

                order.visitor = visitor;
                order.table = table;

                return(order);
            }).then((result) => {
                setSelectedOrder(result);
            });
        };
        fetchData();
    }

    const getDishesOptions = () => {
        return dishes.map((el, ind) => {
            return {value: el.id, text: (el.name)}
        })
    }

    // const handleVisitorClick = async (id) => {
    //     const visitor = await getOne('visitor', id);

    //     props.changeContent((<Visitors
    //         visitor={visitor}
    //         changeContent={props.changeContent}>

    //         </Visitors>));
    // }

    const handleDishChanges = (e) => {
        const {name, value} = e.target;
        setNewDish({
            ...newDish,
            [name]: value
        });
    }

    const handlePaymentAdd = (e, _amount, _orderId) => {
        setNewPayment({amount : _amount, orderId: _orderId});
    }   

    const handleDishSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(newDish);
            const response = await createOne('orderitem', {menuitemId: newDish.menuitemId, quantity: newDish.quantity, orderId: selectedOrder.id});
            alert('Блюдо успешно добавлено к заказу');
            setNewDish(null);
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
        }
    }

    const handleOrderChanges = (e) => {
        const {name, value} = e.target;
        setOrderData({
            ...orderData,
            [name]: value
        });
    }
    
    const handlePaymentChanges = (e) => {
        const {name, value} = e.target;
        setNewPayment({
            ...newPayment,
            [name]: value
        });
    }

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createOne('payment', newPayment);
            alert('Чек успешно добавлен');
            setNewPayment(null);
            return;
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, orderData);
                alert('Заказ успешно обновлён');
                setNewOrderForm(null);
                setOrderData({});
                setIsUpdating(null);
                setEditedId(null);
                return;
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
        else {
            try {
                const newOrder = await createOne(objName, orderData);
                alert('Заказ успешно добавлен');
                setNewOrderForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setOrderData(response);
            
            setNewOrderForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Заказ успешно удалён');
            setNewOrderForm(null);
            setDeletionMode(null);
            setSelectedOrder(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewOrderForm(null);
        setIsUpdating(null);
        setOrderData({});
        setNewDish(null);
        setNewPayment(null);
    }

    const getVisitorOptions = () => {
        return visitors.map((el, ind) => {
            return {value: el.id, text: el.name}
        })
    }
    const getTablesOptions = () => {
        return tables.map((el, ind) => {
            return {value: el.id, text: `${el.number}, мест: ${el.capacity}`}
        })
    }

    useEffect(() => {
        if (props.order) setSelectedOrder(props.order);

        new Promise(resolve => resolve(getAll('menuitem'))).then(result => 
        {
            console.log(result);
            setDishes(result);
        });

        Promise.all([
            new Promise(resolve => resolve(getAll('visitor'))),
            new Promise(resolve => resolve(getAll('table'))),
        ]).then(result => {
            setVisitors(result[0]);
            setTables(result[1]);
        }); 
        

        const fetchOrdersWithDetails = async () => {
            try {
                const ordersData = await getAll(objName);
     
                // Используем await внутри map (через Promise.all)
                await Promise.all(
                    ordersData.map(async (order) => {
                        const [visitorResponse, tableResponse] = await Promise.all([
                            new Promise((resolve) => resolve(order.visitorId ? getOne("visitor", order.visitorId) : {name: "Неизвестно"})),
                            new Promise((resolve) => resolve(order.tableId ? getOne("table", order.tableId) : {number: "Неизвестно"})),
                        ]);
    
                        return {
                            ...order,
                            visitorName: visitorResponse.name,
                            tableNumber: tableResponse.number,
                        };
                    })
                ).then((result) => {
                    setData(result);
                });

            } catch (err) {
                console.error("Ошибка:", err);
            }
        };
    
        fetchOrdersWithDetails();
    }, []);

    return (

        // Список объектов
        <div className="container">
            <h1>Заказы</h1>
            <button className="create-btn" onClick={() => setNewOrderForm(true)}>Добавить заказ</button>
            {data && (<Table columns={[["id", "id"],
                             ["посетитель", "visitorName"],
                             ["столик", "tableNumber"],
                             ["статус", "status"],
                             ["время", "datetime"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedOrder && (
                <Order order={selectedOrder}
                         setSelectedOrder={setSelectedOrder} 
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getOrder={getOne}
                         changeContent={props.changeContent}
                         setNewDish={setNewDish}
                         handlePaymentAdd={handlePaymentAdd}
                         ></Order>
            )}


            {/* Обновление / создание нового объекта */}
            {newOrderForm && 
                <DataForm title={"заказ"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleOrderChanges}
                          data={orderData}
                          columns={[{text: "Укажите посетителя: ", type: "select", name:"visitorId", options: getVisitorOptions()},
                                    {text: "Укажите столик: ", type: "select", name:"tableId", options: getTablesOptions()},
                                    {text: "Укажите дату и время: ", type: "datetime-local", name: "datetime"},
                                    {text: "Укажите статус: ", type: "select", name:"status", options: [{value: "CONFIRM", text: "Подтверждён"}, {value: "DENY", text: "Отклонён"}, {value: "INPROCESS", text: "В процессе"}]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }
            
            {/* Создание оплаты */}
            {newPayment && 
                <DataForm title={"чек"}
                          onClose={handleClose}
                          handleSubmit={handlePaymentSubmit}
                          handleChange={handlePaymentChanges}
                          data={newPayment}
                          columns={[{text: "Укажите сумму: ", type: "number", name:"amount"},
                                    {text: "Выберите метод оплаты: ", type: "select", name:"payment_method", options: [{value: "CASH", text: "Наличными"}, {value: "CASHLESS", text: "Безналичными"}]},
                                    {text: "Укажите дату и время: ", type: "datetime-local", name: "datetime"},
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }

            {/* Добавить блюдо */}
            {newDish && (
                <DataForm title={"блюдо"}
                onClose={handleClose}
                handleSubmit={handleDishSubmit}
                handleChange={handleDishChanges}
                data={orderData}
                columns={[{text: "Выберите блюдо: ", type: "select", name: "menuitemId", options: getDishesOptions()},
                          {text: "Укажите количество в ед.изм.: ", type: "number", name: "quantity"},
                ]}
                isUpdating={false}></DataForm>
            )}

            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="столик"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}

        </div>
    );
};

export default Orders;