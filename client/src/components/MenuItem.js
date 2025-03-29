import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const MenuItem = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    <h2>Позиция меню {props.menuitem.id ? `id: ${props.menuitem.id}` : ""}</h2>
                    <div>

                    </div>
                    <FaEdit className="ico-option-edit" onClick={() => {props.setEditedId(props.menuitem.id); props.handleEditClick(props.menuitem.id)}}></FaEdit>
                    <FaTrash className="ico-option-delete" onClick={async () => {props.setDeletionMode(await props.getMenuItem('visitor', props.menuitem.id))}}></FaTrash>
                    <FaTimes className="close-btn" onClick={() => props.setSelectedMenuItem(null)}></FaTimes>
                </div>
                {props.menuitem && (<div className="details-data">
                    <h3>Название: {props.menuitem.name}</h3>
                    <h3>Описание: {props.menuitem.description}</h3>
                    <h3>Категория: {props.menuitem.category}</h3>
                    <h3>Цена: {props.menuitem.price}</h3>
                    <p>Создан  : {props.menuitem.createdAt}</p>
                    <p>Обновлён: {props.menuitem.updatedAt}</p>
                    <h3>Заказы: </h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id заказа: </td>
                            <td>id столика: </td>
                            <td>количество: </td>
                        </tr></thead>
                        <tbody>
                            {props.menuitem.orders.map((el, ind) => {
                                return (<tr key={ind}>
                                    <td onClick={() => props.handleOrderClick(el.tableId)}>{el.id}</td>
                                    <td onClick={() => props.handleTableClick(el.tableId)}>{el.tableId}</td>
                                    <td>{el.orderitem.quantity}</td></tr>)
                            })}
                        </tbody>
                    </table>
                    <h3>Рецепт: </h3>
                    <table className="compact-table">
                        <thead><tr>
                            <td>id ингредиента: </td>
                            <td>ингредиент: </td>
                            <td>количество: </td>
                            <td>единица изм.: </td>
                        </tr></thead>
                        <tbody>
                           {props.menuitem.ingredients.map((el, ind) => {
                                return (<tr key={ind}>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.recipeitem.quantity}</td>
                                    <td>{el.unit}</td></tr>)
                            })} 
                        </tbody>
                    </table>
                </div>)}
            </div>
        </div>
    );
};

export default MenuItem;