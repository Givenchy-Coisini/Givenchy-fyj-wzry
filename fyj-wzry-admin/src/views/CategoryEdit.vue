<template>
    <div>
        <h2>{{ id ? '编辑':'新建' }}分类</h2>
        <el-form label-width="120px"  @submit.native.prevent="save">
            <el-form-item label="分类名称">
            <el-input v-model="model.name"></el-input>
            </el-form-item>
             <el-form-item label="上级分类">
            <!-- parent是一父级分类的id -->
            <el-select v-model="model.parent">
              <!-- label 是显示的内容 value 是真正选中的值-->
              <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id" ></el-option>
            </el-select>
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
      model: {},
      parents: []
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      if (this.id) { // 编辑
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else { // 新建
        res = await this.$http.post('rest/categories', this.model)
      }
      this.$router.push('/categories/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents () {
      const res = await this.$http.get('rest/categories')
      this.parents = res.data
    }
  },
  created () {
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>
