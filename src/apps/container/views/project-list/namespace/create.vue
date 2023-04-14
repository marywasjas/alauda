<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            创建命名空间
          </div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>
          <el-form-item label="所属集群" prop="cluster">
            <el-col :span="16">
              <el-select
                v-model="infoForm.cluster"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in [{ id: 'region', label: 'region(region)' }]"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="命名空间" prop="namespace">
            <el-col :span="16">
              <el-input v-model="infoForm.namespace">
                <template slot="prepend">baas-</template>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称">
            <el-col :span="16">
              <el-input v-model="infoForm.showName"> </el-input>
            </el-col>
          </el-form-item>
        </el-form>

        <el-form
          ref="regionForm"
          :model="regionForm"
          :rules="regionRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "资源配额" }}</h2>
          </div>

          <el-form-item label="CPU">
            <el-col :span="16">
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
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="内存">
            <el-col :span="16">
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
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="存储">
            <el-col :span="16">
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
            <el-descriptions-item> 不限制 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="Pods 数">
            <el-col :span="16">
              <el-input v-model="regionForm.pods"> </el-input>
            </el-col>
          </el-form-item>
          <el-descriptions
            size="small"
            :colon="false"
            :contentStyle="rowCenter"
          >
            <el-descriptions-item> 最大值 1000 </el-descriptions-item>
          </el-descriptions>

          <el-form-item label="PVC 数">
            <el-col :span="16">
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

        <el-form
          ref="limitForm"
          :model="limitForm"
          :rules="limitRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "容器限额" }}</h2>
          </div>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="CPU" prop="cpu">
                <el-input v-model="limitForm.cpuMax">
                  <template slot="append">m</template>
                  <template slot="prepend">最大值</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10" style="margin-left: -145px">
              <el-form-item prop="clusterPort">
                <el-input v-model="limitForm.cpuDefault">
                  <template slot="append">m</template>
                  <template slot="prepend">默认值</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="内存" prop="memory">
                <el-input v-model="limitForm.memoryMax">
                  <template slot="append">m</template>
                  <template slot="prepend">最大值</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10" style="margin-left: -145px">
              <el-form-item prop="clusterPort">
                <el-input v-model="limitForm.memoryDefault">
                  <template slot="append">m</template>
                  <template slot="prepend">默认值</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form
          ref="limitForm"
          :model="limitForm"
          :rules="limitRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "更多配置" }}</h2>
          </div>

          <el-form-item label="标签" style="margin-bottom: 0">
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
                  v-for="(domain, index) in limitForm.nodeUpdateItems"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.key"> </el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.value"> </el-input>
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

          <el-form-item label="注解" style="margin-bottom: 0">
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
                  v-for="(domain, index) in limitForm.noteItems"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.key"> </el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.value"> </el-input>
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
      <el-button type="primary" @click="prevSubmit">创建</el-button>
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
      limitForm: {
        cpuMax: "",
        memoryMax: "",
        cpuDefault: "",
        memoryDefault: "",
      },
      limitRules: {
        cpu: [{ required: true, message: "cpu is required", trigger: "blur" }],
        memory: [
          { required: true, message: "memory is required", trigger: "blur" },
        ],
      },

      regionForm: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },

      infoForm: {
        namespace: "",
        showName: "",
        cluster: "region",
      },

      limitForm: {
        nodeUpdateItems: [
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "region" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "baas" },
        ],
        noteItems: [
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "" },
        ],
      },
      nodeUpdateRules: {},
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
        key: "",
        value: "",
      };
      this.limitForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.limitForm[filed].splice(index, 1);
    },

    handleAdd() {},

    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.limitForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.limitForm[filed].splice(index, 1);
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