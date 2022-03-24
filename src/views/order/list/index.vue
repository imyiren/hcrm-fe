<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.code" placeholder="订单编号" maxlength="32" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.customerRealName" placeholder="客户姓名" maxlength="16" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryData.state"
          :filterable="true"
          :clearable="true"
          placeholder="订单状态"
        >
          <el-option label="进行中" :value="200" />
          <el-option label="已完成" :value="300" />
          <el-option label="已逾期" :value="-100" />
          <el-option label="已退单" :value="-200" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryData.paymentState"
          :filterable="true"
          :clearable="true"
          placeholder="付款状态"
        >
          <el-option label="已付定金" :value="100" />
          <el-option label="已付全款" :value="200" />
          <el-option label="已退款" :value="-100" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.createPerson" placeholder="创建人" maxlength="16" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inContractStartDate" type="date" placeholder="合同开始时间" style="width: 150px" />
        <el-date-picker v-model="inContractEndDate" type="date" placeholder="合同截止时间" style="width: 150px" />
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
      <el-table-column prop="code" label="订单编号" min-width="130" align="center" />
      <el-table-column prop="customerRealName" label="客户姓名" min-width="70" align="center" />
      <el-table-column prop="topic" label="项目题目" min-width="150" />
      <el-table-column prop="bizTypeDesc" label="项目类型" min-width="90" align="center"/>
      <el-table-column prop="contractPrice" label="合同金额" min-width="90" align="center"/>
      <el-table-column prop="payedPrice" label="已付金额" min-width="90" align="center"/>
      <el-table-column prop="paymentStateDesc" label="付款状态" min-width="90" align="center" />
      <el-table-column prop="stateDesc" label="订单状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.state === 300 ? 'success' : scope.row.state > 0 ? 'primary' : 'warning'"
          >{{ scope.row.stateDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contractStartDate" label="开始时间" min-width="95" align="center" />
      <el-table-column prop="contractEndDate" label="截止时间" min-width="95" align="center" />
      <el-table-column prop="createTime" label="创建时间"  min-width="155" align="center" />
      <el-table-column prop="createUserName" label="创建人" min-width="70" align="center" />
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
        createUserName: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        contractStartDate: undefined,
        contractEndDate: undefined
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
