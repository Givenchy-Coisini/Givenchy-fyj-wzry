<template>
    <div>
        <h2>创建分类</h2>
        <el-form label-width="120px"  @submit.native.prevent="save">
            <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
            </el-form-item>
              <el-form-item>
             <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async save () {
      const res = await this.$http.post('categories', this.model) // eslint-disable-line no-unused-vars
      this.$router.push('/categories/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>

<style scoped>

</style>
