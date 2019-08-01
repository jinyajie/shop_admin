// import axios from 'axios'
export default {
  data () {
    return {
      usersData: [
        {
          username: '小飞飞',
          email: 'feifei@.com',
          mobile: '1233211234567'
        }
      ],
      total: 0,
      pagenum: 1,
      input3: '',
      // 是否显示添加用户的对话框
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3-5之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5-10之间', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 是否显示显示编辑用户对话框
      dialogEditUserVisible: false,
      // 编辑用户表单对象
      editUserForm: {
        username: '飞哥',
        email: '',
        mobile: '',
        id: 0
      }
    }
  },
  created () {
    this.getUsersData()
  },

  methods: {
    // 加载用户数据列表
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        // 保存用户列表数据
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    // 点击分页
    currentPageChange (curPage) {
      // console.log('分页了', curPage)
      this.getUsersData(curPage, this.input3)
    },
    startSearch () {
      console.log(this.input3)
      this.getUsersData(1, this.input3)
    },
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    addUser () {
      this.$axios.post('http://localhost:8888/api/private/v1/users', this.addUserForm, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then((res) => {
        // console.log(res)
        if (res.data.meta.status === 201) {
          // 1.隐藏对话框
          this.dialogAddUserVisible = false
          // 提示
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 3.刷新页面
          this.getUsersData()
        }
      })
    },
    dialogClosed () {
      // console.log('关闭对话框')
      this.$refs.addUserRef.resetFields()
    },
    stateChange (row) {
      // 通过解构的丰富 拿到id和mg_state
      console.log(row)
      const { id, mg_state: mgState } = row
      this.$axios.put(`http://localhost:8888/api/private/v1/users/${id}/state/${mgState}`, null, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then((res) => {
        if (res.data.meta.status === 200) {
          // 提示
          this.$message({
            message: '状态修改成功',
            type: 'success',
            duration: 800
          })
        }
      })
    },
    delUser (id) {
      this.$axios.delete(`http://localhost:8888/api/private/v1/users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData()
      })
    },
    showEditUserDialog (row) {
      this.dialogEditUserVisible = true
      // 把接受到编辑框里的按钮传给当前行对象 row
      // 把row里的数据赋值给editUserForm <==> 表单
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    editUser () {
      // 1.从editUserFrom中解构出来 需要的参数
      const { email, mobile, id } = this.editUserForm
      console.log(email, mobile, id)
      this.$axios.put(`users/${id}`, {
        email,
        mobile
      }).then(res => {
        console.log(res)
        this.dialogEditUserVisible = false
        if (res.data.meta.status === 200) {
          this.$message({
            message: '用户信息更新成功',
            type: 'success',
            duration: 800
          })
          this.getUsersData(this.pagenum, this.input3)
        }
      })
    }
  }
}
