<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold">
            创建负载均衡器
          </span>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="用户名" prop="userName">
                  <el-input
                    v-model="ruleForm.userName"
                    placeholder="以 a-z、0-9 开头结尾, 支持使用 a-z、0-9、-, 最多32个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="显示名称" prop="showName">
                  <el-input
                    v-model="ruleForm.showName"
                    placeholder="最多 64 个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="规格">
              <el-radio-group v-model="ruleForm.specs" class="specsRadio">
                <el-radio-button label="小型">
                  <div>小型</div>
                  <div style="margin-top: 5px; font-size: 10px">
                    集群小于 5 节点
                  </div>
                </el-radio-button>
                <el-radio-button label="中型">
                  <div>中型</div>
                  <div style="margin-top: 5px; font-size: 10px">
                    集群小于 30 节点
                  </div>
                </el-radio-button>
                <el-radio-button label="大型">
                  <div>大型</div>
                  <div style="margin-top: 5px; font-size: 10px">
                    集群大于 5 节点
                  </div>
                </el-radio-button>
                <el-radio-button label="自定义">
                  <div>自定义</div>
                  <div style="margin-top: 5px; font-size: 10px">
                    适合专业用户配置
                  </div>
                </el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <div style="max-width: 500px">
                    • 小型：适用于集群规模在 5 节点以下，QPS < 60
                    的部门用户或业务应用 <br />
                    • 中型：适用于集群规模在 30 节点以下，QPS < 600
                    的企业用户或业务应用<br />
                    • 大型：适用于集群规模在 30 节点以上，QPS < 1000
                    的企业用户或业务应用<br />
                    • 自定义：适合专业用户配置<br />
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="资源限额">
                  <el-input v-model="ruleForm.cpu">
                    <template slot="prepend">CPU</template>
                    <template slot="append" v-if="ruleForm.specs == '小型'"
                      >m</template
                    >
                    <template slot="append" v-else>核</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-left: -145px">
                <el-form-item>
                  <el-input v-model="ruleForm.memory">
                    <template slot="prepend">内存</template>
                    <template slot="append" v-if="ruleForm.specs == '小型'"
                      >Mi</template
                    >
                    <template slot="append" v-else>Gi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="类型">
              <el-radio-group v-model="ruleForm.type">
                <el-radio-button label="单点"></el-radio-button>
                <el-radio-button label="高可用"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-row>
              <el-col :span="22">
                <el-form-item label="IP 地址">
                  <el-input
                    v-model="ruleForm.ipAddress"
                    placeholder="请输入正确的访问域名或 IPv4/IPv6 地址"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="副本数">
              <el-input-number
                v-model="ruleForm.replyNum"
                :min="1"
                :max="9007199254740991"
              />
            </el-form-item>

            <el-form-item label="节点标签">
              <el-select
                v-model="ruleForm.nodeLabel"
                @focus="setMinWidthEmpty"
                style="width: 90%"
              >
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="资源分配方式">
              <el-radio-group v-model="ruleForm.method">
                <el-radio-button label="实例"></el-radio-button>
                <el-radio-button label="端口"></el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <div style="max-width: 500px">
                    将 ALB 作为一个整体分配给项目使用，请选择
                    "实例"；当端口资源有限，希望进行更细粒度资源管控时，请选择"端口"
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-form-item label="分配项目" v-if="ruleForm.method == '实例'">
              <el-radio-group v-model="ruleForm.project">
                <el-radio-button label="所有项目"></el-radio-button>
                <el-radio-button label="指定项目"></el-radio-button>
                <el-radio-button label="不分配"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="指定项目"
              v-if="ruleForm.method == '实例' && ruleForm.project == '指定项目'"
            >
              <el-select
                v-model="ruleForm.protocol"
                @focus="setMinWidthEmpty"
                style="width: 90%"
              >
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
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

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor },
  data() {
    return {
      ruleForm: {
        userName: "",
        showName: "",
        specs: "小型",
        cpu: "",
        memory: "",
        type: "单点",
        ipAddress: "",
        replyNum: "1",
        nodeLabel: "",
        method: "实例",
        project: "所有项目",
      },

      rules: {
        userName: [
          { required: true, message: "名称是必填项", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/,
            message: "以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-",
            trigger: "blur",
          },
        ],
        showName: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
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
::v-deep.specsRadio {
  .el-radio-button {
    // margin-right: 15px;
    // border-radius: 4px;
    .el-radio-button__inner {
      //修改按钮样式
      width: 150px;
      height: 80px;
      line-height: 2;
      // &:hover {
      //   background-color: #28d4c1;
      // }
      // background: #2794f8;
      // color: #333;
      // border: 0 !important;
    }
    // .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    //   // 修改按钮激活样式
    //   color: #fff;
    // background-color: #f63;
    //   border-color: #f63;
    //   box-shadow: -1px 0 0 0 #f63;
    // }
  }
}
</style>