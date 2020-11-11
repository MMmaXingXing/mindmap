// import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
// import Element from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

// Vue.use(Element);
Vue.use(Vuetify as any);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
});
