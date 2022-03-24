<template>
  <div class="app-container order-edit">
    <el-divider content-position="left">客户信息 <el-button type="text" @click="editCustomer">编辑</el-button></el-divider>

    <el-descriptions v-loading="loading" :column="2" border>
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
    <el-divider content-position="left">订单信息</el-divider>
    <el-form ref="form" :model="form" label-width="85px" label-position="left" :rules="rules">
      <el-form-item label="合同周期" prop="contractStartDate">
        <el-date-picker
          v-model="contractStartDateInner"
          type="date"
          placeholder="开始日期"
          :validate-event="false"
        />
        <el-date-picker
          v-model="contractEndDateInner"
          type="date"
          placeholder="结束日期"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="项目题目" prop="topic">
        <el-input v-model="form.topic" />
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
      <el-form-item label="合同金额" prop="contractPrice">
        <el-input v-model="form.contractPrice" type="number" />
      </el-form-item>
      <el-form-item label="付款状态" prop="paymentStateCode">
        <el-select v-model="form.paymentStateCode" :filterable="true" :clearable="true" placeholder="请选择付款状态">
          <el-option label="已付定金" :value="100" />
          <el-option label="已付全款" :value="200" />
          <el-option label="已退款" :value="-100" />
        </el-select>
      </el-form-item>
      <el-form-item label="已付金额" prop="payedPrice">
        <el-input v-model="form.payedPrice" type="number" />
      </el-form-item>
      <el-form-item label="付款方式" prop="paymentMethodCode">
        <el-select v-model="form.paymentMethodCode" :filterable="true" :clearable="true" placeholder="请选择付款方式">
          <el-option label="银行卡" :value="1" />
          <el-option label="支付宝" :value="2" />
          <el-option label="微信支付" :value="4" />
          <el-option label="对公转账" :value="3" />
          <el-option label="其他" :value="99" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单备注" prop="memo">
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
      <el-form-item label="内部文件" prop="internalFileList">
        <el-upload
          action="/api/uop/storage/upload"
          :http-request="uploadInternalFile"
          :on-remove="handleInternalFileRemove"
          :before-remove="beforeInternalFileRemove"
          multiple
          :limit="10"
          :on-exceed="handleInternalFileExceed"
          :file-list="form.internalFileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传仅在内部流通的资料</div>
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
import { getCustomer } from '@/api/customer'
import { saveOrder } from '@/api/order'
import { uploadFile } from '@/api/uop'
import { dateFtt } from '@/utils'

export default {
  data() {
    return {
      rules: {
        contractStartDate: [
          { required: true, message: '请选择合同日期！', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位名称！', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 4 到 30 个字符！', trigger: 'blur' }
        ],
        topic: [
          { required: true, message: '请输入项目课题！', trigger: 'blur' },
          { min: 4, max: 30, message: '长度在 4 到 30 个字符！', trigger: 'blur' }
        ],
        bizTypeCode: [
          { required: true, message: '请输入项目类型！', trigger: 'blur' }
        ],
        contractPrice: [
          { required: true, message: '请输入合同金额！', trigger: 'blur' }
        ],
        paymentStateCode: [
          { required: true, message: '请选择支付状态！', trigger: 'blur' }
        ],
        payedPrice: [
          { required: true, message: '请输入已付金额！', trigger: 'blur' }
        ],
        paymentMethodCode: [
          { required: true, message: '请选择付款方式！', trigger: 'blur' }
        ]
      },
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
        createUserName: undefined
      },
      contractStartDateInner: undefined,
      contractEndDateInner: undefined,
      form: {
        customerId: '',
        contractStartDate: '',
        contractEndDate: '',
        topic: '',
        bizTypeCode: '',
        paymentStateCode: '',
        paymentMethodCode: '',
        payedPrice: '',
        contractPrice: '',
        memo: '',
        customerFileList: [],
        internalFileList: [],
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
      getCustomer(id).then(res => {
        this.customerInfo = res.data
        this.form.customerId = this.customerInfo.id
      }).finally(() => {
        this.loading = false
      })
    },
    submitForm(form) {
      if (!this.contractStartDateInner || !this.contractEndDateInner || this.contractEndDateInner < this.contractStartDateInner) {
        this.$message({
          type: 'warning',
          message: '请选择合适的合同周期！'
        }
        )
      }
      if (this.contractStartDateInner !== null && this.contractStartDateInner !== undefined) {
        this.form.contractStartDate = dateFtt('yyyy-MM-dd', this.contractStartDateInner)
      }
      if (this.contractEndDateInner !== null && this.contractEndDateInner !== undefined) {
        this.form.contractEndDate = dateFtt('yyyy-MM-dd', this.contractEndDateInner)
      }
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        saveOrder(this.form).then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push('/order/' + response.data)
        })
      })
    },
    uploadCustomerFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.form.customerFileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.name,
          url: res.data.url
        })
      })
    },
    uploadInternalFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.form.internalFileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.name,
          url: res.data.url
        })
      })
    },
    uploadResultFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.form.resultFileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.name,
          url: res.data.url
        })
      })
    },
    editCustomer() {
      this.$router.push('/customer/edit/' + this.customerInfo.id)
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
    handleInternalFileRemove(file, fileList) {
      this.form.internalFileList = fileList
    },
    handleInternalFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeInternalFileRemove(file, fileList) {
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
    }
  }
}
</script>

<style scoped>
.order-edit {
  max-width: 600px;
  padding: 10px 0;
  margin: 10px auto;
}

.customer-info {
  margin-bottom: 15px;
}
</style>

