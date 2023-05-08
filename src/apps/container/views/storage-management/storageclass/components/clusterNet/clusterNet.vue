<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title flex-center" style="justify-content: flex-end">
          <el-input
            v-model="searchValue"
            @keyup.enter.native="handleSearch"
            placeholder="按名称搜索"
            style="width: 25%"
            class="margin-right10"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
          /></el-input>
          <el-button icon="el-icon-refresh-right" @click="handleRefresh" />
        </div>
      </header>
      <section>
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
            empty-text="无持久卷"
          >
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
                  <span @click="handelDetails(scope.row)">{{
                    scope.row[col.id]
                  }}</span>
                </div>
                <div v-else-if="col.id === 'operation'" class="operation-cell">
                  <el-dropdown>
                    <i class="el-icon-more" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="handleUpdate(scope.row)"
                        >更新</el-dropdown-item
                      >
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="不可删除已绑定的持久卷"
                        placement="left-start"
                      >
                        <div>
                          <el-dropdown-item :disabled="true">
                            删除
                          </el-dropdown-item>
                        </div>
                      </el-tooltip>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div v-else-if="col.id === 'status'">
                  <i
                    :class="
                      scope.row.status === '已绑定'
                        ? 'el-icon-success running'
                        : 'el-icon-warning stop'
                    "
                  />
                  <span> {{ scope.row[col.id] }} </span>
                </div>
                <div v-else>
                  {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
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

export default {
  name: "Node",
  components: {},

  props: {},
  data() {
    return {
      tableData,
      tableColumnList,
      searchValue: "",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    handleSearch() {},
    handleRefresh() {},

    handelDetails(obj) {
      this.$router.push({
        path: "/storage-management/pv/detail",
        query: {
          name: obj.name,
        },
      });
    },

    handleUpdate(obj) {
      this.$router.push({
        path: "/storage-management/pv/update",
        query: { name: obj.name },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
}
.row-bg {
  padding: 0;
  background-color: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
// .selectedStyle {
//   position: absolute;
//   height: 100%;
//   left: 4px;
//   top: 11px;
// }
// .right-header[data-v-8638ebe6] {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-align: center;
//   -ms-flex-align: center;
//   align-items: right;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: right;
// }
</style>