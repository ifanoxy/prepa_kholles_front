import {XApiClient} from "../../client";
import type {UserAuthBody} from "@/plugins/API/routes/user/Users";

export function PostUserAuth (client: XApiClient) {
    return function (options: UserAuthBody) {
        return client.post<UserAuthBody>('/v1/user/auth', options);
    }
}



