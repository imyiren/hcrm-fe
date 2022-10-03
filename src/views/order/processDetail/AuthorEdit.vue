<template>
  <el-form ref="form" :model="authorEditInfo" label-width="85px" label-position="left">
    <el-form-item label="姓名" prop="orderNum">
      <el-select
        v-model="authorEditInfo.orderNum"
        :filterable="true"
        :clearable="true"
      >
        <el-option label="通讯作者" :value="0" />
        <el-option label="第1作者" :value="1" />
        <el-option label="第2作者" :value="2" />
        <el-option label="第3作者" :value="3" />
        <el-option label="第4作者" :value="4" />
        <el-option label="第5作者" :value="5" />
        <el-option label="第6作者" :value="6" />
        <el-option label="第7作者" :value="7" />
        <el-option label="第8作者" :value="8" />
        <el-option label="第9作者" :value="9" />
        <el-option label="第10作者" :value="10" />
      </el-select>
    </el-form-item>
    <el-form-item label="姓名" prop="realName">
      <el-input v-model="authorEditInfo.realName" />
    </el-form-item>
    <el-form-item label="姓名(英文)" prop="realNameEn">
      <el-input v-model="authorEditInfo.realNameEn" />
    </el-form-item>
    <el-form-item label="单位" prop="company">
      <el-input v-model="authorEditInfo.company" />
    </el-form-item>
    <el-form-item label="单位(英文)" prop="companyEn">
      <el-input v-model="authorEditInfo.companyEn" />
    </el-form-item>
    <el-form-item label="学历" prop="educationalBackground">
      <el-input v-model="authorEditInfo.educationalBackground" />
    </el-form-item>
    <el-form-item label="职称" prop="professionalTitle">
      <el-input v-model="authorEditInfo.professionalTitle" />
    </el-form-item>
    <el-form-item label="科室" prop="medicalDept">
      <el-input v-model="authorEditInfo.medicalDept" />
    </el-form-item>
    <el-form-item label="科室(英文)" prop="medicalDeptEn">
      <el-input v-model="authorEditInfo.medicalDeptEn" />
    </el-form-item>
    <el-form-item label="邮编" prop="postCode">
      <el-input v-model="authorEditInfo.postCode" />
    </el-form-item>
    <el-form-item label="基金" prop="foundationName">
      <el-input v-model="authorEditInfo.foundationName" />
    </el-form-item>
    <el-form-item label="基金编码" prop="foundationCode">
      <el-input v-model="authorEditInfo.foundationCode" />
    </el-form-item>
    <el-form-item label="邮箱" prop="emailAccount">
      <el-input v-model="authorEditInfo.emailAccount" />
    </el-form-item>
    <el-form-item label="邮箱密码" prop="emailPassword">
      <el-input v-model="authorEditInfo.emailPassword" />
    </el-form-item>
    <el-form-item label="ORCID号" prop="orcid">
      <el-input v-model="authorEditInfo.orcid" />
    </el-form-item>
    <el-form-item label="座机号码" prop="tel">
      <el-input v-model="authorEditInfo.tel" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AuthorEdit',
  props: {
    authorEditInfo: {
      realName: undefined,
      realNameEn: undefined,
      company: undefined,
      companyEn: undefined,
      educationalBackground: undefined,
      professionalTitle: undefined,
      medicalDept: undefined,
      medicalDeptEn: undefined,
      postCode: undefined,
      foundationName: undefined,
      foundationCode: undefined,
      emailAccount: undefined,
      emailPassword: undefined,
      orcid: undefined,
      tel: undefined,
      orderId: undefined,
      id: undefined,
      orderNum: undefined
    }
  }
}
</script>

<style scoped>

</style>
