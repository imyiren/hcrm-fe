<template>
  <el-form ref="form" :model="magazineEditInfo" label-width="85px" label-position="left">
    <el-form-item label="姓名" prop="orderNum">
      <el-select
        v-model="magazineEditInfo.magazineNum"
        :filterable="true"
        :clearable="true"
      >
        <el-option label="杂志1" :value="1" />
        <el-option label="杂志2" :value="2" />
        <el-option label="杂志3" :value="3" />
        <el-option label="杂志4" :value="4" />
        <el-option label="杂志5" :value="5" />
        <el-option label="杂志6" :value="6" />
        <el-option label="杂志7" :value="7" />
        <el-option label="杂志8" :value="8" />
        <el-option label="杂志9" :value="9" />
        <el-option label="杂志10" :value="10" />
      </el-select>
    </el-form-item>
    <el-form-item label="杂志名称" prop="name">
      <el-input v-model="magazineEditInfo.name" />
    </el-form-item>
    <el-form-item label="链接地址" prop="url">
      <el-input v-model="magazineEditInfo.url" />
    </el-form-item>
    <el-form-item label="后台账号" prop="accountUsername">
      <el-input v-model="magazineEditInfo.accountUsername" />
    </el-form-item>
    <el-form-item label="密码" prop="accountPassword">
      <el-input v-model="magazineEditInfo.accountPassword" />
    </el-form-item>
    <el-form-item label="当前状态" prop="state">
      <el-input v-model="magazineEditInfo.state" />
    </el-form-item>
    <el-form-item label="备注信息" prop="memo">
      <el-input v-model="magazineEditInfo.memo" type="textarea" rows="5" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'MagazineEdit',
  props: {
    magazineEditInfo: {
      id: undefined,
      orderId: undefined,
      name: undefined,
      url: undefined,
      accountUsername: undefined,
      accountPassword: undefined,
      state: undefined,
      memo: undefined,
      magazineNum: undefined
    }
  }
}
</script>

<style scoped>

</style>
