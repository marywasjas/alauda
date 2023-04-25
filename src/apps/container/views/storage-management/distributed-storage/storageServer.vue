<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div>
            <div class="titleStyle">
              接入向导
              <el-radio-group v-model="method" v-if="active == 1">
                <el-radio-button label="表单">表单</el-radio-button>
                <el-radio-button label="yaml">YAML</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <el-steps :active="active" align-center style="margin-top: 10px">
            <el-step title="接入配置"></el-step>
            <el-step title="创建存储类"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>

        <div class="text item event-container">
          <LineAlert
            v-if="active == 0"
            content="接入存储配置支持接入分布式存储或已部署的外置 Ceph 存储系统，接入后的存储将支持与分布式存储相同的使用特性和功能。注意: 外置 Ceph 存储系统版本 >= 14.2.3"
          />

          <el-form
            v-if="active == 0"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
          >
            <el-form-item label="接入类型">
              <el-radio-group v-model="ruleForm.type">
                <el-radio-button label="内置">内置 Ceph</el-radio-button>
                <el-radio-button label="外置">外置 Ceph</el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <div style="max-width: 400px">
                    • 内置 Ceph:
                    快速接入并利用平台内其他业务集群的分布式存储资源，存储与业务隔离便于管理维护<br />
                    • 外置 Ceph: 像使用分布式存储一样接入外部 Ceph
                    存储资源，合理利用自建存储集群资源
                    <br />
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-row v-if="ruleForm.type == '内置'">
              <el-col :span="16">
                <el-form-item label="选择存储集群" prop="cluster">
                  <el-select
                    v-model="ruleForm.cluster"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in []"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm.type == '外置'">
              <el-col :span="16">
                <el-form-item label="存储集群 ID" prop="id">
                  <el-input v-model="ruleForm.id" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    填写从 Ceph 存储集群获取的 FSID ，命令参考: ceph fsid
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm.type == '外置'">
              <el-col :span="16">
                <el-form-item label="存储集群名称" prop="name">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    填写从 Ceph
                    存储集群名称，系统将以名称创建存储集群资源和命名空间
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm.type == '外置'">
              <el-col :span="16">
                <el-form-item label="MON 地址" prop="monAddress">
                  <el-input v-model="ruleForm.monAddress" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    填写从 Ceph 存储集群获取的 Monitor 组件地址，命令参考：ceph
                    mon dump。如: a=192.168.0.130:3890
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm.type == '外置'">
              <el-col :span="16">
                <el-form-item label="Admin Keyring" prop="adminKeyring">
                  <el-input v-model="ruleForm.adminKeyring" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    填写从 Ceph 存储集群获取的 admin 的 keyring
                    值，命令参考：ceph auth get-key client.admin
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </el-form>

          <el-form
            v-if="active == 1 && method == '表单'"
            ref="ruleForm"
            :model="ruleForm2"
            :rules="rules2"
            label-width="135px"
          >
            <el-form-item label="类型">
              <el-radio-group v-model="ruleForm2.type">
                <el-radio-button label="文件存储">文件存储</el-radio-button>
                <el-radio-button label="块存储">块存储</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-row>
              <el-col :span="16">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="ruleForm2.name"
                    placeholder="以 a-z、0-9 开头结尾, 支持使用 a-z、0-9、-, 最多32个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="显示名称" prop="showName">
                  <el-input v-model="ruleForm2.showName" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="存储集群" prop="cluster">
                  <!-- <el-input v-model="ruleForm2.cluster" /> -->
                  <span>{{ 1 }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="存储池" prop="storagePool">
                  <el-input v-model="ruleForm2.storagePool" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-tooltip
                  effect="dark"
                  class="item"
                  placement="top"
                  style="margin-top: 10px"
                >
                  <template slot="content">
                    <div style="max-width: 400px">
                      可在存储集群中使用 `ceph fs ls` 命令得到的 name 取值
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </el-col>
            </el-row>

            <el-row v-if="ruleForm2.type == '文件存储'">
              <el-col :span="16">
                <el-form-item label="数据存储池" prop="dataStoragePool">
                  <el-input v-model="ruleForm2.dataStoragePool" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-tooltip
                  effect="dark"
                  class="item"
                  placement="top"
                  style="margin-top: 10px"
                >
                  <template slot="content">
                    <div style="max-width: 400px">
                      可在存储集群中使用 `ceph fs ls` 命令获取的 data pools 取值
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </el-col>
            </el-row>

            <el-form-item label="文件系统" v-if="ruleForm2.type == '块存储'">
              <el-radio-group v-model="ruleForm2.fileSystem">
                <el-radio-button label="Ext4">Ext4</el-radio-button>
                <el-radio-button label="XFS">XFS</el-radio-button>
              </el-radio-group>
              <el-tooltip
                effect="dark"
                class="item"
                placement="top"
                style="margin-top: 10px"
              >
                <template slot="content">
                  <div style="max-width: 400px">
                    • XFS:
                    一种高性能的日志文件系统，因其基于分配的设计而特别擅长并行
                    IO，特别擅长处理大文件，同时提供平滑的数据传输 <br />
                    • EXT4: 第四代扩展文件系统是 linux
                    系统下的日志文件系统，大文件支持，EXT4的文件系统容量达到
                    1EB，而文件容量则达到 16TB<br />
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-form-item label="回收策略">
              <el-radio-group v-model="ruleForm2.recycPolicy">
                <el-radio-button label="remain">保留</el-radio-button>
                <el-radio-button label="delete">删除</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-row>
              <el-col :span="16">
                <el-form-item label="访问模式" prop="visitMode">
                  <!-- <el-input v-model="ruleForm2.visitMode" /> -->
                  <span>{{ "单节点读写(RWO)，多节点读写(RWX)" }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="分配项目">
              <el-radio-group v-model="ruleForm2.project">
                <el-radio-button label="所有项目">所有项目</el-radio-button>
                <el-radio-button label="指定项目">指定项目</el-radio-button>
                <el-radio-button label="不分配">不分配</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-row v-if="ruleForm2.project == '指定项目'">
              <el-col :span="16">
                <el-form-item label="指定项目" prop="specProject">
                  <el-select
                    v-model="ruleForm2.specProject"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in []"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div v-if="method === 'yaml' && active != 0">
            <monaco-editor
              ref="monacoEditor"
              :code="currentCode"
              :read-only="false"
              :language="language"
              @handleBlur="handleBlur"
            />
          </div>
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
        <span>接入</span>
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
      currentCode: "{}",
      inputCode: {},
      language: "yaml",
      rowCenter: {
        "max-width": "600px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      active: 0,
      method: "表单",

      ruleForm: {
        name: "",
        id: "",
        monAddress: "",
        type: "内置",
        adminKeyring: "",
        cluster: "",
      },

      rules: {},

      ruleForm2: {
        type: "文件存储",
        recycPolicy: "delete",
        project: "所有项目",
        name: "",
        fileSystem: "Ext4",
      },

      rules2: {},
    };
  },

  created() {},

  methods: {
    permission() {
      this.permVisible = true;
    },
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

    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
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
.titleStyle {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>