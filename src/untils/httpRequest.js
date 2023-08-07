import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:4001',
});

export const get = async (id = '', options = {}) => {
    const response = await httpRequest.get(id, options);

    return response.data;
};

export const put = async (id = '', options = {}) => {
    try {
        return await httpRequest.put(id, options);
    } catch (error) {
        console.log('Lỗi khi cập nhật giá trị:', error);
    }
};

export const deleted = async (id = '') => {
    try {
        return await httpRequest.delete(id);
    } catch (error) {
        console.log('Lỗi khi cập nhật giá trị:', error);
    }
};

export default httpRequest;
