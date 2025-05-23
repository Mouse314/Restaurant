import React, { useEffect, useState } from "react";
import Visitor from "../components/Visitor";
import Table from "../components/Table";
import DataForm from "../components/DataForm";
import Deletion from "../components/Deletion";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../http/API";
import RestaurantTable from "../components/RestaurantTable";
import Tables from "./Tables";
import Orders from "./Orders";
import MenuItem from "../components/MenuItem";

const objName = 'menuitem';

const MenuItems = (props) => {
    const [data, setData] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [newMenuItemForm, setNewMenuItemForm] = useState(null);
    const [deletionMode, setDeletionMode] = useState(null);
    const [menuItemData, setMenuItemData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [file, setFile] = useState(null);

    const [newIngredient, setNewIngredient] = useState(null);
    const [ingredients, setIngredients] = useState(null);

    const handleRowClick = (id) => {
        const fetchData = async () => {
            setSelectedMenuItem(await getOne(objName, id));
        };
        fetchData();
    }

    const getIngredientsOptions = () => {
        return ingredients.map((el, ind) => {
            return {value: el.id, text: (el.name + ', в ' + el.unit)}
        })
    }

    const handleOrderClick = async (id) => {
        const order = await getOne('order', id);
        
        Promise.all([
            new Promise(resolve => resolve(getOne('visitor', order.visitorId))),
            new Promise(resolve => resolve(getOne('table', order.tableId))),
        ]).then(result => {
            order.visitor = result[0];
            order.table = result[1];
        }).then(result => {
            props.changeContent((<Orders
                order={order}
                changeContent={props.changeContent}>

                </Orders>));
        }); 

    }
    const handleTableClick = async (id) => {
        const table = await getOne('table', id);

        props.changeContent((<Tables
            table={table}
            changeContent={props.changeContent}>

            </Tables>));
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleMenuItemChanges = (e) => {
        const {name, value} = e.target;
        setMenuItemData({
            ...menuItemData,
            [name]: value
        });
    }

    const handleIngredientChanges = (e) => {
        const {name, value} = e.target;
        setNewIngredient({
            ...newIngredient,
            [name]: value
        });
    }

    const handleIngredientSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(newIngredient);
            const response = await createOne('recipeitem', {menuitemId: selectedMenuItem.id, quantity: newIngredient.quantity, inventoryId: newIngredient.inventoryId});
            alert('Ингредиент успешно добавлен к блюду');
            setNewIngredient(null);
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        await new Promise(resolve => {
            formData.append('name', menuItemData.name);
            formData.append('description', menuItemData.description);
            formData.append('category', menuItemData.category);
            formData.append('price', menuItemData.price);
            formData.append('img', file);

            console.log(file);

            resolve(formData)
        }).then(async (result) => {
            if (isUpdating) {
                try {
                    const response = await updateOne(objName, editedId, formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data', // Важно для передачи файлов!
                        },
                      });
                    alert('Позиция меню успешно обновлена');
                    setNewMenuItemForm(null);
                    setMenuItemData({});
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
                    const newMenuItem = await createOne(objName, formData);
                    alert('Позиция меню успешно добавлена');
                    setNewMenuItemForm(null);
                } catch (e) {
                    console.error(e);
                    alert('Возникла непредвиденная ошибка при добавлении данных. Попробуйте в другой раз');
                }
            }
        });

    }

    const handleEditClick = async (id) => {
        try {
            const response = await getOne(objName, id);
            setMenuItemData(response);
            
            setNewMenuItemForm(true);
            setIsUpdating(true);
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    
    const handleDeleteClick = async (id) => {
        try {
            await deleteOne(objName, id);
            alert('Позиция меню успешно удалена');
            setNewMenuItemForm(null);
            setDeletionMode(null);
            setSelectedMenuItem(null);
            setData(data.filter(el => el.id !== id));
        } catch (e) {
            console.error(e);
            alert('Возникла непредвиденная ошибка при удалении данных. Попробуйте в другой раз');
        }
    }

    const handleClose = () => {
        setNewMenuItemForm(null);
        setIsUpdating(null);
        setMenuItemData({});
        setNewIngredient(null);
    }

    useEffect(() => {
        if (props.menuitem) setSelectedMenuItem(props.menuitem);

        new Promise(resolve => resolve(getAll('inventory'))).then(result => 
        {
            console.log(result);
            setIngredients(result);
        });

        const fetchData = async () => {
            setData(await getAll(objName));
        }
        fetchData();
    }, []);

    return (
        // Список объектов
        <div className="container">
            <h1>Позиции меню</h1>
            <button className="create-btn" onClick={() => setNewMenuItemForm(true)}>Добавить позицию меню</button>
            {data && (<Table columns={[["id ", "id"],
                             ["название ", "name"],
                             ["цена ", "price"],
                             ["категория ", "category"]]}
                   data={data}
                   handleRowClick={handleRowClick}
                   />)}

            {/* Подробная инфа об объекте */}
            {selectedMenuItem && (
                <MenuItem menuitem={selectedMenuItem} 
                         setSelectedMenuItem={setSelectedMenuItem}
                         setEditedId={setEditedId}
                         handleEditClick={handleEditClick}
                         setDeletionMode={setDeletionMode}
                         getMenuItem={getOne}
                         handleTableClick={handleTableClick}
                         handleOrderClick={handleOrderClick}
                         setNewIngredient={setNewIngredient}></MenuItem>
            )}

            {/* Добавить ингредиент */}
            {newIngredient && (
                <DataForm title={"ингредиент"}
                onClose={handleClose}
                handleSubmit={handleIngredientSubmit}
                handleChange={handleIngredientChanges}
                data={menuItemData}
                columns={[{text: "Выберите ингредиент: ", type: "select", name: "inventoryId", options: getIngredientsOptions()},
                          {text: "Укажите количество в ед.изм.: ", type: "number", name: "quantity"},
                ]}
                isUpdating={false}></DataForm>
            )}

            {/* Обновление / создание нового объекта */}
            {newMenuItemForm && 
                <DataForm title={"позицию меню"}
                          onClose={handleClose}
                          handleSubmit={handleSubmit}
                          handleChange={handleMenuItemChanges}
                          handleFileChange={handleFileChange}
                          data={menuItemData}
                          columns={[{text: "Введите название: ", type: "text", name: "name"},
                                    {text: "Введите описание: ", type: "text", name: "description"},
                                    {text: "Укажите категорию: ", type: "text", name: "category"},
                                    {text: "Укажите цену: ", type: "number", name: "price"},
                                    {text: "Выберите фото: ", type: "file", name: "file", accept: "image/*"},
                          ]}
                          isUpdating={isUpdating}></DataForm>
            }


            {/* Удаление объекта */}
            {deletionMode && (
                <Deletion title="позицию меню"
                          onClose={setDeletionMode}
                          obj={deletionMode}
                          handleDeleteClick={handleDeleteClick}
                          setDeletionMode={setDeletionMode}></Deletion>
                
            )}
        </div>
    );
};

export default MenuItems;