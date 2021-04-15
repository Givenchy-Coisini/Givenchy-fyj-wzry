<template>
    <div>
        <h2>{{ id ? '编辑':'新建' }}文章</h2>
        <el-form label-width="120px"  @submit.native.prevent="save">
            <el-form-item label="文章标题">
            <el-input v-model="model.title"></el-input>
            </el-form-item>
             <el-form-item label="所属分类">
            <!-- parent是一父级分类的id -->
            <el-select v-model="model.categories" multiple>
              <!-- label 是显示的内容 value 是真正选中的值-->
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id" ></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="文章详情">
               <!-- 原理:在编辑的时候 给他们加一下p标签等标签 然后再加一下样式 做到所见即所得 -->
            <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
              <el-form-item>
             <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  // ?在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用 使用 props 将组件和路由解耦
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data () {
    return {
      model: {},
      categories: []
    }
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async save () {
      let res // eslint-disable-line no-unused-vars
      if (this.id) { // 编辑
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else { // 新建
        res = await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    }
  },
  created () {
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>
