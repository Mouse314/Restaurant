import axios from "axios";

export const API = {
    getVisitors : async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/visitor');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
}