import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import "@matb85/base-pack/dist/index.css";
import "@matb85/base-pack/dist/navbar.css";

const app = createApp(App);

app.use(store);

app.mount("#app");
