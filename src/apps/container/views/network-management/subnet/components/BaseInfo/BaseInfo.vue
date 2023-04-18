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
            <span>
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
      </section>

      <header>
        <div class="card-title left-header">
          <span>保留 IP</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in [{ label: '保留 IP', value: '10.1.0.1' }]"
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

      <header>
        <div class="card-title left-header">
          <span>网关</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in [
              { label: '网管类型', value: '分布式' },
              { label: '外出流量 NAT', value: '是' },
            ]"
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

      <header>
        <div class="card-title left-header">
          <span>白名单</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in [{ label: '子网隔离', value: '否' }]"
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

      <header>
        <div class="card-title left-header">
          <span>命名空间</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in [
              { label: '命名空间', value: '-' },
            ]"
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
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  components: {},
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: "所属集群",
          value: "global",
        },
        {
          label: "传输方式",
          value: "Overlay",
        },
        {
          label: "已用 IP 数",
          value: "147",
        },
        {
          label: "创建人",
          value: "-",
        },
        {
          label: "可用 IP 数",
          value: "10000+",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:18:12",
        },
        {
          label: "网段",
          value: "10.1.0.0/16",
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
