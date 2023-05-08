<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ detailTitle }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button type="primary" class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate">
                  更新
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <el-divider></el-divider>

      <section class="component-div">
        <!-- 基本信息 -->
        <span style="font-size: 18px; font-weight: 500; margin-bottom: 14px">
          基本信息
        </span>
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
              <!-- <i :class="item.afterIcon" @click="update(item)" /> -->
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <!-- 更新 -->
    <el-dialog
      :title="title"
      @close="createVisible = false"
      :visible.sync="createVisible"
      width="60%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        :rules="updateRules"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          <span>{{ updateForm.name }}</span>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="4"
            v-model="updateForm.desc"
            style="width: 80%"
          />
        </el-form-item>

        <el-form-item label="类型">
          <span>{{ updateForm.type }}</span>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                Chart、Git、SVN：存放在远端仓库上的 Chart 模板。<br />
                Local：本地集群上的 Chart
                模板仓库，用于存放客户本地上传的模板、同时支持在本地删除模板。
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item
          label="仓库地址"
          prop="storeAddress"
          v-if="updateForm.type == 'Chart'"
        >
          <el-input v-model="updateForm.storeAddress" style="width: 80%" />
        </el-form-item>

        <el-form-item
          label="代码仓库地址"
          prop="codeAddress"
          v-if="updateForm.type != 'Chart' && updateForm.type != 'Local'"
        >
          <el-input v-model="updateForm.codeAddress" style="width: 80%" />
        </el-form-item>

        <el-form-item
          label="目录"
          prop="catalog"
          v-if="updateForm.type != 'Chart' && updateForm.type != 'Local'"
        >
          <el-input v-model="updateForm.catalog" style="width: 80%" />
        </el-form-item>

        <el-form-item label="用户名" v-if="updateForm.type != 'Local'">
          <el-input v-model="updateForm.userName" style="width: 80%" />
        </el-form-item>

        <el-form-item label="密码" v-if="updateForm.type != 'Local'">
          <el-input v-model="updateForm.password" style="width: 80%" />
        </el-form-item>

        <el-form-item label="分配项目">
          <el-radio-group v-model="updateForm.project">
            <el-radio-button label="allProject">所有项目</el-radio-button>
            <el-radio-button label="specProject">指定项目</el-radio-button>
            <el-radio-button label="notassign">不分配</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="指定项目"
          v-if="updateForm.project == 'specProject'"
          prop="specify"
        >
          <el-select
            v-model="updateForm.specify"
            @focus="setMinWidthEmpty"
            multiple
            style="width: 80%"
          >
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_update">更新</el-button>
        <el-button @click="createVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      @close="deleteVisible = false"
      :visible.sync="deleteVisible"
      width="65%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除模板仓库
        </span>
      </div>
      <div class="el-dialog-div">
        <div style="margin-bottom20">
          {{
            `确定删除模板仓库 ${deleteTitle} 吗？ 删除后，通过该仓库模板导入的所有的应用模板将同时被删除，已创建的应用不受影响`
          }}
        </div>
        <div style="margin-top: 20px">
          请输入 <span style="color: red">{{ deleteTitle }}</span> 确认删除
        </div>
        <el-input v-model="command"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_delete"> 删除 </el-button>
        <el-button @click="deleteVisible = false">取消</el-button>
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
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      detailTitle: "",

      baseInfoData: [
        {
          label: "显示名称",
          value: "m",
        },
        {
          label: "类型",
          value: "邮箱",
        },
        {
          label: "描述",
          value: "",
        },
        {
          label: "创建时间",
          value: "2022-10-24 14:00:00",
        },
      ],

      createVisible: false,
      deleteVisible: false,
      deleteTitle: "",
      command: "",

      updateForm: {
        name: "",
        desc: "",
        type: "Chart",
        storeAddress: "",
        userName: "",
        password: "",
        project: "notassign",
        codeAddress: "",
        catalog: "",
        specify: "",
      },
      updateRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        storeAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        codeAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        catalog: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        specify: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      projectOptions: [
        { label: "bass(云信)", value: "bass" },
        { label: "chaos", value: "chaos" },
        { label: "cpaas-dev", value: "cpaas-dev" },
        { label: "cpaas-system", value: "cpaas-system" },
        { label: "ebaims(集团审计信息管理系统)", value: "ebaims" },
        { label: "ebump(统一监控)", value: "ebump" },
        { label: "faq(智能问答)", value: "faq" },
      ],
      title: "",
    };
  },

  created() {
    this.detailTitle = this.$route.query.name;
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

    handleUpdate() {
      this.updateForm = {
        name: "public-charts",
        desc: "",
        type: "Local",
        storeAddress: "",
        userName: "",
        password: "",
        project: "allProject",
        codeAddress: "",
        catalog: "",
        specify: "",
      };
      this.title = `更新 ${this.detailTitle}`;
      this.createVisible = true;
    },
    handle_update() {},

    handleDelete() {
      this.deleteTitle = this.detailTitle;
      this.deleteVisible = true;
    },
    handle_delete() {},
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
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>