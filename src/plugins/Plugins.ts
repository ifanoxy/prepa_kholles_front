import * as App from 'vue';
import {ApiClient} from "@/plugins/API/client";

export default {
    install: (app: App) =>
    {
        app.config.globalProperties.$apiClient = ApiClient;
    }
}
