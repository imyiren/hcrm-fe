<template>
  <div class="user-info-container">
    <el-descriptions class="margin-top" title="账户基础信息" :column="3" :size="size" border colon>
      <template slot="extra">
        <el-button type="primary" size="small" plain>编辑</el-button>
        <el-button type="primary" size="small" plain>修改密码</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user"></i>用户名</template>kooriookami</el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-mobile-phone"></i>手机号</template>18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-location-outline"></i>居住地</template>苏州市</el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-tickets"></i>备注</template><el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i class="el-icon-office-building"></i>联系地址</template>江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: ''
    }
  }
}
</script>

<style>
.user-info-container {
  margin: 10px;
}
</style>
