<template>
    <div>
        <h2>{{ id ? '编辑':'新建' }}广告位</h2>
        <el-form label-width="120px"  @submit.native.prevent="save">
            <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
            </el-form-item>
             <el-form-item label="名称">
          <el-button type="primary" @click="model.items.push({})"
            ><i class="el-icon-plus"></i>添加广告</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, i) in model.items" :key="i">
              <el-form-item label="跳转链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem;">
                <!-- 样式需要调整 -->
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
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
        items: []
      }
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      if (this.id) { // 编辑
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else { // 新建
        res = await this.$http.post('rest/ads', this.model)
      }
      this.$router.push('/ads/lists')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

<style scoped>

</style>
