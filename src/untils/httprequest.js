import axios from 'axios';

const httprequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await httprequest.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await httprequest.post(path, data, options);
    return response.data;
};

export const del = async (path, options = {}) => {
    const response = await httprequest.delete(path, options);
    return response.data;
};

export default httprequest;
