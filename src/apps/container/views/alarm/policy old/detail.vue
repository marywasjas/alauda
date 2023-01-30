<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header :name="name" :desc="desc" :tab-list="tabList" :active-name="activeName" @changeActive="changeActive">
        <template v-slot:headerRight>
          <el-dropdown>
            <el-button
              type="primary"
              class="margin-left10"
            >操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate">更新</el-dropdown-item>
              <el-dropdown-item @click.native="handlesSilence">设置静默</el-dropdown-item>
              <el-dropdown-item @click.native="handelDelete">删除告警策略</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />
    <set-silence-dialog :visible="visible" :current-obj="currentObj" @closeDialog="closeDialog" @submitForm="submitForm" />
  </div>
</template>

<script>
import TabHeader from '@/apps/container/views/components/TabHeader'
import BaseInfo from './components/BaseInfo/BaseInfo.vue'
import AlarmHistory from './components/AlarmHistory.vue'
import SetSilenceDialog from './components/SetSilenceDialog.vue'

export default {
  name: 'Detail',
  components: {
    TabHeader,
    BaseInfo,
    AlarmHistory,
    SetSilenceDialog
  },
  data() {
    return {
      name: '',
      desc: '',
      tabList: [
        {
          label: '详细信息',
          name: 'baseInfo',
          com: 'BaseInfo'
        },
        {
          label: '告警历史',
          name: 'alarmHistory',
          com: 'AlarmHistory'
        }
      ],
      activeName: '',
      visible: false,
      currentObj: {}
    }
  },
  computed: {
    comName: function() {
      if (!this.activeName) return ''
      const item = this.tabList.filter(el => el.name === this.activeName)
      return item[0].com
    }
  },
  created() {
    this.name = this.$route.query.name
    this.activeName = this.tabList[0].name
  },
  methods: {

    changeActive(value) {
      this.activeName = value
    },
    handleUpdate() {
      this.$router.push({
        name: 'AlarmCreate',
        query: {
          name: this.name
        }
      })
    },
    // 设置静默
    handlesSilence() {
      this.currentObj = {
        name: this.name
      }
      this.visible = true
    },
    submitForm(form) {
      console.log(form)
      this.visible = false
    },
    closeDialog() {
      this.visible = false
    },
    handelDelete() {
      const returnMsgList = [
        `确定删除告警策略${this.name}吗？`,
        `删除后不可恢复。`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已删除'
        })
        this.$router.go(-1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>
