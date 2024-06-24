import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar';

import 'quasar/dist/quasar.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Quasar, quasarUserOptions);

app.mount('#app');