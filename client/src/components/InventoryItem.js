import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const InventoryItem = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Ингредиент {props.thing.id ? `id: ${props.thing.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.thing.id); props.handleEditClick(props.thing.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getThing('inventory', props.thing.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedThing(null)}></FaTimes>
                </div>
                {props.thing && (<div className="details-data">
                    <h3>Наименование: {props.thing.name}</h3>
                    <h3>Количество: {props.thing.quantity}</h3>
                    <h3>Единица измерения: {props.thing.unit}</h3>
                    <p>Создан  : {props.thing.createdAt}</p>
                    <p>Обновлён: {props.thing.updatedAt}</p>
                    <h3>В блюдах: </h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id блюда: </td>
                            <td>название: </td>
                            <td>цена: </td>
                            <td>категория: </td>
                        </tr></thead>
                        <tbody>
                            {props.thing.dishes.map((el, ind) => {
                                return (<tr key={ind}>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td>{el.category}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    
                </div>)}
            </div>
        </div>
    );
};

export default InventoryItem;