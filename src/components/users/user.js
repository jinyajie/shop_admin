import axios from 'axios'
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
      input3: ''
    }
  },
  created () {
    this.getUsersData()
  },

  methods: {
    // 加载用户数据列表
    getUsersData (pagenum = 1, query = '') {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
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
    }
  }
}
