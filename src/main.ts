import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import { Notify } from 'vant';
import { Toast } from 'vant';
import V3ColorPicker from "v3-color-picker"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

VMdPreview.use(vuepressTheme);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(VMdPreview)
  .use(Notify)
  .use(Toast)
  .use(V3ColorPicker)
  .use(router)
  .use(pinia)
  .mount('#app')
