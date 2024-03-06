import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { setupStore } from './store';

import '@/styles/index.scss';
import SvgIcon from './icons'; // icon
import './permission'; // permission control
import vPermission from './directive/permission/index'; // permission control
import { checkEnableLogs } from './utils/error-log'; // error log
import { PhoneInput } from '@lbgm/phone-number-input';

// register as global component
const app = createApp(App);
setupStore(app);
app.use(router);
app.component('svg-icon', SvgIcon);
app.component('PhoneInput', PhoneInput);
app.directive('permission', vPermission);
checkEnableLogs(app);

app.mount('#app');
