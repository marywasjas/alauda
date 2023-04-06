<template>
  <div class="calculation-container-group">
    <div class="detail-header">
      <tab-header
        :name="name"
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
      </tab-header>
    </div>
    <component :is="comName" />

    <!-- 更新节点标签 -->
    <el-dialog
      title="更新节点标签"
      @close="cancelNodeUpdate"
      :visible.sync="updateNodeVisible"
      width="70%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="nodeUpdateForm"
          :model="nodeUpdateForm"
          :rules="nodeUpdateRules"
          label-width="125px"
        >
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <!-- 1 -->
              <div style="padding-top: 15px">
                <span style="margin-left: 20px">键</span>
                <span style="margin-left: 250px">值</span>
              </div>
              <!-- 2 -->
              <div class="grid-content bg-purple">
                <div v-if="nodeUpdateForm.nodeUpdateItems.length > 0">
                  <div
                    v-for="(domain, index) in nodeUpdateForm.nodeUpdateItems"
                    :key="domain.id"
                    class="margin-bottom10 item-div"
                  >
                    <el-row>
                      <el-col :span="10" style="margin-left: -120px">
                        <el-form-item>
                          <el-input
                            v-model="domain.key"
                            @focus="setMinWidthEmpty"
                            style="width: 100%"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12" style="margin-left: -80px">
                        <el-form-item>
                          <el-input
                            v-model="domain.value"
                            style="width: 100%"
                          />
                        </el-form-item>
                      </el-col>

                      <el-col
                        :span="1"
                        style="padding-left: 10px; padding-top: 10px"
                      >
                        <div>
                          <i
                            class="el-icon-remove-outline cursor-pointer"
                            @click="
                              handleDeleteLabel(
                                'nodeUpdateItems',
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

                <div class="flex-center">
                  <div
                    class="cursor-pointer text-center hover-div"
                    style="flex: 1; padding: 10px 0"
                    @click="handleAddLabel('nodeUpdateItems')"
                  >
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate"> 确定 </el-button>
        <el-button @click="updateNodeVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 设置污点 -->
    <el-dialog
      title="设置污点"
      @close="cancelSetSpot"
      :visible.sync="setSpotVisible"
      width="70%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="setSpotForm"
          :model="setSpotForm"
          :rules="setSpotRules"
          label-width="125px"
        >
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <!-- 1 -->
              <div style="padding-top: 15px">
                <span style="margin-left: 25px">键</span>
                <span style="margin-left: 245px">值</span>
                <span style="margin-left: 255px">类型</span>
              </div>
              <!-- 2 -->
              <div class="grid-content bg-purple">
                <div v-if="setSpotForm.setSpotItems.length > 0">
                  <div
                    v-for="(domain, index) in setSpotForm.setSpotItems"
                    :key="domain.id"
                    class="margin-bottom10 item-div"
                  >
                    <el-row style="display: flex">
                      <el-col style="margin-left: -120px">
                        <el-form-item>
                          <el-input
                            v-model="domain.key"
                            @focus="setMinWidthEmpty"
                            style="width: 100%"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>

                      <el-col style="margin-left: -110px">
                        <el-form-item>
                          <el-input
                            v-model="domain.value"
                            style="width: 100%"
                          />
                        </el-form-item>
                      </el-col>

                      <el-col style="margin-left: -110px">
                        <el-form-item>
                          <el-select
                            v-model="setSpotForm.type"
                            @focus="setMinWidthEmpty"
                            style="width: 95%"
                          >
                            <el-option
                              v-for="item in typeOptions"
                              :key="item.value"
                              :value="item.value"
                              :label="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col
                        :span="1"
                        style="padding-left: 10px; padding-top: 10px"
                      >
                        <div>
                          <i
                            class="el-icon-remove-outline cursor-pointer"
                            @click="
                              handleDeleteSetSpot('setSpotItems', domain, index)
                            "
                          />
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>

                <div class="flex-center">
                  <div
                    class="cursor-pointer text-center hover-div"
                    style="flex: 1; padding: 10px 0"
                    @click="handleAddSetSpot('setSpotItems')"
                  >
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSet"> 确定 </el-button>
        <el-button @click="setSpotVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 停止调度 -->
    <el-dialog
      title="停止调度"
      @close="cancelStop"
      :visible.sync="stopDispatchVisible"
      width="30%"
    >
      <div class="el-dialog-div">
        <span style="margin-left: 50px">确定将此节点设定为不可调度状态</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleStop"> 确定 </el-button>
        <el-button @click="stopDispatchVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除节点 -->
    <el-dialog
      title="删除节点"
      @close="canceldelete"
      :visible.sync="deleteVisible"
      width="70%"
    >
      <span>{{
        "确定删除节点 " +
        this.deleteName +
        " (IP: " +
        this.deleteName +
        ") 吗? 该节点包含 19个 容器组。如需清理节点下的资源，请先下载清理脚本，节点删除成功后，需要登录到节点手动进行清理操作。"
      }}</span>

      <div class="el-dialog-div">
        <el-table
          :data="tableDelete.deleteData"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableDeleteCol"
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 确定 </el-button>
        <el-button @click="deleteVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 驱逐容器组 -->
    <el-dialog
      title="驱逐容器组"
      @close="cancelContainer"
      :visible.sync="containerVisible"
      width="70%"
    >
      <span>{{
        "确定驱逐节点 " +
        this.deleteName +
        " 上的所有容器组吗? 驱逐后，会把节点内的所有容器组 (不包含 DaemonSet 管理的容器组) 驱逐到集群内其他节点上，并设置该节点为不可调度状态。注意： 本地存储的容器组被驱逐后数据将丢失，请谨慎操作。该节点包含 14个容器组"
      }}</span>

      <div class="el-dialog-div">
        <el-table
          :data="tableDelete.deleteData"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableDeleteCol"
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_container"> 确定 </el-button>
        <el-button @click="containerVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Node from "./components/Node/Node.vue";
import Event from "./components/Event/Event.vue";
import Plugins from "./components/Plugins/Plugins.vue";
import clusterNet from "./components/clusterNet/clusterNet.vue";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import { nanoid } from "nanoid";

// import { tableColumnList, tableData } from "./constant/index";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Node,
    Event,
    Plugins,
    clusterNet,
    FoldableBlock,
  },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "ApiServer",
          name: "ApiServer",
          com: "Node",
        },
        {
          label: "Controller Manager",
          name: "Controller Manager",
          com: "Event",
        },
        {
          label: "Scheduler",
          name: "Scheduler",
          com: "BaseInfo",
        },
        {
          label: "ETCD",
          name: "ETCD",
          com: "Plugins",
        },
        {
          label: "集群网络",
          name: "clusterNet",
          com: "clusterNet",
        },
      ],
      activeName: "",
      tableDeleteCol: [
        {
          id: "name",
          label: "容器组名称",
          sortable: true,
          fixed: true,
        },
        {
          id: "space",
          label: "所属命名空间",
          sortable: true,
        },
      ],

      tableDelete: {
        deleteData: [
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
          { name: "chaosblade-box", space: "chaos-dev" },
        ],
      },
      deleteName: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      updateNodeVisible: false,
      nodeDialogVisible: false,
      setSpotVisible: false,
      stopDispatchVisible: false,
      deleteVisible: false,
      containerVisible: false,
      typeOptions: [
        {
          key: "NoSchedule",
          value: "NoSchedule",
        },
        {
          key: "PerferNoSchedule",
          value: "PerferNoSchedule",
        },

        {
          key: "NoExecute",
          value: "NoExcute",
        },
      ],
      // tableColumnList,
      // tableData,
      nodeForm: {
        nodeItems: [
          {
            id: nanoid(),
            selected: "",
            showName: "",
            ipv4: "",
            sship: "",
            netCard: "",
            type: "",
          },
        ],
        config: false,
        sshPort: "",
        node: "密码",
        nodeName: "",
        password: "",
        key: "",
        keyPassword: "",
      },
      nodeRules: {
        sshPort: [
          { required: true, message: "SSH 端口是必填项", trigger: "blur" },
        ],
        nodeName: [
          { required: true, message: "节点用户名是必填项", trigger: "blur" },
        ],
        key: [{ required: true, message: "私钥是必填项", trigger: "blur" }],
      },
      nodeUpdateForm: {
        nodeUpdateItems: [
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd54" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd64" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd74" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd84" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd94" },
          { id: nanoid(), key: "bate.kubernetes.io/arch", value: "amd104" },
        ],
      },
      nodeUpdateRules: {},

      setSpotForm: {
        setSpotItems: [
          {
            id: nanoid(),
            key: "node-role.kubernetes.io/master",
            value: "",
            type: "",
          },
        ],
      },
      setSpotRules: {},

      page: {
        total: 10,
        current: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    comName: function () {
      if (!this.activeName) return "";
      const item = this.tabList.filter((el) => el.name === this.activeName);
      return item[0].com;
    },
  },
  created() {
    // this.name = this.$route.query.name;
    this.desc = this.$route.query.desc;
    this.activeName = this.tabList[0].name;
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

    handelDetails(obj) {
      this.$router.push({
        name: "ClusterNodeDetail",
        query: { name: obj.name },
      });
    },
    // 搜索
    onSearch() {
      console.log("搜索");
    },

    handleCreateNode() {
      this.nodeDialogVisible = true;
    },

    // 取消dialog
    cancelDialog() {
      this.nodeDialogVisible = false;
    },

    handleCreate() {},

    handleAddNode(filed) {
      const obj = {
        id: nanoid(),
        selected: "",
        showName: "",
        ipv4: "",
        sship: "",
        netCard: "",
        type: "",
      };
      this.nodeForm[filed].push(obj);
    },

    // 删除
    handleDeleteNode(filed, item, index) {
      this.nodeForm[filed].splice(index, 1);
    },

    // ====================================================================
    handleUpdateLabel() {
      this.updateNodeVisible = true;
    },
    cancelNodeUpdate() {
      this.updateNodeVisible = false;
    },
    handleUpdate() {},
    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.nodeUpdateForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.nodeUpdateForm[filed].splice(index, 1);
    },

    // ====================================================================
    handleContainer() {
      this.containerVisible = true;
    },

    cancelContainer() {
      this.containerVisible = false;
    },
    handle_container() {},
    // ====================================================================

    handleSetSpot() {
      this.setSpotVisible = true;
    },
    cancelSetSpot() {
      this.setSpotVisible = false;
    },
    handleSet() {},

    handleAddSetSpot(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
        type: "",
      };
      this.setSpotForm[filed].push(obj);
    },
    // 删除
    handleDeleteSetSpot(filed, item, index) {
      this.setSpotForm[filed].splice(index, 1);
    },
    // ====================================================================
    handleStopDispatch() {
      this.stopDispatchVisible = true;
    },
    cancelStop() {
      this.stopDispatchVisible = false;
    },
    handleStop() {},

    // ====================================================================

    handleDelete() {
      this.deleteVisible = true;
      this.deleteName = this.$route.query.name;
    },
    canceldelete() {
      this.deleteVisible = false;
    },
    handle_delete() {},

    changeActive(value) {
      this.activeName = value;
    },

    handelDelete() {
      const returnMsgList = [
        `确定删除${this.name}持久卷声明吗？删除后持久卷中的数据将被清除。`,
        `请输入${this.name}确定删除`,
      ];
      const newData = [];
      const h = this.$createElement;
      for (const i in returnMsgList) {
        newData.push(h("p", null, returnMsgList[i]));
      }
      this.$prompt(h("div", null, newData), "删除持久卷声明", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "error",
        inputValidator: (val) => {
          if (val === this.name) {
            return true;
          }
          return false;
        },
        inputErrorMessage: "输入不正确",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
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
.calculation-container-group {
  margin-top: 20px;
}
</style>