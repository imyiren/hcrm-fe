<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.realName" placeholder="姓名" style="width: 120px" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.keyContent" placeholder="手机号/微信/QQ/群" style="width: 160px" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="queryData.medicalDeptPropCode"
          :filterable="true"
          :clearable="true"
          :default-first-option="true"
          placeholder="请选择科室"
          @focus="loadBySelect"
        >
          <el-option
            v-for="item in medicalDepartmentList"
            :key="item.code"
            :label="item.value"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.createUserName" placeholder="创建人" style="width: 100px" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inCreateTimeStart" type="date" placeholder="创建开始日期" style="width: 150px" />
        <el-date-picker v-model="inCreateTimeEnd" type="date" placeholder="创建截止时间" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" style="margin-left: 10px" plain @click="toEdit">添加客户</el-button>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.totalSize }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" :highlight-current-row="true" @row-dblclick="toDetail">
      <el-table-column prop="realName" label="姓名" min-width="70" align="center" />
      <el-table-column prop="genderDesc" label="性别" min-width="40" align="center" />
      <el-table-column prop="company" label="单位" min-width="90" align="center" />
      <el-table-column prop="medicalDeptPropDesc" label="科室" min-width="90" align="center" />
      <el-table-column prop="phone" label="手机号" width="110" align="center" />
      <el-table-column prop="wechat" label="微信" min-width="100" align="center" />
      <el-table-column prop="qq" label="QQ号" min-width="100" align="center" />
      <el-table-column prop="qqGroup" label="QQ群" min-width="90" align="center" />
      <el-table-column prop="requirement" label="需求" />
      <el-table-column prop="createUserName" width="70" label="创建人" align="center" />
      <el-table-column prop="createTime" label="创建时间" min-width="150" align="center" />
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
  margin: 0 auto;
}

.page-next-container {
  text-align: center;
}
</style>

<script>
import { listCustomer } from '@/api/customer'
import { listPropByKey } from '@/api/prop'
import { dateFtt } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userId',
      'roles'
    ])
  },
  data() {
    return {
      inCreateTimeStart: undefined,
      inCreateTimeEnd: undefined,
      deptLoading: false,
      tableLoading: true,
      queryData: {
        pageSize: 10,
        pageNum: 1,
        realName: '',
        keyContent: '',
        medicalDeptPropCode: undefined,
        createUserName: null,
        createUserId: null
      },
      pageData: {
        pageSize: 10,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: []
      },
      medicalDepartmentList: []
    }
  },
  mounted() {
    this.doQuery(this.queryData)
  },
  methods: {
    toDetail(data) {
      this.$router.push('/customer/' + data.id)
    },
    toEdit() {
      this.$router.push('/customer/edit')
    },
    doQuery() {
      for (const key in this.queryData) {
        if (this.queryData[key] === '') {
          this.queryData[key] = null
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
      this.queryData.createUserId = null
      if ((this.queryData.realName === null || this.queryData.realName === '') && (this.queryData.keyContent === null || this.queryData.keyContent === '')) {
        console.log(this.userId)
        this.queryData.createUserId = this.userId
      }
      console.log('list query')
      if (this.roles.includes('admin')) {
        console.log('admin query')
        this.queryData.createUserId = null
      }
      listCustomer(this.queryData).then(res => {
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
    loadBySelect() {
      if (this.medicalDepartmentList.length < 1) {
        this.deptLoading = true
        listPropByKey('MEDICAL_DEPARTMENT').then(response => {
          const { data } = response
          this.medicalDepartmentList = data
        }).finally(() => {
          this.deptLoading = false
        })
      }
    }
  }
}
</script>
