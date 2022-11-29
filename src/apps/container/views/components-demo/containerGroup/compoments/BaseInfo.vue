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
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" @click="openDialog('更新资源限制')" />
            </div>
            <span v-else style="font-size: 14px">
              <i style="color: #1890ff" :class="item.frontIcon" />
              {{ item.value ? item.value : '-' }}
              <i style="color: #1890ff" :class="item.afterIcon" class="cursor-pointer" @click="handleUpdateLabels" />
            </span>
          </el-col>
        </el-row>
      </section>
      <header>
        <div class="card-title left-header" style="margin-bottom: 10px">
          <span>容器组标签</span>
        </div>
      </header>
      <section>
        <el-tag type="info" style="margin-right: 10px">app:chaosblade-box</el-tag>
        <el-tag type="info" style="margin-right: 10px">name:chaosblade-box</el-tag>
        <el-tag type="info" style="margin-right: 10px">pod:chaosblade-box</el-tag>
      </section>
    </BaseCard>

    <BaseCard>
      <div class="card-title left-header">
        <span>状态分析</span>
      </div>
      <section>
        <el-table
          class="margin-top"
          :data="tableData1.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column v-for="col in tableColumnList1" :key="col.id" :label="col.label">
            <!-- <template slot-scope="scope">{{scope.row[col]?scope.row[col]:'-'}}</template> -->
            <template slot-scope="scope">
              {{ scope.row[col.id] ? scope.row[col.id] : '-' }}
            </template>
          </el-table-column>
        </el-table>
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
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" @click="openDialog('更新资源限制')" />
            </div>
            <span v-else style="font-size: 14px">
              {{ item.value ? item.value : '-' }}
              <i :class="item.afterIcon" class="cursor-pointer margin-left10" @click="openDialog('更新镜像版本')" />
            </span>
          </el-col>
        </el-row>
        <div class="button-log">
          <el-popover placement="right" trigger="click">
            <div class="container-popover">
              <div class="title">全部容器组</div>
              <div>
                <p class="groupTitle">容器组</p>
                <p v-for="con in containerList" :key="con.value">
                  {{ con.label }}
                </p>
              </div>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-receiving">EXEC</el-button>
          </el-popover>
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
import { tableColumnList1, tableData1 } from '../index'

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
          label: '状态',
          frontIcon: 'el-icon-refresh',
          value: 'Running(4/8)'
        },
        {
          label: 'Host模式',
          value: '关闭'
        },
        {
          label: '资源限制',
          type: 'mulList',
          value: [
            {
              label: '2核',
              frontIcon: 'el-icon-cpu'
            },
            {
              label: '4Gi',
              frontIcon: 'el-icon-bank-card'
            }
          ]
        },
        {
          label: 'Service Account',
          value: 'chaosblade'
        },
        {
          label: '来源',
          value: 'chaosblade(部署)'
        },
        {
          label: '创建人',
          value: ''
        },
        {
          label: '容器组IP',
          value: ''
        },
        {
          label: '创建时间',
          value: ''
        },
        {
          label: '节点',
          value: '30秒'
        },
        {
          label: '镜像凭据',
          value: ''
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
          label: '就续',
          value: 'True'
        },
        {
          label: '重启次数',
          value: '0'
        },
        {
          label: '状态',
          value: 'running'
        },
        {
          label: '消息',
          value: ''
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
      ],
      tableColumnList1,
      tableData1
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
  position: relative;
  margin-top: 20px;
  .chart-div {
    width: 250px;
    position: absolute;
    top: 80px;
    right: 0;
  }
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
