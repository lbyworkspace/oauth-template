import { timeFormatter, dateFormatter, trueOrFalseFormatter, arrayFormatter } from '@/utils/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 当前页
      pageNum: 1,
      // 每页条数
      pageSize: 20,
      // 资源总数
      totalElements: 0,
      // 查询数据
      tableData: [],
      // 列表字段头定义
      columns: [],
      // 排序条件
      orders: [],
      // 加载中
      loading: false,
      // 是否有被选中的数据
      checked: false,
      // 当前选中的
      checkedId: undefined,
      // 多选
      multipleSelection: [],
      // 搜索字段
      searchFields: {}
    }
  },
  computed: {
    // 按钮权限
    ...mapGetters([
      'elements'
    ]),
    // 查询条件
    searchForm() {
      const { pageNum, pageSize, orders, searchFields, queryParamList = [] } = this
      for (const item in searchFields) {
        const _value = searchFields[item].value
        if (_value === undefined || _value === '') {
          continue
        }
        if(searchFields[item].type==='datepicker'||searchFields[item].type==='datetimepicker'){
          const stratitem = JSON.parse(JSON.stringify(searchFields[item]))
          const endItem = JSON.parse(JSON.stringify(searchFields[item]))
          stratitem.value = _value[0]
          stratitem.logic = 'GTE',
          endItem.value = _value[1]
          endItem.logic = 'LTE'
          queryParamList.push(stratitem)
          queryParamList.push(endItem)
          continue
        }
        queryParamList.push(searchFields[item])
      }
      return { pageNum: pageNum - 1, pageSize: pageSize, orders: orders, queryParamList: queryParamList }
    }
  },
  methods: {
    // 搜索查询
    search() {
      // 避免因查询结果过少导致的无法显示
      this.pageNum = 1
      this.query()
    },
    // 默认查询
    query() {
      console.info('查询覆盖此方法')
    },
    // 翻页
    handleCurrentChange(pageNum, pageSize) {
      this.pageNum = pageNum
      this.query()
    },
    // 更改每页数量
    handleSizeChange(pageNum, pageSize) {
      this.pageNum = 1
      this.pageSize = pageSize
      this.query()
    },
    // 排序
    handleSortChange(pageNum, pageSize, orders) {
      this.orders = orders
      this.query()
    },
    handleSelectionChange(ids = []) {
      this.checked = ids.length > 0
      this.multipleSelection = ids || []
    },
    clearQuery() {
      this.resetForm('searchForm')
      this.search()
    },
    // 获取选中的数据
    getMultiple() {
      if (this.multipleSelection === undefined) return []
      return this.tableData.filter(item => {
        return this.multipleSelection.indexOf(item['id']) > -1
      })
    },
    // 重置表单
    resetForm(form) {
      console.info(`清空表单内容：${form}`)
      this.$refs[form].resetFields()
    },
    // 获取列表头自定义配置
    getColums(code) {
      const { columns } = this
      const map = new Map()
      columns.forEach(item => {
        map.set(item.name, item)
      })
      this.$api.reqGetUserColumn(code).then(res => {
        if (Array.isArray(res) && Array.length > 0) {
          res.forEach(row => {
            // row['formatter'] = map.get(row.name)['formatter']
          })
        }
        this.columns = res
      }).catch(err => {
        console.error(err)
      })
    },
    // 格式化时间
    timeFormatter: timeFormatter,
    dateFormatter: dateFormatter,
    // 格式化是否
    trueOrFalseFormatter: trueOrFalseFormatter,
    // 格式化数组
    arrayFormatter: arrayFormatter
  },
  created() {
  }
}
