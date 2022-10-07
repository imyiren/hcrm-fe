<template>
  <div class="user-list-container">
    <el-form :inline="true" :model="queryData" class="customer-form">
      <el-form-item>
        <el-input v-model="queryData.workNo" placeholder="工号" maxlength="32" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.realName" placeholder="姓名" maxlength="16" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="inCreateTimeStart" type="date" placeholder="创建开始日期" style="width: 150px" />
        <el-date-picker v-model="inCreateTimeEnd" type="date" placeholder="创建结束时间" style="width: 150px" />
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="doClearQueryData">清空</el-button>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" style="margin-left: 10px" plain @click="newUser">添加用户</el-button>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{
      pageData.totalSize
    }}条数据，共计{{ pageData.totalPage }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table v-loading="tableLoading" :data="pageData.data" style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="workNo" label="工号" min-width="130" align="center" />
      <el-table-column prop="realName" label="姓名" min-width="70" align="center" />
      <el-table-column prop="username" label="账号" min-width="150" align="center" />
      <el-table-column prop="title" label="权限&职位" min-width="90" align="center" />
      <el-table-column prop="stateDesc" label="账号状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.state === 100 ? 'success' : 'warning'"
          >{{ scope.row.stateDesc }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="155" align="center" />
      <el-table-column prop="loginIp" label="登录IP" min-width="120" align="center"/>
      <el-table-column prop="loginTime" label="登录时间" min-width="155" align="center"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-next-container">
      <el-button-group class="page-next">
        <el-button type="primary" icon="el-icon-arrow-left" plain :disabled="!pageData.hasPrePage" @click="prevPage">
          上一页
        </el-button>
        <el-button type="primary" plain :disabled="!pageData.hasNextPage" @click="nextPage">下一页<i
          class="el-icon-arrow-right el-icon--right"
        /></el-button>
      </el-button-group>
    </div>
    <el-dialog
      title="编辑用户信息"
      :visible.sync="editUserInfoVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="editUserInfo" label-width="120px" label-position="left">
        <el-form-item label="用户权限&岗位" prop="roleList">
          <el-select
            v-model="editUserInfo.roleList"
            :filterable="true"
            :clearable="true"
            multiple
          >
            <el-option label="管理员" :value="'admin'" />
            <el-option label="前端" :value="'sale'" />
            <el-option label="后端" :value="'experiment'" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserInfo.username" />
        </el-form-item>
        <el-form-item label="昵称" prop="realName">
          <el-input v-model="editUserInfo.realName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editUserInfo.password" /></el-form-item>
        <el-form-item label="当前状态" prop="state">
          <el-select
            v-model="editUserInfo.state"
            :filterable="true"
            :clearable="true"
          >
            <el-option label="启用中" :value="100" />
            <el-option label="已停用" :value="200" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserInfoVisible = false">取 消</el-button>
        <el-button @click="randomPassword">随机密码生成</el-button>
        <el-button type="primary" @click="confirmEditUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.customer-form {
  margin: 5px 10px;
}

.page-next {
  margin: 0 auto;
}

.page-next-container {
  text-align: center;
}
</style>

<script>

import { listUser } from '@/api/uop'
import { dateFtt } from '@/utils'
import { saveUser } from '@/api/uop'

export default {
  components: {
  },
  data() {
    return {
      tableLoading: true,
      editUserInfoVisible: false,
      inCreateTimeStart: undefined,
      inCreateTimeEnd: undefined,
      queryData: {
        pageSize: 10,
        pageNum: 1,
        realName: undefined,
        workNo: undefined,
        state: undefined,
        createUserName: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined
      },
      editUserInfo: {
        id: '',
        workNo: '',
        realName: '',
        username: '',
        password: '',
        title: '',
        state: 100,
        roleList: []
      },
      pageData: {
        pageSize: 10,
        pageNum: 1,
        totalSize: 0,
        totalPage: 0,
        hasNextPage: false,
        hasPrePage: false,
        data: [{
          id: '1',
          workNo: '10001',
          realName: '罗小虎',
          gender: '1',
          genderDesc: '男',
          company: '帅气无限责任公司！',
          department: '销售部',
          title: '高级销售经理',
          phone: '13312341234',
          wechat: 'sadfasffasd',
          memo: '备注信息',
          startDate: '2016-05-02',
          createTime: '2016-05-02',
          state: '1',
          stateDesc: '在职'
        }]
      }
    }
  },
  mounted() {
    this.doQuery(this.queryData)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state === '1') {
        return 'warning-row'
      } else if (row.state === '4') {
        return 'success-row'
      }
      return ''
    },
    doQuery() {
      for (const key in this.queryData) {
        if (this.queryData[key] === '') {
          this.queryData[key] = undefined
        }
      }

      if (this.inCreateTimeStart !== null && this.inCreateTimeStart !== undefined) {
        this.queryData.createTimeStart = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeStart)
      } else {
        this.queryData.createTimeStart = undefined
      }
      if (this.inCreateTimeEnd !== null && this.inCreateTimeEnd !== undefined) {
        this.queryData.createTimeEnd = dateFtt('yyyy-MM-dd hh:mm:ss', this.inCreateTimeEnd)
      } else {
        this.queryData.createTimeEnd = undefined
      }
      this.tableLoading = true
      listUser(this.queryData).then(res => {
        this.pageData = res
      }).finally(() => {
        this.tableLoading = false
      })
    },
    prevPage() {
      this.queryData.pageNum--
      this.doQuery(this.queryData)
    },
    nextPage() {
      this.queryData.pageNum++
      this.doQuery(this.queryData)
    },
    doClearQueryData() {
      this.queryData = {
        pageSize: 10,
        pageNum: 1
      }
      this.inCreateTimeStart = undefined
      this.inCreateTimeEnd = undefined
      this.inContractEndDate = undefined
      this.inContractStartDate = undefined
    },
    confirmEditUserInfo() {
      if (this.editUserInfo.realName === null || this.editUserInfo.realName === undefined || this.editUserInfo.realName === '' ||
        this.editUserInfo.username === null || this.editUserInfo.username === undefined || this.editUserInfo.username === '' ||
        this.editUserInfo.state === null || this.editUserInfo.state === undefined || this.editUserInfo.state === '' ||
        this.editUserInfo.roleList === null || this.editUserInfo.roleList === undefined || this.editUserInfo.roleList === '') {
        this.$message.warning('请填写完整的参数，所有参数不能为空！')
        return
      }
      if (this.editUserInfo.id === null || this.editUserInfo.id === undefined) {
        console.log('新增用户')
      } else {
        console.log('修改用户')
      }
      saveUser(this.editUserInfo).then(res => {
        this.$message.success('保存用户成功！')
        this.doQuery()
        this.editUserInfoVisible = false
      })
    },
    editUser(row) {
      this.editUserInfo = row
      this.editUserInfoVisible = true
    },
    newUser() {
      this.editUserInfo = {
        roleList: ['sale'],
        state: 100
      }
      this.$set(this.editUserInfo, 'password', this.uuidStr())
      this.editUserInfoVisible = true
    },
    randomPassword() {
      // this.editUserInfo.password = this.uuidStr()
      this.$set(this.editUserInfo, 'password', this.uuidStr())
      console.log(this.editUserInfo)
    },
    uuidStr() {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

      var uuid = s.join('')
      return uuid
    }
  }
}
</script>
