import axios, { AxiosResponse } from 'axios';
import { SynthesisBatch } from '../models/synthesisbatch';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody), 
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody), 
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody), 
}

const SynthesisBatches = {
    list: () => requests.get<SynthesisBatch[]>('/SynthesisBatch'),
    details: (id: string) => requests.get<SynthesisBatch>(`/SynthesisBatch/${id}`),
    create: (synthesisbatch: SynthesisBatch) => axios.post<void>('/SynthesisBatch', synthesisbatch),
    update: (synthesisbatch: SynthesisBatch) => axios.put<void>(`/SynthesisBatch/${synthesisbatch.id}`,synthesisbatch),
    delete: (id: string) => axios.delete(`/SynthesisBatch/${id}`)
}

const agent = {
    SynthesisBatches
}

export default agent;