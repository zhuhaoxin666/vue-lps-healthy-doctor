<template>
  <div> <h1>个人信息</h1>
    <el-card class="box-card">
      <div class="text item">
        姓名 ：{{ docName }}
      </div>
      <div class="text item">
        职称 ：{{ docLevel }}
      </div>
      <div class="text item">
        就诊价格 ：{{ price }}
      </div>

    </el-card>

  </div>

</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>

import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {

      docName: '王小虎',
      docLevel: '主治医师',
      price: '12.00',
      form: {
        treatmentRecord: null,
        treatmentDate: null
      }

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      axios({
        url: 'http://182.61.53.38:8080/user/getInfo',
        method: 'post',
        headers: {
          'token': getToken()
        }
      }).then(res => {
        // this.nickname = res.data.docName
        this.docName = res.data.data.docName
        this.docLevel = res.data.data.docLevel
        this.price = res.data.data.price
        console.log(this.docName)
        console.log(this.docLevel)
        console.log(this.price)
      })
    }
  },
  handleEdit(index, row) {
    console.log(index, row)
  },
  handleDelete(index, row) {
    console.log(index, row)
  }
}

</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
