<template>
  <div>
    <h1>更改个人信息</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="更改姓名">
        <el-input v-model="form.docName" />
      </el-form-item>

      <el-form-item label="更改价格">
        <el-input v-model="form.price" />
      </el-form-item>

      <el-form-item label="更改职称">
        <el-input v-model="form.docLevel" />
      </el-form-item>

      <el-form-item label="更改密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitInfo">提交</el-button>
      </el-form-item>
    </el-form></div>
</template>
<script>

import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        docName: '',
        price: '',
        docLevel: '',
        password: ''
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
        this.form.docName = res.data.data.docName
        this.form.docLevel = res.data.data.docLevel
        this.form.price = res.data.data.price
      })
    },
    submitInfo() {
      this.modifyData()
      alert('修改成功')
    },
    modifyData() {
      axios({
        url: 'http://182.61.53.38:8080/doctor/modifyDoctorInfo',
        method: 'post',
        headers: {
          'token': getToken()
        },
        data: this.form
      }).then(res => {

      })
    }
  }

}
</script>
