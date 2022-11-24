<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col v-for="item in baseInfoData" :key="item.label" :span="12" class="label-value">
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              <i :class="item.frontIcon" />
              {{ item.value ? item.value : '-' }}
            </span>
          </el-col>
        </el-row>
      </section>
      <header>
        <div class="card-title left-header">
          <span>任务配置</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col v-for="item in baseInfoData1" :key="item.label" :span="12" class="label-value">
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              <i :class="item.frontIcon" />
              {{ item.value ? item.value : '-' }}
              {{ item.unit }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <div class="containerGroup">
      <div class="card-title left-header">
        <span>容器</span>
      </div>
      <div class="container-header">
        <span>{{ name }}</span>
      </div>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col v-for="item in deployInfoData" :key="item.label" :span="12" class="label-value">
            <span style="font-size: 14px">{{ item.label }}</span>: &nbsp;&nbsp;
            <div v-if="item.type === 'mulList'" style="display: inline-block">
              <span v-for="n in item.value" :key="n.index" style="font-size: 14px">
                <i
                  :class="{
                    [n.frontIcon]: true,
                    'primary-text': true,
                    'primary2-text': n.label === 'CPU'
                  }"
                />
                {{ n.label ? n.label : '-' }}
                {{ n.company ? n.company : '' }}
              </span>
            </div>
            <span v-else style="font-size: 14px">
              {{ item.value ? item.value : '-' }}
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" />
            </span>
          </el-col>
        </el-row>
        <div class="button-log">
          <el-popover placement="right" trigger="click">
            <div class="container-popover">
              <p class="groupTitle">容器组</p>
              <p v-for="con in containerList" :key="con.value">
                {{ con.label }}
              </p>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-timer">日志</el-button>
          </el-popover>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseInfoData: [
        {
          label: '任务状态',
          frontIcon: 'el-icon-success',
          value: '执行成功'
        },
        {
          label: '创建时间',
          value: '2022-11-02 16:32:58'
        },
        {
          label: '任务作业',
          value: '执行中-/成功1/失败5'
        },
        {
          label: '所属定时任务',
          value: ''
        }
      ],
      baseInfoData1: [
        {
          label: '计划成功次数',
          value: '1'
        },
        {
          label: '最大并行次数',
          value: '2'
        },
        {
          label: '失败重试次数',
          value: '3'
        },
        {
          label: '任务超时时间',
          value: '',
          unit: '秒'
        }
      ],
      deployInfoData: [
        {
          label: '镜像',
          value: 'nginx:latest'
        },

        {
          label: '资源限制',
          type: 'mulList',
          value: [
            {
              label: '不限制',
              frontIcon: 'el-icon-cpu'
            },
            {
              label: '不限制',
              frontIcon: 'el-icon-bank-card'
            }
          ]
        },
        {
          label: '启动命令',
          value: ''
        },
        {
          label: '参数',
          value: ''
        },
        {
          label: '停止前执行',
          value: ''
        }
      ],
      containerList: [
        {
          label: '123',
          value: '123'
        },
        {
          label: '234',
          value: '234'
        }
      ]
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
.base-info {
  margin-top: 20px;
}
.component-div {
  position: relative;
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  font-size: $font-size-14;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
}
.containerGroup {
  background-color: #fff;
  padding: 20px 20px;

  span {
    font-size: 20px;
    font-weight: 500;
  }
  .container-header {
    margin-top: 20px;
    background-color: #eee;
    span {
      display: inline-block;
      width: 200px;
      background-color: #fff;
      padding: 10px 10px;
      border-top: 3px solid #1890ff;
      text-align: center;
    }
  }
  .button-log {
    position: absolute;
    top: 0;
    right: 0;
  }
  .container-popover {
    .title {
      border-bottom: 1px solid $border-color-one;
      padding-bottom: 5px;
    }
    p {
      margin: 2px 0;
      line-height: $line-height-22;
      cursor: pointer;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
