import axios from "axios";

export const getVisitors = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/visitor');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const getVisitor = async (id) => {
    try {
        const response = await axios.get('http://localhost:5000/api/visitor/' + id);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const createVisitor = async (visitor) => {
    try {
        const response = await axios.post('http://localhost:5000/api/visitor/', visitor);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const updateVisitor = async (id, newVisitor) => {
    try {
        const response = await axios.put('http://localhost:5000/api/visitor/' + id, newVisitor);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

export const deleteVisitor = async (id) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/visitor/' + id);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}