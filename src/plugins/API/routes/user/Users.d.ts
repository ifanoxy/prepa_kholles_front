export interface UserGenTokenBody {
    first_name: string,
    last_name: string,
    password: string,
}

export interface UserAuthBody {
    token: string,
    user_id: string,
}
