<template>
  <div class="app-container custom-edit">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px" label-position="left">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1" :value="1">男</el-radio>
          <el-radio :label="2" :value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单位" prop="company">
        <el-input v-model="form.company" />
      </el-form-item>
      <el-form-item label="来源" prop="sourceType">
        <el-select v-model="form.sourceType" :filterable="true" :clearable="true" placeholder="请选择来源">
          <el-option label="朋友介绍" :value="1" />
          <el-option label="QQ" :value="2" />
          <el-option label="QQ群" :value="4" />
          <el-option label="电话" :value="3" />
          <el-option label="微信" :value="5" />
          <el-option label="其他" :value="99" />
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
      <el-form-item label="科室" prop="medicalDeptPropCode">
        <el-select
          v-model="form.medicalDeptPropCode"
          v-loading="deptLoading"
          :filterable="true"
          :clearable="true"
          :default-first-option="true"
          placeholder="请选择科室"
          @focus="selectDeptProp"
        >
          <el-option
            v-for="item in medicalDepartmentList"
            :key="item.code"
            :label="item.value"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="需求" prop="requirement">
        <el-input v-model="form.requirement" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="文件" prop="customerFileList">
        <el-upload
          action="/api/uop/storage/upload"
          :http-request="uploadCustomerFile"
          :on-remove="handleCustomerFileRemove"
          :before-remove="beforeCustomerFileRemove"
          multiple
          :limit="10"
          :on-exceed="handleCustomerFileExceed"
          :file-list="form.customerFileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传方案、作者信息、课题等资料</div>
          <div slot="tip" class="el-upload__tip">单个文件类型不超过100MB, 最多10个文件。</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="交付" prop="resultFileList">
        <el-upload
          action="/api/uop/storage/upload"
          :http-request="uploadResultFile"
          :on-remove="handleResultFileRemove"
          :before-remove="beforeResultFileRemove"
          multiple
          :limit="10"
          :on-exceed="handleResultFileExceed"
          :file-list="form.resultFileList"
        >
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
import { listPropByKey } from '@/api/prop'
import { save, get } from '@/api/customer'
import { uploadFile } from '@/api/uop'

export default {
  data() {
    return {
      medicalDepartmentList: [],
      deptLoading: false,
      form: {
        id: '',
        realName: '',
        gender: 1,
        genderDesc: '男',
        company: '',
        sourceType: '',
        sourceTypeDesc: '',
        phone: '',
        wechat: '',
        qq: '',
        qqGroup: '',
        email: '',
        requirement: '',
        medicalDeptPropCode: '',
        customerFileList: [],
        resultFileList: []
      },
      rules: {
        realName: [
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
        medicalDeptPropCode: [
          { required: true, message: '请选择科室！', trigger: 'change' }
        ],
        customerFileList: [
        ],
        resultFileList: []
      }
    }
  },
  mounted() {
    this.loadById(this.$route.params.id)
  },
  methods: {
    loadById(id) {
      if (id === null || id === '' || id === undefined) {
        return
      }
      listPropByKey('MEDICAL_DEPARTMENT').then(response => {
        const { data } = response
        this.medicalDepartmentList = data
        get(id).then(res => {
          this.form = res.data
        })
      }).finally(() => {
        this.deptLoading = false
      })
    },
    selectDeptProp() {
      if (this.medicalDepartmentList.length < 1) {
        this.loadMedicalDepartment()
      }
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        save(this.form).then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push('/customer')
        })
      })
    },
    loadMedicalDepartment() {
      this.deptLoading = true
      listPropByKey('MEDICAL_DEPARTMENT').then(response => {
        const { data } = response
        this.medicalDepartmentList = data
      }).finally(() => {
        this.deptLoading = false
      })
    },
    uploadCustomerFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.form.customerFileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.filename,
          url: res.data.url
        })
      })
    },
    handleCustomerFileRemove(file, fileList) {
      this.form.customerFileList = fileList
    },
    handleCustomerFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeCustomerFileRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleResultFileRemove(file, fileList) {
      this.form.resultFileList = fileList
    },
    handleResultFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeResultFileRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadResultFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.form.resultFileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.filename,
          url: res.data.url
        })
      })
    }
  }
}
</script>

<style scoped>
.custom-edit {
  max-width: 600px;
  padding: 10px 0;
  margin: 10px auto;
}
</style>

