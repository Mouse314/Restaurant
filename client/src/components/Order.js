import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";
import Visitors from "../page/Visitors";
import Tables from "../page/Tables";

const Order = (props) => {

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
                    <h2>Заказ {props.order.id ? `id: ${props.order.id}` : ""}</h2>
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
                    <h3>Заказанные позиции:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id блюда:</td>
                            <td>название:</td>
                            <td>категория:</td>
                            <td>количество:</td>
                        </tr></thead>
                        <tbody>
                            
                            {props.order.dishes.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td onClick={() => props.handleDishClick(props.table.order.visitorId)}>{el.name}</td>
                                <td>{el.category}</td>
                                <td>{el.orderitem.quantity}</td></tr>)
                            })}
                            
                        </tbody>
                    </table>
                    <h3>Оплата:</h3>

                    {props.order.payment && (<table className="compact-table">
                        <thead><tr>
                            <td>id:</td>
                            <td>сумма:</td>
                            <td>метод оплаты:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                            <tr><td>{props.order.payment.id}</td>
                            <td>{props.order.payment.amount}</td>
                            <td>{props.order.payment.payment_method}</td>
                            <td>{props.order.payment.datetime}</td></tr>
                            
                        </tbody>
                    </table>)}
                </div>)}
            </div>
        </div>
    );
};

export default Order;