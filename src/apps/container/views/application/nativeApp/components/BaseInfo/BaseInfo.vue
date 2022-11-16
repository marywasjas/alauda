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
            <span>nginx-nginx</span>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="resourceVisible"
      width="840px"
      :before-close="closeResourceDialog"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="resourceForm"
          :model="resourceForm"
          :rules="resourceRules"
          class="form-inline"
          label-suffix=":"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="容器名称" prop="name">
            {{ resourceForm.name }}
          </el-form-item>
          <div v-if="dialogTitle === `更新资源限制`" class="flex-center">
            <el-form-item label="资源限制" prop="cpu" style="margin-bottom: 0">
              <el-input v-model="resourceForm.cpu" placeholder="请输入CPU限制">
                <template slot="prepend">CPU</template>
                <el-select
                  slot="append"
                  v-model="resourceForm.cpuCompony"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="核" value="核" />
                  <el-option label="m" value="m" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item
              label=""
              prop="memory"
              style="margin-bottom: 0"
              label-width="10px"
            >
              <el-input
                v-model="resourceForm.memory"
                placeholder="请输入CPU限制"
              >
                <template slot="prepend">内存</template>
                <el-select
                  slot="append"
                  v-model="resourceForm.memoryCompony"
                  placeholder="请选择"
                  style="width: 80px"
                >
                  <el-option label="Mi" value="Mi" />
                  <el-option label="Gi" value="Gi" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-tooltip
              class="item"
              effect="dark"
              content="容器的限制值，限制容器实例运行过程中， 最多可使用的节点计算资源值。"
              placement="top"
            >
              <i
                class="el-icon-question question-icon margin-left10"
              />
            </el-tooltip>
          </div>
          <el-form-item
            v-if="dialogTitle === `更新镜像版本`"
            label="镜像地址"
            prop="monitor"
          >
            {{ resourceForm.monitor }}
          </el-form-item>
          <el-form-item
            v-if="dialogTitle === `更新镜像版本`"
            label="镜像版本"
            prop="version"
            style="margin-bottom: 0"
          >
            <el-input
              v-model="resourceForm.version"
              placeholder="请输入镜像版本"
            /></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitResourceDialog">更新</el-button>
        <el-button @click="closeResourceDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WorkloadStatus from '@/apps/container/views/components/WorkloadStatus'
import { tableColumnList, tableData } from './constant/index'
export default {
  name: 'BaseInfo',
  components: { WorkloadStatus },
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
      resourceForm: {
        name: 'nginx',
        cpu: '',
        cpuCompony: '',
        memory: '',
        memoryCompony: '',
        monitor: '',
        version: ''
      },
      resourceRules: {
        cpu: [{ required: true, message: '请输入CPU限制', trigger: 'blur' }],
        cpuCompony: [
          { required: true, message: '请选择CPU单位', trigger: 'change' }
        ],
        memory: [
          { required: true, message: '请输入内存限制', trigger: 'blur' }
        ],
        memoryCompony: [
          { required: true, message: '请选择内存单位', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请输入镜像版本', trigger: 'blur' }
        ]
      },
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
    submitResourceDialog() {
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {
          console.log(this.resourceForm)
          this.resourceVisible = false
        } else {
          return false
        }
      })
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
