<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      :data="activityList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="70">
      </el-table-column>
      <el-table-column
        label="价格区间"
        show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.minPricePoint}} - {{ scope.row.maxPricePoint }}</template>
      </el-table-column>
      <el-table-column
        prop="beginDate"
        label="开始时间"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import http from '../../api/http'
  import api from '../../api/api'
  import { formatDate } from '../../utils/formatDate.js'
  export default {
    data() {
      return {
        pageSize: 15,
        pageNumber: 0,
        activityList: []
      }
    },
    mounted() {
      http.post(api.GETACTIVITYLIST, {
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
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date == undefined) {
          return ''
        } else {
          return formatDate(new Date(date.time), 'yyyy-MM-dd hh:mm:ss')
        }
      }
    }
  }
</script>
