import router from './router';
import userStore from './store/modules/user';
import appStore from './store/modules/app';
import permissionStore from './store/modules/permission';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log('router.beforeEach', to.path, from.path);
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  await appStore().getBaseToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      next({ path: '/' });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = userStore().roles && userStore().roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          await userStore().getInfo() as any;
          let roles = ['admin'];
          const accessRoutes = await permissionStore().generateRoutes(roles);
          accessRoutes.forEach(item => {
            router.addRoute(item);
          });

          next();

        } catch (error: any) {
          ElMessage.error(error.msg || 'Has Error');
          NProgress.done();
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      NProgress.done();
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
