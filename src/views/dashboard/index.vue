<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><h1>健康凉都掌上行医生客户端</h1></div>
    <div class="dashboard-text">欢迎您， {{ username }} 医生
      <br>
      您的工号：{{ docId }}
    </div>
    <img src="http://182.61.53.38:8080/uploadImg/hosImages/2022/05/09/8166a1d0-f5d2-464f-b758-a8dd7f30b1b4.png" alt="homeImage">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  name: 'Dashboard',
  data: function() {
    return {
      username: null,
      docId: null
    }
  },
  created() {
    this.fetchName()
  },
  methods: {
    fetchName() {
      axios({
        url: 'http://182.61.53.38:8080/user/getInfo',
        method: 'post',
        headers: {
          'token': getToken()
        }
      }).then(res => {
        // this.nickname = res.data.docName
        this.username = res.data.data.docName
        this.docId = res.data.data.docId
      })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
