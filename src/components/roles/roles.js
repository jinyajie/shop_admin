export default {
  data () {
    return {
      rolesData: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }],
      dialogAssignRightsVisible: false,
      rightsData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
  },
  methods: {
    async loadRolesData () {
      let res = await this.$axios.get('/roles')
      this.rolesData = res.data.data
    },
    indexMethod (index) {
      return index
    },
    async loadRightsData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.rightsData = res.data.data
    },
    showAssignRightsDialog (row) {
      // 从row里面拿到角色id，保存到data里面
      this.roleId = row.id
      // console.log(row)
      this.dialogAssignRightsVisible = true
      // 根据传过来的row获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      // 因为在DOM 异步更新问题，无法获取到this.$refs.tree,所以需要调用this.$nexyTick等待DOM更新完毕才能获取到this.$refs.tree
      // console.log(this.$refs.tree)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 点击确定发送请求
    async assignRights () {
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = [...keys1, ...keys2]
      console.log(keys)
      console.log(this.roleId)
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogAssignRightsVisible = false
        this.$message({
          message: '分配权限成功',
          type: 'success',
          duration: 800
        })
        this.loadRolesData()
      }
    }
  }
}
