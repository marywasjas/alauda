<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ this.userName }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="update"
                  @click.native="handlePassword(infoForm, '重置密码')"
                >
                  重置密码
                </el-dropdown-item>
                <el-dropdown-item
                  command="delete"
                  @click.native="handleUpdatePeriod(infoForm, '更新有效期')"
                >
                  更新有效期
                </el-dropdown-item>
                <el-dropdown-item
                  command="delete"
                  @click.native="handleActive(infoForm)"
                >
                  激活
                </el-dropdown-item>
                <el-dropdown-item
                  command="delete"
                  @click.native="handleDisable(infoForm)"
                >
                  禁用
                </el-dropdown-item>
                <el-dropdown-item
                  command="delete"
                  @click.native="handleDelete(infoForm)"
                >
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              {{ item.value }}
              <i :class="item.afterIcon" @click="update(item)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header style="display: flex">
        <div class="card-title left-header">
          <span>角色列表</span>
        </div>
        <div style="margin-left: 79%">
          <el-button @click="handleAddRole"> 添加角色 </el-button>
        </div>
      </header>
      <section class="component-div">
        <el-table
          :data="table.tableData"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in table.cols"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
            :sortable="col.sortable"
            :width="col.width"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'project'">
                <div style="font-size: 12px; color: gray">项目</div>
                {{ scope.row[col.id] }}
              </div>
              <div v-else-if="col.id === 'remove'">
                <el-button type="text" @click="handleRemove(scope.row)"
                  >移除</el-button
                >
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>

    <el-dialog
      :title="title"
      @close="cancelUpdateNameDialog"
      :visible.sync="updateNameDialog"
      width="60%"
    >
      <el-form
        ref="updateNameForm"
        :model="updateNameForm"
        :rules="updateNameRules"
        label-width="135px"
      >
        <el-form-item label="用户名"> {{ userName }} </el-form-item>
        <div style="margin-top: 20px">
          <el-form-item label="显示名称">
            <el-input v-model="updateNameForm.showName"> </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateName"> 更新 </el-button>
        <el-button @click="updateNameDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      @close="cancelUpdateEmailDialog"
      :visible.sync="updateEmailDialog"
      width="60%"
    >
      <el-form
        ref="updateEmailForm"
        :model="updateEmailForm"
        :rules="updateEmailRules"
        label-width="135px"
      >
        <el-form-item label="用户名"> {{ userName }} </el-form-item>
        <div style="margin-top: 20px">
          <el-form-item label="邮箱">
            <el-input v-model="updateEmailForm.email"> </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateEmail"> 更新 </el-button>
        <el-button @click="updateEmailDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      @close="cancelPasswordDialog"
      :visible.sync="dialogPasswordVisible"
      width="60%"
    >
      <el-form
        ref="passwordForm"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="135px"
      >
        <el-form-item label="用户名">
          {{ passwordUser }}
        </el-form-item>

        <el-form-item label="密码类型">
          <el-radio-group v-model="passwordForm.radio">
            <el-radio-button label="随机"></el-radio-button>
            <el-radio-button label="自定义"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="新密码" v-if="passwordForm.radio == '随机'">
          <el-input
            v-model="passwordForm.input"
            show-password
            style="width: 70%"
          />
        </el-form-item>

        <el-form-item label="新密码" v-else>
          <el-input
            v-model="passwordForm.input2"
            show-password
            placeholder="必须包含英文字母、数字、特殊字符~!@#$%^&*()-_=+?..."
            style="width: 70%"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSet"> 重置 </el-button>
        <el-button @click="dialogPasswordVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      @close="cancelPeriodDialog"
      :visible.sync="dialogPeriodVisible"
      width="60%"
    >
      <el-form
        ref="periodForm"
        :model="periodForm"
        :rules="periodRules"
        label-width="135px"
      >
        <el-form-item label="用户名">
          {{ passwordUser }}
        </el-form-item>

        <el-form-item label="有效期">
          <el-radio-group v-model="periodForm.radio">
            <el-radio-button label="永久"></el-radio-button>
            <el-radio-button label="自定义"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="时间范围"
          v-if="periodForm.radio == '自定义'"
          prop="date"
        >
          <el-date-picker
            v-model="periodForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate"> 更新 </el-button>
        <el-button @click="dialogPeriodVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="dialogDisableVisible = false"
      :visible.sync="dialogDisableVisible"
      width="45%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ "确定" + " 禁用 " + "用户 " + '"' + this.passwordUser + '"吗？' }}
        </span>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handle_disable"> 禁用 </el-button>
        <el-button @click="dialogDisableVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="dialogDeleteVisible = false"
      :visible.sync="dialogDeleteVisible"
      width="45%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ "确定" + " 删除 " + "用户 " + '"' + this.passwordUser + '"吗？' }}
        </span>
        <br />
        <span style="text-align: center; display: block">
          删除后，将无法创建相同用户名的用户
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 删除 </el-button>
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="removeVisible = false"
      :visible.sync="removeVisible"
      width="55%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定移除该用户的"${removeRoleName}"角色吗？` }}
        </span>
        <br />
        <span style="text-align: center; display: block">
          移除后，将失去该角色在所有对应项目下的权限。
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_remove"> 移除 </el-button>
        <el-button @click="removeVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="addRoleVisible = false"
      :visible.sync="addRoleVisible"
      :title="title"
      width="60%"
    >
      <table border="0" style="width: 100%">
        <thead>
          <tr class="headerStyle">
            <th>
              <div class="cell">角色名称</div>
            </th>
            <th>
              <div class="cell">项目</div>
            </th>
            <th>
              <div class="cell">命名空间</div>
            </th>
            <th>
              <div class="cell">操作</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(domain, index) in roleItems" :key="domain.id">
            <td>
              <el-select
                v-model="domain.selectData.roleName"
                @change="handleRoleChange"
                size="small"
                placeholder="请选择角色"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in optionData.com1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select
                v-model="domain.selectData.project"
                @change="handleProjectChange"
                size="small"
                placeholder="请选择项目"
                @focus="setMinWidthEmpty"
                style="width: 100%"
                :disabled="projectDisable"
              >
                <el-option
                  v-for="item in optionData.com2[selectData.roleName]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select
                v-model="domain.selectData.space"
                @change="handleSpaceChange"
                size="small"
                placeholder="请选择命名空间"
                @focus="setMinWidthEmpty"
                style="width: 100%"
                :disabled="spaceDisable"
              >
                <el-option
                  v-for="item in optionData.com3[selectData.project]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </td>
            <td class="text-center">
              <el-button
                icon="el-icon-remove-outline"
                class="
                  cursor-pointer
                  margin-left10 margin-right10
                  margin-top:-10px
                "
                type="text"
                @click="handleDeleteParams('roleItems', domain, index)"
              />
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <div
                class="cursor-pointer text-center hover-div"
                @click="handleAddParams('roleItems')"
                style="height: 35px; line-height: 35px"
              >
                <i class="el-icon-circle-plus-outline" />
                添加
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd"> 添加 </el-button>
        <el-button @click="addRoleVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: {},
  props: {},
  data() {
    return {
      userName: "",
      title: "",
      updateNameDialog: false,
      updateNameForm: {
        showName: "",
      },
      updateNameRules: {},

      updateEmailDialog: false,
      updateEmailForm: {
        email: "",
      },
      updateEmailRules: {},

      passwordUser: "",

      infoForm: {
        showName: "SHOWNAME",
        password: "xxx-xxx-xxx",
        email: "SHOWNAME@ebchinatech",
        period: "永久",
        status: "正常",
        creator: "admin@cpass.io",
        userGroup: "未分组",
        createTime: "2023-02-15 15:41:56",
        source: "本地",
      },

      baseInfoData: [
        {
          label: "显示名称",
          value: "SHOWNAME",
          afterIcon: "el-icon-edit",
        },
        {
          label: "密码",
          value: "******",
        },
        {
          label: "邮箱",
          value: "SHOWNAME@ebchinatech.com",
          afterIcon: "el-icon-edit",
        },
        {
          label: "有效期",
          value: "永久",
        },
        {
          label: "状态",
          value: "正常",
        },
        {
          label: "创建人",
          value: "admin@cpass.io",
        },
        {
          label: "用户组",
          value: "未分组",
        },
        {
          label: "创建时间",
          value: "2023-02-15 15:41:56",
        },
        {
          label: "来源",
          value: "本地",
        },
      ],

      table: {
        tableData: [
          {
            roleName: "project-admin-system",
            roleType: "项目",
            project: "baas",
          },
        ],
        cols: [
          { label: "角色名称", id: "roleName" },
          { label: "角色类型", id: "roleType" },
          { label: "项目/命名空间", id: "project" },
          { label: "", id: "remove", width: "60px" },
        ],
      },

      dialogPasswordVisible: false,

      passwordForm: {
        radio: "随机",
        input: "password",
        input2: "",
      },
      passwordRules: {},

      dialogPeriodVisible: false,

      periodForm: {
        radio: "永久",
        date: "password",
      },

      periodRules: {
        date: [
          { required: true, message: "时间范围是必填项", trigger: "change" },
        ],
      },

      dialogDisableVisible: false,
      dialogDeleteVisible: false,

      addRoleVisible: false,

      projectDisable: true,
      spaceDisable: true,

      roleItems: [],

      optionData: {
        com1: [
          {
            value: "platform-admin-system",
            label: "platform-admin-system(平台管理员)",
          },
          {
            value: "platform-auditor-system",
            label: "platform-auditor-system(平台审计人员)",
          },
          {
            value: "project-admin-system",
            label: "project-admin-system(项目管理员)",
          },
          {
            value: "namespace-admin-system",
            label: "namespace-admin-system(命名空间管理员)",
          },
          {
            value: "platform-developer-system",
            label: "platform-developer-system(开发人员)",
          },
        ],

        com2: {
          "platform-admin-system": [],
          "platform-auditor-system": [],
          "project-admin-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
          "namespace-admin-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
          "platform-developer-system": [
            { value: "baas", label: "bass(云信)" },
            { value: "chaos", label: "chaos" },
            { value: "cpaas-dev", label: "cpass-dev" },
            { value: "cpaas-system", label: "cpaas-system" },
          ],
        },

        com3: {
          baas: [
            { value: "adminceshiorg1", label: "adminceshiorg1" },
            { value: "adminceshiorg2", label: "adminceshiorg2" },
            { value: "adminceshiorg3", label: "adminceshiorg3" },
            { value: "adminceshiorg4", label: "adminceshiorg4" },
          ],
          chaos: [{ value: "chaos-dev", label: "chaos-dev" }],
          "cpaas-dev": [
            {
              value: "cpaas-dev-multicluster",
              label: "cpaas-dev-multicluster",
            },
          ],
          "cpaas-system": [
            { value: "cpaas-system", label: "cpaas-system" },
            { value: "default", label: "default" },
            { value: "kube-system", label: "kube-system" },
          ],
        },
      },

      selectData: {},

      removeRoleName: "",
      removeVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.userName = this.$route.query.name;
  },
  mounted() {},
  methods: {
    update(obj) {
      if (obj.label == "显示名称") {
        this.updateNameDialog = true;
        this.updateNameForm.showName = obj.value;
        this.title = "更新显示名称";
      } else {
        this.updateEmailDialog = true;
        this.updateEmailForm.email = obj.value;
        this.title = "更新邮箱";
      }
    },
    cancelUpdateNameDialog() {
      this.updateNameDialog = false;
    },
    handleUpdateName() {},

    cancelUpdateEmailDialog() {
      this.updateEmailDialog = false;
    },
    handleUpdateEmail() {},

    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    // ======================================================
    cancelPasswordDialog() {
      this.dialogPasswordVisible = false;
    },

    handlePassword(obj, title) {
      this.title = title;
      this.dialogPasswordVisible = true;
      this.passwordUser = this.userName + " (" + obj.showName + ")";
    },
    handleSet() {
      this.dialogPasswordVisible = false;
    },

    cancelPeriodDialog() {
      this.dialogPeriodVisible = false;
    },

    handleUpdatePeriod(obj, title) {
      this.title = title;
      this.dialogPeriodVisible = true;
      this.passwordUser = this.userName + " (" + obj.showName + ")";
    },
    handleUpdate() {
      this.dialogPeriodVisible = false;
    },

    handleDisable(obj) {
      this.dialogDisableVisible = true;
      this.passwordUser = this.userName + " (" + obj.showName + ")";
    },
    handle_disable() {},

    handleDelete(obj) {
      this.dialogDeleteVisible = true;
      this.passwordUser = this.userName + " (" + obj.showName + ")";
    },

    handle_delete() {},

    handleAddRole() {
      this.addRoleVisible = true;
      this.title = "添加角色 " + "(用户名: " + this.userName + ")";
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
      this.roleItems.push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.roleItems.splice(index, 1);
    },

    handleRoleChange(val) {
      if (val) {
        this.selectData.space = "";
        this.projectDisable = false;
        if (this.optionData.com2[val][0]) {
          //根据第一个控件所选项确定第二个控件下拉内容的对象数组，并使默认为第一个数组项
          // this.selectData.project = this.optionData.com2[val][0].value;
          this.handleProjectChange();
        }
      } else {
        this.selectData.project = "";
        this.handleProjectChange();
      }
    },

    handleProjectChange(val) {
      var val = this.selectData.project;
      if (val) {
        this.spaceDisable = false;
        if (this.optionData.com3[val][0]) {
          // this.selectData.space = this.optionData.com3[val][0].value;
        }
      } else {
        this.selectData.space = "";
      }
    },

    handleSpaceChange() {},

    handleAdd() {},

    handleRemove(obj) {
      this.removeRoleName = obj.roleName;
      this.removeVisible = true;
    },

    handle_remove() {},
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