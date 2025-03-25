import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const Visitor = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Посетитель</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.visitor.id); props.handleEditClick(props.visitor.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getVisitor(props.visitor.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedId(null)}></FaTimes>
                </div>
                {props.visitor && (<div className="details-data">
                    <h3>ФИО: {props.visitor.name}</h3>
                    <h3>Телефон: {props.visitor.phone}</h3>
                    <h3>Пол: {props.visitor.sex}</h3>
                    <p>Создан  : {props.visitor.createdAt}</p>
                    <p>Обновлён: {props.visitor.updatedAt}</p>
                    <h3>Обслуживание:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id заказа:</td>
                            <td>id столика:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                            {props.visitor.orders.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td>{el.tableId}</td>
                                <td>{el.datetime}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    <button className="button-aside">Создать заказ</button>
                    <h3>Резервы за посетителем:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id брони:</td>
                            <td>статус:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                           {props.visitor.tables.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td>{el.reservation.status}</td>
                                <td>{el.reservation.datetime}</td></tr>)
                            })} 
                        </tbody>
                    </table>
                    <button className="button-aside">Забронировать столик</button>
                </div>)}
            </div>
        </div>
    );
};

export default Visitor;