<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rightData" style="width: 100%">
      <el-table-column type='index' :index='indexMethod'>
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column prop="level" label="等级">
        <!-- 自定义列 -->
        <template slot-scope='scope'>
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightData: [{
        authName: '商品管理',
        path: 'goods',
        level: '一级'
      }]
    }
  },
  created () {
    this.loadRightsData()
  },
  methods: {
    async loadRightsData () {
      let res = await this.$axios.get('rights/list')
      this.rightData = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped>
  .el-breadcrumb {
    height: 40px;
    background: #D4DAE0;
    line-height: 40px;
    padding-left: 20px;
  }
</style>
