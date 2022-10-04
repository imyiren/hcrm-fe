<template>
  <el-form ref="form" :model="orderEditInfo" label-width="85px" label-position="left" :rules="orderEditInfoRules">
    <el-form-item label="客户姓名" prop="topic">
      <el-input disabled :value="orderInfo.customerRealName" />
    </el-form-item>
    <el-form-item label="项目题目" prop="topic">
      <el-input v-model="orderEditInfo.topic" :placeholder="orderInfo.topic" />
    </el-form-item>
    <el-form-item label="订单备注" prop="memo">
      <el-input
        v-model="orderEditInfo.memo"
        type="textarea"
        rows="5"
        :value="orderInfo.memo"
        :placeholder="orderInfo.memo"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'OrderEdit',
  props: {
    orderEditInfo: {
      id: undefined,
      state: undefined,
      topic: undefined,
      paymentStateCode: undefined,
      payedPrice: undefined,
      paymentMethodCode: undefined,
      memo: undefined
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
      customerRealName: '',
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
      processState: undefined,
      stateDesc: undefined,
      processStateDesc: undefined,
      topic: undefined,
      updateTime: undefined,
      authorList: undefined
    }
  },
  data() {
    return {
      orderEditInfoRules: {
        topic: [
          { min: 4, max: 60, message: '长度在 4 到 60 个字符！', trigger: 'blur' }
        ]
      }
    }
  }

}
</script>

<style scoped>

</style>
