import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { getAppInit } from '@/api/app';
import { setBase, getBase } from '@/utils/auth';

interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: 'desktop' | 'mobile';
  size: string;
  baseToken: any;
}

export default defineStore({
  id: 'app',
  state: (): IAppState => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    baseToken: getBase() || '',
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    closeSidebar({ withoutAnimation }) {
      Cookies.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    setSize(size) {
      this.size = size;
      Cookies.set('size', size);
    },
    getBaseToken() {
      let deviceId = 'q5HoND7tSlQZcvFPvrnUWShbF7IKBOJu';
      let deviceType = 'web';
      return new Promise((resolve, reject) => {
        getAppInit(deviceId, deviceType).then(response => {
          const { data } = response;
          console.log('getBaseToken', data)
          this.baseToken = data.token;
          setBase(data.token);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
});
