import {XApiClient} from "../../client";

export function GetSujets (client: XApiClient) {
    return async function () {
        return client.get<SujetData[]>('/v1/sujets');
    }
}
