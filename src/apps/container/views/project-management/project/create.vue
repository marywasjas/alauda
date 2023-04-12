<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            创建项目
          </div>
          <el-steps :active="active" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="设置配额"></el-step>
          </el-steps>
        </div>

        <div class="text item event-container">
          <el-form
            v-if="active == 0"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称" prop="showName">
                  <el-input v-model="ruleForm.showName" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 描述 -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述" prop="desc">
                  <el-input v-model="ruleForm.desc" type="textarea" rows="4" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="所属集群" prop="cluster">
              <el-select
                @focus="setMinWidthEmpty"
                style="width: 91%"
                v-model="ruleForm.cluster"
                multiple
                filterable
                allow-create
                default-first-option
              >
                <el-option
                  v-for="item in clusterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-tabs tab-position="left" style="height: 100%" v-else>
            <el-tab-pane
              :label="item.label"
              v-for="item in divData"
              :key="item.id"
              class="event-card"
              max-height="300"
            >
              <div class="event-list-wrapper">
                <div class="event-card">
                  <BaseCard>
                    <el-form :model="quotaForm" label-width="135px">
                      <el-form-item label="配额设置方式">
                        <el-checkbox-group v-model="quotaForm.method">
                          <el-checkbox label="为所有集群设置相同配额" />
                        </el-checkbox-group>
                      </el-form-item>
                    </el-form>

                    <el-form
                      v-if="quotaForm.method == true"
                      ref="form"
                      :model="form"
                      :rules="rules"
                      label-width="135px"
                    >
                      <el-form-item label="CPU">
                        <el-col :span="5">
                          <el-input v-model="form.cpu">
                            <template slot="append">核</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 173.8 核，已分配0核，共 173.8 核
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="内存">
                        <el-col :span="5">
                          <el-input v-model="form.memory">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 328.279 Gi，已分配0Gi，共 328.279 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="存储">
                        <el-col :span="5">
                          <el-input v-model="form.storage">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 356.187 Gi，已分配0Gi，共 356.187 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="Pods 数">
                        <el-col :span="11">
                          <el-input v-model="form.pods"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="PVC 数">
                        <el-col :span="11">
                          <el-input v-model="form.pvc"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>
                    </el-form>

                    <el-form
                      v-if="quotaForm.method == false && item.label == 'global'"
                      ref="globalForm"
                      :model="globalForm"
                      :rules="globalRules"
                      label-width="135px"
                    >
                      <div class="recomend-list">
                        <h2>{{ item.label }}</h2>
                      </div>

                      <el-form-item label="CPU">
                        <el-col :span="5">
                          <el-input v-model="globalForm.cpu">
                            <template slot="append">核</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 173.8 核，已分配0核，共 173.8 核
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="内存">
                        <el-col :span="5">
                          <el-input v-model="globalForm.memory">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 328.279 Gi，已分配0Gi，共 328.279 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="存储">
                        <el-col :span="5">
                          <el-input v-model="globalForm.storage">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 356.187 Gi，已分配0Gi，共 356.187 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="Pods 数">
                        <el-col :span="11">
                          <el-input v-model="globalForm.pods"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="PVC 数">
                        <el-col :span="11">
                          <el-input v-model="globalForm.pvc"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>
                    </el-form>

                    <el-form
                      v-if="quotaForm.method == false && item.label == 'region'"
                      ref="regionForm"
                      :model="regionForm"
                      :rules="regionRules"
                      label-width="135px"
                    >
                      <div class="recomend-list">
                        <h2>{{ item.label }}</h2>
                      </div>

                      <el-form-item label="CPU">
                        <el-col :span="5">
                          <el-input v-model="regionForm.cpu">
                            <template slot="append">核</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 173.8 核，已分配0核，共 173.8 核
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="内存">
                        <el-col :span="5">
                          <el-input v-model="regionForm.memory">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 328.279 Gi，已分配0Gi，共 328.279 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="存储">
                        <el-col :span="5">
                          <el-input v-model="regionForm.storage">
                            <template slot="append">Gi</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item>
                          建议不超过 356.187 Gi，已分配0Gi，共 356.187 Gi
                        </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="Pods 数">
                        <el-col :span="11">
                          <el-input v-model="regionForm.pods"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>

                      <el-form-item label="PVC 数">
                        <el-col :span="11">
                          <el-input v-model="regionForm.pvc"> </el-input>
                        </el-col>
                      </el-form-item>
                      <el-descriptions
                        size="small"
                        :colon="false"
                        :contentStyle="rowCenter"
                      >
                        <el-descriptions-item> 不限制 </el-descriptions-item>
                      </el-descriptions>
                    </el-form>
                  </BaseCard>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>

    <div class="fixed-div" v-if="active == 0">
      <el-button type="primary" @click="nextSubmit">
        <span>下一步</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <div class="fixed-div" v-else>
      <el-button @click="prevSubmit">上一步</el-button>
      <el-button type="primary" @click="submitCreate">
        <span>创建项目</span>
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
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      active: 0,

      divData: [
        { id: 1, label: "global" },
        { id: 2, label: "region" },
      ],

      clusterOptions: [
        { label: "global", value: "global" },
        { label: "region", value: "region" },
      ],

      ruleForm: {
        name: "",
        showName: "",
        desc: "",
        cluster: "",
      },

      rules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        cluster: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
      },

      quotaForm: {
        method: false,
      },

      globalForm: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },

      regionForm: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },

      form: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },
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

    // 提交创建表单
    submitCreate() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
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
    prevSubmit() {
      this.active = 0;
      this.$refs["ruleForm"].clearValidate();
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        selectData: {
          roleName: "",
          project: "",
          space: "",
        },
      };
      this.selectData = obj.selectData;
      this.ruleForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },

    handleRoleChange(val) {
      // if (val) {
      //   this.projectDisable = false;
      //   this.projectOptions = [
      //     { value: "baas", label: "baas(云信)" },
      //     { value: "chaos", label: "chaos" },
      //   ];
      // }
      if (val) {
        this.projectDisable = false;
        console.log(this.optionData.com2[val]);
        this.selectData.project = this.optionData.com2[val][0].value; //根据第一个控件所选项确定第二个控件下拉内容的对象数组，并使默认为第一个数组项
        this.handleProjectChange();
      } else {
        this.selectData.project = "";
        this.handleProjectChange();
      }
    },

    handleProjectChange(val) {
      // if (val) {
      //   this.spaceDisable = false;
      //   this.spaceOptions = [{ value: "faq-robot", label: "faq-robot" }];
      // }
      var val = this.selectData.project;
      if (val) {
        this.spaceDisable = false;
        this.selectData.space = this.optionData.com3[val][0].value;
      } else {
        this.selectData.space = "";
      }
    },

    handleSpaceChange() {},

    handleAdd() {},
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
    width: calc(100% - 42px);
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
</style>