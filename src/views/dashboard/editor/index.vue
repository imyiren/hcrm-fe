<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name"> {{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">你好，当前时间是: {{ currentTimeStr }}</span>
      </div>
      <h2>又是愉快上班的一天！加油哦～</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import { parseTime } from '@/utils'

export default {
  name: 'DashboardUser',
  components: { PanThumb },
  data() {
    return {
      currentTimeStr: '',
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'title'
    ])
  },
  mounted() {
    const _this = this
    this.timer = setInterval(() => {
      _this.currentTimeStr = _this.getTimeStr() // 修改数据date
    }, 1000)
  },
  methods: {
    getTimeStr() {
      return parseTime(new Date(), null)
    }
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
