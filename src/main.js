import { createApp } from 'vue';
import App from './App.vue';
import router from './modules/router';
import pinia from './modules/pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App).use(router).use(pinia).mount('#app');
