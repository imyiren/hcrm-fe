<template>
  <div class="customer-list-container">
    <el-form :inline="true" :model="customerQuery" class="customer-form">
      <el-form-item><el-input v-model="customerQuery.name" placeholder="姓名" /></el-form-item>
      <el-form-item><el-input v-model="customerQuery.contractMatch" placeholder="手机号/微信" /></el-form-item>
      <el-form-item><el-select v-model="customerQuery.department" placeholder="请选择部门">
        <el-option label="科一" value="1" />
      </el-select></el-form-item>
      <el-form-item><el-date-picker v-model="customerQuery.createTimeStart" type="date" placeholder="创建时间开始" /></el-form-item>
      <el-form-item><el-date-picker v-model="customerQuery.createTimeEnd" type="date" placeholder="创建时间结束" /></el-form-item>
      <el-form-item><el-button type="primary" @click="doQuery">查询</el-button></el-form-item>
    </el-form>
    <el-button type="primary" size="mini" plain>添加账号</el-button>
    <span style="margin-left: 10px; color: #909399; font-size: 12px;">共{{ pageData.total }}条数据，共计{{ pageData.pages }}页，当前第{{ pageData.pageNum }}页。</span>
    <el-table :data="pageData.data" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="workNo" label="工号" width="70" />
      <el-table-column prop="realName" label="姓名" width="70" />
      <el-table-column prop="genderDesc" label="性别" width="50" />
      <el-table-column prop="department" label="部门" width="100" />
      <el-table-column prop="title" label="职务" width="140" />
      <el-table-column prop="phone" label="手机号" width="110" />
      <el-table-column prop="wechat" label="微信" width="150" />
      <el-table-column prop="memo" label="备注" />
      <el-table-column prop="stateDesc" label="状态" />
      <el-table-column prop="startDate" label="入职时间" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20"><el-col :span="12" :offset="10">
      <el-button-group class="page-next">
        <el-button type="primary" icon="el-icon-arrow-left" plain>上一页</el-button>
        <el-button type="primary" plain>下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </el-col></el-row>
  </div>
</template>

<style>
.customer-list-container {
  margin: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.customer-form{
  margin: 5px 10px;
}

.page-next {
  margin: 5px auto;
}
</style>

<script>
export default {
  data() {
    return {
      customerQuery: {
        name: '',
        contractMatch: '',
        department: '',
        createPerson: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      pageData: {
        pageSize: 20,
        pageNum: 1,
        total: 30,
        pages: 3,
        hasNextPage: true,
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
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state === '1') {
        return 'warning-row'
      } else if (row.state === '4') {
        return 'success-row'
      }
      return ''
    },
    edit(data) {
    },
    doQuery(queryData) {
    }
  }
}
</script>
