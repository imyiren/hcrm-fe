<template>
  <div class="order-info-container">
    <el-divider content-position="left">订单信息: {{ orderInfo.code }}</span><el-divider direction="vertical" />
      <el-button type="text" @click="edit">编辑</el-button>
      <!-- <el-button type="success" :round="true" :plain="true" size="mini" @click="createOrder">订单生成</el-button> -->
    </el-divider>
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item label="合同开始日期：">{{ orderInfo.contractStartDate }}</el-descriptions-item>
      <el-descriptions-item label="合同截止日期：">{{ orderInfo.contractEndDate }}</el-descriptions-item>
      <el-descriptions-item label="合同金额">{{ orderInfo.contractPrice }}</el-descriptions-item>
      <el-descriptions-item label="已付金额">{{ orderInfo.payedPrice }}</el-descriptions-item>
      <el-descriptions-item label="付款方式">{{ orderInfo.paymentMethodDesc }}</el-descriptions-item>
      <el-descriptions-item label="付款状态">{{ orderInfo.paymentStateDesc }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <el-tag size="small">{{ orderInfo.stateDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="项目类型">{{ orderInfo.bizTypeDesc }}</el-descriptions-item>
      <el-descriptions-item label="创建人">{{ orderInfo.createUserName }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ orderInfo.createTime }}</el-descriptions-item>
      <el-descriptions-item label="订单备注" :span="2">{{ orderInfo.memo }}</el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">文件资料</el-divider>
    <el-descriptions v-loading="loading" :column="column" border direction="horizontal">
      <el-descriptions-item label="客户文件" label-class-name="file-label" :span="2">
        <span v-for="item in orderInfo.customerFileList" :key="item.code">
          <el-link type="primary" :href="item.url" target="_blank" :underline="false">{{ item.name }}<i
            class="el-icon-download"
          /></el-link>
          <el-divider direction="vertical" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="内部文件" label-class-name="file-label" :span="2">
        <span v-for="item in orderInfo.internalFileList" :key="item.code">
          <el-link type="primary" :href="item.url" target="_blank" :underline="false">{{ item.name }}<i
            class="el-icon-download"
          /></el-link>
          <el-divider direction="vertical" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="交付文件" label-class-name="file-label" :span="2">
        <span v-for="item in orderInfo.resultFileList" :key="item.code">
          <el-link type="primary" :href="item.url" target="_blank" :underline="false">{{ item.name }}<i
            class="el-icon-download"
          /></el-link>
          <el-divider direction="vertical" />
        </span>
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="left">客户信息</el-divider>
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item><template slot="label"><i class="el-icon-user" />姓名</template>{{ customerInfo.realName }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ customerInfo.genderDesc }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ customerInfo.company }}</el-descriptions-item>
      <el-descriptions-item label="来源">
        <el-tag size="small">{{ customerInfo.sourceTypeDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="录入人">{{ customerInfo.createUserName }}</el-descriptions-item>
      <el-descriptions-item label="需求描述" :span="2">{{ customerInfo.requirement }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'

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
      },
      orderInfo: {
        id: undefined,
        bizType: undefined,
        bizTypeDesc: undefined,
        code: undefined,
        contractEndDate: undefined,
        contractPrice: undefined,
        contractStartDate: undefined,
        createTime: undefined,
        createUserId: undefined,
        createUserName: undefined,
        customerFileList: undefined,
        customerId: undefined,
        customerRealName: undefined,
        deleted: undefined,
        internalFileList: undefined,
        memo: undefined,
        payedPrice: undefined,
        paymentMethod: undefined,
        paymentMethodDesc: undefined,
        paymentState: undefined,
        paymentStateDesc: undefined,
        resultFileList: undefined,
        state: undefined,
        stateDesc: undefined,
        topic: undefined,
        updateTime: undefined
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
      getOrder(id).then(res => {
        this.orderInfo = res.data
        this.customerInfo = res.data.customerInfo
      }).catch(() => {
        this.customerInfo = null
        this.orderInfo = null
      }).finally(() => {
        this.loading = false
      })
    },
    edit() {
      this.$message.warning('编辑按钮： ' + this.customerInfo.id)
    }
  }
}
</script>

<style>
.order-info-container {
  max-width: 1600px;
  margin: 10px auto;
}
.file-label {
  width: 110px;
}
.order-step {
  margin: 20px auto;
}
</style>
