<template>
  <div class="calculation-container-group">
    <BaseCard>
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
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'message'">
                {{
                  scope.row[col.id].length > 20
                    ? scope.row[col.id].substring(0, 20) + "..."
                    : scope.row[col.id]
                }}
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
  components: {},
  props: {},
  data() {
    return {
      tableColumnList,
      tableData,

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
  methods: {},
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
</style>
