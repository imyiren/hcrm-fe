<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="customerQuery" class="customer-form">
      <el-form-item>
        <el-input v-model="customerQuery.realName" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="customerQuery.keyContent" placeholder="手机号/微信/QQ" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="customerQuery.medicalDeptPropCode" placeholder="请选择科室">
          <el-option label="科一" value="1" />
          <el-option label="科二" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="customerQuery.createPerson" placeholder="创建人" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="customerQuery.createTime" type="date" placeholder="创建时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" plain>添加客户</el-button>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.totalSize }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="realName" label="姓名" width="70" />
      <el-table-column prop="genderDesc" label="性别" min-width="40" />
      <el-table-column prop="company" label="公司" />
      <el-table-column prop="medicalDeptPropDesc" label="科室" />
      <el-table-column prop="phone" label="手机号" width="110" />
      <el-table-column prop="wechat" label="微信" />
      <el-table-column prop="qq" label="QQ号" />
      <el-table-column prop="qqGroup" label="QQ群" />
      <el-table-column prop="requirement" label="需求" />
      <el-table-column prop="lastVisit" label="最近回访" />
      <el-table-column prop="memo" label="备注" />
      <el-table-column prop="createUserName" width="70" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="info(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="12" :offset="10">
        <el-button-group class="page-next">
          <el-button type="primary" icon="el-icon-arrow-left" plain :disabled="!pageData.hasPrePage" @click="prevPage">上一页</el-button>
          <el-button type="primary" plain :disabled="!pageData.hasNextPage" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.customer-form{
  margin: 5px 10px;
}

.page-next {
  margin: 5px auto;
}
</style>

<script>
import { list } from '@/api/customer'

export default {
  data() {
    return {
      tableLoading: true,
      customerQuery: {
        pageSize: 10,
        pageNum: 1,
        realName: undefined,
        keyContent: undefined,
        medicalDeptPropCode: undefined,
        createPerson: undefined,
        createTime: undefined
      },
      pageData: {
        pageSize: 10,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: []
      }
    }
  },
  mounted() {
    this.doQuery(this.customerQuery)
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
    edit(data) {
      this.$router.push('/customer/edit/' + data.id)
    },
    info(data) {
      this.$router.push('/customer/' + data.id)
    },
    doQuery(queryData) {
      this.tableLoading = true
      list(queryData).then(res => {
        this.pageData = res
      }).finally(() => {
        this.tableLoading = false
      })
    },
    prevPage() {
      this.customerQuery.pageNum--
      this.doQuery(this.customerQuery)
    },
    nextPage() {
      this.customerQuery.pageNum++
      this.doQuery(this.customerQuery)
    }
  }
}
</script>
