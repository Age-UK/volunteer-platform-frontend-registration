import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress';
import SignUp from '@/views/general/SignUp';

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: 'Sign up',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * NProgress
 */
router.beforeEach(async to => {
  /**
   * Hide any previous alerts, unless we send a query param (?message=true)
   * to the next router path to retain the Alert banner.
   */
  if (!to.query.message) {
    store.dispatch('alert/hideAlert');
  }

  /**
   * Start the route progress bar.
   */
  NProgress.start();
});

router.afterEach(async () => {
  window.scrollTo(0, 0);

  /**
   * Complete the animation of the route progress bar.
   */
  NProgress.done();
});

export default router;
