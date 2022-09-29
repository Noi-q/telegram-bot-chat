import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import { Notify } from 'vant';
import V3ColorPicker from "v3-color-picker"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(Notify)
  .use(V3ColorPicker)
  .use(router)
  .use(pinia)
  .mount('#app')
