<template>
  <div class="oam-container">
    <line-alert :content="content" />
    <div class="oam-main">
      <div class="card__header">
        <el-button type="primary" @click="handelCreate">创建持久卷</el-button>
        <div class="flex-center">
          <el-input
            v-model="formInline.name"
            placeholder="按名称搜索"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" @click="onSearch" />
        </div>
      </div>
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
  name: "PersistentVolumeList",
  components: { LineAlert },
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        tag: "",
        name: "",
      },
      tagOptions: [
        {
          value: "标签1",
          label: "标签1",
        },
        {
          value: "标签2",
          label: "标签2",
        },
      ],
      content:
        "PersistentVolume (PV) 是集群之中的一块网络存储。跟 Node 一样，也是集群的资源。PV 跟 Volume (卷)类似，不过会有独立于 Pod 的生命周期。",
    };
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline);
    },
    handelCreate() {
      this.$router.push({
        path: "/storage-management/pv/create",
      });
    },
    handelDetails(row) {
      this.$router.push({
        path: "/storage-management/pv/detail",
        query: {
          name: row.name,
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
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
}
</style>
