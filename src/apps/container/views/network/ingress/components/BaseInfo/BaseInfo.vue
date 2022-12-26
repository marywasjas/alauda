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
              <span @click="editTag">
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
                <span @click="handelDetails(scope.row)">{{ scope.row[col.id] }}</span>
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
    <!-- 更新标签 -->
    <update-labels-dialog :update-labels-visible.sync="updateLabelsVisible" title="更新标签" />
  </div>
</template>

<script>
import { ruleColumnList, ruleData, certiColumnList, certiData } from './constant/index'
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
          value: 'hhh'
        },
        {
          label: '所属应用',
          value: ''
        },
        {
          label: '标签',
          value: []
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
      certiData,
      updateLabelsVisible: false,
      tagSelector: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelDetails(row) {
      this.$router.push({
        name: 'ServiceDetail',
        query: {
          name: row.url
        }
      })
    },
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
