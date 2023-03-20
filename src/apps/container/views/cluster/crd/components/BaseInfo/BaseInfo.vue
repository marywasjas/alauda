<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ name }}</span>
        </div>
      </header>
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
      <header>
        <div class="card-title right-header">
          <span>实例</span>
        </div>
      </header>

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
          >
            <template slot-scope="scope">
              {{ scope.row[col.id] }}
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
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
          label: "组",
          value: "aipos.alauda.io",
        },
        {
          label: "版本",
          value: "v1 (储存版本)",
        },
        {
          label: "作用域",
          value: "命名空间 | 集群",
        },
        {
          label: "创建时间",
          value: "2022-09-28 16:06:17",
        },
      ],
      portColumnList,
      portData,
      search: "",
    };
  },
  methods: {
    onSearch() {},
    handleRefresh() {
      console.log("resfresh container list");
    },
    handleCreate() {
      this.$router.push({
        name: "CrdCreate",
      });
    },
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
