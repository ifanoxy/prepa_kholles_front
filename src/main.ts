import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import plugin from './plugins/Plugins';
import Aura from '@primevue/themes/aura';
import {ToastService} from "primevue";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

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
                },
                secondary: {
                    100: '#E08D7C',
                    200: '#D87767',
                    300: '#D06254',
                    400: '#C8553D',
                    500: '#B24C36',
                    600: '#9B4330',
                    700: '#853B2A',
                    800: '#6F3223',
                    900: '#59291D',
                },
            }
        },
    }
});
app.use(ToastService);

app.use(plugin);
app.use(router);

app.mount('#app')
