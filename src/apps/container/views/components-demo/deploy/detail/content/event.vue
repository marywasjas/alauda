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
          style="width: 1000px; margin-right: 10px"
          filterable
          placeholder="可输可选，按回车确定，支持添加多个资源名称"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <div class="event-container">
      <div class="flex-center">
        <span>共10条</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Event',
  components: {},
  props: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '近30分钟',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 0.5)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近1小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近3小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近6小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近12小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 12)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近1天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近3天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
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
  padding: 20px 10px;
  background-color: #fff;
}
</style>
