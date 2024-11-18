import {XApiClient} from "../../client";
import type {UserChangePasswordBody} from "@/plugins/API/routes/user/Users";

export function PostUserChangePassword (client: XApiClient) {
    return async function (options: UserChangePasswordBody) {
        return client.post<{ new_token: string }>('/v1/user/change_password', options);
    }
}



