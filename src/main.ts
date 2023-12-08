// main.ts
import "virtual:uno.css";
import "./style.css";
import "vant/lib/index.css";
import { createApp } from "vue";
import {
  Button,
  NavBar,
  ActionBar,
  FloatingBubble,
  ActionBarIcon,
  ActionBarButton,
  Field,
  CellGroup,
  Col,
  Row,
  ShareSheet,
  Toast,
  Icon,
  ActionSheet,
  Tabbar, TabbarItem
} from "vant";
import Create from "components/Create.vue";
import Share from "components/Share.vue";
import Home from "components/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Item from "components/Item.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/items/:id", component: Item },
  { path: "/create", component: Create },
  {
    path: "/share",
    component: Share,
  },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(NavBar);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(Col);
app.use(Row);
app.use(ShareSheet);
app.use(Toast);
app.use(ActionSheet);
app.use(FloatingBubble);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);

app.use(router);

app.mount("#app");
