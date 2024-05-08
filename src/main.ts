// main.ts
import Share from 'components/Share.vue'
import { createPinia } from 'pinia'
import {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  Button,
  CellGroup,
  Col,
  DropdownItem,
  DropdownMenu,
  Field,
  FloatingBubble,
  Icon,
  NavBar,
  Popover,
  Row,
  ShareSheet,
  Slider,
  Tabbar,
  TabbarItem,
  Toast,
} from 'vant'
import 'vant/lib/index.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import About from './About.vue'
import App from './App.vue'
import Item from './Item.vue'
import Items from './Items.vue'
import Query from './Query.vue'
import Settings from './Settings.vue'
import './style.css'

const routes = [
  { path: '/query', component: Query },
  { path: '/items', component: Items },
  { path: '/items/:id', component: Item },
  { path: '/settings', component: Settings },
  { path: '/about', component: About },
  {
    path: '/share',
    component: Share,
    meta: { transition: 'slide-left' },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: Query },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

router.afterEach((to, from) => {
  if (to.path === from.path) {
    to.meta.transition = ''
    return
  }
  if (!to.meta?.transition) {
    if (to.path.includes(from.path) || from.path.includes(to.path)) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // from parent -> child: slide left
      // from child -> parent: slide right
      if (to.path.includes(from.path)) {
        to.meta.transition = 'slide-left'
      } else {
        to.meta.transition = 'slide-right'
      }
      // to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      console.debug(
        `to.path=${to.path}, toDepth=${toDepth}, from.path=${from.path}, fromDepth=${fromDepth}`,
        to.path,
        to.meta.transition
      )
    } else if (/\/items\/[\d\D]+/.test(to.path) && /\/share/.test(from.path)) {
      to.meta.transition = 'slide-left'
    } else {
      console.info(
        `no transition used: to.path=${to.path}, from.path=${from.path}`
      )
    }
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(NavBar)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(Field)
app.use(CellGroup)
app.use(Button)
app.use(Col)
app.use(Row)
app.use(ShareSheet)
app.use(Toast)
app.use(ActionSheet)
app.use(FloatingBubble)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(Slider)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(Popover)

app.use(router)

app.mount('#app')

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceWorker.js')
// }
