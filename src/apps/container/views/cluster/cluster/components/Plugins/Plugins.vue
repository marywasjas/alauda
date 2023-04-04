<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div class="flex-center" style="float: right; margin-bottom: 15px">
          <el-input
            placeholder="按名称过滤"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" @click="onSearch"/>
          </el-input>
        </div>
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
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'">
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'quota'">
                <p class="margin10">
                  <i class="el-icon-cpu primary2-text" />
                  {{ scope.row.cpu }}
                  <i class="el-icon-bank-card primary-text" />
                  {{ scope.row.memory }}
                  <i class="el-icon-coin primary-text" />
                  {{ scope.row.storage }}
                </p>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          :current-page="page.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          class="margin-top text-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </section>
    </BaseCard>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
// import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";

export default {
  name: "Event",
  // components: { MonacoEditorDialog },
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,
      // detailVisible: false,
      page: {
        total: 10,
        current: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 搜索
    onSearch() {
      console.log("搜索");
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
</style>
