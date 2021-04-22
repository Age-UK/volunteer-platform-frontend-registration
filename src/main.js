import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';
import router from './router';
import store from './store';
import * as services from './services';
import language from './language';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
import VueFeather from 'vue-feather';

Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueSvgInlinePlugin)
  .component(VueFeather.name, VueFeather);

app.config.globalProperties.$services = services;
app.config.globalProperties.$language = language;

(async () => {
  app.config.globalProperties.$appGlobals = {
    orgName: process.env.VUE_APP_ORG_NAME,
    salutations: [
      {
        name: 'Mr.',
        value: 'Mr',
      },
      {
        name: 'Mrs.',
        value: 'Mrs',
      },
      {
        name: 'Miss',
        value: 'Miss',
      },
      {
        name: 'Dr.',
        value: 'Dr',
      },
      {
        name: 'Ms.',
        value: 'Ms',
      },
      {
        name: 'Prof.',
        value: 'Prof',
      },
      {
        name: 'Rev.',
        value: 'Rev',
      },
    ],
    divisions: await services.volunteers.divisions(),
  };

  app.mount('#app');
})();
