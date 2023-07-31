import YqSearch from './search';
import { version } from '../package.json';

const components = [YqSearch];

const install: any = function (Vue: any) {
  // 遍历注册全局组件
  components.map((e: any) => e.install(Vue));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version,
  YqSearch,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
};
