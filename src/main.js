import Vue from 'vue';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.min.css';

import App from './App';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

function setTitle(title) {
  if (title) {
    document.title = `${title} | Japanese Phrasebook`;
  } else {
    document.title = 'Japanese Phrasebook';
  }
}

function setDescription(text) {
  const element = document.querySelector('meta[name="description"]');
  const description = '⛩ 100% free Japanese Phrasebook app, built for travel and offline usage. Add it to your Home screen and access 670+ essential phrases in 19 topics. Requires no Internet connection and offers speech synthesis, so you know how to pronounce Japanese phrases correctly.';
  element.content = text || description;
}

Vue.directive('document-title', {
  inserted(el, binding) { setTitle(binding.value); },
  update(el, binding) { setTitle(binding.value); },
});

Vue.directive('meta-description', {
  inserted(el, binding) { setDescription(binding.value); },
  update(el, binding) { setDescription(binding.value); },
});

store.dispatch('FETCH_DATABASE')
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      mounted() {
        document.dispatchEvent(new Event('render-event'));
      },
    });
  });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
