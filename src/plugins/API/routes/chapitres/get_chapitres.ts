import {XApiClient} from "../../client";

export function GetChapitres (client: XApiClient) {
    return async function () {
        return client.get<ChapitresData[]>('/v1/chapitres');
    }
}
