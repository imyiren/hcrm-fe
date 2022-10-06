<template>
  <div class="user-info-container">
    <el-descriptions class="margin-top" title="账户基础信息" :column="3" :size="size" border colon>
      <template slot="extra">
        <el-button type="primary" size="small" plain @click="editUserPasswordVisible= true">修改密码</el-button>
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
          size="small"
        >{{ user.stateDesc }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      title="修改密码"
      :visible.sync="editUserPasswordVisible"
      width="50%"
      center
    >
      <UserPassword :user-password="editUserPassword" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditUserPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserPassword from '@/views/user/info/UserPassword'
import { savePassword } from '@/api/uop'

export default {
  components: {
    UserPassword
  },
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
      editUserPasswordVisible: false,
      size: '',
      editUserPassword: {
        id: undefined,
        password: undefined,
        firstPassword: undefined,
        secondPassword: undefined
      },
      user: {
        id: undefined,
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
  },
  methods: {
    confirmEditUserPassword() {
      if (this.editUserPassword.password === this.editUserPassword.secondPassword) {
        this.$message.error('新密码和旧密码不能一样。')
        return
      }
      if (this.editUserPassword.firstPassword !== this.editUserPassword.secondPassword) {
        this.$message.error('修改和确认密码不一致。')
        return
      }
      if (this.editUserPassword.password === '' || this.editUserPassword.password === null || this.editUserPassword.password === undefined ||
        this.editUserPassword.firstPassword === '' || this.editUserPassword.firstPassword === null || this.editUserPassword.firstPassword === undefined
      ) {
        this.$message.error('密码不能为空。')
        return
      }
      if (this.user.id === '' || this.user.id === null || this.user.id === undefined) {
        this.$message.error('用户信息不完整，无法修改密码。')
        return
      }
      const savePasswordData = {
        id: this.user.id,
        password: this.editUserPassword.password,
        newPassword: this.editUserPassword.firstPassword
      }
      savePassword(savePasswordData).then(res => {
        this.$message.success('密码修改成功')
        this.editUserPasswordVisible = false
      }).finally(() => {
        this.editUserPassword = {}
      })
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
