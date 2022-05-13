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
          <el-button type="primary" @click="uploadReport(row)">上传报告</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/patient'

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
      list: [
        {
          'patientname': '朱浩鑫',
          'orderdate': '2022-05-10',
          'ordertime': '8:00~8:45',
          'age': '40',
          'sex': '男'
        },
        {

          'patientname': '左洪江',
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
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    uploadReport(row) {
      alert(row.patient.patId)
    }
  }
}
</script>
