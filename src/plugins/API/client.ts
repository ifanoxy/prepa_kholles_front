import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {ApiError, ApiResponse} from './types';
import {PostUserGenToken} from "./routes/user/post_user_gen_token";
import {PostUserAuth} from "./routes/user/post_user_auth";
import type {UserAuthBody, UserGenTokenBody} from "@/plugins/API/routes/user/Users";
import {GetUsers} from "@/plugins/API/routes/users/get_users";

class XApiClient {
    private client: AxiosInstance;
    public route: {
        user: {
            isAuth: (options: UserAuthBody) => Promise<UserAuthBody>;
            createToken: (options: UserGenTokenBody) => Promise<UserGenTokenBody>
        },
        users: {
            getAll: () => Promise<ApiResponse<UsersData[]>>
        }
    };

    constructor()
    {
        this.client = axios.create({
            baseURL: 'http://localhost:2000',
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' },
        });

        this.route = {
            user: {
                createToken: PostUserGenToken(this),
                isAuth: PostUserAuth(this),
            },
            users: {
                getAll: GetUsers(this)
            }
        }
    }

    public getClient()
    {
        return this;
    }

    public async get<Type>(route: string, config?: AxiosRequestConfig): Promise<Type>
    {
        try {
            const response = await this.client.get<Type>(route, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async post<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            const response = await this.client.post<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async put<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            const response = await this.client.put<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async patch<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            const response = await this.client.patch<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async delete<Data>(route: string, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            const response = await this.client.delete<Data>(route, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): ApiError {
        if (axios.isAxiosError(error) && error.response) {
            return {
                message: error.response.data.message || 'Unknown Error',
                code: error.response.status,
            };
        }
        return {
            message: 'Connexion Error',
            code: 500,
        };
    }
}

export const ApiClient = new XApiClient().getClient();
