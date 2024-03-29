// main.ts
import Create from 'components/Create.vue'
import Item from 'components/Item.vue'
import Items from 'components/Items.vue'
import Share from 'components/Share.vue'
import { createPinia } from 'pinia'
import {
  ActionBar,
  DropdownMenu, DropdownItem,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  Button,
  CellGroup,
  Col,
  Field,
  FloatingBubble,
  Icon,
  NavBar,
  Row,
  ShareSheet,
  Slider,
  Tabbar,
  TabbarItem,
  Toast,
  Popover
} from 'vant'
import 'vant/lib/index.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes = [
  { path: '/', component: Items, meta: { transition: 'slide-right' } },
  { path: '/items/:id', component: Item },
  { path: '/create', component: Create, meta: { transition: 'slide-left' }, },
  {
    path: '/share',
    component: Share, meta: { transition: 'slide-left' },
  },
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
        to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        console.debug(`to.path=${to.path}, toDepth=${toDepth}, from.path=${from.path}, fromDepth=${fromDepth}`,to.path, to.meta.transition)
        
    } else if (/\/items\/[\d\D]+/.test(to.path) && /\/share/.test(from.path)) {
      to.meta.transition = 'slide-left'
    } else {
      console.warn(`unknown transition: to.path=${to.path}, from.path=${from.path}`)
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
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Popover);

app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
}
