<template>
  <div class="app-container">
  </div>
</template>

<script>
  import http from '../../api/http'
  import api from '../../api/api'

  export default {
    data() {
      return {
        pageSize: 15,
        pageNumber: 0
      }
    },
    mounted() {
      http.post(api.GETSTAFFLIST, {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((data) => {
        console.log(data)
        if (data.status === 'success') {
          this.activityList = data.data.content
        } else {
          this.activityList = []
        }
      })
    },
    methods: {}
  }
</script>

<style scoped>
</style>

