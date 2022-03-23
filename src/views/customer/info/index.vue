<template>
  <div class="customer-info-container">
    <el-divider content-position="left">基本信息: <span style="font-size: 25px"><i class="el-icon-user" />{{ customerInfo.realName }}</span><el-divider direction="vertical" />
      <el-button type="text" @click="edit">编辑</el-button>
      <el-button type="success" :round="true" :plain="true" size="mini" @click="createOrder">订单生成</el-button>
    </el-divider>
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item><template slot="label"><i class="el-icon-user" />姓名</template>{{ customerInfo.realName }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ customerInfo.genderDesc }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ customerInfo.company }}</el-descriptions-item>
      <el-descriptions-item label="来源">
        <el-tag size="small">{{ customerInfo.sourceTypeDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="录入人">{{ customerInfo.createUserName }}</el-descriptions-item>
      <el-descriptions-item label="手机">{{ customerInfo.phone }}</el-descriptions-item>
      <el-descriptions-item label="微信">{{ customerInfo.wechat }}</el-descriptions-item>
      <el-descriptions-item label="QQ号">{{ customerInfo.qq }}</el-descriptions-item>
      <el-descriptions-item label="QQ群">{{ customerInfo.qqGroup }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ customerInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="科室">{{ customerInfo.medicalDeptPropDesc }}</el-descriptions-item>
      <el-descriptions-item label="需求描述" :span="2">{{ customerInfo.requirement }}</el-descriptions-item>
    </el-descriptions>
    <!--    <el-divider content-position="left">文件资料</el-divider>-->
    <!--    <el-descriptions v-loading="loading" :column="column" border direction="horizontal">-->
    <!--      <el-descriptions-item label="客户文件" label-class-name="file-label" :span="2">-->
    <!--        <span v-for="item in customerInfo.customerFileList" :key="item.code">-->
    <!--          <el-link type="primary" :href="item.url" target="_blank" :underline="false">{{ item.name }}<i-->
    <!--            class="el-icon-download"-->
    <!--          /></el-link>-->
    <!--          <el-divider direction="vertical" />-->
    <!--        </span>-->
    <!--      </el-descriptions-item>-->
    <!--    </el-descriptions>-->
    <!--    <el-descriptions v-loading="loading" :column="column" border direction="horizontal">-->
    <!--      <el-descriptions-item label="交付文件" label-class-name="file-label" :span="2">-->
    <!--        <span v-for="item in customerInfo.resultFileList" :key="item.code">-->
    <!--          <el-link type="primary" :href="item.url" target="_blank" :underline="false">{{ item.name }}<i-->
    <!--            class="el-icon-download"-->
    <!--          /></el-link>-->
    <!--          <el-divider direction="vertical" />-->
    <!--        </span>-->
    <!--      </el-descriptions-item>-->
    <!--    </el-descriptions>-->
    <!--    <el-divider content-position="left">回访记录</el-divider>-->
    <!--    <el-table v-loading="loading" :data="customerInfo.visitList" style="width: 100%">-->
    <!--      <el-table-column prop="userName" label="回访人" width="70" />-->
    <!--      <el-table-column prop="createTime" label="时间" width="210" />-->
    <!--      <el-table-column prop="content" label="回访内容" />-->
    <!--    </el-table>-->
  </div>
</template>

<script>
import { getCustomer } from '@/api/customer'

export default {
  data() {
    return {
      loading: true,
      tableDirection: 'horizontal',
      visitTableLoading: false,
      column: 4,
      customerInfo: {
        id: undefined,
        realName: undefined,
        gender: undefined,
        genderDesc: undefined,
        company: undefined,
        sourceType: undefined,
        sourceTypeDesc: undefined,
        phone: undefined,
        wechat: undefined,
        qq: undefined,
        qqGroup: undefined,
        email: undefined,
        requirement: undefined,
        medicalDeptPropCode: undefined,
        medicalDeptPropDesc: undefined,
        createUserName: undefined,
        visitList: [{
          userId: undefined,
          userName: undefined,
          content: undefined,
          createTime: undefined
        }],
        customerFileList: [{
          name: undefined,
          url: undefined,
          code: undefined
        }],
        resultFileList: [{
          name: undefined,
          url: undefined,
          code: undefined
        }]
      }
    }
  },
  mounted() {
    this.loadById(this.$route.params.id)
    const innerWidth = window.innerWidth
    if (innerWidth > 1500) {
      this.column = 5
    } else if (innerWidth > 1024) {
      this.column = 4
    } else {
      this.tableDirection = 'vertical'
      this.column = 3
    }
  },
  methods: {
    loadById(id) {
      this.loading = true
      if (id === null || id === '' || id === undefined) {
        return
      }
      getCustomer(id).then(res => {
        this.customerInfo = res.data
      }).catch(() => {
        this.customerInfo = null
      }).finally(() => {
        this.loading = false
      })
    },
    edit() {
      this.$router.push('/customer/edit/' + this.customerInfo.id)
    },
    createOrder() {
      this.$router.push('/order/edit/' + this.customerInfo.id)
    }
  }
}
</script>

<style>
.customer-info-container {
  max-width: 1600px;
  margin: 10px auto;
}
.file-label {
  width: 110px;
}
</style>
