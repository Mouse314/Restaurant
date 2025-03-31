import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const RestaurantTable = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Столик {props.table.id ? `id: ${props.table.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.table.id); props.handleEditClick(props.table.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getTable('table', props.table.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedTable(null)}></FaTimes>
                </div>
                {props.table && (<div className="details-data">
                    <h3>Номер столика: {props.table.number}</h3>
                    <h3>Вместительность: {props.table.capacity}</h3>
                    <h3>Статус: {props.table.status}</h3>
                    <p>Создан  : {props.table.createdAt}</p>
                    <p>Обновлён: {props.table.updatedAt}</p>
                    <h3>Обслуживание за столиком:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id заказа:</td>
                            <td>id посетителя:</td>
                            <td>статус:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                            
                            {props.table.order && (<tr><td>{props.table.order.id}</td>
                            <td onClick={() => props.handleVisitorClick(props.table.order.visitorId)}>{props.table.order.visitorId}</td>
                            <td>{props.table.order.status}</td>
                            <td>{props.table.order.datetime}</td></tr>)}
                            
                        </tbody>
                    </table>
                    <h3>Резервы за столиком:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id брони:</td>
                            <td>Посетитель:</td>
                            <td>статус:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                           {props.table.visitors.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td onClick={() => props.handleVisitorClick(el.id)}>{el.name}</td>
                                <td>{el.reservation.status}</td>
                                <td>{el.reservation.datetime}</td></tr>)
                            })} 
                        </tbody>
                    </table>
                </div>)}
            </div>
        </div>
    );
};

export default RestaurantTable;