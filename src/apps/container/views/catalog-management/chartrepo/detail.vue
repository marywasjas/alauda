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
        <!-- 项目 -->
        <span style="font-size: 18px; font-weight: 500; margin-bottom: 14px">
          项目
        </span>
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in projectData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header>
            <div class="titleStyle">
              <div style="font-size: 22px">应用模板</div>
              <div class="titleStyle">
                <el-input
                  style="margin-right: 10px"
                  prefix-icon="el-icon-search"
                  placeholder="按名称过滤"
                  v-model="searchName"
                  @keyup.enter.native="handleSerach"
                />
                <el-button @click="handleAddTemp">添加模板</el-button>
                <el-button type="primary" @click="handleSyncTemp">
                  同步模板
                </el-button>
              </div>
            </div>
          </header>

          <div class="row-bg">
            <div class="item" v-for="item in appTempData" :key="item.label">
              <div class="buttonClass">
                <div>
                  <svg-icon
                    icon-class="skill"
                    style="width: 260px; height: 60px"
                  />
                </div>
                <div class="wordStyle">{{ item.label }}</div>
                <div
                  class="wordStyle"
                  style="font-size: 13px; color: rgba(150, 152, 152)"
                  :title="item.desc"
                >
                  {{ item.desc }}
                </div>
                <div class="wordStyle" style="font-size: 12px">
                  {{ item.version[0].vers }}
                  <el-tooltip placement="bottom-end" effect="light">
                    <div slot="content">
                      <div v-for="ele in item.version" :key="ele.vers">
                        {{ ele.vers }}
                      </div>
                    </div>
                    <i class="el-icon-arrow-down el-icon--right" />
                  </el-tooltip>
                </div>
                <el-dropdown
                  style="position: absolute; top: 10px; right: 15px"
                  trigger="click"
                >
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleDeploy(item)"
                      >部署</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handleManageVersion(item.version)"
                      >管理版本</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handleDeleteTemp(item.label)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </BaseCard>
      </el-col>
    </el-row>

    <!-- 更新 -->
    <el-dialog
      :title="title"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
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
        <el-button @click="updateVisible = false">取消</el-button>
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
        <el-input v-model="command" @input="handleCommand"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="handle_delete"
          :disabled="deleteDisable"
        >
          删除
        </el-button>
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 添加模板 -->
    <el-dialog
      title="添加模板"
      @close="addTempVisible = false"
      :visible.sync="addTempVisible"
      width="70%"
    >
      <div slot="title">
        <span style="font-size: 18px">添加模板</span>
        <el-tooltip effect="dark" class="item" placement="top">
          <template slot="content">
            <div style="max-width: 400px">可添加新模板或新版本模板</div>
          </template>
          <i class="el-icon-question margin-left10 question-icon" />
        </el-tooltip>
      </div>
      <el-table
        :data="tempData"
        style="width: 100%"
        header-row-class-name="headerStyle"
        empty-text="无应用模板"
      >
        <el-table-column
          v-for="col in tableColumnList_temp"
          :key="col.id"
          :label="col.label"
          :show-overflow-tooltip="col['show-overflow-tooltip']"
          :sortable="col.sortable"
          :width="col.width"
          :fixed="col.fixed"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row[col.id] }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
        :file-list="fileList"
      >
        <el-button type="primary" style="margin-top: 20px">上传模板</el-button>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_addTemp">添加</el-button>
      </div>
    </el-dialog>

    <!-- 管理版本 -->
    <el-dialog
      title="管理版本"
      @close="manageVersionVisible = false"
      :visible.sync="manageVersionVisible"
      width="70%"
    >
      <div slot="title">
        <span style="font-size: 18px">管理版本</span>
        <el-tooltip effect="dark" class="item" placement="top">
          <template slot="content">
            <div style="max-width: 400px">可添加新模板或新版本模板</div>
          </template>
          <i class="el-icon-question margin-left10 question-icon" />
        </el-tooltip>
      </div>
      <el-table
        :data="manageVersion"
        style="width: 100%"
        header-row-class-name="headerStyle"
      >
        <el-table-column
          v-for="col in manageVersionCols"
          :key="col.id"
          :label="col.label"
          :show-overflow-tooltip="col['show-overflow-tooltip']"
          :sortable="col.sortable"
          :width="col.width"
          :fixed="col.fixed"
        >
          <template slot-scope="scope">
            <div v-if="col.id == 'status'">
              <i
                :class="
                  scope.row.status === '已就绪'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              {{ scope.row[col.id] }}
            </div>
            <div v-else-if="col.id === 'delete'">
              <span
                class="cursor-pointer"
                @click="handleDeleteVers(scope.row.vers)"
              >
                删除
              </span>
            </div>
            <div v-else>
              {{ scope.row[col.id] ? scope.row[col.id] : "-" }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
        :file-list="fileList"
      >
        <el-button type="primary" style="margin-top: 20px">上传模板</el-button>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_addVersion">添加</el-button>
      </div>
    </el-dialog>

    <delete-remove-dialog
      :formVisible="formVisible"
      :deleteOrRemove="buttonText"
      width="40%"
      :titleContext="titleContext"
      :nodeText="nodeText"
      v-on:closeFormDialog="closeFormDialog"
      v-on:submitForm="submitForm"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import DeleteRemoveDialog from "@/apps/container/views/components/DeleteRemoveDialog.vue";

export default {
  name: "BaseInfo",
  components: { DeleteRemoveDialog },
  props: {},
  data() {
    return {
      formVisible: false,
      titleContext: "",
      nodeText: "",
      buttonText: "",

      fileList: [],

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
      title: "",

      baseInfoData: [
        {
          label: "类型",
          value: "Local",
        },
        {
          label: "上次同步时间",
          value: "2023-05-06 14:00:00",
        },
        {
          label: "创建时间",
          value: "2022-10-24 14:00:00",
        },
      ],
      projectData: [
        {
          label: "分配项目",
          value: "所有项目",
        },
      ],

      deleteVisible: false,
      deleteTitle: "",
      command: "",
      deleteDisable: true,

      updateVisible: false,
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

      searchName: "",

      addTempVisible: false,
      tableColumnList_temp: [
        { id: "appTemp", label: "应用模板" },
        { id: "version", label: "版本" },
        { id: "status", label: "状态" },
        { id: "guard", label: "守护者" },
        { id: "time", label: "更新时间" },
      ],
      tempData: [],

      appTempData: [
        {
          label: "chartmuseum",
          desc: "Host your own Helm Chart Repository",
          version: [
            {
              vers: "2.15.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "docker-registry",
          desc: "A Helm chart for Docker Registry",
          version: [
            {
              vers: "v3.2.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "elasticsearch",
          desc: "Elastic helm chart for Elasticsearch",
          version: [
            {
              vers: "7.8.1",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
            {
              vers: "7.8.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: false,
            },
          ],
        },
        {
          label: "femas",
          desc: "A Helm chart fro Femas",
          version: [
            {
              vers: "v2.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "pmem-redis",
          desc: "Chart for PMEM Redis",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "zookeeper",
          desc: "Zookeeper是一个分布式的应用程序协调服务，可以为分布式程序提供的功能包括：配置维护、域名服务、分布式同步、组服务等",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
      ],

      manageVersionVisible: false,
      manageVersion: [],
      manageVersionCols: [
        { label: "版本", id: "vers" },
        { label: "状态", id: "status" },
        { label: "守护者", id: "maintainer" },
        { label: "更新时间", id: "time" },
        { label: "", id: "delete", width: "60px" },
      ],
    };
  },

  created() {
    this.detailTitle = this.$route.query.name;
  },

  methods: {
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，
    //     若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
      this.updateVisible = true;
    },
    handle_update() {},

    handleDelete() {
      this.deleteTitle = this.detailTitle;
      this.deleteVisible = true;
    },
    handle_delete() {},

    handleSerach() {},

    handleAddTemp() {
      this.addTempVisible = true;
    },
    handle_addTemp() {},

    handleSyncTemp() {},

    handleDeploy(obj) {
      sessionStorage.setItem("tempVersion", JSON.stringify(obj));
      this.$router.push({
        path: "/catalog-management/chartrepo/deploy",
        query: { name: obj.label + "." + this.detailTitle },
      });
    },

    handleCommand(val) {
      if (this.command == this.detailTitle) {
        this.deleteDisable = false;
      } else {
        this.deleteDisable = true;
      }
    },

    handleDeleteTemp(title) {
      this.formVisible = true;
      this.titleContext = `确定删除模板"${title}"吗？`;
      this.buttonText = "删除";
    },

    closeFormDialog() {
      this.formVisible = false;
    },

    submitForm() {},

    handleDeleteVers(title) {
      this.formVisible = true;
      this.titleContext = `确定删除此模板版本 ${title} 吗？`;
      this.nodeText = `删除后模板版本对应的模板应用将无法更新`;
      this.buttonText = "删除";
    },

    handleManageVersion(versionArr) {
      this.manageVersionVisible = true;
      this.manageVersion = versionArr;
    },

    handle_addVersion() {},
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
    padding: 20px 20px;
    background-color: #f9fafc;
    margin-top: 20px;

    display: grid;
    grid-template-columns: repeat(3, calc(33.33% - 13px));
    grid-gap: 20px;
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
.titleStyle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttonClass {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  width: 260px;
  height: 29px;
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>