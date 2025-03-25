import React, { useEffect, useState } from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";
// import "../styles/Restaurant.css";
import axios from "axios";
import { getVisitor, getVisitors, updateVisitor, createVisitor, deleteVisitor } from "../http/visitorAPI";

const Visitors = () => {
    const [data, setData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUserForm, setNewUserForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [visitorData, setVisitorData] = useState({sex: 'FEMALE'});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedUser(await getVisitor(id));
        };
        fetchData();
        
        setSelectedId(id === selectedId ? null : id);
    }

    const handleVisitorChanges = (e) => {
        const {name, value} = e.target;
        setVisitorData({
            ...visitorData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateVisitor(editedId, visitorData);
                alert('Посетитель успешно обновлён');
                setNewUserForm(null);
                setVisitorData({});
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
                const newVisitor = await createVisitor(visitorData);
                alert('Посетитель успешно добавлен');
                setNewUserForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getVisitor(id);
            setVisitorData(response);
            
            setNewUserForm(true);
            setIsUpdating(true);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteVisitor(id);
            alert('Посетитель успешно удалён');
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setData(await getVisitors());
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Все посетители</h1>
            <button className="create-btn" onClick={() => setNewUserForm(true)}>Добавить посетителя</button>
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
                    {data !== null && (data.map((el, ind) => {
                        return(<React.Fragment key={el.id}>
                            <tr key={ind}>
                                <td>{el.id}</td>
                                <td onClick={() => handleRowClick(el.id)}>{el.name}</td>
                                <td onClick={() => handleRowClick(el.id)}>{el.phone}</td>
                                <td onClick={() => handleRowClick(el.id)}>{el.sex}</td>
                                <td>
                                    <FaEdit className="ico-option-edit" onClick={() => {setEditedId(el.id); handleEditClick(el.id)}}></FaEdit>
                                    <FaTrash className="ico-option-delete" onClick={() => handleDeleteClick(el.id)}></FaTrash>
                                </td>
                            </tr>
                        </React.Fragment>)
                    }))}
                </tbody>
            </table>
            {selectedId && selectedUser && (
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

            {newUserForm && (
                <div className="overlay">
                    <div className="details">
                        <div className="details-top">
                            {isUpdating ? (<h2>Обновить посетителя</h2>) : (<h2>Создать нового посетителя</h2>)}
                            <FaTimes className="close-btn" onClick={() => setNewUserForm(null)}></FaTimes>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Введите ФИО:</td>
                                        <td><input type="text" id="name" name="name" value={visitorData.name} onChange={handleVisitorChanges}></input></td>
                                    </tr>
                                    <tr>
                                        <td>Введите телефон:</td>
                                        <td><input type="text" id="phone" name="phone" value={visitorData.phone} onChange={handleVisitorChanges}></input></td>
                                    </tr>
                                    <tr>
                                        <td>Укажите пол:</td>
                                        <td>
                                            <select id="sex" name="sex" value={visitorData.sex} onChange={handleVisitorChanges}>
                                                <option value={"MALE"}>Мужской</option>
                                                <option value={"FEMALE"}>Женский</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {isUpdating ? (<button className="button-top" type="submit">Обновить данные</button>) : 
                                          (<button className="button-top" type="submit">Сохранить данные</button>)}
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Visitors;