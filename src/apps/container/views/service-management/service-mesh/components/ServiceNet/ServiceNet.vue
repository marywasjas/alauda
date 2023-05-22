<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ titleName }}</span>

          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10" type="primary">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate">
                  更新
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleSilence">
                  设置静默
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            class="label-value"
            v-for="item in detailData"
            :key="item.label"
            :span="12"
          >
            <span> {{ item.label }} </span>
            : &nbsp;&nbsp;

            <span v-if="item.label == '状态'">
              <i
                :class="
                  item.value === '部署成功'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              {{ item.value }}
            </span>

            <span v-else-if="item.label == '标签'">
              <el-tooltip
                placement="top"
                effect="dark"
                style="margin-right: 10px"
              >
                <div slot="content">{{ item.value[0] }}</div>
                <el-tag size="mini">
                  {{
                    item.value[0].length > 15
                      ? item.value[0].substring(0, 30) + "..."
                      : item.value[0]
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content" v-for="ele in item.value" :key="ele">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ ele }}
                  </el-tag>
                  <br />
                </div>
                <el-tag size="mini" style="cursor: pointer">
                  {{ "..." }}
                </el-tag>
              </el-tooltip>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <!-- <div>
      <el-table
        :data="tableData.data"
        style="width: 100%"
        header-row-class-name="headerStyle"
        class="margin-top"
        @sort-change="setSort"
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
            <div v-if="col.id === 'status'">
              <i
                :class="
                  scope.row.status === '正常'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              <span> {{ scope.row[col.id] }} </span>
            </div>
            <div v-else>
              <span> {{ scope.row[col.id] }} </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div> -->

    <!-- <div style="margin-top: 15px; margin-left: 55%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="page.count"
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock },
  props: {},
  data() {
    return {
      titleName: "",

      detailData: [
        {
          label: "ClusterServiceVersion 名称",
          value: "devops-tool-operator.v3.8.22",
        },
        {
          label: "标签",
          // value: "operatorframework.io/arch.amd64:supported",
          value: [
            "operatorframework.io/arch.amd64:supported",
            "operatorframework.io/arch.arm64:supported",
            "operatorframework.io/devops-tool-operator.operat....",
          ],
        },
        {
          label: "集群",
          value: "global",
        },

        {
          label: "命名空间",
          value: "所有命名空间",
        },
        {
          label: "状态",
          value: "部署成功",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:00:23",
        },
      ],

      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      clusterOptions: [
        { value: "all", label: "全部集群" },
        { value: "region", label: "region (region)" },
        { value: "global", label: "global (global)" },
      ],
      clusterValue: "all",
      searchName: "",

      tableData,
      tableColumnList,
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
  created() {
    this.titleName = this.$route.query.name;
  },
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
    // 搜索
    onSearch() {
      console.log("搜索");
    },

    handleClusterChange() {
      console.log("搜索");
    },

    handleSizeChange(val) {
      this.page.size = val;
      this.onSearch();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.onSearch();
    },
    setSort(col) {
      this.sort.key = col.prop;
      this.sort.value = col.order == "ascending" ? "asc" : "desc";
      this.onSearch();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 10px;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
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
  i {
    // color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%; //更改竖向分割线长度
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
}
.component-div-computed {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
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
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
// .li-link {
//   widows: 100%;
//   padding: 12px 16px;
//   text-align: left;
//   border-bottom: 1px solid #ccc;
//   overflow: hidden;
//   cursor: pointer;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   position: relative;
//   font-size: 16px;
//   color: rgb(50, 52, 55);
// }
// .li-link:hover,
// .isActive {
//   color: $color-primary;
//   background-color: $background-color;
// }
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 290px;
  height: 180px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  font-size: 14px;
  height: 65px;
  line-height: 21px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>