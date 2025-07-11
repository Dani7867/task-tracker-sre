import axios from 'axios';

const API = axios.create({
    baseURL: 'http://54.145.26.245:3000',
});

export const fetchTasks = () => API.get('/tasks');
export const createTask = (title: string) => API.post('/tasks', { title });
export const deleteTask = (id: number) => API.delete(`/tasks/${id}`);
