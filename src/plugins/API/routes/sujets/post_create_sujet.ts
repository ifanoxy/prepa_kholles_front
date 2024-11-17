import {XApiClient} from "../../client";

export function PostCreateSujet (client: XApiClient) {
    return async function (options: SujetsData) {
        return client.post<SujetsData>('/v1/sujets/create', options);
    }
}


