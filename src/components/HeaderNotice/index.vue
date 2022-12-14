<template>
  <div class="header-notice">
    <i class="el-icon-chat-dot-square icon" @click="openNotice" />
    <el-drawer
      :before-close="handleClose"
      :visible.sync="noticeDialog"
      direction="rtl"
      :append-to-body="true"
      :modal="false"
      width="80%"
    >
      <div slot="title" class="flex-center">
        <span>消息</span>
        <div>
          推送
          <el-switch v-model="isPushNot" />
        </div>
      </div>
      <div style="height:100%;">
        <div class="not-message">
          <div>
            <img :src="notMessage" alt="">
            <p>暂无消息</p>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import notMessage from '@/apps/container/assets/images/no-message.svg'
export default {
  name: 'HeaderNotice',
  data() {
    return {
      isPushNot: true,
      noticeDialog: false,
      notMessage
    }
  },
  computed: {
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    openNotice() {
      this.noticeDialog = true
    },
    handleClose(done) {
      this.noticeDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-notice {
  .icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}
.not-message{
  width: 100%;
  height: 100%;
  background:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align: center;
  img{
    width: 160px;
    height: 160px;
  }
}
</style>
