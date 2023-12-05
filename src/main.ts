// main.ts
import 'virtual:uno.css'
import './style.css'
import 'vant/lib/index.css'
import { createApp } from 'vue'
import { Button, NavBar, ActionBar, ActionBarIcon, ActionBarButton, Field, CellGroup, Col, Row } from 'vant'
import TextEdit from 'components/TextEdit.vue';
import Home from 'components/Home.vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {path:"/", component: Home },
  { path: '/edit', component: TextEdit },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(NavBar)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(Field)
app.use(CellGroup)
app.use(Button)
app.use(Col)
app.use(Row)

app.use(router)

app.mount('#app')

