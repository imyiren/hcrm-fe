<template>
  <el-form ref="form" :model="userPassword" label-width="120px" label-position="left">
    <el-form-item label="当前密码" prop="password">
      <el-input v-model="userPassword.password" type="password"/>
    </el-form-item>
    <el-form-item label="修改密码" prop="firstPassword">
      <el-input v-model="userPassword.firstPassword" type="password"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="secondPassword">
      <el-input v-model="userPassword.secondPassword" type="password" />
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'UserPassword',
  props: {
    userPassword: {
      id: '',
      password: '',
      firstPassword: '',
      secondPassword: ''
    }
  }
}
</script>

<style scoped>

</style>
