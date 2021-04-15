<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称">
            <el-input
              v-model="model.name"
              placeholder="请输入英雄名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input
              v-model="model.title"
              placeholder="请输入英雄名称"
            ></el-input>
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
          <el-form-item label="英雄类型">
            <el-select v-model="model.categorys" multiple>
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="primary" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <!-- 样式需要调整 -->
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
               <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
                <el-form-item >
                <el-button type="danger" size="mini" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
        avatar: '',
        scores: {
          difficult: 0,
          skills: 0,
          attackP: 0,
          survive: 0
        },
        skills: []
      },
      categories: [],
      items: []
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
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    async fetchItems () {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    afterUpload (res) {
      // this.$set(this.model, 'avatar', res.url)  刚开始model中没有的话 要用这个
      console.log(res)
      this.model.avatar = res.url
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
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
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}

.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
