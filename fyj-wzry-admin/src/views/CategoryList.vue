<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="240"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="200">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
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
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm('此操作将永久删除该分类,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/categories/${row._id}`, this.model)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // todo 删除成功以后重新获取一下数据
          this.fetch()
        })
    }
  }
}
</script>

<style scoped>
</style>
