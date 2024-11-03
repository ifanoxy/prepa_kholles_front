declare module '@vue/runtime-core' {
    import {ApiClient} from "@/plugins/API/client";

    interface ComponentCustomProperties {
        $apiClient: typeof ApiClient;
    }
}
