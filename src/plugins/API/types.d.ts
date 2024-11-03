export interface ApiResponse<Type> {
    code: number,
    data: Type,
}

export interface ApiError {
    message: string;
    code: number;
}
