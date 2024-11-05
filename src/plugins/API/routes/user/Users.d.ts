export interface UserGenTokenBody {
    first_name: string,
    last_name: string,
    password: string,
}

export interface UserAuthData<Type extends 'token' | 'user_id'> {
    [key: Type]: string;
}

export type UserAuthBody = UserAuthBodyToken | UserAuthBodyPassword;

export interface UserAuthBodyToken {
    token: string,
}

export interface UserAuthBodyPassword {
    password: string,
    first_name: string,
    last_name: string,
}
