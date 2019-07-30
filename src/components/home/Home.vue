<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/logo.png" alt="">
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="col3">
          恭喜上海前端43期月薪20万
          <a href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>

</script>

<style scoped lang='less'>
  .el-container {
    height: 100%;
  }

  .el-header {
    height: 60px;
    background-color: #b3c1cd;
  }

  h1 {
    text-align: center;
    line-height: 60px;
    color: #fff;
  }

  .col3 {
    text-align: right;
    line-height: 60px;

    a {
      color: #daa520;
    }
  }

  .el-aside {
    background: #545c64;
  }
</style>
