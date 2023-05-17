<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold">
            基本信息
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
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="ruleForm.name"
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
                    placeholder="输入显示名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 描述 -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    :row="1"
                    v-model="ruleForm.desc"
                    placeholder="输入描述信息"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 通知方式 -->
            <el-form-item label="通知方式">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div v-if="ruleForm.notMethodItems.length > 0">
                      <div
                        v-for="(domain, index) in ruleForm.notMethodItems"
                        :key="domain.id"
                        class="margin-bottom10 item-div"
                      >
                        <el-row>
                          <el-col :span="23">
                            <el-row>
                              <el-col :span="24">
                                <el-form-item
                                  label="类型"
                                  label-width="100px"
                                  prop="seleted"
                                >
                                  <el-select
                                    v-model="domain.type"
                                    @focus="setMinWidthEmpty"
                                    style="width: 30%"
                                  >
                                    <el-option
                                      v-for="item in typeOptions"
                                      :key="item.label"
                                      :label="item.label"
                                      :value="item.value"
                                    />
                                  </el-select>
                                </el-form-item>
                              </el-col>

                              <el-col :span="18" style="margin-top: 10px">
                                <el-form-item
                                  label="通知对象"
                                  label-width="100px"
                                >
                                  <el-select
                                    v-model="domain.notice"
                                    @focus="setMinWidthEmpty"
                                    style="width: 100%"
                                    multiple
                                  >
                                    <el-option
                                      v-for="item in noticeOptions"
                                      :key="item.label"
                                      :label="item.label"
                                      :value="item.value"
                                    />
                                  </el-select>
                                </el-form-item>
                              </el-col>

                              <el-col
                                :span="4"
                                style="margin-top: 10px; margin-left: 30px"
                              >
                                <el-form-item>
                                  <el-button
                                    @click="handleAddNotice(domain.type)"
                                    >添加通知对象</el-button
                                  >
                                </el-form-item>
                              </el-col>

                              <el-col :span="24" style="margin-top: 10px">
                                <el-form-item
                                  label="通知模板"
                                  label-width="100px"
                                >
                                  <el-select
                                    v-model="domain.template"
                                    @focus="setMinWidthEmpty"
                                    style="width: 95%"
                                  >
                                    <el-option
                                      v-for="item in templateOptions"
                                      :key="item.label"
                                      :label="item.label"
                                      :value="item.value"
                                    />
                                  </el-select>
                                </el-form-item>
                              </el-col>

                              <el-col
                                :span="24"
                                style="margin-top: 10px; margin-bottom: 10px"
                              >
                                <el-form-item
                                  label="发送人"
                                  label-width="100px"
                                  prop="seleted"
                                >
                                  <el-select
                                    v-model="domain.sender"
                                    @focus="setMinWidthEmpty"
                                    style="width: 95%"
                                  >
                                    <el-option
                                      v-for="item in senderOptions"
                                      :key="item.label"
                                      :label="item.label"
                                      :value="item.value"
                                    />
                                  </el-select>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </el-col>

                          <el-col
                            :span="1"
                            style="padding-left: 10px; margin-top: 12%"
                          >
                            <div>
                              <i
                                class="el-icon-remove-outline cursor-pointer"
                                @click="
                                  handleDeleteNode(
                                    'notMethodItems',
                                    domain,
                                    index
                                  )
                                "
                              />
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div v-else>
                      <p style="text-align: center; color: rgba(150, 152, 155)">
                        无通知方式
                      </p>
                    </div>

                    <div class="flex-center">
                      <div
                        class="cursor-pointer text-center hover-div"
                        style="flex: 1; margin-top: -10px"
                        @click="handleAddNode('notMethodItems')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
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

    <el-dialog
      title="通知对象"
      @close="createVisible = false"
      :visible.sync="createVisible"
      width="60%"
    >
      <table border="0" style="width: 100%">
        <thead>
          <tr class="headerStyle">
            <th>
              <div class="cell">类型</div>
            </th>
            <th>
              <div class="cell">显示名称</div>
            </th>
            <th>
              <div class="cell">对象名称</div>
            </th>
            <th>
              <div class="cell">操作</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(domain, index) in roleItems" :key="domain.id">
            <td>
              <span>
                {{ typeName }}
              </span>
            </td>
            <td>
              <el-input
                v-model="domain.showName"
                size="small"
                placeholder="输入显示名称"
              />
            </td>
            <td>
              <el-input v-model="domain.objName" size="small" />
            </td>
            <td class="text-center">
              <el-button
                icon="el-icon-remove-outline"
                class="cursor-pointer margin-left10 margin-right10"
                type="text"
                @click="handleDeleteParams('roleItems', domain, index)"
              />
            </td>
          </tr>

          <tr v-if="roleItems.length == 0">
            <td colspan="5">
              <p style="text-align: center; color: rgba(150, 152, 155)">
                无通知对象
              </p>
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <div
                class="cursor-pointer text-center hover-div"
                style="height: 36px; line-height: 36px"
                @click="handleAddParams('roleItems')"
              >
                <i class="el-icon-circle-plus-outline" />
                添加通知策略
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_create">添加</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
        name: "",
        showName: "",
        desc: "",
        notMethodItems: [],
      },

      rules: {
        name: [
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

      typeOptions: [
        { label: "邮箱", value: "email" },
        { label: "短信", value: "message" },
        { label: "webhook", value: "webhook" },
        { label: "钉钉", value: "dingding" },
        { label: "企业微信", value: "wechat" },
      ],
      noticeOptions: [],
      templateOptions: [],
      senderOptions: [],

      createVisible: false,

      roleItems: [],

      typeName: "",
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

    handleAddNode(filed) {
      const obj = {
        id: nanoid(),
        type: "email",
        notice: "",
        template: "",
        sender: "",
      };
      this.ruleForm[filed].push(obj);
    },

    // 删除
    handleDeleteNode(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },

    handleAddNotice(type) {
      this.typeName = type;
      this.createForm = this.$options.data().createForm;
      this.createVisible = true;
    },
    handle_create() {},

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        showName: "",
        objName: "",
      };
      this.roleItems.push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.roleItems.splice(index, 1);
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
</style>