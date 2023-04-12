<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>资源统计</span>
          <el-select
            v-model="resourceTime"
            filterable
            placeholder="请选择"
            size="small"
            style="margin-left: 800px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </header>
      <section class="component-div">
        <span>CPU 总量: 192.00 核</span>
        <hr />
        <el-row>
          <el-col :span="12">
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />使用率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />请求率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />限制率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>

        <span>内存总量: 371.01 Gi</span>
        <hr />
        <el-row>
          <el-col :span="12">
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />使用率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />请求率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f9fafc">
              <el-col :span="4">
                <i
                  class="el-icon-cpu primary2-text"
                  style="margin-top: 45px"
                />限制率
              </el-col>
              <el-col :span="16">
                <radius-pie-chart :chart-data="containerData" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>存储空间使用率 (%)</span>
          <span style="margin-left: 700px">
            <el-button size="mini" type="primary" round
              >磁盘空间使用率</el-button
            >
            <el-button size="mini" type="primary" round>inode 使用率</el-button>
          </span>
        </div>
      </header>
      <section>
        <el-row>
          <el-col :span="16" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="8">
            <ul style="height: 260px; overflow-y: scroll">
              <li
                v-for="(item, index) in resourceList"
                :key="index"
                class="li-link"
                :class="{ isActive: compare(item.id) }"
              >
                <!-- @click="handleResourceChange(item.id)" -->
                <span style="color: #778899">{{ item.name }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>系统负载</span>
          <span style="margin-left: 700px">
            <el-button size="mini" type="primary" round>1 分钟平均值</el-button>
            <el-button size="mini" type="primary" round>5 分钟平均值</el-button>
            <el-button size="mini" type="primary" round
              >15 分钟平均值</el-button
            >
          </span>
        </div>
      </header>
      <section class="component-div">
        <el-row>
          <el-col :span="16" class="component-div-computed2">
            <line-chart :chart-data="containerLineData" :show-total="true" />
          </el-col>
          <el-col :span="8">
            <ul style="height: 260px; overflow-y: scroll">
              <li
                v-for="(item, index) in resourceList"
                :key="index"
                class="li-link"
                :class="{ isActive: compare(item.id) }"
              >
                <!-- @click="handleResourceChange(item.id)" -->
                <span style="color: #778899">{{ item.name }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>网络负载 Top 5</span>
          <span style="margin-left: 600px">
            <el-button size="mini" type="primary" round>流入流量</el-button>
            <el-button size="mini" type="primary" round>流出流量</el-button>
            <el-button size="mini" type="primary" round>发送报文量</el-button>
            <el-button size="mini" type="primary" round>接收报文量</el-button>
          </span>
        </div>
      </header>
      <section class="component-div">
        <el-row>
          <el-col :span="11">
            <span style="font-size: 20px"> 节点 </span>
            <el-row style="backgroundcolor: #f8f8ff; margin-top: 30px">
              <el-col :span="18">
                <!-- <span> kube-apiserver-25.2.20.182 </span><br /> -->
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span style="color: #00bfff">25.2.20.182</span>
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 0px; font-size: 20px">
                <span>8.38</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="11" style="margin-left: 50px">
            <span style="font-size: 20px"> 容器组 </span>

            <el-row style="backgroundcolor: #f8f8ff; margin-top: 30px">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
            <el-row style="backgroundcolor: #f8f8ff">
              <el-col :span="18">
                <span> kube-apiserver-25.2.20.182 </span><br />
                <span style="color: #778899; font-size: 12px"
                  >节点：25.2.20.182</span
                >
                <progress-card :chartData="progressData" />
              </el-col>
              <el-col :span="6" style="margin-top: 30px; font-size: 20px">
                <span>12.52</span><span style="color: #778899"> Mbps</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
  </div>
</template>

<script>
// import { tableData, tableColumnList } from "./constant";
import { tableColumnList } from "./constant";

export default {
  name: "RoleList",
  data() {
    return {
      page: {
        count: 1,
        current: 1,
        size: 20,
      },
      tableData: {
        data: [],
      },
      tableColumnList,
    };
  },

  created() {},
  methods: {
    getList() {},
    handleStatusChange() {},
    cacheSelected() {},
    // 创建用户
    handleCreateRole() {
      // this.$router.push({ name: "UserCreate" });
      this.$router.push({ path: "/user-role-management/role/create" });
    },
    handleRoleDetail(obj) {
      this.$router.push({
        path: "/user-role-management/role/detail",
        query: { name: obj.name },
      });
    },

    handleSearchChange(e) {},
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },
  },
};
</script>

</script>
<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .fixed-div {
    width: calc(100% - 250px);
    // width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
  .el-row {
    margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
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
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
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
// .container-top-left {
//   width: 32%;
//   height: 250px;
//   border-right: 1px solid $border-color-one;
//   padding-right: 20px;
//   display: flex;
//   align-items: center;
//   .chart {
//     height: 200px !important;
//   }
// }
// .container-top-right {
//   flex: 1;
//   height: 250px;
//   .el-select {
//     margin-bottom: 20px;
//   }
//   .chart {
//     height: 200px !important;
//   }
//   .el-divider--vertical {
//     display: inline-block;
//     width: 1px;
//     height: 100%; //更改竖向分割线长度
//     margin: 0 8px;
//     vertical-align: middle;
//     position: relative;
//   }
// }
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
</style>