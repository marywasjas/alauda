<template>
  <div class="container-group">
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span />
          <div>
            <el-input
              v-model="filterName"
              placeholder="请输入名称或容器组 IP"
              size="small"
              style="width: 300px"
            >
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
            <el-button icon="el-icon-refresh-right" size="small" class="margin-left10" />
          </div>
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
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
export default {
  name: 'ContainerGroup',
  components: {},
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      filterName: ''
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
.container-group {
  margin-top: 20px;
}
</style>
