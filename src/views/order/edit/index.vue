<template>
  <div class="app-container custom-edit">
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item><template slot="label"><i class="el-icon-user" />姓名</template>{{ customerInfo.realName }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ customerInfo.genderDesc }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ customerInfo.company }}</el-descriptions-item>
      <el-descriptions-item label="来源">
        <el-tag size="small">{{ customerInfo.sourceTypeDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="录入人">{{ customerInfo.createUserName }}</el-descriptions-item>
    </el-descriptions>
    <el-form ref="form" v-loading="deptLoading" :model="form" :rules="rules" label-width="60px" label-position="left">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="项目类型" prop="bizTypeCode">
        <el-select v-model="form.bizTypeCode" :filterable="true" :clearable="true" placeholder="请选择项目类型">
          <el-option label="SCI" :value="1" />
          <el-option label="国内核心" :value="2" />
          <el-option label="国内普刊" :value="4" />
          <el-option label="课题标书" :value="3" />
          <el-option label="专利" :value="5" />
          <el-option label="其他" :value="99" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型" prop="bizType">
        <el-select v-model="form.paymentMethodCode" :filterable="true" :clearable="true" placeholder="请选择项目类型">
          <el-option label="SCI" :value="1" />
          <el-option label="国内核心" :value="2" />
          <el-option label="国内普刊" :value="4" />
          <el-option label="课题标书" :value="3" />
          <el-option label="专利" :value="5" />
          <el-option label="其他" :value="99" />
        </el-select>
      </el-form-item>
      <el-form-item label="已付金额" prop="payedPrice">
        <el-input v-model="form.payedPrice" />
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
      <el-form-item label="需求" prop="memo">
        <el-input v-model="form.memo" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="客户文件" prop="customerFileList">
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
      <el-form-item label="交付文件" prop="resultFileList">
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
      loading: false,
      customerInfo: {
        id: undefined,
        realName: undefined,
        gender: undefined,
        genderDesc: undefined,
        company: undefined,
        sourceType: undefined,
        sourceTypeDesc: undefined,
        createUserName: undefined,
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
      form: {
        customerId: '',
        id: '',
        contractStartDate: '',
        contractEndDate: '',
        topic: '',
        bizTypeCode: '',
        bizTypeDesc: '',
        paymentMethodCode: '',
        paymentMethodDesc: '',
        payedPrice: '',
        contractPrice: '',
        wechat: '',
        memo: '',
        customerFileList: [],
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
      this.loading = true
      get(id).then(res => {
        this.customerInfo = res.data
      }).finally(() => {
        this.loading = false
      })
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

