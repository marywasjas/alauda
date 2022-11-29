<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="flex-center inTable-desc">
                <p>容器：qweqwe</p>
                <el-button size="small" type="primary" @click="handelConfig(scope.row)">加载配置</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
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
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
export default {
  name: 'CalculationComponent',
  components: { },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelConfig(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}

</style>
