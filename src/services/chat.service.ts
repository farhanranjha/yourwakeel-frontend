import axios from 'axios';
import { IchatWithAi } from '../types/services';


const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
export async function chatWithAi(data: IchatWithAi) {
    try {
        const response = await axios.post(`${API_BASE_URL}/ai_assistant/`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getCategories() {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/PK/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
