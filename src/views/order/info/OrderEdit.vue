<template>
  <el-form ref="form" :model="orderEditInfo" label-width="85px" label-position="left" :rules="orderEditInfoRules">
    <el-form-item label="客户姓名" prop="topic">
      <el-input disabled :value="orderInfo.customerRealName" />
    </el-form-item>
    <el-form-item label="项目题目" prop="topic">
      <el-input v-model="orderEditInfo.topic" :placeholder="orderInfo.topic" />
    </el-form-item>
    <el-form-item label="订单状态" prop="stateCode">
      <el-select
        v-model="orderEditInfo.state"
        :filterable="true"
        :clearable="true"
        :placeholder="orderInfo.stateDesc"
      >
        <el-option label="进行中" :value="200" />
        <el-option label="已完成" :value="300" />
        <el-option label="已逾期" :value="-100" />
        <el-option label="已退单" :value="-200" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="orderEditInfo.processState"
        :filterable="true"
        :clearable="true"
        placeholder="处理状态"
        style="width: 150px"
      >
        <el-option label="新建" :value="0" />
        <el-option label="项目立项" :value="100" />
        <el-option label="实验数据" :value="200" />
        <el-option label="技术处理" :value="300" />
        <el-option label="编辑写作" :value="400" />
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
    <el-form-item label="付款状态" prop="paymentStateCode">
      <el-select
        v-model="orderEditInfo.paymentStateCode"
        :filterable="true"
        :clearable="true"
        :placeholder="orderInfo.paymentStateDesc"
      >
        <el-option label="已付定金" :value="100" />
        <el-option label="已付全款" :value="200" />
        <el-option label="已退款" :value="-100" />
      </el-select>
    </el-form-item>
    <el-form-item label="已付金额" prop="payedPrice">
      <el-input
        v-model="orderEditInfo.payedPrice"
        type="number"
        :value="orderInfo.payedPrice"
        :placeholder="orderInfo.payedPrice"
      />
    </el-form-item>
    <el-form-item label="付款方式" prop="paymentMethodCode">
      <el-select
        v-model="orderEditInfo.paymentMethodCode"
        :filterable="true"
        :clearable="true"
        :placeholder="orderInfo.paymentMethodDesc"
      >
        <el-option label="银行卡" :value="1" />
        <el-option label="支付宝" :value="2" />
        <el-option label="微信支付" :value="4" />
        <el-option label="对公转账" :value="3" />
        <el-option label="其他" :value="99" />
      </el-select>
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
      processState: undefined,
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
