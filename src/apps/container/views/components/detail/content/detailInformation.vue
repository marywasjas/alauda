<template>
  <div class="detail">
    <div class="detail-header">
      <div style="font-weight: 700; font-size: 20px; margin-bottom: 10px; color: rgb(50, 52, 55)">基本信息</div>
      <div class="informations">
        <div>
          <span class="title">状态：</span>
          <i v-if="form.state === true" class="el-icon-success" style="color: #1890ff" />
          <i v-else class="el-icon-warning" />
          <span v-if="form.state === true">运行中</span>
          <span v-else>已停止</span>
        </div>
        <div>
          <span class="title">所属应用：</span><a style="color: #1890ff">{{ form.pod }}</a>
        </div>
        <div>
          <span class="title">标签：</span><span>{{ form.label }}</span>
        </div>
        <div>
          <span class="title">主机选择器：</span> <span>{{ form.hostSelector }}</span>
        </div>
        <div>
          <span class="title">更新策略：</span> <span>{{ form.updateStrategy }}</span>
        </div>
        <div>
          <span class="title">关闭宽限期：</span> <span>{{ form.closeGracePeriod }}</span>
        </div>
        <div>
          <span class="title">启动耗时：</span><span>{{ form.startupTime }}</span>
        </div>
        <div>
          <span class="title">停止耗时：</span><span>{{ form.stopTime }}</span>
        </div>
      </div>
    </div>
    <div class="detail-center">
      <div style="font-weight: 700; font-size: 20px; margin-bottom: 20px; color: rgb(50, 52, 55)">容器</div>
      <div style="height: 50px; background-color: #eee; margin-bottom: 30px">
        <div class="detail-center-container">kibana</div>
      </div>
      <div style="padding: 10px">
        <el-descriptions :column="2">
          <el-descriptions-item
            label="镜像"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >kooriookami</el-descriptions-item>
          <el-descriptions-item
            label="资源限制"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >18100000000</el-descriptions-item>
          <el-descriptions-item
            label="启动命令"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >苏州市</el-descriptions-item>
          <el-descriptions-item
            label="参数"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          />
          <el-descriptions-item
            label="停止前执行"
            :label-style="{ 'font-size': '16px', 'font-weight': '500' }"
            :content-style="{ 'font-size': '16px', 'font-weight': '500' }"
          >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="detail-footer">
      <div class="detail-footer-title">
        <div style="font-weight: 700; font-size: 20px; margin-bottom: 20px; color: rgb(50, 52, 55)">自动伸缩</div>
        <el-button type="primary" plain>更新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailInformation',
  components: {},
  props: {},
  data() {
    return {
      form: {
        state: true,
        pod: 'airm-c-anomaly-detecti',
        label1: '',
        hostSelector: '',
        updateStrategy: '滚动更新策略 ( 最大可超出数: 1, 最多不可用数: 1 )',
        closeGracePeriod: '30秒',
        startupTime: '',
        stopTime: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  background-color: rgb(240, 242, 245);
  border: 1px solid #eee;
  .detail-header {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    .title {
      color: rgb(50, 52, 55);
      font-size: 15px;
      font-weight: 700;
    }
    .informations {
      color: rgb(50, 52, 55);
      padding: 0 20px;
      line-height: 30px;
    }
  }
  .detail-center {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    .detail-center-container {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-top: 3px solid #1890ff;
      text-align: center;
      line-height: 50px;
      margin-bottom: 30px;
    }
  }
  .detail-footer {
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    // .detail-footer-title {
    //   display: flex;
    //   justify-content: space-between;
    //   height: 45px;
    //   padding-bottom: 10px;
    //   border-bottom: 1px solid #e4e7ed;
    // }
  }
}
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>
