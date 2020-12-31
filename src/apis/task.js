import { API_ENDPOINT } from './../constants/index'
import axiosService from '../services/axiosService';
import qs from 'query-string'
// https://5fdc8b0348321c0017011e20.mockapi.io/api/tasks
const url = 'tasks';

// https://5fdc8b0348321c0017011e20.mockapi.io/api/tasks METHOD: GET
export const getList = (params = {}) => {
    let queryParams = ''
    if (Object.keys(params).length > 0) {
        queryParams = `?${qs.stringify(params)}`
    }
    return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`)
}

// https://5fdc8b0348321c0017011e20.mockapi.io/api/tasks METHOD: POST
export const addTask = (data) => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, data)
}

// https://5fdc8b0348321c0017011e20.mockapi.io/api/tasks/:id METHOD: PUT
export const updateTask = (data, taskId) => {
    return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
}

// https://5fdc8b0348321c0017011e20.mockapi.io/api/tasks/:id METHOD: DELETE
export const deleteTask = (taskId) => {
    return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
}