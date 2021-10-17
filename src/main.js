import {createApp} from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import BalmUI from "balm-ui";
import BalmUIPlus from "balm-ui-plus";
import $typography from "balm-ui/plugins/typography";
import "balm-ui-css";

const app = createApp(App);

app.use(store);
app.use(router);

app.use(BalmUI);
app.use(BalmUIPlus);
app.use($typography);

app.mount("#app");
