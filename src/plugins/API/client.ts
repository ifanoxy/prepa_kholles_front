import axios, {type AxiosInstance, type AxiosRequestConfig} from 'axios';
import type {ApiError, ApiResponse} from './types';
import {PostUserGenToken} from "./routes/user/post_user_gen_token";
import {PostUserAuth} from "./routes/user/post_user_auth";
import type {UserAuthBody, UserAuthBodyToken, UserAuthData, UserGenTokenBody} from "@/plugins/API/routes/user/Users";
import {GetUsers} from "@/plugins/API/routes/users/get_users";

class XApiClient {
    private client: AxiosInstance;
    public route: {
        user: {
            isAuth: (options: UserAuthBody) => Promise<ApiResponse<UserAuthData<UserAuthBody extends UserAuthBodyToken ? 'user_id' : 'token'>>>;
            createToken: (options: UserGenTokenBody) => Promise<UserGenTokenBody>
        },
        users: {
            getAll: () => Promise<ApiResponse<UsersData[]>>
        }
    };

    constructor()
    {
        this.client = axios.create({
            baseURL: 'http://172.20.10.3:2000',
            timeout: 10000,
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

    private handleError(error: unknown): ApiError {
        console.log(error);
            if (axios.isAxiosError(error) && error.response) {
            return {
                message: (Array.isArray(error.response.data.errors) ? error.response.data.errors.map((x: { message: string }) => x?.message).join("\n") : error.response.data.errors.message) || 'Unknown Error',
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
