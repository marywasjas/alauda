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
          <span>规则</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="ruleData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in ruleColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'url'" class="cursor-pointer">
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
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>证书</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="certiData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in certiColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              {{ scope.row[col.id] }}
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import { ruleColumnList, ruleData, certiColumnList, certiData } from './constant/index'
export default {
  name: 'BaseInfo',
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '显示名称',
          value: 'hhh'
        },
        {
          label: '所属应用',
          value: ''
        },
        {
          label: '标签',
          value: ''
        },
        {
          label: '所用负载均衡',
          value: '无'
        },
        {
          label: '创建人',
          value: 'admin@cpaas.io'
        },
        {
          label: '创建时间',
          value: '2022-09-28 16:06:17'
        },
        {
          label: '更新时间',
          value: '2022-09-28 16:05:55'
        }
      ],
      configData: [
        {
          label: '虚拟 IP',
          value: '10.4.52.209'
        },
        {
          label: '会话保持',
          value: '否'
        },
        {
          label: 'lb',
          value: '111111'
        }
      ],
      filterContainer: '',
      ruleColumnList,
      ruleData,
      certiColumnList,
      certiData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleRefresh() {
      console.log('resfresh container list')
    },
    handleFilter() {
      console.log('search container')
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
