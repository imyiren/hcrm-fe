<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.workNo" placeholder="工号" maxlength="32" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.realName" placeholder="姓名" maxlength="16" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryData.state"
          :filterable="true"
          :clearable="true"
          placeholder="订单状态"
          style="width: 150px"
        >
          <el-option label="进行中" :value="200" />
          <el-option label="已完成" :value="300" />
          <el-option label="已逾期" :value="-100" />
          <el-option label="已退单" :value="-200" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.createPerson" placeholder="创建人" maxlength="16" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inCreateTimeStart" type="date" placeholder="创建开始日期" style="width: 150px" />
        <el-date-picker v-model="inCreateTimeEnd" type="date" placeholder="创建结束时间" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="doClearQueryData">清空</el-button>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.totalSize }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" :highlight-current-row="true" @row-dblclick="toDetail">
      <el-table-column prop="workNo" label="工号" min-width="130" align="center" />
      <el-table-column prop="realName" label="姓名" min-width="70" align="center" />
      <el-table-column prop="username" label="账号" min-width="150" align="center" />
      <el-table-column prop="title" label="权限&职位" min-width="90" align="center" />
      <el-table-column prop="stateDesc" label="账号状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.state === 100 ? 'success' : 'warning'"
          >{{ scope.row.stateDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="155" align="center" />
<!--      <el-table-column prop="createUserName" label="创建人" min-width="70" align="center" />-->
    </el-table>
    <div class="page-next-container">
      <el-button-group class="page-next">
        <el-button type="primary" icon="el-icon-arrow-left" plain :disabled="!pageData.hasPrePage" @click="prevPage">上一页</el-button>
        <el-button type="primary" plain :disabled="!pageData.hasNextPage" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<style>
.customer-form{
  margin: 5px 10px;
}
.page-next {
  margin: 0 auto;
}
.page-next-container {
  text-align: center;
}
</style>

<script>

import { listUser } from '@/api/uop'
import { dateFtt } from '@/utils'

export default {
  data() {
    return {
      tableLoading: true,
      inCreateTimeStart: undefined,
      inCreateTimeEnd: undefined,
      queryData: {
        pageSize: 10,
        pageNum: 1,
        realName: undefined,
        workNo: undefined,
        state: undefined,
        createUserName: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
      },
      pageData: {
        pageSize: 10,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: [{
          id: '1',
          workNo: '10001',
          realName: '罗小虎',
          gender: '1',
          genderDesc: '男',
          company: '帅气无限责任公司！',
          department: '销售部',
          title: '高级销售经理',
          phone: '13312341234',
          wechat: 'sadfasffasd',
          memo: '备注信息',
          startDate: '2016-05-02',
          createTime: '2016-05-02',
          state: '1',
          stateDesc: '在职'
        }]
      }
    }
  },
  mounted() {
    this.doQuery(this.queryData)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state === '1') {
        return 'warning-row'
      } else if (row.state === '4') {
        return 'success-row'
      }
      return ''
    },
    doQuery() {
      for (const key in this.queryData) {
        if (this.queryData[key] === '') {
          this.queryData[key] = undefined
        }
      }

      if (this.inCreateTimeStart !== null && this.inCreateTimeStart !== undefined) {
        this.queryData.createTimeStart = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeStart)
      } else {
        this.queryData.createTimeStart = undefined
      }
      if (this.inCreateTimeEnd !== null && this.inCreateTimeEnd !== undefined) {
        this.queryData.createTimeEnd = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeEnd)
      } else {
        this.queryData.createTimeEnd = undefined
      }
      this.tableLoading = true
      listUser(this.queryData).then(res => {
        this.pageData = res
      }).finally(() => {
        this.tableLoading = false
      })
    },
    prevPage() {
      this.queryData.pageNum--
      this.doQuery(this.queryData)
    },
    nextPage() {
      this.queryData.pageNum++
      this.doQuery(this.queryData)
    },
    doClearQueryData() {
      this.queryData = {
        pageSize: 10,
        pageNum: 1
      }
      this.inCreateTimeStart = undefined
      this.inCreateTimeEnd = undefined
      this.inContractEndDate = undefined
      this.inContractStartDate = undefined
    }
  }
}
</script>
