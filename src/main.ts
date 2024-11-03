import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import plugin from './plugins/Plugins';
import Aura from '@primevue/themes/aura';
import {ToastService} from "primevue";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: {
            ...Aura,
            semantic: {
                ...Aura.semantic,
                primary: {
                    100: '#F5B36D',
                    200: '#F2A94D',
                    300: '#F28F3B',
                    400: '#E57D2D',
                    500: '#D66C2C',
                    600: '#C55A2B',
                    700: '#B5492A',
                    800: '#A53829',
                    900: '#96272B',
                }
            }
        },
    }
});
app.use(ToastService);

app.use(plugin);
app.use(router);

app.mount('#app')
