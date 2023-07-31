import YqSearch from './src/index.vue';

export default {
  install(Vue: any) {
    Vue.component(YqSearch.name, YqSearch)
  }
}  