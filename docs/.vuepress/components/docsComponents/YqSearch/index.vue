<template>
  <div>
    <yq-search :option="option" :params.sync="searchObj" :page.sync="page" :tableLoading.sync="loading"> </yq-search>
    <el-select v-model="page.currentPage">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    const dic = [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'fankui',
                label: '反馈'
              }
            ]
          }
        ]
      }
    ];
    return {
      loading: false,
      select: '',
      options: [
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        },
        {
          label: '3',
          value: '3'
        },
        {
          label: '4',
          value: '4'
        }
      ],
      searchObj: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      option: {
        url: '/api/get_user',
        menuSpan: 4,
        column: [
          {
            label: '测试',
            type: 'input',
            prop: 'xxx',
            span: 4,
            placeholder: 'Hello World'
          },
          {
            label: '测试',
            type: 'input',
            prop: 'ss',
            span: 4,
            placeholder: 'Hello World'
          },
          {
            label: '级联',
            prop: '__SELECT__xxqqx',
            _prop: 'xxqqx',
            type: 'cascader',
            dicData: dic,
            multiple: true,
            span: 4
          }
        ]
      }
    };
  },
  methods: {
    onsubmit(res) {
      console.log(this.searchObj);
      console.log('搜索');
      console.log(res);
    }
  }
};
</script>
