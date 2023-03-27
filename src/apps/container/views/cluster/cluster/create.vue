<template>
  <div class="create-container">
    <line-alert :content="content" />

    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="!isEdit">创建集群</span>
        </div>

        <div v-if="fillType == 'form'" class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="125px"
          >
            <!-- 1 名称 name -->
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

            <!-- 2 显示名称 showName -->
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

            <!-- 3 GPU -->
            <el-form-item label="GPU">
              <el-checkbox v-model="ruleForm.gpu"></el-checkbox>
              <!-- <br /> -->
              <!-- <el-select
                v-model="ruleForm.gpuSelect"
                v-if="ruleForm.gpu == true"
              >
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select> -->
            </el-form-item>

            <!-- 4 gpuSelect -->
            <el-form-item>
              <el-select
                v-if="ruleForm.gpu == true"
                v-model="ruleForm.gpuSelected"
              >
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select>
            </el-form-item>

            <!-- 5 Kubernetes -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="Kubernetes版本" prop="kubernetes">
                  <el-select
                    v-model="ruleForm.kubernetes"
                    @focus="setMinWidthEmpty"
                    style="width: 60%"
                  >
                    <el-option
                      label="v1.12.10 (Docker v20.10.7)"
                      value="docker"
                    />
                    <el-option
                      label="v1.12.10 (Containerd v1.4.6)"
                      value="containerd"
                    />
                  </el-select>
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    IPv4/v6双栈、服务网格依赖 Kubernetes
                    新版本，选择版本时需要充分考虑功能依赖 Kubernetes v1.21.*
                    支持 Containerd
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <!-- 6 ip/port -->
            <el-form-item label="集群地址">
              <el-row>
                <!-- 6.1 -->
                <el-col :span="14">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.clusterIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-col>
                <!-- 6.2 -->
                <el-col :span="8" style="padding-left: 10px">
                  <el-input
                    v-model="ruleForm.clusterPort"
                    :disabled="isVIP"
                    :placeholder="portPlaceholder"
                  >
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                集群对外访问地址，http协议，创建高可用集群时，需要填写负载均衡地址及其端口；创建单节点集群时，填写控制节点的
                IP
                或域名及其端口，若单节点集群有扩容为高可用集群需求请填写负载均衡地址及其端口；控制节点的
                IP 端口为 6443；
              </el-descriptions-item>
            </el-descriptions>

            <!-- 7 自建 VIP -->
            <el-form-item label="自建 VIP">
              <el-switch v-model="ruleForm.vip" @change="vipChange" />
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <p style="max-width: 400px">
                    采用 keepalived 实现集群地址高可用；<br />
                    keepalived 需要主机网络支持 VRRP (Virtual Router Redundancy
                    Protocol)，并且所有节点与 VIP 在同一子网
                  </p>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                使用自建 VIP ，集群地址要求填写一个与节点 IP 不同的空闲 IP ，此
                IP 需要和节点 IP 在同一子网
              </el-descriptions-item>
            </el-descriptions>

            <!-- 8 VRID -->
            <el-row v-if="ruleForm.vip == true">
              <el-col :span="22">
                <el-form-item label="VRID">
                  <el-input v-model="ruleForm.vrid" />
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    请输入自建 VIP 的虚拟路由 ID，填写范围：1~255。同一子网下
                    VRID 不能重复
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <!-- 9 镜像仓库 -->
            <el-form-item label="镜像仓库">
              <el-radio-group v-model="ruleForm.repository">
                <el-radio-button label="平台默认"></el-radio-button>
                <el-radio-button label="外部"></el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <p style="max-width: 450px">
                    存储业务集群使用的平台组件镜像<br />
                    • 选择 "平台默认"
                    时，业务集群通过部署平台时配置的镜像仓库拉取所需的镜像<br />
                    • 选择 "外部" 时，业务集群通过外部镜像仓库拉取所需的镜像<br />
                  </p>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <!-- 10 私有镜像仓库 -->
            <el-form-item
              label="私有镜像仓库地址"
              v-if="ruleForm.repository == '外部'"
            >
              <el-row>
                <el-col :span="14">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.privateIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-col>
                <el-col :span="8" style="padding-left: 10px">
                  <el-input v-model="ruleForm.privatePort">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-col>
              </el-row>

              <el-row style="padding-top: 10px">
                <el-col :span="12">
                  <el-input v-model="ruleForm.userName">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-col>
                <el-col :span="12" style="padding-left: 10px">
                  <el-input v-model="ruleForm.password" show-password>
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 11 双栈 -->
            <el-form-item label="IPv4 / IPv6 双栈">
              <el-switch
                v-model="ruleForm.dualStack"
                @change="stackChange"
                :disabled-="isStack"
              />
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                开启 IPv4/IPv6 双栈，请确保所有节点正确配置了 IPv6
                网络地址，开启后无法还原为 IPv4 单栈
              </el-descriptions-item>
            </el-descriptions>

            <!-- 12 网络模式 -->
            <el-form-item label="网络模式">
              <el-radio-group v-model="ruleForm.netMode" @input="netModeInput">
                <el-radio-button label="Kube-OVN"></el-radio-button>
                <el-radio-button label="Calico"></el-radio-button>
                <el-radio-button
                  label="Flannel"
                  :disabled="isFlannel"
                ></el-radio-button>
                <el-radio-button label="自定义"></el-radio-button>
              </el-radio-group>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <p style="max-width: 500px">
                    • Kube-OVN、Calio 网络模式，支持
                    IPv4/IPv6双栈，其他网络模式仅支持 IPv4 单栈 <br />
                    • 如需安装其他模式的网络，请选择
                    '自定义'模式，并在集群部署成功后手动安装网络插件<br />
                    •
                    创建自定义模式的集群后，集群无法直接使用，需要手动部署集群基础组件<br />
                  </p>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <!-- 13 默认子网 -->
            <el-form-item
              label="默认子网"
              v-if="ruleForm.netMode == 'Kube-OVN'"
            >
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <!-- 网段 -->
                    <el-form-item label="网段">
                      <el-input
                        placeholder="如: 10.3.0.0/16"
                        v-model="ruleForm.netSegment"
                        style="width: 70%"
                      ></el-input>
                    </el-form-item>

                    <!-- 传输方式 -->
                    <el-form-item label="传输方式">
                      <el-radio-group v-model="ruleForm.transMethod">
                        <el-radio label="overlay"></el-radio>
                        <el-radio label="underlay"></el-radio>
                      </el-radio-group>
                      <el-tooltip
                        content="Underlay 传输方式下容器网络需要依赖物理网络支持，请和网络管理员共同规划"
                        effect="dark"
                        class="item"
                        placement="top"
                      >
                        <i
                          class="el-icon-question margin-left10 question-icon"
                        />
                      </el-tooltip>
                    </el-form-item>

                    <!-- 默认网关 -->
                    <el-form-item
                      label="默认网关"
                      v-if="ruleForm.transMethod == 'underlay'"
                    >
                      <el-input
                        placeholder="请输入默认网关"
                        v-model="ruleForm.defaultGateway"
                        style="width: 70%"
                      ></el-input>
                    </el-form-item>

                    <!-- VLAN ID -->
                    <el-form-item
                      label="VLAN ID"
                      v-if="ruleForm.transMethod == 'underlay'"
                    >
                      <el-input
                        placeholder="请输入虚拟局域网标识"
                        v-model="ruleForm.vlanID"
                        style="width: 70%"
                      ></el-input>
                    </el-form-item>

                    <!-- 保留 IP -->
                    <el-form-item
                      label="保留 IP"
                      v-if="ruleForm.transMethod == 'underlay'"
                    >
                      <el-row type="flex" class="row-bg">
                        <el-col :span="24">
                          <!-- 1 -->
                          <div>
                            <span style="margin-left: 10px">IP 形式</span>
                            <span style="margin-left: 200px">IP 地址</span>
                          </div>
                          <!-- 2 -->
                          <div class="grid-content bg-purple">
                            <div v-if="ruleForm.configurationItems.length > 0">
                              <div
                                v-for="(
                                  domain, index
                                ) in ruleForm.configurationItems"
                                :key="domain.id"
                                class="margin-bottom10 item-div"
                              >
                                <el-row>
                                  <el-col :span="9">
                                    <el-form-item>
                                      <el-select
                                        v-model="domain.selected"
                                        @focus="setMinWidthEmpty"
                                        style="width: 100%"
                                      >
                                        <el-option label="IP" value="IP" />
                                        <el-option
                                          label="IP 段"
                                          value="IP 段"
                                        />
                                      </el-select>
                                    </el-form-item>
                                  </el-col>
                                  <el-col
                                    :span="14"
                                    style="padding-left: 10px"
                                    v-if="domain.selected == 'IP'"
                                  >
                                    <el-form-item>
                                      <el-input
                                        v-model="domain.input"
                                        placeholder="输入 IP"
                                      />
                                    </el-form-item>
                                  </el-col>
                                  <el-col
                                    v-else
                                    :span="14"
                                    style="padding-left: 10px"
                                  >
                                    <el-form-item>
                                      <el-input
                                        v-model="domain.input1"
                                        placeholder="输入 IP"
                                        style="width: 47%"
                                      />
                                      ~
                                      <el-input
                                        v-model="domain.input2"
                                        placeholder="输入 IP"
                                        style="width: 47%"
                                      />
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span="1" style="padding-left: 10px">
                                    <div>
                                      <i
                                        class="
                                          el-icon-remove-outline
                                          cursor-pointer
                                        "
                                        @click="
                                          handleDelete(
                                            'configurationItems',
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
                              <p style="margin-left: 100px">
                                若子网内 IP
                                被物理网占用，会导致集群无法成功创建，请将其设置为保留
                                IP
                              </p>
                            </div>
                            <div class="flex-center">
                              <div
                                class="cursor-pointer text-center hover-div"
                                style="flex: 1"
                                @click="handleAdd('configurationItems')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                添加
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 13 默认子网 -->
            <el-form-item label="默认子网" v-if="ruleForm.netMode == 'Calico'">
              <el-input
                v-model="ruleForm.calico"
                placeholder="如： 10.3.0.0/16"
              />
            </el-form-item>
            <!-- 13 容器网段 -->
            <el-form-item label="容器网段" v-if="ruleForm.netMode == 'Flannel'">
             <el-row>
                <!-- 6.1 -->
                <el-col :span="14">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.clusterIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-col>
                <!-- 6.2 -->
                <el-col :span="8" style="padding-left: 10px">
                  <el-input
                    v-model="ruleForm.clusterPort"
                    :disabled="isVIP"
                    :placeholder="portPlaceholder"
                  >
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                集群创建后，支持新建子网
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="Service 网段">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.serviceNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="Join 网段">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.joinNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="节点名称设置">
              <el-radio-group v-model="ruleForm.node">
                <el-radio label="节点IP作为节点名称"></el-radio>
                <el-radio label="主机名称作为节点名称"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="网卡">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.joinNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="节点信息">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="flex-center">
                      <div
                        class="cursor-pointer text-center hover-div"
                        style="flex: 1"
                        @click="handleAdd('configurationItems')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加节点
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="如何选择监控组件">
              <el-radio-group v-model="ruleForm.monitor">
                <el-radio-button label="Prometheus (推荐)"></el-radio-button>
                <el-radio-button label="VictoriaMetrics"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="部署方法"
              v-if="ruleForm.monitor == 'VictoriaMetrics'"
            >
              <el-radio-group v-model="ruleForm.depMethod">
                <el-radio label="部署 VictoriaMetrics"></el-radio>
                <el-radio label="部署 VictoriaMetrics 代理"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="监控组件部署节点">
              <el-select v-model="ruleForm.gpuSelect">
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="VictoriaMetrics 代理实例数">
              <el-input-number
                v-model="ruleForm.num"
                :min="1"
                :max="3"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
        <span v-if="!isEdit">创建</span>
        <span v-if="isEdit">更新</span>
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
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      content:
        "1.集群的控制节点和网络需求根据实际业务和网络情况提前规划好,否则集群部署完成后将无法调整" +
        "\r\n" +
        "  2.请确保集群节点防火墙、selinux、swap分区已关闭,否则可能会导致集群部署失败",
      isVIP: false,
      portPlaceholder: "",
      isFlannel: false,
      isStack: false,

      isEdit: false,
      fillType: "form",
      ruleForm: {
        name: "",
        showName: "",
        gpu: false,
        gpuSelected: "vGPU",
        kubernetes: "docker",
        clusterIp: "",
        clusterPort: "",
        vip: false,
        vrid: "137",
        repository: "平台默认",
        privateIp: "",
        privatePort: "",
        userName: "",
        password: "",
        dualStack: false,
        netMode: "Kube-OVN",

        netSegment: "", //网段
        transMethod: "overlay", //传输方式
        defaultGateway: "", //默认网关
        vlanID: "", // 虚拟局域网标识

        configurationItems: [],
        binaryConfigurationItems: [
          {
            id: nanoid(),
            key: "123",
            value: "123.doc",
          },
        ],

        node: "节点IP作为节点名称",
        monitor: "Prometheus (推荐)",
        depMethod: "部署 VictoriaMetrics",
        num: 1,
      },

      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/,
            message: "以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-",
            trigger: "blur",
          },
        ],
        showName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        kubernates: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  created() {
    this.ruleForm.name = this.$route.query.name;
    if (this.ruleForm.name) {
      this.isEdit = true;
      this.fetchData();
    }
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

    vipChange(val) {
      if (val == true) {
        this.isVIP = true;
        this.portPlaceholder = "6443";
      } else {
        this.isVIP = false;
        this.portPlaceholder = "";
      }
    },

    stackChange(val) {
      if (val == true) {
        this.isFlannel = true;
      } else {
        this.isFlannel = false;
      }
    },

    netModeInput(val) {
      // console.log(val)
      if (val == "Flannel") {
        this.isStack = true;
      } else {
        this.isStack = false;
      }
    },

    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        selected: "IP",
        input: "",
        input1: "",
        input2: "",
      };
      this.ruleForm[filed].push(obj);
    },

    // 删除
    handleDelete(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },

    fetchData() {
      this.ruleForm = {
        name: this.ruleForm.name,
        virtualIP: true,
        internetAccess: false,
        targetComponents: "计算组件",
        calculationType: "部署",
        keepSession: false,
        domains: [
          {
            id: nanoid(),
            agreement: "TCP",
            serverPort: "5201",
            containerPort: "443",
            servicePortName: "tcp-5201-443",
          },
          {
            id: nanoid(),
            agreement: "TCP",
            serverPort: "5202",
            containerPort: "80",
            servicePortName: "tcp-5202-80",
          },
        ],
        tagSelector: [],
      };
    },
    submitCreate() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    cancelCreate() {
      this.$router.go(-1);
    },
    changeTableItem(item, index) {
      const oldItem = this.ruleForm.domains[index];
      let str = `${oldItem.agreement}`;
      if (oldItem.serverPort) {
        str += `-${oldItem.serverPort}`;
      }
      if (oldItem.containerPort) {
        str += `-${oldItem.containerPort}`;
      }
      oldItem.servicePortName = str;
      this.$set(this.ruleForm.domains, [index], oldItem);
    },
    // handleDelete(item, index) {
    //   this.ruleForm.domains.splice(this.ruleForm.domains.indexOf(item), 1);
    // },

    handleTagDelete(item, index) {
      this.ruleForm.tagSelector.splice(
        this.ruleForm.tagSelector.indexOf(item),
        1
      );
    },
    handleTagAdd() {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.ruleForm.tagSelector.push(obj);
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },
    // 写入
    quickInput() {
      this.currentCode = this.defaultCodeStr;
      this.$refs.monacoEditor.btnFlag = true;
    },
    // 查看
    viewYaml() {
      this.detailVisible = true;
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
}
</style>