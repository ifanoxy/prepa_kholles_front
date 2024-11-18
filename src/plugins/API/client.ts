import axios, {type AxiosInstance, type AxiosRequestConfig} from 'axios';
import type {ApiError, ApiResponse} from './types';
import {PostUserGenToken} from "./routes/user/post_user_gen_token";
import {PostUserAuth} from "./routes/user/post_user_auth";
import type {
    UserAuthBody,
    UserAuthBodyToken,
    UserAuthData,
    UserChangePasswordBody,
    UserGenTokenBody
} from "@/plugins/API/routes/user/Users";
import {GetUsers} from "@/plugins/API/routes/users/get_users";
import {GetMatieres} from "@/plugins/API/routes/matieres/get_matieres";
import {GetChapitres} from "@/plugins/API/routes/chapitres/get_chapitres";
import {PostCreateSujet} from "@/plugins/API/routes/sujets/post_create_sujet";
import {GetSujets} from "@/plugins/API/routes/sujets/get_sujets";
import {PostUserChangePassword} from "@/plugins/API/routes/user/post_user_change_password";

class XApiClient {
    private client: AxiosInstance;
    public route: {
        sujets: {
            getAll: () => Promise<ApiResponse<SujetData>>
            create: (body: SujetsData) => Promise<ApiResponse<SujetsData>>
        },
        chapitres: {
            getAll: () => Promise<ApiResponse<ChapitresData[]>>,
        },
        matieres: {
            getAll: () => Promise<ApiResponse<MatieresData[]>>,
        },
        user: {
            isAuth: (options: UserAuthBody) => Promise<ApiResponse<UserAuthData<UserAuthBody extends UserAuthBodyToken ? 'user_id' : 'token'>>>;
            createToken: (options: UserGenTokenBody) => Promise<UserGenTokenBody>
            changePassword: (options: UserChangePasswordBody) => Promise<{ new_token: string}>
        },
        users: {
            getAll: () => Promise<ApiResponse<UsersData[]>>
        }
    };

    constructor()
    {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:2000',
            timeout: 30000,
            headers: { 'Content-Type': 'application/json' },
        });

        this.route = {
            sujets: {
                getAll: GetSujets(this),
                create: PostCreateSujet(this),
            },
            chapitres: {
                getAll: GetChapitres(this),
            },
            matieres: {
                getAll: GetMatieres(this)
            },
            user: {
                createToken: PostUserGenToken(this),
                isAuth: PostUserAuth(this),
                changePassword: PostUserChangePassword(this)
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
            config = { ...config, headers: { ...config?.headers, Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const response = await this.client.get<Type>(route, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async post<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            config = { ...config, headers: { ...config?.headers, Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const response = await this.client.post<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async put<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            config = { ...config, headers: { ...config?.headers, Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const response = await this.client.put<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async patch<Data>(route: string, data: Data, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            config = { ...config, headers: { ...config?.headers, Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const response = await this.client.patch<Data>(route, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async delete<Data>(route: string, config?: AxiosRequestConfig): Promise<Data>
    {
        try {
            config = { ...config, headers: { ...config?.headers, Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const response = await this.client.delete<Data>(route, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): ApiError {
        if (!localStorage.getItem('token'))return;
        console.log(error);
            if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
            }
            return {
                message: (Array.isArray(error.response.data.errors) ? error.response.data.errors.map((x: { message: string }) => x?.message).join("\n") : error.response.data?.errors?.message) || error.response.data?.errors,
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
