<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ "chaos" }}</span>
          <div style="float: right">
            <el-dropdown trigger="click">
              <el-button class="margin-left10">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleAddCluster">
                  添加集群
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleUpdateInfo">
                  更新基本信息
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleRemoveCluster">
                  移除集群
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleDeleteProject">
                  删除项目
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
            <span v-if="item.label === '状态'">
              <i
                :class="
                  item.value === '正常'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
                style="color: #67c23a"
              />
              <span> {{ item.value }} </span>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="update(item)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header style="display: flex">
        <div class="card-title left-header">
          <span>配额</span>
        </div>
        <div style="margin-left: 79%">
          <el-button @click="handleUpdateQuota">更新配额</el-button>
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

    <!-- 日志策略 -->
    <el-dialog
      :title="title"
      @close="cancelupdateLogDialog"
      :visible.sync="updateLogDialog"
      width="60%"
    >
      <line-alert :content="content" />

      <el-form
        ref="updateLogForm"
        :model="updateLogForm"
        :rules="updateLogRules"
        label-width="135px"
      >
        <el-form-item label="日志策略">
          <el-switch v-model="updateLogForm.logPolicy"></el-switch>
        </el-form-item>

        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            开启日志策略后，按照项目策略执行
          </el-descriptions-item>
        </el-descriptions>
        <el-form-item
          label="日志保留时间"
          prop="logRemain"
          v-if="updateLogForm.logPolicy == true"
        >
          <el-input-number
            v-model="updateLogForm.logRemain"
            @change="handleChange"
            :min="1"
            :max="30"
          />
        </el-form-item>
        <el-descriptions
          size="small"
          :colon="false"
          :contentStyle="rowCenter"
          v-if="updateLogForm.logPolicy == true"
        >
          <el-descriptions-item> 日志数据最多保留30天 </el-descriptions-item>
        </el-descriptions>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleupdateLog"> 更新 </el-button>
        <el-button @click="updateLogDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 添加集群 -->
    <el-dialog
      title="添加集群"
      @close="addClusterVisible = false"
      :visible.sync="addClusterVisible"
      width="60%"
    >
      <line-alert :content="content_addCluster" />

      <el-form
        ref="addClusterForm"
        :model="addClusterForm"
        :rules="addClusterRules"
        label-width="135px"
      >
        <el-form-item label="项目">
          {{ "chaos" }}
        </el-form-item>

        <el-form-item label="集群" prop="cluster">
          <el-select
            @focus="setMinWidthEmpty"
            style="width: 91%"
            v-model="addClusterForm.cluster"
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

        <el-form-item label="CPU">
          <el-col :span="7">
            <el-input v-model="addClusterForm.cpu">
              <template slot="append">核</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="内存">
          <el-col :span="7">
            <el-input v-model="addClusterForm.memory">
              <template slot="append">Gi</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="存储">
          <el-col :span="7">
            <el-input v-model="addClusterForm.storage">
              <template slot="append">Gi</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Pods 数">
          <el-col :span="11">
            <el-input v-model="addClusterForm.pods"> </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="PVC 数">
          <el-col :span="11">
            <el-input v-model="addClusterForm.pvc"> </el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_addCluster">添加</el-button>
        <el-button @click="addClusterVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 更新基本信息 -->
    <el-dialog
      title="更新基本信息"
      @close="updateInfoVisible = false"
      :visible.sync="updateInfoVisible"
      width="60%"
    >
      <el-form
        ref="updateInfoForm"
        :model="updateInfoForm"
        :rules="updateInfoRules"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          {{ "chaos" }}
        </el-form-item>

        <el-form-item label="显示名称" prop="showName">
          <el-input v-model="updateInfoForm.showName" />
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input v-model="updateInfoForm.desc" type="textarea" rows="4" />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handle_updateInfo">更新</el-button>
        <el-button @click="updateInfoVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 移除集群 -->
    <el-dialog
      @close="removeClusterVisible = false"
      :visible.sync="removeClusterVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          移除集群
        </span>
      </div>

      <div style="margin-bottom: 10px">
        确定移除项目"chaos"下的集群吗？移除后，仍会保留集群在该项目下的资源。如需清理，请复制以下资源清理命令，并在被移除集群下进行手动清理
      </div>
      <el-input v-model="command"> </el-input>

      <div style="margin-top: 10px">请输入1个集群名称确定移除</div>

      <el-input v-model="command"> </el-input>

      <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
        <el-descriptions-item>
          该项目下的集群有："region"
        </el-descriptions-item>
      </el-descriptions>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_removeCluster">移除</el-button>
        <el-button @click="removeClusterVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除项目 -->
    <el-dialog
      @close="deleteProjectVisible = false"
      :visible.sync="deleteProjectVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除项目
        </span>
      </div>

      <div style="margin-bottom: 10px">
        确定删除项目 "chaos"
        吗？删除后，仍会保留项目下资源。如需清理项目下资源，请复制以下资源清理命令，并在集群
        region 下进行手动清理。
      </div>
      <el-input v-model="command"> </el-input>

      <div style="margin-top: 10px">请输入 chaos 确定删除</div>

      <el-input v-model="command"> </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_removeCluster">删除</el-button>
        <el-button @click="deleteProjectVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "BaseInfo",
  components: { LineAlert },
  props: {},
  data() {
    return {
      content:
        "默认项目日志策略按照全局策略执行，项目下设置或开启日志策略后，将按照项目日志策略执行，原有日志将无法查询。",
      content_addCluster:
        "支持添加独立集群或联邦集群，不支持已加入到该项目下的集群成员对应的联邦集群，多选集群时默认设置同样配额。",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      title: "",
      updateLogDialog: false,
      updateLogForm: {
        logPolicy: false,
        logRemain: 7,
      },
      updateLogRules: {
        logRemain: [
          { required: true, message: "请选择日志保留时间", trigger: "change" },
        ],
      },

      baseInfoData: [
        {
          label: "显示名称",
          value: "",
        },
        {
          label: "创建人",
          value: "admin@cpass.io",
        },
        {
          label: "状态",
          value: "正常",
        },
        {
          label: "创建于",
          value: "2023-02-15 15:41:56",
        },
        {
          label: "项目管理员",
          value: "",
        },
        {
          label: "更新时间",
          value: "2023-02-15",
        },

        {
          label: "日志策略",
          value: "全局策略",
          afterIcon: "el-icon-edit",
        },

        {
          label: "描述",
          value: "",
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

      addClusterVisible: false,
      addClusterForm: {
        cluster: "",
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },
      addClusterRules: {
        cluster: [{ required: true, message: "请选择集群", trigger: "blur" }],
      },
      clusterOptions: [
        { label: "global", value: "global" },
        { label: "region", value: "region" },
      ],

      updateInfoVisible: false,
      updateInfoForm: {
        showName: "",
        desc: "",
      },
      updateInfoRules: {},

      removeClusterVisible: false,
      command: "",

      deleteProjectVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
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

    handleChange() {},

    update(obj) {
      this.updateLogDialog = true;
      this.updateLogForm.showName = obj.value;
      this.title = "更新日志策略";
    },
    cancelupdateLogDialog() {
      this.updateLogDialog = false;
    },
    handleupdateLog() {},

    handleAddCluster() {
      this.addClusterVisible = true;
    },
    handle_addCluster() {},

    handleUpdateInfo() {
      this.updateInfoVisible = true;
    },
    handle_updateInfo() {},

    handleRemoveCluster() {
      this.removeClusterVisible = true;
    },
    handle_removeCluster() {},

    handleDeleteProject() {
      this.deleteProjectVisible = true;
    },
    handle_deleteProject() {},

    handleUpdateQuota() {},
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