import store from '@/store';
import { defineComponent } from 'vue';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default defineComponent({
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.app().closeSidebar({ withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.app().toggleDevice('mobile');
      store.app().closeSidebar({ withoutAnimation: true });
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.app().toggleDevice(isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          store.app().closeSidebar({ withoutAnimation: true });
        }
      }
    }
  }
});
