<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.patient.username }}
        </template>
      </el-table-column>
      <el-table-column label="预约日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="200">
        <template slot-scope="scope">
          {{ scope.row.patient.idCard }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="150">
        <template slot-scope="scope">
          {{ scope.row.patient.phone }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100">
        <template slot-scope="scope">
          {{ scope.row.patient.age }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110">
        <template slot-scope="scope">
          {{ scope.row.patient.sex }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="{row}">

          <el-button type="text" @click="uploadReport(row)">编辑</el-button>

          <el-dialog title="就诊记录" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="诊断记录">
                <el-input v-model="form.treatmentRecord" type="textarea" placeholder="请输入诊断记录" :row="3" />
              </el-form-item>
              <el-form-item lable="就诊日期" hidden>
                <el-input v-model="form.treatmentDate" />
              </el-form-item>

              <el-form-item />
              <el-form-item>
                <el-button type="primary" @click="httpRequest">提交</el-button>
                <input ref="input" type="file" @change="handleFiles">
                <el-button @click="dialogVisible = false">取 消</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/patient'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dataForm: {
        name: '',
        file: null
      },
      dialogVisible: false,
      fileList: [],
      patientId: null,
      hasFile: false,
      form: {
        treatmentRecord: '',
        treatmentDate: ''
      },
      list: [
        {
          'patientname': '朱浩鑫',
          'orderdate': '2022-05-10',
          'ordertime': '8:00~8:45',
          'age': '40',
          'sex': '男'
        }
      ],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleFiles(event) {
      this.dataForm.file = event.target.files[0]
      console.log(this.dataForm.file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    uploadReport(row) {
      this.dialogVisible = true
      this.patientId = row.patient.patId
    },
    httpRequest(param) {
      const mydate = new Date()
      var year = mydate.getFullYear()
      var month = mydate.getMonth() + 1
      var day = mydate.getDate()
      var time = year + '-'
      if (month < 10) { time += '0' }
      time += month + '-'
      if (day < 10) { time += '0' }
      time += day

      this.form.treatmentDate = time

      const fd = new FormData()
      fd.append('file', this.dataForm.file) // 传文件
      fd.append('patientId', this.patientId)
      fd.append('treatmentRecord', this.form.treatmentRecord)
      fd.append('treatmentDate', this.form.treatmentDate)

      axios({
        url: 'http://182.61.53.38:8080/doctor/addRepot2',
        method: 'post',
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': getToken()
        }
      }).then(res => {
        console.log(res)
      })
      alert('提交成功')
      // dataPar.file.raw
      this.dialogVisible = false
    }
  },
  onSubmit() {
    this.dialogVisible = false
    // eslint-disable-next-line new-cap
  }
}

</script>

