import {XApiClient} from "../../client";

export function GetMatieres (client: XApiClient) {
    return async function () {
        return client.get<MatieresData[]>('/v1/matieres');
    }
}
