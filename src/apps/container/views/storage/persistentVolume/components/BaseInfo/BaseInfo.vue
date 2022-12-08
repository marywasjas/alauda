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
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="handelLabels(item.label)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>配置信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in configInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="handelLabels" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>存储用量</span>
        </div>
      </header>
      <section class="component-div">
        <line-alert :content="content" />
        <div class="container-top flexbox">
          <div class="container-top-left">
            <radius-pie-chart :chart-data="containerData" title="使用率" />
          </div>
          <div class="container-top-right">
            <div class="text-right">
              <el-select
                v-model="containerTime"
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
            <line-chart :chart-data="containerLineData" :show-total="false" />
          </div>
        </div>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>关联资源</span>
        </div>
      </header>
      <section class="component-div">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
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
    <!-- 更新标签 -->
    <update-labels-dialog :update-labels-visible.sync="updateLabelsVisible" :title="dialogTitle" />
  </div>
</template>

<script>
import UpdateLabelsDialog from '@/apps/container/views/components/UpdateLabelsDialog'
import LineAlert from '@/apps/container/views/components/LineAlert'
import { tableData, tableColumnList, containerLineData, containerData } from './constant/index'
import LineChart from '@/apps/container/views/components/LineChart'
import RadiusPieChart from '@/apps/container/views/components/RadiusPieChart'

export default {
  name: 'BaseInfo',
  components: { UpdateLabelsDialog, LineAlert, LineChart, RadiusPieChart },
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '状态',
          value: '期望的群无'
        },
        {
          label: '标签',
          value: '',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '注释',
          value: 'ewrwer',
          afterIcon: 'el-icon-edit'
        },
        {
          label: '选择器',
          value: 'ewrwer'
        },
        {
          label: '创建人',
          value: ''
        },
        {
          label: '创建时间',
          value: ''
        },
        {
          label: '更新时间',
          value: ''
        }
      ],
      configInfoData: [
        {
          label: '访问模式',
          value: '期望的群无'
        },
        {
          label: '容量',
          value: ''
        },
        {
          label: '卷模式',
          value: 'ewrwer'
        },
        {
          label: '存储类',
          value: 'ewrwer'
        },
        {
          label: '关联持久卷',
          value: ''
        }
      ],
      content: '用量数据仅供参考，仅支持采集已挂载的持久卷的存储用量数据，未挂载的持久卷无法采集',
      tableData,
      tableColumnList,
      containerLineData,
      containerData,
      updateLabelsVisible: false,
      dialogTitle: '更新标签',
      containerTime: '近 1 小时',
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
  created() {},
  mounted() {},
  methods: {
    handelLabels(title) {
      this.updateLabelsVisible = true
      this.dialogTitle = `更新${title}`
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
  i{
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display:flex;
  align-items:center;
  .chart{
    height: 200px !important;
  }
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
