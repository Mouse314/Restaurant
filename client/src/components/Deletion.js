import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const Deletion = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Сообщение</h2>
                    <FaTimes className="close-btn" onClick={() => props.onClose(null)}></FaTimes>
                </div>
                <div>
                    <h3>Вы действительно хотите удалить</h3>
                    <h3>{props.obj.name}?</h3>
                    <div>
                        <button className="button-top" onClick={() => props.handleDeleteClick(props.obj.id)}>Да</button>
                        <button className="button-top" onClick={() => props.setDeletionMode(null)}>Нет</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deletion;