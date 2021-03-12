import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(router).use(Antd).mount('#app')