import {XApiClient} from "../../client";

export function GetUsers (client: XApiClient) {
    return async function () {
        return client.get<UsersData[]>('/v1/users');
    }
}
