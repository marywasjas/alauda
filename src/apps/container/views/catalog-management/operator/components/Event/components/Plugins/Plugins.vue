<template>
  <div class="calculation-container-group">
    <BaseCard>
      <header>
        <div class="card-title left-header" />
      </header>
      <section>
        <div class="flex-center" style="float: right; margin-bottom: 15px">
          <el-input
            placeholder="按名称/节点IP /节点标签过滤"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>

        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <!-- <el-table-column fixed prop="date" label="名称" >
          </el-table-column> -->
            <el-table-column
              v-for="col in tableColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'name'" class="cursor-pointer">
                  <span @click="handelDetails(scope.row)">
                    {{ scope.row[col.id] }}
                  </span>
                </div>

                <div v-else-if="col.id === 'total'">
                  <p class="margin0">
                    <i class="el-icon-cpu primary2-text" />
                    {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                  </p>
                  <p class="margin0">
                    <i class="el-icon-bank-card primary-text" />
                    {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                  </p>
                </div>
                <div v-else-if="col.id === 'operation'" class="operation-cell">
                  <el-dropdown>
                    <i class="el-icon-more" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        command="update"
                        @click.native="handleUpdateLabel(scope.row)"
                      >
                        更新配置参数
                      </el-dropdown-item>

                      <el-dropdown-item
                        command="update"
                        @click.native="handleSetSpot(scope.row)"
                      >
                        卸载
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>

    <!-- 添加节点 -->
    <el-dialog
      title="添加节点"
      @close="cancelDialog"
      :visible.sync="nodeDialogVisible"
      width="70%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="nodeForm"
          :model="nodeForm"
          :rules="nodeRules"
          label-width="125px"
        >
          <el-form-item label="节点">
            <el-row type="flex" class="row-bg">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div v-if="nodeForm.nodeItems.length > 0">
                    <div
                      v-for="(domain, index) in nodeForm.nodeItems"
                      :key="domain.id"
                      class="margin-bottom10 item-div"
                    >
                      <el-row>
                        <el-col :span="11">
                          <el-form-item
                            label="类型"
                            label-width="100px"
                            prop="seleted"
                          >
                            <el-select
                              v-model="domain.selected"
                              @focus="setMinWidthEmpty"
                              style="width: 100%"
                            >
                              <el-option label="控制节点" value="控制节点" />
                              <el-option label="计算节点" value="计算节点" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="11" style="padding-left: 10px">
                          <el-form-item label="显示名称" label-width="100px">
                            <el-input
                              v-model="domain.showName"
                              placeholder="显示名称"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="11">
                          <el-form-item
                            label="IPv4 地址"
                            label-width="100px"
                            prop="ipv4"
                          >
                            <el-input
                              v-model="domain.ipv4"
                              placeholder="请输入IPv4 地址"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="11" style="padding-left: 10px">
                          <el-form-item label="SSH 连接 IP" label-width="100px">
                            <el-input
                              v-model="domain.sship"
                              placeholder="默认与IPv4 地址相同"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="1">
                          <el-tooltip
                            effect="dark"
                            class="item"
                            placement="top"
                          >
                            <template slot="content">
                              <div style="max-width: 450px">
                                SSH 连接时使用的 IP，平台默认使用 IPv4 地址 SSH
                                连接部署，当无法通过 IPv4
                                地址直连时，需要填写能直连的 IPv4
                                对应的外网地址或者 NAT 地址
                              </div>
                            </template>
                            <i
                              class="
                                el-icon-question
                                margin-left10
                                question-icon
                              "
                            />
                          </el-tooltip>

                          <!-- <el-form-item label="网卡名称" label-width="100px">
                            <el-input
                              v-model="domain.netCard"
                              placeholder="请输入需要使用的网卡"
                            />
                          </el-form-item> -->
                        </el-col>
                        <el-col :span="11" style="padding-left: 10px">
                          <el-form-item label="设置" label-width="100px">
                            <el-checkbox-group v-model="domain.type">
                              <el-checkbox label="可部署应用" name="type" />
                              <el-checkbox label="GPU" name="type" />
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1" style="padding-left: 10px">
                          <div>
                            <i
                              class="el-icon-remove-outline cursor-pointer"
                              @click="
                                handleDeleteNode('nodeItems', domain, index)
                              "
                            />
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div v-else>
                    <p style="margin-left: 100px"></p>
                  </div>
                  <div class="flex-center">
                    <div
                      class="cursor-pointer text-center hover-div"
                      style="flex: 1; margin-top: -10px"
                      @click="handleAddNode('nodeItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="可用性检查配置">
            <el-checkbox v-model="nodeForm.config">
              跳过 "警告" 检查项
            </el-checkbox>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                可用性检查详情介绍请参考
              </el-descriptions-item>
            </el-descriptions>
          </el-form-item>

          <el-form-item label="SSH 端口" prop="sshPort" style="width: 70%">
            <el-input v-model="nodeForm.sshPort" />
          </el-form-item>

          <el-form-item label="节点认证" style="width: 70%">
            <el-radio-group v-model="nodeForm.node">
              <el-radio-button label="密码"></el-radio-button>
              <el-radio-button label="秘钥"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="用户名" prop="nodeName" style="width: 70%">
            <el-input v-model="nodeForm.nodeName" placeholder="节点用户名" />
          </el-form-item>

          <el-form-item
            label="密码"
            v-if="nodeForm.node == '密码'"
            style="width: 70%"
          >
            <el-input
              v-model="nodeForm.password"
              placeholder="节点密码"
              show-password
            />
          </el-form-item>

          <el-form-item
            label="私钥"
            prop="key"
            v-if="nodeForm.node == '秘钥'"
            style="width: 70%"
          >
            <el-input type="textarea" v-model="nodeForm.key" />
          </el-form-item>

          <el-form-item
            label="私钥密码"
            v-if="nodeForm.node == '秘钥'"
            style="width: 70%"
          >
            <el-input v-model="nodeForm.keyPassword" show-password />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate"> 添加 </el-button>
        <el-button @click="nodeDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

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
      <div class="el-dialog-div">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <el-table-column
            v-for="col in tableColumnList"
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
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
// import ProgressCard from "./ProgressCard.vue";

import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { FoldableBlock },

  props: {},
  data() {
    return {
      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],
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
      tableColumnList,
      tableData,
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
    },
    canceldelete() {
      this.deleteVisible = false;
    },
    handle_delete() {},
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
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
