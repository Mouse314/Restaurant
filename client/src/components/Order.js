import React, { useState } from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";
import Visitors from "../page/Visitors";
import Tables from "../page/Tables";
import { deleteOne, getOne } from "../http/API";
import MenuItem from "./MenuItem";
import MenuItems from "../page/MenuItems";

const Order = (props) => {

    

    const getAmount = () => {
        const amount = props.order.dishes.reduce((acc, cur) => acc + cur.price * cur.orderitem.quantity, 0);
        return amount;
    }

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
    
    const handleDishClick = async (id) => {

        const dish = await getOne('menuitem', 1);

        props.changeContent((<MenuItems
            menuitem={dish}
            changeContent={props.changeContent}>
        </MenuItems>));
    }

    const handleAddDishClick = (e) => {
        props.setNewDish({state: true});
    }

    const handlePaymentDelete = (id) => {
        new Promise(resolve => resolve(deleteOne('payment', id))).then(result => {
            console.log(result);
            alert("Чек успешно удалён");
            props.order.payment = null;
        });
    }

    const handleDishDelete = (id) => {
        console.log('Сработка');
        new Promise(resolve => resolve(deleteOne('orderitem', id))).then(result => {
            console.log(result);
            alert('Позиция меню успешно удалена');
            props.order.dishes.filter(el => el.orderitem.id !== id);
        }).catch(e => {
            alert('Возникла ошибка при удалении: ' + e);
        });
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
                            <td>id блюда: </td>
                            <td>название: </td>
                            <td>категория: </td>
                            <td>цена: </td>
                            <td>количество: </td>
                            <td>опции: </td>
                        </tr></thead>
                        <tbody>
                            
                            {props.order.dishes.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td onClick={() => handleDishClick(el)}>{el.name}</td>
                                <td>{el.category}</td>
                                <td>{el.price}</td>
                                <td>{el.orderitem.quantity}</td>
                                <td><FaTrash onClick={() => handleDishDelete(el.orderitem.id)}></FaTrash></td></tr>)
                            })}
                            
                        </tbody>
                    </table>

                    <button className="button-aside" onClick={(e) => handleAddDishClick(e)}>Добавить блюдо к заказу</button>

                    <h3>Итого гость наел на: {getAmount()} Р</h3>

                    <h3>Оплата:</h3>

                    {!props.order.payment && (
                        <button className="button-aside" onClick={(e) => props.handlePaymentAdd(e, getAmount(), props.order.id)}>Добавить чек</button>
                    )}

                    {props.order.payment && (<table className="compact-table">
                        <thead><tr>
                            <td>id:</td>
                            <td>сумма:</td>
                            <td>метод оплаты:</td>
                            <td>время:</td>
                            <td>опции:</td>
                        </tr></thead>
                        <tbody>
                            <tr><td>{props.order.payment.id}</td>
                            <td>{props.order.payment.amount}</td>
                            <td>{props.order.payment.payment_method}</td>
                            <td>{props.order.payment.datetime}</td>
                            <td><FaTrash onClick={() => handlePaymentDelete(props.order.payment.id)}></FaTrash></td></tr>
                        </tbody>
                    </table>)}
                </div>)}
            </div>
        </div>
    );
};

export default Order;