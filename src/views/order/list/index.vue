<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.realName" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.keyContent" placeholder="手机号/微信/QQ" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.createPerson" placeholder="创建人" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inCreateTimeStart" type="date" placeholder="创建开始日期" />
        <el-date-picker v-model="inCreateTimeEnd" type="date" placeholder="创建截止时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.totalSize }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" @row-dblclick="toDetail">
      <el-table-column prop="code" label="订单编号" min-width="130" />
      <el-table-column prop="customerRealName" label="姓名" min-width="70" />
      <el-table-column prop="topic" label="项目题目" />
      <el-table-column prop="bizTypeDesc" label="项目类型" />
      <el-table-column prop="contractPrice" label="合同金额" />
      <el-table-column prop="payedPrice" label="已付金额" />
      <el-table-column prop="paymentStateDesc" label="付款状态" />
      <el-table-column prop="stateDesc" label="订单状态" />
      <el-table-column prop="contractEndDate" label="截止时间" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="createUserName" label="创建人" />
      <el-table-column prop="memo" label="备注" />
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
import {dateFtt} from "@/utils";

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
        keyContent: undefined,
        medicalDeptPropCode: undefined,
        createPerson: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined
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
      if (!data.id) {
        this.$message.warning('数据错误，ID不能为空，请联系开发人员。')
        return
      }
      this.$router.push('/order/' + data.id)
    },
    doQuery() {
      for (const key in this.queryData) {
        if (this.queryData[key] === '') {
          this.queryData[key] = undefined
        }
      }

      if (this.inCreateTimeStart !== null && this.inCreateTimeStart !== undefined) {
        this.queryData.createTimeStart = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeStart)
      }
      if (this.inCreateTimeEnd !== null && this.inCreateTimeEnd !== undefined) {
        this.queryData.createTimeEnd = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeEnd)
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
    }
  }
}
</script>
