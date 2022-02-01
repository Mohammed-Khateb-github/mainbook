

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../public/css/main-style.css'
import '../public/css/cms.css'
import axios from "axios";
import {createApp} from 'vue';
import ThemifyIcon from "vue-themify-icons";
import Toaster from "@meforma/vue-toaster";

const app=createApp(App);

app.config.globalProperties.$axios = axios;

app.config.globalProperties.$base_url = 'http://localhost:5000/';
app.use(router);

app.use(Toaster,{position:'top-right'});
app.mount('#app');



