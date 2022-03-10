<template>
  <div class="customer-info-container">
    <el-divider content-position="left">基本信息: <span style="font-size: 25px">{{ customerInfo.realName }}</span>
    </el-divider>
    <el-descriptions v-loading="loading" :column="column" border direction="vertical">
      <el-descriptions-item label="姓名">{{ customerInfo.realName }}</el-descriptions-item>
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
      <el-descriptions-item label="需求" :span="2">{{ customerInfo.requirement }}</el-descriptions-item>
      <el-descriptions-item label="客户文件" :span="2">
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="交付" :span="2">
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
        <el-link type="primary" href="https://element.eleme.io" target="_blank" :underline="false">文件2.jpg<i
          class="el-icon-download"/></el-link>
        <el-divider direction="vertical"/>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">回访记录</el-divider>
    <el-table v-loading="loading" :data="customerInfo.visitList" style="width: 100%">
      <el-table-column prop="userName" label="回访人" width="70"/>
      <el-table-column prop="createTime" label="时间" width="210"/>
      <el-table-column prop="content" label="回访内容"/>
    </el-table>
  </div>
</template>

<script>
import { get } from '@/api/customer'

export default {
  data() {
    return {
      loading: true,
      visitTableLoading: false,
      column: 4,
      customerInfo: {
        id: '1',
        realName: '某某',
        gender: '1',
        genderDesc: '男',
        company: '骚气无限科技有限公司',
        sourceType: '1',
        sourceTypeDesc: '朋友介绍',
        phone: '13312341234',
        wechat: 'wecht1123',
        qq: '39170306',
        qqGroup: '39170306',
        email: 'yiren.dev@gmail.com',
        requirement: '没啥需求',
        medicalDeptPropCode: '100001',
        medicalDeptPropDesc: '神马颗',
        createUserName: '王五员工',
        visitList: [{
          userId: 1,
          userName: '王五',
          content: '我是回访内容',
          createTime: '2022-03-22 12:12:12'
        }],
        customerFileList: [{
          name: 'ABC骚气文件.jpg',
          url: 'https://a.huaysw.com/2022/03/123123sfsafsfasf.job',
          code: 'sfsadfsafsdfasfasfsafsafasf'
        }],
        resultFileList: [{
          name: 'ABC骚气交付文件.jpg',
          url: 'https://a.huaysw.com/2022/03/123123sfsafsfasf.job',
          code: 'sfsadfsafsdfasfasfsafsafasf'
        }]
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
      this.column = 3
    }
  },
  methods: {
    loadById(id) {
      this.loading = true
      if (id === null || id === '' || id === undefined) {
        return
      }
      get(id).then(res => {
        this.customerInfo = res.data
      }).catch(() => {
        this.customerInfo = null
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
.customer-info-container {
  max-width: 1600px;
  margin: 10px auto;
}
</style>
