<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div class="flex-center" style="float: left; margin-bottom: 13px">
          <el-button @click="onSearch" type="primary" disabled>升级</el-button>
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
               <div v-if="col.id === 'status'" class="status-cell">
                <i
                  v-if="scope.row.status === 'running'"
                  class="el-icon-video-play running"
                />
                <i
                  v-else-if="scope.row.status === 'stop'"
                  class="el-icon-video-pause stop"
                />
                <i
                  v-else-if="scope.row.status === 'pending'"
                  class="el-icon-loading pending"
                />
                <span>{{ scope.row.statusText }}</span>
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