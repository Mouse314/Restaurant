import React from "react";
import {FaEdit, FaTrash, FaTimes} from "react-icons/fa";

const DataForm = (props) => {
    return (
        <div className="overlay">
            <div className="details">
                <div className="details-top">
                    {props.isUpdating ? (<h2>Обновить {props.title}</h2>) : (<h2>Создать {props.title}</h2>)}
                    <FaTimes className="close-btn" onClick={() => props.onClose(null)}></FaTimes>
                </div>
                <form onSubmit={props.handleSubmit}>
                    <table>
                        <tbody>
                            {props.columns.map((el, ind) => {
                                if (el.type === "select") {
                                    return (<tr key={ind}>
                                        <td>{el.text}</td>
                                        <select id={el.name} name={el.name} value={props.data[el.name]} onChange={props.handleChange}>
                                            {el.options.map((opt, ind) => {
                                                return (<option value={opt.value}>{opt.text}</option>)
                                            })}
                                        </select>
                                    </tr>)
                                }
                                else if (el.type === "file") {
                                    return (<tr key={ind}>
                                        <td>{el.text}</td>
                                        <td><input type={el.type} id={el.name} name={el.name} accept={el.accept} onChange={props.handleFileChange}></input></td>
                                    </tr>)
                                }
                                return (<tr key={ind}>
                                    <td>{el.text}</td>
                                    <td><input type={el.type} id={el.name} name={el.name} value={props.data[el.name]} onChange={props.handleChange}></input></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    {props.isUpdating ? (<button className="button-top" type="submit">Обновить данные</button>) : 
                                  (<button className="button-top" type="submit">Сохранить данные</button>)}
                </form>
            </div>
        </div>
    )
}

export default DataForm;