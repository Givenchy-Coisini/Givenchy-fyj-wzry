<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="英雄名称">
        <el-input v-model="model.name" placeholder="请输入英雄名称"></el-input>
      </el-form-item>
      <el-form-item label="英雄头像">
        <!-- 样式需要调整 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
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
      model: {
        name: '',
        avatar: ''
      }
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      if (this.id) {
        // 编辑
        res = await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else {
        // 新建
        res = await this.$http.post('rest/heros', this.model)
      }
      this.$router.push('/heros/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      this.model = res.data
    },
    afterUpload (res) {
      // this.$set(this.model, 'avatar', res.url)  刚开始model中没有的话 要用这个
      console.log(res)
      this.model.avatar = res.url
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

<style>
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
