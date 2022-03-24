<template>
  <div class="order-info-container">
    <el-divider content-position="left">客户信息</el-divider>
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user" />姓名</template>
        {{ customerInfo.realName }}
      </el-descriptions-item>
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
    <el-divider content-position="left">订单信息: <a
      v-clipboard:copy="orderInfo.code"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >{{ orderInfo.code }}</a>
      <el-divider direction="vertical" />
      <el-button v-show="orderInfo.state !== 300" type="text" @click="editDialogVisible = true">编辑</el-button>
    </el-divider>
    <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
      <el-descriptions-item label="合同开始日期：">{{ orderInfo.contractStartDate }}</el-descriptions-item>
      <el-descriptions-item label="合同截止日期：">{{ orderInfo.contractEndDate }}</el-descriptions-item>
      <el-descriptions-item label="合同金额">{{ orderInfo.contractPrice }}</el-descriptions-item>
      <el-descriptions-item label="已付金额">{{ orderInfo.payedPrice }}</el-descriptions-item>
      <el-descriptions-item label="付款方式">{{ orderInfo.paymentMethodDesc }}</el-descriptions-item>
      <el-descriptions-item label="付款状态">{{ orderInfo.paymentStateDesc }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <el-tag
          size="small"
          :type="orderInfo.state === 300 ? 'success' : orderInfo.state > 0 ? 'primary' : 'warning'"
        >{{ orderInfo.stateDesc }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="项目类型">{{ orderInfo.bizTypeDesc }}</el-descriptions-item>
      <el-descriptions-item label="项目题目">{{ orderInfo.topic }}</el-descriptions-item>
      <el-descriptions-item label="创建人">{{ orderInfo.createUserName }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ orderInfo.createTime }}</el-descriptions-item>
      <el-descriptions-item label="订单备注" :span="2">{{ orderInfo.memo }}</el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">文件资料
      <el-divider direction="vertical" />
      <el-button type="text" @click="openUploadFileDialog">上传</el-button>
    </el-divider>
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
    <el-divider content-position="left">操作记录</el-divider>
    <el-table v-loading="loading" :data="operationLog.data" style="width: 100%" @row-dblclick="toDetail">
      <el-table-column prop="createTime" label="操作时间" width="200px" />
      <el-table-column prop="createUserName" label="操作人" width="120px" />
      <el-table-column prop="cotent" label="操作内容" />
    </el-table>
    <el-dialog
      :title="'订单变更:' + orderInfo.code"
      :visible.sync="editDialogVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="orderEditInfo" label-width="85px" label-position="left">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditOrderInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="文件上传"
      :visible.sync="uploadFileVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="uploadFileData" label-width="80px" label-position="left">
        <el-form-item label="文件类型" prop="type">
          <el-select v-model="uploadFileData.type" :filterable="true">
            <el-option label="客户文件" :value="1" />
            <el-option label="内部文件" :value="2" />
            <el-option label="交付文件" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="文件信息" prop="fileList">
          <el-upload
            action="/api/uop/storage/upload"
            :http-request="uploadFile"
            :on-remove="handleResultFileRemove"
            :before-remove="beforeResultFileRemove"
            multiple
            :limit="10"
            :on-exceed="handleResultFileExceed"
            :file-list="uploadFileData.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">单个文件类型不超过100MB, 最多10个文件。</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUploadFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrder, updateOrder } from '@/api/order'
import { uploadFile } from '@/api/uop'

export default {
  data() {
    return {
      editDialogVisible: false,
      uploadFileVisible: false,
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
      },
      uploadFileData: {
        type: undefined,
        fileList: []
      },
      orderEditInfo: {
        id: undefined,
        state: undefined,
        topic: undefined,
        paymentStateCode: undefined,
        payedPrice: undefined,
        paymentMethodCode: undefined,
        memo: undefined
      },
      operationLog: {
        data: []
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
      this.$message.warning('编辑按钮： ' + this.orderInfo.id + ', 功能暂未开发！')
    },
    uploadFile(data) {
      const { file } = data
      uploadFile(file).then(res => {
        this.uploadFileData.fileList.push({
          uid: file.uid,
          code: res.data.code,
          name: res.data.name,
          url: res.data.url
        })
      })
    },
    openUploadFileDialog() {
      this.uploadFileData.fileList = []
      this.uploadFileData.type = 1
      this.uploadFileVisible = true
    },
    onCopy(e) {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    onError(e) {
      this.$message({
        message: '复制失败！',
        type: 'error'
      })
    },
    handleResultFileRemove(file, fileList) {
      this.uploadFileData.fileList = fileList
    },
    handleResultFileExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeResultFileRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    confirmUploadFile() {
      if (!this.uploadFileData.fileList || this.uploadFileData.fileList.length === 0) {
        this.$message.warning('文件不能为空！')
        return
      }
      const data = {
        id: this.orderInfo.id
      }
      if (this.uploadFileData.type === 1) {
        data.customerFileList = this.uploadFileData.fileList
      }
      if (this.uploadFileData.type === 2) {
        data.internalFileList = this.uploadFileData.fileList
      }
      if (this.uploadFileData.type === 3) {
        data.resultFileList = this.uploadFileData.fileList
      }
      updateOrder(data).then(res => {
        this.loadById(this.orderInfo.id)
        this.$message.success('修改成功')
      }).finally(() => {
        this.uploadFileVisible = false
      })
    },
    confirmEditOrderInfo() {
      if (this.orderInfo.state === 300) {
        this.$message.warning('已完成的订单不能修改')
        return
      }
      this.orderEditInfo.id = this.orderInfo.id
      updateOrder(this.orderEditInfo).then(res => {
        this.$message.success('更新成功')
        this.loadById(this.$route.params.id)
      }).finally(() => {
        this.editDialogVisible = false
      })
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
