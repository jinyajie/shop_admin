<template>
  <div>
    <el-button type="success" plain @click='gogoodsAdd'>添加商品</el-button>
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column type='index'>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间">
        <template slot-scope='scope'>
          <span>{{ scope.row.add_time | dataFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{

      }]
    }
  },
  filters: {
    dataFilter (value) {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  created () {
    this.loadGoodsData()
  },
  methods: {
    async loadGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      this.goodsData = res.data.data.goods
    },
    gogoodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>
<style scoped lang="less">
</style>
