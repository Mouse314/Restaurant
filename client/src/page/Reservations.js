import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Visitors from "./Visitors";
import Order from "../components/Order";
import Reservation from "../components/Reservation";

const objName = 'reservation';

const Reservations = (props) => {
    const [data, setData] = useState(null);
    const [visitors, setVisitors] = useState([]);
    const [tables, setTables] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [newReservationForm, setNewReservationForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [reservationData, setReservationData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

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
                setSelectedReservation(result);
            });
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

    const handleReservationChanges = (e) => {
        const {name, value} = e.target;
        setReservationData({
            ...reservationData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, reservationData);
                alert('Бронь успешно обновлена');
                setNewReservationForm(null);
                setReservationData({});
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
                const newOrder = await createOne(objName, reservationData);
                alert('Бронь успешно добавлена');
                setNewReservationForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setReservationData(response);
            
            setNewReservationForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Бронь успешно удалена');
            setNewReservationForm(null);
            setDeletionMode(null);
            setSelectedReservation(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewReservationForm(null);
        setIsUpdating(null);
        setReservationData({});
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
        if (props.reservation) setSelectedReservation(props.reservation);

        Promise.all([
            new Promise(resolve => resolve(getAll('visitor'))),
            new Promise(resolve => resolve(getAll('table'))),
        ]).then(result => {
            setVisitors(result[0]);
            setTables(result[1]);
        }); 
        

        const fetchOrdersWithDetails = async () => {
            try {
                const reservationsData = await getAll(objName);
     
                await Promise.all(
                    reservationsData.map(async (reservation) => {
                        const [visitorResponse, tableResponse] = await Promise.all([
                            new Promise((resolve) => resolve(reservation.visitorId ? getOne("visitor", reservation.visitorId) : {name: "Неизвестно"})),
                            new Promise((resolve) => resolve(reservation.tableId ? getOne("table", reservation.tableId) : {number: "Неизвестно"})),
                        ]);
    
                        return {
                            ...reservation,
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
            <h1>Брони</h1>
            <button className="create-btn" onClick={() => setNewReservationForm(true)}>Добавить бронь</button>
            {data && (<Table columns={[["id", "id"],
                             ["посетитель", "visitorName"],
                             ["столик", "tableNumber"],
                             ["статус", "status"],
                             ["время", "datetime"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedReservation && (
                <Reservation order={selectedReservation}
                         setSelectedOrder={setSelectedReservation} 
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getOrder={getOne}
                         changeContent={props.changeContent}
                         ></Reservation>
            )}


            {/* Обновление / создание нового объекта */}
            {newReservationForm && 
                <DataForm title={"бронь"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleReservationChanges}
                          data={reservationData}
                          columns={[{text: "Укажите посетителя: ", type: "select", name:"visitorId", options: getVisitorOptions()},
                                    {text: "Укажите столик: ", type: "select", name:"tableId", options: getTablesOptions()},
                                    {text: "Укажите дату и время: ", type: "datetime-local", name: "datetime"},
                                    {text: "Укажите статус: ", type: "select", name:"status", options: [{value: "CONFIRM", text: "Подтверждён"}, {value: "DENY", text: "Отклонён"}, {value: "INPROCESS", text: "В процессе"}]}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="бронь"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}

        </div>
    );
};

export default Reservations;