import {XApiClient} from "../../client";
import type {UserGenTokenBody} from "@/plugins/API/routes/user/Users";

export function PostUserGenToken (client: XApiClient) {
    return async function (options: UserGenTokenBody) {
        return client.post<UserGenTokenBody>('/v1/user/gen_token', options);
    }
}


