<template>
  <div id="yq-search">
    <avue-form ref="yq-search-form" v-model="form" :option="searchOption" v-bind="$attrs" v-on="$listeners">
      <template slot-scope="{ size }" slot="menuForm">
        <el-button type="text" icon="el-icon-refresh-right" @click="rest">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="submit">搜索</el-button>
      </template>
      <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
        <slot :name="key" v-bind="scope"></slot>
      </template>
      <template v-for="(slot, key) in $slots" :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </avue-form>
  </div>
</template>

<script>
import { handlerSearch } from '../../../utils';
import './index.less';
export default {
  name: 'yq-search',
  props: {
    option: Object, //搜索配置，原avue option
    params: Object, //搜索数据，原avue v-model绑定值，心在使用 :params.sync绑定，.sync修饰符为必需
    //额外其他参数，params中不存在的参数，通过这个参数传递
    other: {
      type: Object,
      default: () => ({})
    },
    //分页数据，avue-crud中page数据传入即可，使用时必须加上.sync修饰符 :page.sync
    page: {
      type: Object,
      default: () => ({})
    },
    //列表loading，使用时必须加上.sync修饰符 :tableLoading.sync
    tableLoading: {
      type: Boolean,
      default: false
    },
    //列表数据，使用时必须加上.sync修饰符 :tableData.sync
    tableData: {
      type: Array,
      default: () => []
    },
    //由于后端不稳定因素，有时候分页records字段会不一样，可能为其他值，如rows，
    //默认为records，修改如下 :keyVal={list:'rows'}
    keyVal: {
      type: Object,
      default: () => ({
        list: 'records'
      })
    }
  },
  computed: {
    //拷贝一份不受原page对象影响的对象，用于监听分页数据修改时调用搜索方法
    newPage() {
      return JSON.parse(JSON.stringify(this.page));
    }
  },
  watch: {
    //用于跟搜索数据进行绑定
    form: {
      handler(val, oldVal) {
        this.$emit('update:params', val);
      },
      deep: true,
      immediate: true
    },
    //用于监听分页数据修改，调用搜索方法
    newPage: {
      handler(val, oldVal) {
        if (oldVal) {
          if (val.pageSize != oldVal.pageSize || val.currentPage != oldVal.currentPage) {
            console.log('分页修改');
            this.submit();
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      searchOption: {
        //下面为默认配置，可通过option进行覆盖
        submitBtn: false,
        emptyBtn: false,
        labelPosition: 'top',
        labelSuffix: ' ',
        menuSpan: 4,
        //默认为post请求
        method: 'post',
        ...this.option
      },
      form: this.params
    };
  },
  mounted() {
    this.init();
    window.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
    //用于调整搜索按钮区域样式
    init() {
      const dom = document.querySelector('.avue-form__menu');
      const index = [...dom.classList].indexOf('el-col-24');
      if (index == -1) {
        dom.style.height = dom.previousElementSibling.clientHeight + 'px';
      }
    },
    //重置方法
    rest() {
      this.$refs['yq-search-form'].resetForm();
      this.$emit('update:page', { pageSize: 20, currentPage: 1, total: 0 });
      console.log('重置');
      this.submit();
    },
    getParentTag(startTag, parentTagList = []) {
      // 传入标签是否是DOM对象
      if (!(startTag instanceof HTMLElement)) return console.error('receive only HTMLElement');
      // 父级标签是否是body,是着停止返回集合,反之继续
      if (startTag.parentElement && 'BODY' !== startTag.parentElement.nodeName) {
        // 放入集合
        parentTagList.push(startTag.parentElement.id);
        // 再上一层寻找
        return this.getParentTag(startTag.parentElement, parentTagList);
      }
      // 返回集合,结束
      else return parentTagList;
    },
    keydown(e) {
      if (e.keyCode == 13) {
        if (this.getParentTag(e.target).indexOf('yq-search') > -1) {
          this.submit();
        }
      }
    },
    //搜索方法
    async submit() {
      this.$emit('update:tableLoading', true);
      //处理搜索数据及分页数据跟后台接口对应（avue，page数据和后端分页size等不一致）
      const search = handlerSearch({ ...this.form, ...this.other }, this.searchOption.column);
      const pageObj = {};
      pageObj.size = this.page.pageSize;
      pageObj.current = this.page.currentPage;
      // 返回数据
      let result = {};
      try {
        const { data: res } = await this.$axios({
          method: this.searchOption.method,
          //option内url为搜索接口地址
          url: this.searchOption.url,
          [this.searchOption.method == 'get' ? 'params' : 'data']: { ...search, ...pageObj }
        });
        result = res;
        // 请求成功更新分页数据及列表数据
        if (res.success) {
          this.$emit('update:page', { ...this.page, total: res.data.total });
          this.$emit('update:tableData', res.data[this.keyVal.list]);
        }
      } catch (error) {
        result = error;
      }
      //可通过search方法获取返回数据，单独处理
      this.$emit('search', result);
      this.$emit('update:tableLoading', false);
      console.log('结束');
    }
  }
};
</script>
