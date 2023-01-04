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
            </span>
          </el-col>
        </el-row>
      </section>
      <header>
        <div class="card-title left-header" style="margin-bottom: 20px">
          <span>容器组标签</span>
        </div>
      </header>
      <section>
        <el-tag v-for="tag in containerGroupLabels" :key="tag.name" type="info" style="margin-right: 10px">
          {{ tag.name }}:{{ tag.value }}
        </el-tag>
      </section>
      <header>
        <div class="card-title left-header" style="margin: 20px 0">
          <span>容器组注解</span>
        </div>
      </header>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle">
        <el-table-column prop="key" label="键" />
        <el-table-column prop="value" label="值" />
      </el-table>
      <header>
        <div class="card-title left-header" style="margin: 20px 0">
          <span>主机选择器</span>
        </div>
      </header>
      <el-button
        v-if="storageVolumeInfoVisible"
        round
        size="mini"
        style="color: #1890ff; margin-bottom: 10px"
        @click="openStorageVolumeInfo"
      >存储卷<i
        class="el-icon-d-arrow-right"
      /></el-button>
      <div
        v-if="infoStorageVolumeVisible"
        class="detail-center-table"
        style="position: relative; border: 1px solid #1890ff; padding: 30px"
      >
        <el-table :data="storageVolumeInfoData" style="width: 100%" header-row-class-name="headerStyle">
          <el-table-column prop="storageVolumeName" label="名称" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="configuration" label="相关配置" />
        </el-table>
        <el-button
          style="position: absolute; bottom: -15px; left: 0"
          class="table-button"
          round
          type="primary"
          size="mini"
          @click="closeStorageVolumeInfo"
        >存储卷 <i
          class="el-icon-d-arrow-right"
          style="transform: rotate(-90deg)"
        /></el-button>
      </div>
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
      // 容器组标签
      containerGroupLabels: [
        { name: 'app', value: 'chaosblade - box' },
        { name: 'app', value: 'chaosblade - box' },
        { name: 'app', value: 'chaosblade - box' },
        { name: 'app', value: 'chaosblade - box' },
        { name: 'app', value: 'chaosblade - box' }
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
      tableData1,
      // 容器组注解
      tableData: [
        { key: 'djdjdjddjskk', value: 'jdjjdjdjdj' },
        { key: 'djdjdjddjskk', value: 'jdjjdjdjdj' },
        { key: 'djdjdjddjskk', value: 'jdjjdjdjdj' }
      ],
      // 存储卷
      storageVolumeInfoData: [
        {
          storageVolumeName: 'hosts',
          type: '主机路径',
          configuration: '/var/run/docker'
        },
        {
          storageVolumeName: 'hosts',
          type: '主机路径',
          configuration: '/var/run/docker'
        }
      ],
      infoStorageVolumeVisible: false,
      storageVolumeInfoVisible: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openStorageVolumeInfo() {
      this.infoStorageVolumeVisible = true
      this.storageVolumeInfoVisible = false
    },
    closeStorageVolumeInfo() {
      this.infoStorageVolumeVisible = false
      this.storageVolumeInfoVisible = true
    }
  }
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
