// enhanceApp.js
import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import ElementUI from 'element-ui';
import YqUI from '../../packages';
import 'element-ui/lib/theme-chalk/index.css';
import vueClipboard from 'vue-clipboard2';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import './public/css/index.less';
import moment from 'moment';
moment.suppressDeprecationWarnings = true; // 去掉警告
// 解决低版本浏览器不支持es6
// Es6Promise.polyfill()

export default ({ Vue }) => {
  Vue.use(VueHighlightJS), Vue.use(ElementUI), Vue.use(Avue), Vue.use(YqUI), Vue.use(vueClipboard);
};
