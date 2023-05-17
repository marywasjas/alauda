<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px; line-height: 35px">
              {{ `创建 ${titleName}` }}
            </div>

            <el-radio-group v-model="activeTab">
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="yaml">YAML</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="text item event-container">
          <LineAlert
            content='某些字段可能无法以表单形式表示，请选择"YAML视图"编辑完整设置。'
          />

          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="infoRules"
            label-width="135px"
          >
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="infoForm.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称">
                  <el-input v-model="infoForm.showName" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="命名空间">
                  <el-select
                    v-model="infoForm.namespace"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in namespaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="标签">
                  <table border="0" style="width: 100%">
                    <thead>
                      <tr class="headerStyle">
                        <th>
                          <div class="cell">键</div>
                        </th>
                        <th>
                          <div class="cell">值</div>
                        </th>
                        <th>
                          <div class="cell">操作</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(domain, index) in infoForm.labelItems"
                        :key="domain.id"
                      >
                        <td>
                          <el-form-item>
                            <el-input v-model="domain.key" placeholder="键" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item>
                            <el-input v-model="domain.value" placeholder="值" />
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="
                              handleDeleteParams('labelItems', domain, index)
                            "
                          />
                        </td>
                      </tr>

                      <tr v-if="infoForm.labelItems.length == 0">
                        <td colspan="4">
                          <p
                            style="
                              text-align: center;
                              color: rgba(150, 152, 155);
                            "
                          >
                            无数据
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td colspan="5">
                          <div
                            class="cursor-pointer text-center hover-div"
                            @click="handleAddParams('labelItems')"
                          >
                            <i class="el-icon-circle-plus-outline" />
                            添加
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="External URL" prop="external">
                  <el-input v-model="infoForm.external" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    请输入服务的访问地址
                    Service的Type为"NodePort"时，请输入http://IP:端口，且该"端口"必须与Service的Node
                    Port一致
                    Service的Type为"Ingress"时，请输入对应访问地址，例如：http://kubernetes.io。
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <div class="event-list-wrapper">
              <div class="resource event-card">
                <foldable-block btn-tex="Account">
                  <el-form-item label="Password" prop="password">
                    <el-input v-model="infoForm.password" />
                  </el-form-item>
                  <el-descriptions
                    size="small"
                    :colon="false"
                    :contentStyle="rowCenter"
                  >
                    <el-descriptions-item>
                      请输入服务的访问地址
                      Service的Type为"NodePort"时，请输入http://IP:端口，且该"端口"必须与Service的Node
                      Port一致
                      Service的Type为"Ingress"时，请输入对应访问地址，例如：http://kubernetes.io。
                    </el-descriptions-item>
                  </el-descriptions>
                </foldable-block>
              </div>
            </div>
            <div class="event-list-wrapper">
              <div class="resource event-card">
                <foldable-block btn-tex="Account">
                  <el-form-item label="Password" prop="password">
                    <el-input v-model="infoForm.password" />
                  </el-form-item>
                </foldable-block>
              </div>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="nextSubmit">
        <span>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import { nanoid } from "nanoid";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor, FoldableBlock },
  data() {
    return {
      activeTab: "form",
      active: 0,
      titleName: "",

      rowCenter: {
        "max-width": "800px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "123px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      namespaceOptions: [
        { id: "baas", label: "baas" },
        { id: "cert-manager", label: "cert-manager" },
        { id: "chaos", label: "chaos" },
        { id: "cpaas-dev", label: "cpaas-dev" },
      ],

      infoForm: {},

      infoRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        external: [
          { required: true, message: "名称是必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "名称是必填项", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.titleName = this.$route.query.name;
    this.infoForm = {
      name: "gitlab-sample",
      showName: "",
      namespace: "baas",
      external: "",
      labelItems: [],

      apiVersion: "operator.devops.alauda.io/v1alpha",
      kind: "Gitlab",
      metadata: {
        name: "gitlab-sample",
      },
      spec: {
        account: null,
        integratedIntoPlatform: false,
        persistence: {
          type: "LcalPath",
        },
        service: {
          nodePort: {
            httpPort: 30000,
            httpsPort: 30001,
            sshPort: 30002,
          },
          type: "NodePort",
        },
      },
    };
  },

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

    nextSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.active = 1;
          // this.$refs["ruleForm"].resetFields();
          this.$refs["ruleForm"].clearValidate();
          this.ruleForm = this.$options.data().ruleForm;
          // this.ruleForm = {
          //   name: "",
          //   showName: "",
          //   desc: "",
          //   roleType: "平台角色",
          // };
        } else {
          return false;
        }
      });
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
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
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
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
.event-container {
  .event-list-wrapper {
    margin-top: 10px;
    .event-card {
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border: 1px solid $border-color-one;
      .card-header {
        box-sizing: border-box;
      }
      .text {
        color: $font-color-title;
        font-weight: bold;
      }
      .number,
      .time {
        color: $font-color-text;
        font-size: $font-size-14;
      }
      .circle {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $color-primary;
        margin-right: 8px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
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
  left: -5px;
  top: 48%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.card-content[data-v-8638ebe6] {
  padding: 16px px;
  padding-bottom: 1px;
  background: #ffffff;
  -webkit-box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  /* margin-bottom: 16px; */
}
</style>