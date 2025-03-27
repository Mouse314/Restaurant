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
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newOrderForm, setNewOrderForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            let order = await getOne(objName, id);

            const visitorName = await getOne('visitor', order.visitorId).name;
            const tableNumber = await getOne('table', order.tableId).number;

            order.visitorName = visitorName;
            order.tableNumber = tableNumber;

            setSelectedOrder(order);
        };
        fetchData();
    }

    // const handleVisitorClick = async (id) => {
    //     const visitor = await getOne('visitor', id);

    //     props.changeContent((<Visitors
    //         visitor={visitor}
    //         changeContent={props.changeContent}>

    //         </Visitors>));
    // }

    const handleOrderChanges = (e) => {
        const {name, value} = e.target;
        setOrderData({
            ...orderData,
            [name]: value
        });
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
    }

    useEffect(() => {
        if (props.order) setSelectedOrder(props.order);

        const fetchOrdersWithDetails = async () => {
            try {
                const ordersData = await getAll(objName);
    
                // Используем await внутри map (через Promise.all)
                const enrichedOrders = await Promise.all(
                    ordersData.map(async (order) => {
                        const [visitorResponse, tableResponse] = await Promise.all([
                            order.tableId ? getOne("table", order.tableId) : "Неизвестно",
                            order.visitorId ? getOne("visitor", order.visitorId) : "Неизвестно",
                        ]);
    
                        return {
                            ...order,
                            visitorName: visitorResponse.name,
                            tableNum: tableResponse.number,
                        };
                    })
                );
    
                setData(enrichedOrders); // Данные уже resolved, не Promise!
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
                         ></Order>
            )}


            {/* Обновление / создание нового объекта */}
            {newOrderForm && 
                <DataForm title={"столик"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleOrderChanges}
                          data={orderData}
                          columns={[{text: "Введите номер столика: ", type: "number", name: "number"},
                                    {text: "Введите вместимость: ", type: "number", name: "capacity"},
                                    {text: "Укажите статус: ", type: "select", name:"status", options: [{value: "FREE", text: "Свободен"}, {value: "OCCUPIED", text: "Занят"}, {value: "UNAVAIBLE", text: "Недоступен"}]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


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