import React, { useEffect, useState } from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";
// import "../styles/Restaurant.css";
import axios from "axios";

const Visitors = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/visitor/' + id);
              setSelectedUser(response.data);
              console.log(response.data);
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
        
        setSelectedId(id === selectedId ? null : id);

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/visitor');
              setData(response.data);
              console.log(response.data);
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Все посетители</h1>
            <button className="create-btn">Добавить посетителя</button>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>ФИО</td>
                        <td>телефон</td>
                        <td>пол</td>
                        <td>Опции</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, ind) => {
                        return(<React.Fragment key={el.id}>
                            <tr key={ind} onClick={() => handleRowClick(el.id)}>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>{el.phone}</td>
                                <td>{el.sex}</td>
                                <td>
                                    <FaEdit className="ico-option-edit"></FaEdit>
                                    <FaTrash className="ico-option-delete"></FaTrash>
                                </td>
                            </tr>
                        </React.Fragment>)
                    })}
                </tbody>
            </table>
            {selectedId && (
                <div className="overlay">
                    <div className="details">
                        <div className="details-top">
                            <h2>Посетитель</h2>
                            <FaTimes className="close-btn" onClick={() => setSelectedId(null)}></FaTimes>
                        </div>
                        {selectedUser && (<div className="details-data">
                            <h3>ФИО: {selectedUser.name}</h3>
                            <h3>Телефон: {selectedUser.phone}</h3>
                            <h3>Пол: {selectedUser.sex}</h3>
                            <p>Создан  : {selectedUser.createdAt}</p>
                            <p>Обновлён: {selectedUser.updatedAt}</p>
                            <h3>Обслуживание:</h3>
                            <table className="compact-table">
                                <thead><tr>
                                    <td>id заказа:</td>
                                    <td>id столика:</td>
                                    <td>время:</td>
                                </tr></thead>
                                <tbody>
                                    {selectedUser.orders.map((el, ind) => {
                                        return (<tr><td>{el.id}</td>
                                        <td>{el.tableId}</td>
                                        <td>{el.datetime}</td></tr>)
                                    })}
                                </tbody>
                            </table>
                            <h3>Резервы за посетителем:</h3>
                            <table className="compact-table">
                                <thead><tr>
                                    <td>id брони:</td>
                                    <td>статус:</td>
                                    <td>время:</td>
                                </tr></thead>
                                <tbody>
                                   {selectedUser.tables.map((el, ind) => {
                                        return (<tr><td>{el.id}</td>
                                        <td>{el.reservation.status}</td>
                                        <td>{el.reservation.datetime}</td></tr>)
                                    })} 
                                </tbody>
                                
                            </table>
                        </div>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Visitors;