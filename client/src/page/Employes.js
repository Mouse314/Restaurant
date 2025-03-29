import React, { useEffect, useState } from "react";
import Visitor from "../components/Visitor";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Tables from "./Tables";
import Employee from "../components/Employee";

const objName = 'employee';

const Employes = (props) => {
    const [data, setData] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newEmployeeForm, setNewEmployeeForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [employeeData, setEmployeeData] = useState({sex: 'FEMALE'});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedEmployee(await getOne(objName, id));
        };
        fetchData();
    }

    const handleEmployeeChanges = (e) => {
        const {name, value} = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await updateOne(objName, editedId, employeeData);
                alert('Сотрудник успешно обновлён');
                setNewEmployeeForm(null);
                setEmployeeData({});
                setIsUpdating(null);
                setEditedId(null);
                return;
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
        else {
            try {
                const newEmployee = await createOne(objName, employeeData);
                alert('Сотрудник успешно добавлен');
                setNewEmployeeForm(null);
            } catch (e) {
                console.error(e);
                alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
            }
        }
    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setEmployeeData(response);
            
            setNewEmployeeForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Сотрудник успешно удалён');
            setNewEmployeeForm(null);
            setDeletionMode(null);
            setSelectedEmployee(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewEmployeeForm(null);
        setIsUpdating(null);
        setEmployeeData({});
    }

    useEffect(() => {
        if (props.visitor) setSelectedEmployee(props.visitor);

        const fetchData = async () => {
            setData(await getAll(objName));
        }
        fetchData();
    }, []);

    return (

        // Список объектов
        <div className="container">
            <h1>Сотрудники</h1>
            <button className="create-btn" onClick={() => setNewEmployeeForm(true)}>Добавить сотрудника</button>
            {data && (<Table columns={[["id", "id"],
                             ["ФИО", "name"],
                             ["должность", "position"],
                             ["телефон", "phone"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedEmployee && (
                <Employee employee={selectedEmployee} 
                         setSelectedEmployee={setSelectedEmployee}
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getEmployee={getOne}
                         ></Employee>
            )}


            {/* Обновление / создание нового объекта */}
            {newEmployeeForm && 
                <DataForm title={"сотрудника"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleEmployeeChanges}
                          data={employeeData}
                          columns={[{text: "Введите ФИО: ", type: "text", name: "name"},
                                    {text: "Введите телефон: ", type: "text", name: "phone"},
                                    {text: "Укажите должность: ", type: "text", name: "position"}
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="сотрудника"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}
        </div>
    );
};

export default Employes;