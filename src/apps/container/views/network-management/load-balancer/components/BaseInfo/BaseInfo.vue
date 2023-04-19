<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
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
            <span v-if="item.label == '资源限额'">
              <i class="el-icon-cpu primary2-text" />
              {{ item.value.cpu }}
              <i class="el-icon-bank-card primary-text" />
              {{ item.value.memory }}
            </span>
            <span v-else-if="item.label == '显示名称'">
              {{ item.value ? item.value : "-" }}
              <el-tooltip
                class="item"
                effect="dark"
                content="系统资源，不允许编辑"
                placement="top-start"
              >
                <i
                  :class="item.afterIcon"
                  @click="update(item)"
                  style="cursor: not-allowed"
                />
              </el-tooltip>
            </span>
            <span v-else>
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>

      <header>
        <div class="card-title left-header">
          <span>项目</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in [{ label: '项目', value: 'cpaas-system' }]"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>
            : &nbsp;&nbsp;
            <span>
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header" >
          <span >端口管理</span>
          <el-input
            v-model="portValue"
            placeholder="按端口搜索"
            prefix-icon="el-icon-search"
            style="width:30%"
          ></el-input>
        </div>
      </header>
      <section>
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
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'protocol'">
                  <div>
                    {{ scope.row[col.id] }}
                  </div>

                  <div style="font-size: 12px; color: gray">
                    {{ scope.row.cerf }}
                  </div>
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
export default {
  name: "BaseInfo",
  components: {},
  props: {},
  data() {
    return {
      portValue: "",
      baseInfoData: [
        {
          label: "显示名称",
          value: "-",
          afterIcon: "el-icon-edit",
        },
        {
          label: "所属集群",
          value: "global",
        },
        {
          label: "规格",
          value: "147",
        },
        {
          label: "创建人",
          value: "-",
        },
        {
          label: "资源限额",
          value: {
            cpu: "不限制",
            memory: "不限制",
          },
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:18:12",
        },
        {
          label: "IP 地址",
          value: "127.0.0.1",
        },
        {
          label: "资源分配方式",
          value: "实例",
        },
      ],

      tableData: {
        data: [
          {
            port: 443,
            protocol: "HTTPS",
            cerf: "证书: cpaas-system/dex.tls",
          },
        ],
      },
      tableColumnList: [
        {
          id: "port",
          label: "端口",
          width: "120px",
        },
        {
          id: "protocol",
          label: "协议",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.detailName = this.$route.query.name;
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
  i {
    color: $color-primary;
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
.li-version {
  font-size: 14px;
  color: rgb(100, 102, 105);
  margin-top: 8px;
  display: flex;
  align-items: center;
}
.li-link {
  widows: 100%;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  font-size: 16px;
  color: rgb(50, 52, 55);
}
.li-link:hover,
.isActive {
  color: $color-primary;
  background-color: $background-color;
}
.li-version {
  font-size: 14px;
  color: rgb(100, 102, 105);
  margin-top: 8px;
  display: flex;
  align-items: center;
}
</style>
