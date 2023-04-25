<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span style="font-size: 20px; line-height: 28px; font-weight: 500">
            {{ name }}
          </span>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>
            : &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header class="tableStyle">
        <span style="font-size: 20px; line-height: 28px; font-weight: 500">
          实例
        </span>

        <div class="flex-center">
          <el-button
            type="primary"
            class="margin-right10"
            @click="handleCreate"
          >
            创建实例
          </el-button>
          <el-input
            v-model="searchName"
            placeholder="按名称搜索"
            class="margin-right10"
            @keyup.enter.native="handleSearch"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button icon="el-icon-refresh-right" @click="handleRefresh" />
        </div>
      </header>

      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
          empty-text="无实例"
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
                <span @click="handleDetail(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleUpdate(scope.row)"
                      >更新</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="handleDelete(scope.row)"
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
      </section>
    </BaseCard>

    <delete-remove-dialog
      :formVisible="formVisible"
      deleteOrRemove="删除"
      width="45%"
      :titleContext="`确定删除实例 &quot;${instanceName}&quot; 吗？`"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
    <!-- <el-dialog
      @close="formVisible = false"
      :visible.sync="formVisible"
      width="45%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定删除实例 "${instanceName}" 吗？` }}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 删除 </el-button>
        <el-button @click="formVisible = false">取消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "BaseInfo",
  components: { DeleteRemoveDialog },

  props: ["name"],

  data() {
    return {
      baseInfoData: [
        {
          label: "名称",
          value: this.name + "aipos.alauda.io",
        },
        {
          label: "作用域",
          value: "集群",
        },
        {
          label: "组",
          value: "aipos.alauda.io",
        },
        {
          label: "创建时间",
          value: "2022-09-28 16:06:17",
        },
        {
          label: "版本",
          value: "v1 (储存版本)",
        },
      ],
      tableColumnList,
      tableData,
      searchName: "",
      formVisible: false,
      instanceName: "",
    };
  },
  methods: {
    handleRefresh() {},

    handleSearch() {},

    handleDetail(row) {
      this.$router.push({
        path: "/cluster-management/crd/detailInstance",
        query: { name: row.name },
      });
    },

    handleCreate() {
      this.$router.push({
        name: "CrdCreate",
        query: { name: this.name, type: "add" },
      });
    },

    handleUpdate(row) {
      this.$router.push({
        name: "CrdCreate",
        query: { name: row.name, type: "update" },
      });
    },

    handleDelete(obj) {
      this.formVisible = true;
      this.instanceName = obj.name;
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},
  },
};
</script>
<style lang="scss" scoped>
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
}
.headerStyle {
  height: 36px;
}
.el-form-item {
  margin-bottom: 0px;
  line-height: 36px;
}
.hover-div {
  height: 36px;
  line-height: 36px;
}
.hover-div:hover {
  background: $color-primary-rgba1;
}
// .search {
//   display: flex;
//   justify-content: right;
//   align-items: center;
// }
.tableStyle {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
</style>
