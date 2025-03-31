import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const Visitor = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Посетитель {props.visitor.id ? `id: ${props.visitor.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.visitor.id); props.handleEditClick(props.visitor.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getVisitor('visitor', props.visitor.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedUser(null)}></FaTimes>
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
                                return (<tr key={ind}>
                                    <td>{el.id}</td>
                                    <td onClick={() => props.handleTableClick(el.tableId)}>{el.tableId}</td>
                                    <td>{el.datetime}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    <h3>Резервы за посетителем:</h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id брони:</td>
                            <td>номер столика:</td>
                            <td>статус:</td>
                            <td>время:</td>
                        </tr></thead>
                        <tbody>
                           {props.visitor.tables.map((el, ind) => {
                                return (<tr key={ind}><td>{el.id}</td>
                                <td onClick={() => props.handleTableClick(el.id)}>{el.number}</td>
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

export default Visitor;