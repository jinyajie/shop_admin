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
            <el-menu :router='true' :default-active="handlerUrlPath()" class="el-menu-vertical-demo"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <!-- 动态获取权限列表数据 -->
              <el-submenu :index="item1.id+''" v-for='item1 in menusData' :key='item1.id'>
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item1.authName }}</span>
                </template>
                <el-menu-item v-for='item2 in item1.children' :index="'/'+item2.path" :key='item2.id'>
                  {{ item2.authName}}
                </el-menu-item>
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
export default {
  /* eslint-disable */
    data() {
      return {
        menusData: []
      }
    },
    created() {
      this.loadLeftMenusData()
    },
    methods: {
      // 加载左侧权限列表数据
      async loadLeftMenusData() {
        let res = await this.$axios.get('menus')
        this.menusData = res.data.data
        // console.log(this.menusData)
      },
      logout() {
        this.$confirm('此操作将退出账户，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token')
          // 提示
          this.$message({
            message: '退出成功',
            type: 'success',
            duration: 800
          })
          this.$router.push('/login')
        }).catch(() => {
          console.log('点击取消')
          this.$message({
            message: '取消退出',
            type: 'info',
            duration: 800
          })
        })
      },
      handleOpen() {
        console.log('开了')
      },
      handleClose() {
        console.log('关了')
      },
      handlerUrlPath() {
        if (this.$route.path === '/goods-add') {
          return '/goods'
        }
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
