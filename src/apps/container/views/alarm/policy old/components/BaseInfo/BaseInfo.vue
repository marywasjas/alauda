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
            <span v-if="item.label=='关联资源'" class="cursor-pointer" @click="handleResource">
              <i class="el-icon-document-copy" />
              <span>
                {{ item.value }}
              </span>
            </span>
            <span v-else>
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
          <span>告警规则</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="portData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="container-top-right">
                <div class="text-right">
                  <el-select
                    v-model="scope.row.filterTime"
                    filterable
                    placeholder="请选择"
                    size="mini"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                    <el-option
                      v-for="item in timeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <line-chart :chart-data="scope.row.containerLineData" :show-total="false" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="col in portColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'level'">
                <el-tag type="danger">{{ scope.row[col.id] }}</el-tag>
              </div>
              <div v-else-if="col.id === 'status'">
                <i class="el-icon-message-solid running" />
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'isEnable'">
                <el-switch v-model="scope.row[col.id]" @change="changeIsEnable(scope.row)" />
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>策略配置</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in configData"
            :key="item.label"
            :span="24"
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
  </div>
</template>

<script>
import { portColumnList, portData } from './constant/index'
import LineChart from '@/apps/container/views/components/LineChart'

export default {
  name: 'BaseInfo',
  components: { LineChart },
  props: {},
  data() {
    return {
      name: '',
      baseInfoData: [
        {
          label: '名称',
          value: 'hhh'
        },
        {
          label: '显示名称',
          value: 'hhh'
        },
        {
          label: '关联资源',
          value: 'test'
        },
        {
          label: '策略命名空间',
          value: 'chaos-dev'
        },
        {
          label: '创建时间',
          value: '2022-12-16 17:23:34'
        },
        {
          label: '更新时间',
          value: '2022-12-16 17:23:34'
        },
        {
          label: '描述',
          value: ''
        }
      ],
      configData: [
        {
          label: '通知策略',
          value: ''
        },
        {
          label: '告警发送间隔',
          value: '全局（灾难告警5分钟，严重告警15分钟，警告告警10分钟，提示告警20分钟）'
        }
      ],
      filterContainer: '',
      portColumnList,
      portData,
      timeOptions: [
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
        },
        {
          value: '近 12 小时',
          label: '近 12 小时'
        },
        {
          value: '近 1 天',
          label: '近 1 天'
        },
        {
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.name = this.$route.query.name
  },
  mounted() {},
  methods: {
    changeIsEnable(row) {
      const str = row.isEnable ? '关闭' : '开启'
      const returnMsgList = [
        `确定${str}${row.rule}规则吗？`
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `已${str}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleResource() {
      this.$router.push({
        name: 'DeployDetail',
        query: {
          link_name: this.name
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
.headerStyle {
  height: 36px;
}
.el-form-item {
  margin-bottom: 0px;
  line-height: 36px;
}
.hover-div{
  height: 36px;
  line-height: 36px;
}
.hover-div:hover{
  background:$color-primary-rgba1;
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select{
    margin-bottom: 20px;
  }
  .chart{
    height: 200px !important;
  }
}
</style>
