<template>
  <div class="order-info-container">
    <div class="order-info">
      <el-divider content-position="left">订单信息: <a
        v-clipboard:copy="orderInfo.code"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >{{ orderInfo.code }}</a>
        <el-divider direction="vertical" />
        <el-button v-show="orderInfo.state !== 300" type="text" @click="editDialogVisible = true">编辑</el-button>
      </el-divider>
      <el-descriptions v-loading="loading" :column="column" border :direction="tableDirection">
        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user" />姓名</template>
          {{ orderInfo.customerRealName }}
        </el-descriptions-item>
        <el-descriptions-item label="合同开始日期：">{{ orderInfo.contractStartDate }}</el-descriptions-item>
        <el-descriptions-item label="合同截止日期：">{{ orderInfo.contractEndDate }}</el-descriptions-item>
        <el-descriptions-item label="处理状态">{{ orderInfo.processStateDesc }}</el-descriptions-item>
        <el-descriptions-item label="项目类型">{{ orderInfo.bizTypeDesc }}</el-descriptions-item>
        <el-descriptions-item label="项目题目">{{ orderInfo.topic }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ orderInfo.createUserName }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ orderInfo.createTime }}</el-descriptions-item>
        <el-descriptions-item label="订单备注" :span="2">{{ orderInfo.memo }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="file-info">
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
    </div>
    <div class="author-info">
      <el-divider content-position="left">
        作者信息
      </el-divider>
      <el-table v-loading="loading" :data="orderAuthorList" style="width: 100%">
        <el-table-column prop="orderNum" label="位次" min-width="120px">
          <template slot-scope="scope">
            {{ showOrderNum(scope.row.orderNum) }}
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="姓名" min-width="120px" />
        <el-table-column prop="realNameEn" label="姓名(英文)" min-width="120px" />
        <el-table-column prop="educationalBackground" label="学历" />
        <el-table-column prop="professionalTitle" label="职称" min-width="120px" />
        <el-table-column prop="company" label="单位" min-width="160px" />
        <el-table-column prop="companyEn" label="单位(英文)" min-width="200px" />
        <el-table-column prop="medicalDept" label="科室" min-width="120px" />
        <el-table-column prop="medicalDeptEn" label="科室(英文)" min-width="140px" />
        <el-table-column prop="postCode" label="邮编" />
        <el-table-column prop="foundationName" label="基金" min-width="140px" />
        <el-table-column prop="foundationCode" label="基金编码" min-width="140px" />
        <el-table-column prop="emailAccount" label="邮箱" min-width="120px" />
        <el-table-column prop="emailPassword" label="邮箱密码" min-width="120px" />
        <el-table-column prop="orcid" label="ORCID号" min-width="120px" />
        <el-table-column prop="tel" label="座机号码" min-width="120px" />
        <el-table-column prop="createUserName" label="创建人" min-width="120px" />
        <el-table-column prop="createTime" label="创建时间" min-width="200px" />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editAuthorInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="magazine-info">
      <el-divider content-position="left">
        投稿杂志
      </el-divider>
      投稿杂志
      <el-divider direction="vertical" />
      <el-button type="text" @click="openAddMagazine()">添加</el-button>
      <el-table v-loading="loading" :data="orderMagazineList" style="width: 100%">
        <el-table-column prop="magazineNum" label="排序" min-width="120px">
          <template slot-scope="scope">
            {{ showMagazineNum(scope.row.magazineNum) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="杂志名称" min-width="120px" />
        <el-table-column prop="url" label="链接地址(点击跳转)" min-width="180px">
          <template slot-scope="scope">
            <el-link type="primary" target="_blank" :href="scope.row.url">{{ scope.row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="accountUsername" label="后台账号" min-width="160px" />
        <el-table-column prop="accountPassword" label="账号密码" min-width="160px" />
        <el-table-column prop="state" label="当前状态" min-width="120px" />
        <el-table-column prop="memo" label="备注" min-width="100px" />
        <el-table-column prop="createUserName" label="创建人" min-width="120px" />
        <el-table-column prop="createTime" label="创建时间" min-width="200px" />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editMagazineInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="operation-log">
      <el-divider content-position="left">操作记录</el-divider>
      <OperationLog ref="operationLogTable" :main-id="orderInfo.id" />
    </div>
    <div class="dialog-container">
      <el-dialog
        :title="'订单变更:' + orderInfo.code"
        :visible.sync="editDialogVisible"
        width="50%"
        center
      >
        <OrderEdit :order-edit-info="orderEditInfo" :order-info="orderInfo" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEditOrderInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="杂志信息编辑"
        :visible.sync="editMagazineVisible"
        width="50%"
        center
      >
        <el-card> 注意：非管理提交后，无法修改，请谨慎提交！</el-card>
        <br>
        <MagazineEdit :magazine-edit-info="magazineEditInfo" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="editMagazineVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEditMagazineInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="文件上传"
        :visible.sync="uploadFileVisible"
        width="50%"
        center
      >
        <el-card> 注意：非管理提交后，无法修改，请谨慎提交！</el-card>
        <br>
        <el-form ref="form" :model="uploadFileData" label-width="80px" label-position="left">
          <el-form-item label="文件类型" prop="type">
            <el-select v-model="uploadFileData.type" :filterable="true">
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
              <div slot="tip" class="el-upload__tip">单个文件类型不超过10MB, 最多10个文件。</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadFileVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmUploadFile">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getOrderProcessDetail, saveAuthor, updateOrder, saveMagazine } from '@/api/order'
import { uploadFile } from '@/api/uop'
import OrderEdit from '@/views/order/processDetail/OrderEdit'
import MagazineEdit from '@/views/order/processDetail/MagazineEdit'
import OperationLog from '@/views/order/processDetail/OperationLog'
import { mapGetters } from 'vuex'

export default {
  components: {
    OrderEdit,
    MagazineEdit,
    OperationLog
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  data() {
    return {
      editDialogVisible: false,
      editAuthorVisible: false,
      uploadFileVisible: false,
      editMagazineVisible: false,
      loading: true,
      operationLoading: true,
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
        processState: undefined,
        stateDesc: undefined,
        processStateDesc: undefined,
        topic: undefined,
        updateTime: undefined,
        authorList: undefined
      },
      uploadFileData: {
        type: undefined,
        fileList: []
      },
      orderEditInfo: {},
      authorEditInfo: {},
      magazineEditInfo: {},
      operationLogList: [],
      orderAuthorList: [],
      orderMagazineList: []
    }
  },
  mounted() {
    this.loadByCode(this.$route.params.code)
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
    loadByCode(code) {
      this.loading = true
      if (code === null || code === '' || code === undefined) {
        return
      }
      getOrderProcessDetail(code).then(res => {
        this.orderInfo = res.data
        this.customerInfo = res.data.customerInfo
        this.orderAuthorList = res.data.authorList
        this.orderMagazineList = res.data.magazineList
      }).catch(() => {
        this.customerInfo = null
        this.orderInfo = null
      }).finally(() => {
        this.loading = false
        this.$refs.operationLogTable.doQuery()
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
      this.uploadFileData.type = 2
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
        this.loadByCode(this.orderInfo.code)
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
      this.orderEditInfo.code = this.orderInfo.code
      updateOrder(this.orderEditInfo).then(res => {
        this.$message.success('更新成功')
        this.loadByCode(this.$route.params.code)
      }).finally(() => {
        this.editDialogVisible = false
      })
    },
    confirmEditAuthorInfo() {
      this.authorEditInfo.orderId = this.orderInfo.id
      this.authorEditInfo.orderCode = this.orderInfo.code
      saveAuthor(this.authorEditInfo).then(res => {
        this.editAuthorVisible = false
        this.$message.success('更新成功')
        this.loadByCode(this.$route.params.code)
      })
    },
    confirmEditMagazineInfo() {
      this.magazineEditInfo.orderId = this.orderInfo.id
      this.magazineEditInfo.orderCode = this.orderInfo.code
      saveMagazine(this.magazineEditInfo).then(res => {
        this.editMagazineVisible = false
        this.$message.success('更新成功')
        this.loadByCode(this.$route.params.code)
      })
    },
    openAddAuthor() {
      this.authorEditInfo = {
        orderId: this.orderInfo.id
      }
      this.editAuthorVisible = true
    },
    editAuthorInfo(item) {
      if (!this.roles.includes('admin')) {
        this.$message.warning('仅管理员可使用！')
        return
      }
      this.authorEditInfo = item
      this.editAuthorVisible = true
    },
    editMagazineInfo(item) {
      if (!this.roles.includes('admin')) {
        this.$message.warning('仅管理员可使用！')
        return
      }
      this.magazineEditInfo = item
      this.editMagazineVisible = true
    },
    openAddMagazine() {
      this.magazineEditInfo = {}
      this.editMagazineVisible = true
    },
    showOrderNum(orderNum) {
      if (orderNum === 99) {
        return '通讯作者'
      }
      return '第' + orderNum + '作者'
    },
    showMagazineNum(magazineNum) {
      if (magazineNum <= 0 || magazineNum > 10) {
        return '杂志'
      }
      return '杂志' + magazineNum
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
