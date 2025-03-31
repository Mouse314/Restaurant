import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";
import Visitors from "../page/Visitors";
import Tables from "../page/Tables";

const Reservation = (props) => {

    const handleVisitorClick = (visitor) => {
        props.changeContent((<Visitors
            visitor={visitor}
            changeContent={props.changeContent}>
            </Visitors>));
    }

    const handleTableClick = (table) => {
        props.changeContent((<Tables
            table={table}
            changeContent={props.changeContent}>
            </Tables>));
    }

    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Бронь {props.order.id ? `id: ${props.order.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.order.id); props.handleEditClick(props.order.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getOrder('order', props.order.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedOrder(null)}></FaTimes>
                </div>
                {props.order && (<div className="details-data">
                    <h3 onClick={() => handleVisitorClick(props.order.visitor)}>Посетитель: {props.order.visitor.name}</h3>
                    <h3 onClick={() => handleTableClick(props.order.table)}>Номер столика: {props.order.table.number}</h3>
                    <h3>Статус: {props.order.status}</h3>
                    <h3>Дата: {props.order.datetime}</h3>
                    <p>Создан  : {props.order.createdAt}</p>
                    <p>Обновлён: {props.order.updatedAt}</p>
                </div>)}
            </div>
        </div>
    );
};

export default Reservation;