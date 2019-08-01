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
          <a href="#" @click.prevent='logout'>退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col>
            <el-menu :router='true' :default-active="handlerUrlPath()" class="el-menu-vertical-demo" @open="handleOpen"
              @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="/users">用户列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="/roles">角色列表</el-menu-item>
                <el-menu-item index="/rights">权限列表</el-menu-item>
                s
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
/* eslint-disable */
  export default {
    methods: {
      logout() {
        this.$confirm('此操作将退出账户，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token')
          //提示
          this.$message({
            message: '退出成功',
            type: 'success',
            duration: 800
          })
        }).catch(() => {
          console.log('点击取消')
          this.$message({
            message: '取消退出',
            type: 'info',
            duration: 800
          })
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handlerUrlPath() {
        return this.$route.path
      }
    }
  }
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

  .el-main {
    background: #EAEEF1;
  }
</style>
