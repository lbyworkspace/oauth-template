import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    // 按钮权限
    ...mapGetters([
      'elements'
    ])
  },
  mounted() {
  },
  methods: {
    // 关闭对话框
    handleClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    }
  }
}
