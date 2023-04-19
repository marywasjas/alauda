<template>
  <div class="calculation-container-group">
    <BaseCard>
      <section>
        <div style="text-align: left">
          容器组：
          <el-select filterable placeholder="请选择" style="margin-right: 10px">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          容器：
          <el-select filterable placeholder="请选择">
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <Yaml/>
          <!-- <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <el-table-column
              v-for="col in tableColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="true"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id == 'name'">
                  <span
                    @click="handelDetails(scope.row)"
                    class="cursor-pointer"
                  >
                    {{ scope.row[col.id] }}
                  </span>
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table> -->
        </div>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import Yaml from "@/apps/container/views/components/Details/Yaml";


import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock,Yaml  },

  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableColumnList,
      tableData,
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

    handelDetails(obj) {
      this.$router.push({
        name: "ClusterNodeDetail",
        query: { name: obj.name },
      });
    },
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
</style>