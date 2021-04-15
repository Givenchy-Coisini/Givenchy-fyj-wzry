<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}物品</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name" placeholder="请输入物品名称"></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <!-- 样式需要调整 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      if (this.id) {
        // 编辑
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        // 新建
        res = await this.$http.post('rest/items', this.model)
      }
      this.$router.push('/items/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload (res) {
      // vue的显示赋值
      this.$set(this.model, 'icon', res.url)
      console.log(res)
      // this.model.icon = res.url
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>
