<template>
  <div class="user-info-container">
    <el-descriptions class="margin-top" title="账户基础信息" :column="3" :size="size" border colon>
      <template slot="extra">
        <el-button type="primary" size="small" plain>修改密码</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user" />姓名</template>
        {{ user.realName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-location-outline" />工号</template>
        {{ user.workNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-office-building" />职位&权限</template>
        {{ user.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user" />用户名</template>
        {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-tickets" />状态</template>
        <el-tag
          :type="user.state === 100 ? 'success' : 'warning'"
          size="small">{{ user.stateDesc }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    this.user = this.userInfo
  },
  data() {
    return {
      size: '',
      user: {
        id: '0',
        realName: '姓名',
        username: '用户名',
        workNo: '工号',
        phone: '手机号',
        email: '邮箱',
        state: 100,
        stateDesc: '启用中',
        avatarUrl: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
        title: '职位',
        roleList: ['user']
      }
    }
  }
}
</script>

<style>
.user-info-container {
  max-width: 1600px;
  margin: 10px auto;
}

</style>
