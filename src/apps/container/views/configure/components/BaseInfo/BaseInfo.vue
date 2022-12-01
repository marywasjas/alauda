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
              <i :class="item.afterIcon" @click="handelLabels" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>配置项</span>
          <el-dropdown
            split-button
            type="primary"
            trigger="click"
            @click="handleAddConfig"
          >
            添加配置项
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="handleAddBinary"
              >添加二进制配置项</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <section class="config-div">
        <div class="config-left">
          <el-input
            v-model="filterName"
            placeholder="按名称过滤"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
          <div class="margin-top">
            <div v-for="cell in itemList" :key="cell.key" class="item-cell hover-div">{{ cell.label }}</div>
          </div>
        </div>
        <div class="config-right">
          <el-collapse>
            <el-collapse-item v-for="cell in itemList" :key="cell.key">
              <template slot="title" class="flex-center">
                {{ cell.label }}
                <i class="el-icon-edit margin-left10" />
                <i class="el-icon-delete margin-left10" />
              </template>
              <div class="cell-context">{{ cell.value }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </section>
    </BaseCard>
    <!-- 更新标签 -->
    <update-labels-dialog :update-labels-visible.sync="updateLabelsVisible" />
  </div>
</template>

<script>
import UpdateLabelsDialog from '@/apps/container/views/components/UpdateLabelsDialog'
export default {
  name: 'BaseInfo',
  components: { UpdateLabelsDialog },
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '显示名称',
          value: '期望的群无'
        },
        {
          label: '所属应用',
          value: 'ewrwer'
        },
        {
          label: '标签',
          value: '',
          afterIcon: 'el-icon-edit'
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
      updateLabelsVisible: false,
      filterName: '',
      itemList: [
        {
          label: 'cat',
          key: '1',
          value: 'aksnasdas,dkaskmd,asd,asndasdas'
        },
        {
          label: 'namespace',
          key: '2',
          value: 'qdkasnallksnaldknaldkajsdlasd'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelLabels() {
      this.updateLabelsVisible = true
    },
    handleAddConfig() {

    },
    handleAddBinary() {

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
.config-div{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-top: 20px;
  .config-left{
    width:230px;
    .item-cell{
      padding: 8px;
      cursor: pointer;
    }
  }
  .config-right{
    flex:1;
    margin-left: 20px;
    i{
      color: $color-primary;
    }
    .cell-context{
      border: none;
      padding: 8px;
      box-sizing: border-box;
      line-height: $line-height-20;
      background-color: $background-color2;
      border-radius: $border-radius-l;
    }
  }
}
</style>
