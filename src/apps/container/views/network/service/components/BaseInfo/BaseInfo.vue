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
            <span v-if="item.label=='标签'">
              <span v-if="tagSelector.length>0">
                <el-tag v-for="el in tagSelector" :key="el.key" type="info" class="margin-right10">
                  {{ el.value }}
                </el-tag>
              </span>
              <span v-else>-</span>
              <span v-if="targetComponents=='标签选择器'" @click="editTag">
                <i class="el-icon-edit cursor-pointer margin-left10" />
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
          <span>端口</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="portData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in portColumnList"
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
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>配置信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in configData"
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
    <container-group-table title="容器组" />
    <!-- 更新标签 -->
    <update-labels-dialog :update-labels-visible.sync="updateLabelsVisible" title="更新标签" />
  </div>
</template>

<script>
import { portColumnList, portData } from './constant/index'
import ContainerGroupTable from '@/apps/container/views/components/ContainerGroupTable/ContainerGroup.vue'
import UpdateLabelsDialog from '@/apps/container/views/components/UpdateLabelsDialog'

export default {
  name: 'BaseInfo',
  components: { ContainerGroupTable, UpdateLabelsDialog },
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '显示名称',
          value: 'hhh'
        },
        {
          label: '来源',
          value: ''
        },
        {
          label: '标签',
          value: []
        },
        {
          label: '会话保持',
          value: '否'
        },
        {
          label: '计算组件',
          value: 'airm-c-anomaly-detecti-airm-c-anomaly-detecti'
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
      portColumnList,
      portData,
      targetComponents: '标签选择器',
      updateLabelsVisible: false,
      tagSelector: [
        { key: 'tag-1', value: 'test-1' },
        { key: 'tag-2', value: 'test-2' }
      ]
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
    },
    editTag() {
      this.updateLabelsVisible = true
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
</style>
