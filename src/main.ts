import { createApp } from 'vue'
import { useElementPlusIcons } from './plugins/element-ui/index'
import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(useElementPlusIcons)
app.mount('#app')
