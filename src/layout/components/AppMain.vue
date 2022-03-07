<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    // const can = document.getElementById('water')
    // can.style.display = 'none'
    // const body = document.body
    // body.appendChild(can)
    // can.height = 150
    // can.width = 150
    // const ctx = can.getContext('2d')
    // ctx.font = '16px Arial'
    // ctx.fillStyle = '#999'
    // ctx.fillText('code', 10, 10)
    // body.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  },
  methods: {
  }
}
</script>

<style scoped>
.water-background {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
