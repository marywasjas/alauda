<template>
  <div>
    <div class="event-head">
      <div>
        <span>资源类型:</span>
        <el-select v-model="value" style="width: 400px" filterable placeholder="默认为全部">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <span style="margin-left: 10px">事件原因:</span>
        <el-select v-model="value" style="width: 400px" filterable placeholder="默认为全部">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div style="margin-top: 10px">
        <span>资源名称:</span>
        <el-select
          v-model="value"
          style="width: 1250px; margin-right: 10px"
          filterable
          placeholder="可输可选，按回车确定，支持添加多个资源名称"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <div class="event-container" />
  </div>
</template>

<script>
export default {
  name: 'Event',
  components: {},
  props: {},
  data() {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: 'Pod'
        },
        {
          value: '选项2',
          label: 'Deployment'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.event-head {
  padding: 10px 10px;
  margin-bottom: 15px;
  background-color: #fff;

  span {
    margin-right: 5px;
    font-size: 15px;
  }
}
.event-container {
  background-color: #fff;
}
</style>
