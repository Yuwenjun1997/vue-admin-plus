import { createApp } from 'vue'
import App from './App.vue'
import { setupVant } from '@/plugins/vant'
import { setupStore } from '@/store'
import './index.scss'

const app = createApp(App)
setupVant(app)
setupStore(app)

app.mount('#preview')
