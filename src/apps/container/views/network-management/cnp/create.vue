<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            配置网络策略
          </div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <el-form-item label="项目间全隔离">
            <el-switch v-model="infoForm.isolation"></el-switch>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item>
              注意：开启后，当前集群所有项目之间隔离，即禁止跨项目访问流量。项目对集群外资源的访问将不受影响，同时不影响平台服务，如：负载均衡、访问规则。
            </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="单项目访问" v-if="infoForm.isolation == true">
            <table border="0" style="width: 100%">
              <thead>
                <tr class="headerStyle">
                  <th>
                    <div class="cell">源项目</div>
                  </th>
                  <th>
                    <div class="cell">目标项目</div>
                  </th>
                  <th>
                    <div class="cell">操作</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(domain, index) in infoForm.nodeUpdateItems"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="domain.key"
                        @focus="setMinWidthEmpty"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="domain.value"
                        @focus="setMinWidthEmpty"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <td class="text-center">
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="
                        handleDeleteLabel('nodeUpdateItems', domain, index)
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="5">
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #c8cacd;
                      "
                      v-if="infoForm.nodeUpdateItems == 0"
                    >
                      无单项目访问
                    </div>

                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAddLabel('nodeUpdateItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>

          <el-form-item label="IP 段访问" v-if="infoForm.isolation == true">
            <table border="0" style="width: 100%">
              <thead>
                <tr class="headerStyle">
                  <th>
                    <div class="cell">源 IP 段</div>
                  </th>
                  <th>
                    <div class="cell">目标项目</div>
                  </th>
                  <th>
                    <div class="cell">操作</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(domain, index) in infoForm.noteItems"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="domain.key"
                        @focus="setMinWidthEmpty"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-select
                        v-model="domain.value"
                        @focus="setMinWidthEmpty"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </td>
                  <td class="text-center">
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="handleDeleteParams('noteItems', domain, index)"
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="5">
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #c8cacd;
                      "
                      v-if="infoForm.noteItems == 0"
                    >
                      无IP 段访问
                    </div>

                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAddParams('noteItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      infoForm: {
        isolation: false,
        nodeUpdateItems: [],
        noteItems: [],
      },

      infoRules: {},
    };
  },

  created() {},

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

    handleSubmit() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.infoForm[filed].push(obj);
    },

    handleDeleteLabel(filed, item, index) {
      this.infoForm[filed].splice(index, 1);
    },

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.infoForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.infoForm[filed].splice(index, 1);
    },
  },
};
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
    // width: calc(100% - 42px);
    width: calc(100% - 250px);
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
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}

.create-container[data-v-5e8ccdd2] {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100%;
  position: relative;
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 9px;
  height: 40px;
  line-height: 40px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.el-card__body {
  padding: 20px;
  padding-top: 0;
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