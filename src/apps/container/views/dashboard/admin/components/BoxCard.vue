<template>
  <div class="box-card-component">
    <div v-for="data in dataList" :key="data.name" class="progress-item">
      <span>{{ data.name }}</span>
      <el-tooltip
        class="item"
        effect="dark"
        placement="top"
      >
        <div slot="content" class="tooltip-div">
          <div>{{ data.name }}</div>
          <div>使用率：{{ data.percent }}%</div>
          <div class="sign-div">
            <span />
            已使用：{{ data.ysy }}
          </div>
          <div class="sign-div zpe-div">
            <span />
            总配额：{{ data.zpe }}
          </div>
        </div>
        <el-progress :percentage="data.percent" :show-text="false" :stroke-width="10" />
      </el-tooltip>
      <span>{{ data.description }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      dataList: [
        {
          name: 'CPU',
          percent: 10,
          description: '0.5/5核',
          ysy: '0.5核',
          zpe: '5核'
        },
        {
          name: '内存',
          percent: 10,
          description: '0.5/5Gi',
          ysy: '0.5Gi',
          zpe: '5Gi'
        },
        {
          name: '存储',
          percent: 0,
          description: '0.5/5Gi',
          ysy: '0.5Gi',
          zpe: '5Gi'
        },
        {
          name: 'Pods数',
          percent: 0.2,
          description: '1/不限制(512)个',
          ysy: '1个',
          zpe: '不限制(512)个'
        },
        {
          name: 'PVC数',
          percent: 0,
          description: '0/不限制 个',
          ysy: '0',
          zpe: '不限制'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
.box-card-component {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
  box-sizing: border-box;
  .progress-item {
    margin-bottom: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .el-progress {
      flex: 1;
      margin: 0 10px;
    }
  }
}
.tooltip-div{
  >div{
    line-height: 1.5;
  }
}
.sign-div{
  span{
    display:inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background:$color-primary;
    margin-right: 3px;
  }
}
.zpe-div{
  span{
    background:$icon-color;
  }
}
</style>
