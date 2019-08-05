<template>
  <div>
    <el-button type="success" @click='showAddCatDialog' plain>添加分类</el-button>
    <el-table :data="catData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope='scope'>
          <el-tree :data="scope.row.children" :props="defaultProps"></el-tree>
        </template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope='scope'>
          <span>{{ scope.row.cat_deleted ? '否' : '是'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="层级">
        <template slot-scope='scope'>
          <span v-if='scope.row.cat_level==0'>一级</span>
          <span v-else-if='scope.row.cat_level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" @closed='dialogClosed' :visible.sync="dialogAddCatVisible">
      <el-form :model="addCatForm" label-width="80px" ref='addCatForm'>
        <el-form-item label="分类名称" prop='cat_name'>
          <el-input v-model="addCatForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" prop='cat_pid_arr'>
          <el-cascader v-model='addCatForm.cat_pid_arr' :options="options" :props='defaultProps1' clearable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
  export default {
    data() {
      return {
        catData: [{
          cat_name: '家电',
          cat_level: 1,
          cat_deleted: false
        }],
        // -------------
        defaultProps: {
          label: 'cat_name'
        },
        // --------------
        dialogAddCatVisible: false,
        // 添加分类表单对象
        addCatForm: {
          cat_name: '', // 分类名称
          cat_pid_arr: [] // 收集父级名称
        },
        // ------------------------------------
        options: [{
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        // 级联选择器配置项
        defaultProps1: {
          label: 'cat_name',
          value: 'cat_id'
        }
        // -----------------------------------
      }
    },
    created() {
      this.loadCatData()
      this.loadCatData2()
    },
    methods: {
      // 加载分类数据（3层）
      async loadCatData() {
        let res = await this.$axios.get('categories', {
          params: {
            type: 3,
            pagenum: 1,
            pagesize: 4
          }
        })
        // console.log(res)
        this.catData = res.data.data.result
      },
      showAddCatDialog() {
        this.dialogAddCatVisible = true
      },
      // 加载分类数据（2层）
      async loadCatData2() {
        let res = await this.$axios.get('categories', {
          params: {
            type: 2
          }
        })
        // console.log(res)
        this.options = res.data.data
      },
      // 添加分类
      async addCat() {
        // 1.读取数据
        const { cat_name, cat_pid_arr } = this.addCatForm
        // console.log(this.addCatForm)
        // 2.
        let res = await this.$axios.post('categories', {
          cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
          cat_name,
          cat_level: 2
        })
        console.log(res)
        if (res.data.meta.status === 201) {
          this.dialogAddCatVisible = false
          this.$message({
            message: '添加分类成功',
            type: 'success',
            duration: 800
          })
          this.loadCatData()
        }
      },
      dialogClosed() {
        // console.log('对话框关闭了')
        this.$refs.addCatForm.resetFields()
      }
    }
  }
</script>
<style scoped lang="less">
</style>
