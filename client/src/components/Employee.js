import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const Employee = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Сотрудник {props.employee.id ? `id: ${props.employee.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.employee.id); props.handleEditClick(props.employee.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getEmployee('employee', props.employee.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedEmployee(null)}></FaTimes>
                </div>
                {props.employee && (<div className="details-data">
                    <h3>ФИО: {props.employee.name}</h3>
                    <h3>Должность: {props.employee.position}</h3>
                    <h3>Телефон: {props.employee.phone}</h3>
                    <p>Создан  : {props.employee.createdAt}</p>
                    <p>Обновлён: {props.employee.updatedAt}</p>
                </div>)}
            </div>
        </div>
    );
};

export default Employee;