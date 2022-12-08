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
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              <i :class="item.frontIcon" />
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>部署 (1个)</span>
          <el-input
            v-model="filterName"
            placeholder="按名称过滤"
            size="small"
            style="width: 300px"
          />
        </div>
      </header>
      <section>
        <div class="resource__header">
          <div class="resource__header__front">
            <span @click="handelDetails('nginx-nginx')">nginx-nginx</span>
          </div>
          <div class="resource__header__last">
            <div class="last-label label-value">
              <span>状态</span>:
              <span>
                <i class="el-icon-video-pause" />
                已停止(0/0)
              </span>
            </div>
            <div class="chart-div">
              <workload-status :number="number" @changeNumber="changeNumber" />
            </div>
          </div>
        </div>
        <div>
          <div
            v-for="el in deployInfoList"
            :key="el.id"
            class="resource__content"
          >
            <div class="flex-end">
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
                <el-button
                  slot="reference"
                  type="text"
                  icon="el-icon-receiving"
                >EXEC</el-button>
              </el-popover>
              <el-popover placement="right" trigger="click">
                <div class="container-popover">
                  <p class="groupTitle">容器组</p>
                  <p v-for="con in containerList" :key="con.value">
                    {{ con.label }}
                  </p>
                </div>
                <el-button
                  slot="reference"
                  type="text"
                  icon="el-icon-timer"
                >日志</el-button>
              </el-popover>
            </div>
            <el-row :gutter="24">
              <el-col
                v-for="item in el.deployInfoData"
                :key="item.label"
                :span="12"
                class="label-value"
              >
                <span>{{ item.label }}</span>: &nbsp;&nbsp;
                <div
                  v-if="item.type === 'mulList'"
                  style="display: inline-block"
                >
                  <span v-for="n in item.value" :key="n.label">
                    <i
                      :class="{
                        [n.frontIcon]: true,
                        'primary-text': true,
                        'primary2-text': n.label === 'CPU',
                      }"
                    />
                    {{ n.value ? n.value : "-" }}
                    {{ n.company ? n.company : "" }}
                  </span>
                  <i
                    :class="item.afterIcon"
                    class="cursor-pointer margin-left10"
                    @click="openDialog(item)"
                  />
                </div>
                <span v-else>
                  {{ item.value ? item.value : "-" }}
                  <i
                    :class="item.afterIcon"
                    class="cursor-pointer margin-left10"
                    @click="openDialog(item)"
                  />
                </span>
              </el-col>
            </el-row>
            <div />
          </div>
        </div>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>其他资源 (0个)</span>
          <el-input
            v-model="filterResourceName"
            placeholder="按名称过滤"
            size="small"
            style="width: 300px"
          />
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                {{ scope.row[col.id] }}
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <!-- 更新资源限制 弹窗 -->
    <resources-image :dialog-title="dialogTitle" :resource-visible="resourceVisible" @closeResourceDialog="closeResourceDialog" @submitResourceDialog="submitResourceDialog" />
  </div>
</template>

<script>
import WorkloadStatus from '@/apps/container/views/components/WorkloadStatus'
import { tableColumnList, tableData } from './constant/index'
import ResourcesImage from '@/apps/container/views/components/ResourcesImage'
export default {
  name: 'BaseInfo',
  components: { WorkloadStatus, ResourcesImage },
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '状态',
          frontIcon: 'el-icon-video-pause',
          value: '已停止(0/1)'
        },
        {
          label: '创建时间',
          value: '2022-11-02 16:32:58'
        },
        {
          label: '访问地址',
          value: ''
        },
        {
          label: '启动耗时',
          value: ''
        },
        {
          label: '停止耗时',
          value: ''
        }
      ],
      filterName: '',
      number: 5,
      deployInfoList: [
        {
          id: '1',
          deployInfoData: [
            {
              label: '容器',
              value: 'nginx'
            },
            {
              label: '资源限制',
              afterIcon: 'el-icon-edit',
              type: 'mulList',
              value: [
                {
                  label: 'CPU',
                  frontIcon: 'el-icon-cpu',
                  value: 1,
                  company: '核'
                },
                {
                  label: '内存',
                  frontIcon: 'el-icon-bank-card',
                  value: 512,
                  company: 'Mi'
                }
              ]
            },
            {
              label: '启动耗时',
              value: ''
            },
            {
              label: '停止耗时',
              value: ''
            },
            {
              label: '镜像',
              afterIcon: 'el-icon-edit',
              value: 'nginx:latest'
            }
          ]
        },
        {
          id: '2',
          deployInfoData: [
            {
              label: '容器',
              value: 'nginx'
            },
            {
              label: '资源限制',
              type: 'mulList',
              value: [
                {
                  label: 'CPU',
                  value: 1,
                  company: '核'
                },
                {
                  label: '内存',
                  value: 512,
                  company: 'Mi'
                }
              ]
            },
            {
              label: '启动耗时',
              value: ''
            },
            {
              label: '停止耗时',
              value: ''
            },
            {
              label: '镜像',
              value: 'nginx:latest'
            }
          ]
        }
      ],
      filterResourceName: '',
      tableColumnList,
      tableData,
      // 更新资源限制
      dialogTitle: '',
      resourceVisible: false,
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
  methods: {
    handelDetails(name) {
      this.$router.push({
        name: 'DeployDetail',
        query: {
          link_name: name
        }
      })
    },
    changeNumber(val) {
      this.number = Number(val)
    },
    openDialog(item) {
      console.log(item)
      if (item.label === '资源限制') {
        this.dialogTitle = `更新资源限制`
        this.resourceVisible = true
        this.resourceForm = {
          name: 'nginx',
          cpu: 1,
          cpuCompony: '核',
          memory: 512,
          memoryCompony: 'Mi'
        }
      } else {
        this.dialogTitle = `更新镜像版本`
        this.resourceVisible = true
        this.resourceForm = {
          name: 'nginx',
          cpu: null,
          cpuCompony: '',
          memory: null,
          memoryCompony: '',
          monitor: 'nginx',
          version: 'latest'
        }
      }
    },
    closeResourceDialog() {
      this.resourceVisible = false
    },
    submitResourceDialog(val) {
      console.log(this.resourceForm)
      this.resourceVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
}
.resource__header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  > div {
    width: 100%;
    box-sizing: border-box;
  }
  .label-value {
    margin-bottom: 0;
  }
  .resource__header__front {
    span {
      color: $color-primary;
      cursor: pointer;
      font-size: $font-size-16;
    }
  }
  .resource__header__last {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .last-label {
      flex: 1;
    }
    .chart-div {
      width: 250px;
    }
  }
}
.resource__content {
  margin-top: 12px;
  padding: 8px 8px 0 8px;
  background: $background-color;
  .el-row {
    padding: 0 20px;
  }
}
.container-popover{
  .title{
    border-bottom: 1px solid $border-color-one;
    padding-bottom: 5px;
  }
  p{
    margin: 2px 0;
    line-height: $line-height-22;
    cursor: pointer;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
