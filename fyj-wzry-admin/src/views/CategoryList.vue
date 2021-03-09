<template>
    <div>
        <h2>分类列表</h2>
         <el-table :data="items">
          <el-table-column prop="_id" label="ID" width="240">
          </el-table-column>
          <el-table-column prop="name" label="分类名称">
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('categories')
      this.items = res.data
    }
  }
}
</script>

<style scoped>

</style>
