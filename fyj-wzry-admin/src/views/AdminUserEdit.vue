<template>
    <div>
        <h2>{{ id ? '编辑':'新建' }}管理员</h2>
        <el-form label-width="120px"  @submit.native.prevent="save">
            <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
            </el-form-item>
             <el-form-item label="密码">
            <el-input v-model="model.password" show-password></el-input>
            </el-form-item>
              <el-form-item>
             <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  // ?在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用 使用 props 将组件和路由解耦
  props: {
    id: {}
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      if (this.id) { // 编辑
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else { // 新建
        res = await this.$http.post('rest/admin_users', this.model)
      }
      this.$router.push('/admin_users/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>
