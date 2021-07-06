import axios, { AxiosResponse } from 'axios';

export class BaseApiService {
    private _anonymous: boolean = false;

    constructor() {
        this._anonymous = localStorage.getItem('token') === null ? true : false;
    }
    protected async GET<TResponse>(endpointUrl: string): Promise<AxiosResponse<TResponse>> {
        if (this._anonymous) {
            return axios.get(endpointUrl);
        }

        return axios.get(endpointUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }
    protected async POST<TPayload, TResponse>(endpointUrl: string, payload: TPayload, anonymous = false): Promise<AxiosResponse<TResponse>> {
        if (anonymous || this._anonymous) {
            return axios.post(endpointUrl, payload);
        }

        return axios.post<TResponse>(endpointUrl, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }

    protected async PUT<TPayload, TResponse>(endpointUrl: string, payload: TPayload): Promise<AxiosResponse<TResponse>> {
        if (this._anonymous) {
            return axios.put(endpointUrl, payload);
        }

        return axios.put<TResponse>(endpointUrl, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }

    protected async DELETE<TResponse>(endpointUrl: string): Promise<AxiosResponse<TResponse>> {
        if (this._anonymous) {
            return axios.delete(endpointUrl);
        }

        return axios.delete<TResponse>(endpointUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
    }
}
