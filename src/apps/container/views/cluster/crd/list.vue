<template>
  <div class="oam-container">
    <line-alert :content="content" />
    
    <div class="oam-main">
      <!-- 1 -->
      <div class="card__header">
        <div class="flex-center">
          <el-select
            v-model="formInline.searchGroup"
            placeholder=""
            @change="handleGroupChange"
            class="margin-right10"
            style="width: 100%"
          >
            <span slot="prefix" class="selectedStyle">组： </span>
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            placeholder="按类型过滤"
            v-model="formInline.searchType"
            @keyup.enter.native="queryList"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <!-- 2 -->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
            :sortable="col.sortable"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handleDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import { tableData, tableColumnList } from "./constant/index";
export default {
  name: "ClusterCrdList",
  components: { LineAlert },
  data() {
    return {
        page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tableData,
      tableColumnList,
      formInline: {
        searchGroup: "",
        searchType: "",
      },
      content:
        "自定义资源(CustomResourceDefinition)是 Kubernetes 提供的一种资源类型，通过声明 CRD 可以向 K8s 中增加新资源类型来创建自定义的API,提供更多扩展能力支持",
    };
  },
  methods: {
    handleGroupChange(val) {
      this.searchGroup = val;
    },

    queryList() {},

    handleDetail(row) {
      this.$router.push({
        name: "ClusterCrdDetail",
        query: { name: row.name },
      });
    },
  },

  computed: {
    groupOptions() {
      return this.tableData.data.map((item) => {
        return { value: item.name, label: item.name };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.oam-container {
  padding: 0px 20px;
  background-color: $background-color;
  min-height: 100%;
  margin-bottom: 20px;
  .card__header {
    // display: flex;
    // justify-content: space-between;
    // align-items: right;
    float: right;
    margin-bottom: 20px;
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .selectedStyle {
    position: absolute;
    height: 100%;
    left: 4px;
    top: 11px;
  }
}
</style>
