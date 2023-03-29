<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div class="flex-center" style="float: left; margin-bottom: 13px">
          <el-button @click="handleCreateNode" type="primary">
            添加节点
          </el-button>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                • 未部署监控组件，无法获取资源的利用率，仅显示节点资源总量<br />
                • 接入集群不支持添加或删除节点<br />
                • 无法获取主机名称时，将以节点 IP 作为名称<br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </div>

        <div class="flex-center" style="float: right">
          <el-input
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
          <el-button icon="el-icon-s-tools" size="small" />
        </div>

        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <!-- <el-table-column fixed prop="date" label="名称" >
          </el-table-column> -->
            <el-table-column
              v-for="col in tableColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'name'" class="cursor-pointer">
                  <span @click="handelDetails(scope.row)">
                    {{ scope.row[col.id] }}
                  </span>
                </div>
                <div v-else-if="col.id === 'total'">
                  <p class="margin0">
                    <i class="el-icon-cpu primary2-text" />
                    {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                  </p>
                  <p class="margin0">
                    <i class="el-icon-bank-card primary-text" />
                    {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                  </p>
                </div>
                <div v-else-if="col.id === 'operation'" class="operation-cell">
                  <el-dropdown>
                    <i class="el-icon-more" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        command="update"
                        @click.native="handleCapacityExpansion(scope.row)"
                        >Kubectl 工具</el-dropdown-item
                      >
                      <el-dropdown-item
                        command="delete"
                        @click.native="handleDelete(scope.row)"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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