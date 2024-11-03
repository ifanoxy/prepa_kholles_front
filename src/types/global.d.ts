declare module '@vue/runtime-core'
{
    import {ApiClient} from "@/plugins/API/lib";

    interface ComponentCustomProperties {
        $apiClient: typeof ApiClient;
    }

}
