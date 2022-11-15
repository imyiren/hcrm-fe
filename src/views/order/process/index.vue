<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.code" placeholder="订单编号" maxlength="32" style="width: 100px" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.customerRealName" placeholder="客户姓名" maxlength="16" style="width: 100px" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryData.processState"
          :filterable="true"
          :clearable="true"
          placeholder="处理状态"
          style="width: 120px"
        >
          <el-option label="新建" :value="0" />
          <el-option label="项目立项" :value="100" />
          <el-option label="实验数据" :value="200" />
          <el-option label="技术处理" :value="300" />
          <el-option label="编辑写作" :value="400" />
          <el-option label="写作完成" :value="450" />
          <el-option label="投稿环节" :value="500" />
          <el-option label="回修环节" :value="600" />
          <el-option label="1修完成" :value="700" />
          <el-option label="2修完成" :value="710" />
          <el-option label="3修完成" :value="720" />
          <el-option label="修回" :value="800" />
          <el-option label="录用" :value="900" />
          <el-option label="校样版面" :value="1000" />
          <el-option label="已完成" :value="1100" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inContractStartDate" type="date" placeholder="合同开始时间" style="width: 130px" />
        <el-date-picker v-model="inContractEndDate" type="date" placeholder="合同截止时间" style="width: 130px" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inCreateTimeStart" type="date" placeholder="创建开始日期" style="width: 130px" />
        <el-date-picker v-model="inCreateTimeEnd" type="date" placeholder="创建结束时间" style="width: 130px" />
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="doClearQueryData">清空</el-button>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.totalSize }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" :highlight-current-row="true" @row-dblclick="toDetail">
      <el-table-column prop="code" label="订单编号" min-width="130" align="center" />
      <el-table-column prop="customerRealName" label="客户姓名" min-width="70" align="center" />
      <el-table-column prop="topic" label="项目题目" min-width="150" align="center" />
      <el-table-column prop="bizTypeDesc" label="项目类型" min-width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.bizTypeDesc }} {{ scope.row.ifRound }}
        </template>
      </el-table-column>
      <el-table-column prop="processStateDesc" label="处理状态" min-width="80" align="center" />
      <el-table-column prop="contractStartDate" label="开始时间" min-width="95" align="center" />
      <el-table-column prop="contractEndDate" label="截止时间" min-width="95" align="center" />
      <el-table-column prop="createTime" label="创建时间" min-width="155" align="center" />
      <el-table-column prop="memo" label="备注" min-width="150" />
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

import { listOrder } from '@/api/order'
import { dateFtt } from '@/utils'

export default {
  data() {
    return {
      tableLoading: true,
      inCreateTimeStart: undefined,
      inCreateTimeEnd: undefined,
      inContractStartDate: undefined,
      inContractEndDate: undefined,
      queryData: {
        pageSize: 10,
        pageNum: 1,
        code: undefined,
        customerRealName: undefined,
        state: undefined,
        paymentState: undefined,
        createUserId: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        contractStartDate: undefined,
        contractEndDate: undefined,
        processState: undefined
      },
      pageData: {
        pageSize: 10,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: [
          {
            id: undefined,
            customerId: undefined,
            customerRealName: undefined,
            code: undefined,
            state: undefined,
            stateDesc: undefined,
            topic: undefined,
            orderStateCode: undefined,
            orderStateDesc: undefined,
            bizTypeCode: undefined,
            bizTypeDesc: undefined,
            contractStartDate: undefined,
            contractEndDate: undefined,
            contractPrice: undefined,
            payedPrice: undefined,
            paymentStateCode: undefined,
            paymentStateDesc: undefined,
            memo: undefined,
            createUserName: undefined,
            createTime: undefined
          }
        ]
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
    toDetail(data) {
      if (!data.code) {
        this.$message.warning('数据错误，CODE不能为空，请联系开发人员。')
        return
      }
      this.$router.push('/order/process/' + data.code)
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
      if (this.inContractEndDate !== null && this.inContractEndDate !== undefined) {
        this.queryData.contractEndDate = dateFtt('yyyy-MM-dd', this.inContractEndDate)
      } else {
        this.queryData.contractEndDate = undefined
      }
      if (this.inContractStartDate !== null && this.inContractStartDate !== undefined) {
        this.queryData.contractStartDate = dateFtt('yyyy-MM-dd', this.inContractStartDate)
      } else {
        this.queryData.contractStartDate = undefined
      }
      this.tableLoading = true
      listOrder(this.queryData).then(res => {
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
        pageNum: 1,
        code: null,
        customerRealName: null,
        state: null,
        paymentState: null,
        createUserId: null,
        createTimeStart: null,
        createTimeEnd: null,
        contractStartDate: null,
        contractEndDate: null,
        processState: null
      }
      this.inCreateTimeStart = null
      this.inCreateTimeEnd = null
      this.inContractEndDate = null
      this.inContractStartDate = null
    }
  }
}
</script>
