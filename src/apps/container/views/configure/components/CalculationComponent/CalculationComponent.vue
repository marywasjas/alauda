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
    <execute-command-dialog :form-visible="formVisible" title="加载配置" @closeFormDialog="closeFormDialog" @submitForm="submitForm" />
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
import ExecuteCommandDialog from '@/apps/container/views/components/ExecuteCommandDialog'
export default {
  name: 'CalculationComponent',
  components: { ExecuteCommandDialog },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      formVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelConfig(row) {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    submitForm(form) {
      console.log(form)
      this.formVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}

</style>
