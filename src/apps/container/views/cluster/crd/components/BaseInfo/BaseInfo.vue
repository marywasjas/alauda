<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span style="font-size: 25px; line-height: 45px; font-weight: bold">
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
      <header
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        "
      >
        <div class="card-title right-header">
          <span style="font-size: 25px; line-height: 45px; font-weight: bold">
            实例
          </span>
        </div>

        <div class="search">
          <el-button
            type="primary"
            @click="handleCreate"
            style="margin-right: 10px"
            >创建实例
          </el-button>
          <div class="flex-center">
            <el-input
              v-model="search"
              placeholder="按名称搜索"
              class="margin-right10"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button icon="el-icon-refresh-right" @click="onSearch" />
          </div>
        </div>
      </header>

      <section>
        <el-table
          class="margin-top"
          :data="portData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
          empty-text="无实例"
        >
          <el-table-column
            v-for="col in portColumnList"
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

    <el-dialog
      @close="dialogDeleteVisible = false"
      :visible.sync="dialogDeleteVisible"
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
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { portColumnList, portData } from "./constant/index";

export default {
  name: "BaseInfo",
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
      portColumnList,
      portData,
      search: "",
      dialogDeleteVisible: false,
      instanceName: "",
    };
  },
  methods: {
    onSearch() {},
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
      this.dialogDeleteVisible = true;
      this.instanceName = obj.name;
    },

    handle_delete() {},
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
.search {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
