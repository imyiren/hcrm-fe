<template>
  <div class="app-container custom-edit">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px" label-position="right">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-input v-model="form.company" />
      </el-form-item>
      <el-form-item label="来源" prop="sourceType">
        <el-select v-model="form.sourceType" placeholder="请选择来源">
          <el-option label="朋友介绍" value="1" />
          <el-option label="QQ" value="2" />
          <el-option label="电话" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="form.wechat" />
      </el-form-item>
      <el-form-item label="QQ号" prop="qq">
        <el-input v-model="form.qq" />
      </el-form-item>
      <el-form-item label="QQ群" prop="qqGroup">
        <el-input v-model="form.qqGroup" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="科室" prop="medicalDepartment">
        <el-select v-model="form.medicalDepartment" placeholder="请选择科室">
          <el-option label="耳鼻咽喉头颈科" value="1" />
          <el-option label="胸外科" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="需求" prop="requirement">
        <el-input v-model="form.requirement" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item  label="文件" prop="customerFileList">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handleCustomerFilePreview"
          :on-remove="handleCustomerFileRemove"
          :before-remove="beforeCustomerFileRemove"
          multiple
          :limit="3"
          :on-exceed="handleCustomerFileExceed"
          :file-list="form.customerFileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传方案、作者信息、课题等资料</div>
          <div slot="tip" class="el-upload__tip">单个文件类型不超过100MB, 最多10个文件。</div>
        </el-upload>
      </el-form-item>
      <el-form-item  label="交付" prop="resultFileList">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handleResultFilePreview"
          :on-remove="handleResultFileRemove"
          :before-remove="beforeResultFileRemove"
          multiple
          :limit="3"
          :on-exceed="handleResultFileExceed"
          :file-list="form.resultFileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传方案、文章、标书、原始数据等文件。</div>
          <div slot="tip" class="el-upload__tip">单个文件类型不超过100MB, 最多10个文件。</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        gender: '1',
        company: '',
        sourceType: '',
        phone: '',
        wechat: '',
        qq: '',
        qqGroup: '',
        email: '',
        requirement: '',
        medicalDepartment: '',
        customerFileList: [],
        resultFileList: []
      },
      rules: {
        name: [
          { required: true, message: '请输入客户名字！', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符！', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别！', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位名称！', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 4 到 30 个字符！', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择来源！', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号！', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度必须为11位！', trigger: 'blur' }
        ],
        wechat: [
          { max: 30, message: '最大长度30！', trigger: 'blur' }
        ],
        qq: [
          { max: 30, message: '最大长度30！', trigger: 'blur' }
        ],
        qqGroup: [
          { max: 30, message: '最大长度30！', trigger: 'blur' }
        ],
        email: [
          { max: 30, message: '最大长度30！', trigger: 'blur' }
        ],
        requirement: [
          { required: true, message: '请输入需求', trigger: 'blur' },
          { max: 128, message: '最大长度120个字！', trigger: 'blur' }
        ],
        medicalDepartment: [
          { required: true, message: '请选择科室！', trigger: 'change' }
        ],
        customerFileList: [
        ],
        resultFileList: []
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '保存成功，正在跳转～'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCustomerFileRemove(file, fileList) {
    },
    handleCustomerFilePreview(file) {
    },
    handleCustomerFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeCustomerFileRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleResultFileRemove(file, fileList) {
    },
    handleResultFilePreview(file) {
    },
    handleResultFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeResultFileRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

.custom-edit {
  width: 600px;
  padding: 10px 0;
  margin-left: 30px;
}
</style>

