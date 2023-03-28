<template>
  <div class="create-container">
    <line-alert :content="content" />
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold"
            >创建集群</span
          >
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="135px"
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
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="集群地址" prop="clusterIp">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.clusterIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8" style="margin-left: -145px">
                <el-form-item prop="clusterPort">
                  <el-input
                    v-model="ruleForm.clusterPort"
                    :disabled="isVIP"
                    :placeholder="portPlaceholder"
                  >
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

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
            <!-- <el-form-item
              label="私有镜像仓库地址"
              v-if="ruleForm.repository == '外部'"
              prop="privateIp"
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
            </el-form-item> -->
            <el-row :gutter="20" v-if="ruleForm.repository == '外部'">
              <el-col :span="16">
                <el-form-item label="私有镜像仓库地址" prop="privateIp">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.privateIp"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="margin-left: -145px">
                <el-form-item>
                  <el-input v-model="ruleForm.privatePort">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="ruleForm.repository == '外部'">
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="ruleForm.userName">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-left: -145px">
                <el-form-item>
                  <el-input v-model="ruleForm.password" show-password>
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
                    <el-form-item
                      label="网段"
                      prop="netSegment"
                      style="margin-bottom: 15px"
                    >
                      <el-row :gutter="20" v-if="ruleForm.dualStack == true">
                        <el-col :span="11">
                          <el-form-item>
                            <el-input placeholder="例如: 10.4.0.0/16">
                              <template slot="prepend">IPv4</template>
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="11" style="margin-left: -10px">
                          <el-form-item>
                            <el-input placeholder="例如: fd00:10:96::/112">
                              <template slot="prepend">IPv6</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-input
                        v-else
                        placeholder="如: 10.3.0.0/16"
                        v-model="ruleForm.netSegment"
                        style="width: 70%"
                      ></el-input>
                    </el-form-item>

                    <!-- 传输方式 -->
                    <el-form-item label="传输方式" style="margin-bottom: 15px">
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
                      style="margin-bottom: 15px"
                      prop="defaultGateway"
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
                      style="margin-bottom: 15px"
                      prop="vlanID"
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
                      style="margin-bottom: 10px"
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
              <el-row :gutter="20" v-if="ruleForm.dualStack == true">
                <el-col :span="11">
                  <el-form-item>
                    <el-input placeholder="例如: 10.4.0.0/16">
                      <template slot="prepend">IPv4</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11" style="margin-left: -10px">
                  <el-form-item>
                    <el-input placeholder="例如: fd00:10:96::/112">
                      <template slot="prepend">IPv6</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="14">
                  <el-input
                    v-model="ruleForm.calico"
                    placeholder="如：10.3.0.0/16"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 13 容器网段 -->
            <el-form-item label="容器网段" v-if="ruleForm.netMode == 'Flannel'">
              <el-row>
                <!-- 6.1 -->
                <el-col :span="14">
                  <el-input
                    placeholder="如：10.3.0.0/16"
                    v-model="ruleForm.flannel"
                  />
                </el-col>
                <!-- 6.2 -->
                <el-col :span="8" style="padding-left: 10px">
                  <el-select v-model="ruleForm.flannelIP">
                    <el-option label="128" value="128"></el-option>
                    <el-option label="256" value="256"></el-option>
                  </el-select>
                  <span> IP / 节点</span>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 13 容器网段 -->
            <el-form-item label="容器网段" v-if="ruleForm.netMode == '自定义'">
              <el-row :gutter="20" v-if="ruleForm.dualStack == true">
                <el-col :span="11">
                  <el-form-item>
                    <el-input placeholder="例如: 10.4.0.0/16">
                      <template slot="prepend">IPv4</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11" style="margin-left: -10px">
                  <el-form-item>
                    <el-input placeholder="例如: fd00:10:96::/112">
                      <template slot="prepend">IPv6</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="14">
                  <el-input
                    placeholder="如：10.3.0.0/16"
                    v-model="ruleForm.selfDef"
                  />
                </el-col>
              </el-row>
            </el-form-item>

            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
              v-if="ruleForm.netMode == 'Kube-OVN'"
            >
              <el-descriptions-item>
                集群创建后，支持新建子网
              </el-descriptions-item>
            </el-descriptions>

            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
              v-if="ruleForm.netMode == 'Calico'"
            >
              <el-descriptions-item>
                集群创建后，支持新建子网
              </el-descriptions-item>
            </el-descriptions>

            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
              v-if="ruleForm.netMode == 'Flannel'"
            >
              <el-descriptions-item>
                即 Cluster CIDR,集群创建后，集群网络不支持变更，请合理规划网络
              </el-descriptions-item>
            </el-descriptions>

            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
              v-if="ruleForm.netMode == '自定义'"
            >
              <el-descriptions-item> 即 Cluster CIDR </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="Service 网段" prop="serviceNetSegment">
              <el-row :gutter="20" v-if="ruleForm.dualStack == true">
                <el-col :span="11">
                  <el-form-item>
                    <el-input placeholder="例如: 10.4.0.0/16">
                      <template slot="prepend">IPv4</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11" style="margin-left: -10px">
                  <el-form-item>
                    <el-input placeholder="例如: fd00:10:96::/112">
                      <template slot="prepend">IPv6</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="14">
                  <el-input
                    placeholder="如: 10.3.0.0/16"
                    v-model="ruleForm.serviceNetSegment"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item
              label="Join 网段"
              prop="joinNetSegment"
              v-if="ruleForm.netMode == 'Kube-OVN'"
            >
              <el-row :gutter="20" v-if="ruleForm.dualStack == true">
                <el-col :span="11">
                  <el-form-item>
                    <el-input placeholder="例如: 10.4.0.0/16">
                      <template slot="prepend">IPv4</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11" style="margin-left: -10px">
                  <el-form-item>
                    <el-input placeholder="例如: fd00:10:96::/112">
                      <template slot="prepend">IPv6</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="1">
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <p style="max-width: 450px">
                        Overlay 传输方式下，供节点与容器组间通信使用的 IP
                        地址段。不可与默认子网和Service网段重叠。
                      </p>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="14">
                  <el-input v-model="ruleForm.joinNetSegment" />
                </el-col>
                <el-col :span="1">
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <p style="max-width: 450px">
                        Overlay 传输方式下，供节点与容器组间通信使用的 IP
                        地址段。不可与默认子网和Service网段重叠。
                      </p>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="节点名称设置">
              <el-radio-group v-model="ruleForm.node">
                <el-radio label="节点IP作为节点名称"></el-radio>
                <el-radio label="主机名称作为节点名称"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                使用主机名称作为节点名称，需要保证集群内所有节点主机名称具有唯一性
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="网卡">
              <el-input
                v-model="ruleForm.networkCard"
                style="width: 70%"
              ></el-input>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                Overlay 传输方式所使用的主机网卡，若不填写，可在节点中进行配置
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="节点信息" prop="nodeInfo">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="flex-center">
                      <div
                        class="cursor-pointer text-center hover-div"
                        style="flex: 1"
                        @click="handleAddNodeDialog"
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
                <!-- <el-row> -->
                <!-- <el-col :span="11"> -->
                <el-radio label="部署 VictoriaMetrics"></el-radio>
                <!-- </el-col> -->
                <!-- <el-col :span="11"> -->
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <p style="max-width: 450px">
                      在当前集群上部署 VictoriaMetrics 及相关组件
                    </p>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
                <!-- </el-col> -->
                <!-- </el-row> -->

                <!-- <el-row> -->
                <!-- <el-col :span="11"> -->
                <el-radio label="部署 VictoriaMetrics 代理" disabled></el-radio>
                <!-- </el-col> -->
                <!-- <el-col :span="11"> -->
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <p style="max-width: 450px">
                      仅在当前集群上部署 VictoriaMetrics 代理 (VictoriaMetrics
                      Agent)，需要关联平台中其他集群上已部署的
                      VictoriaMetrics，才能实现集群监控功能 / 为集群提供监控服务
                    </p>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
                <!-- </el-col> -->
                <!-- </el-row> -->
              </el-radio-group>
            </el-form-item>

            <el-form-item label="监控组件部署节点">
              <el-select
                v-model="ruleForm.nodeSelect"
                @focus="setMinWidthEmpty"
                style="width: 60%"
                placeholder="请选择部署节点，最多支持添加3个节点"
              >
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <p style="max-width: 450px">
                    • 建议优先选择计算机节点部署 <br />
                    • 选择 1 个节点，监控组件为可用状态；选择 2-3
                    个节点，监控组件为高可用状态<br />
                    • 当控制节点不允许部署应用时也不可以部署监控组件<br />
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
                部署控制组件支持 3 种存储类型
                "本地卷"、"存储类"、"持久卷"，此处仅支持
                "本地卷"。当创建后的集群状态为 "正常"时，支持部署存储类型为
                "存储类"、"持久卷"的监控组件
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item
              v-if="ruleForm.monitor == 'VictoriaMetrics'"
              label="VictoriaMetrics 代理实例数"
            >
              <!-- <span slot="label">
                <span style="font-size: 5px;line-height:15px;"
                  ><strong>VictoriaMetrics代理实例数</strong>
                </span>
              </span> -->
              <el-input-number
                v-model="ruleForm.num"
                :min="1"
                :max="3"
              ></el-input-number>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
              v-if="ruleForm.monitor == 'VictoriaMetrics'"
            >
              <el-descriptions-item>
                集群内部署的 VictoriaMetrics 代理的实例数量，推荐添加 1
                个，最多支持添加 3 个且代理实例数不支持超过集群节点总数
              </el-descriptions-item>
            </el-descriptions>


            <foldable-block btn-tex="扩展参数">
              <line-alert :content="contentParmas" />

              <el-form-item label="Docker 参数" style="margin-bottom: 0">
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
                      v-for="(domain, index) in ruleForm.dockerItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('dockerItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('dockerItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <br />
              <el-form-item label="Kubelet 参数" style="margin-bottom: 0">
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
                      v-for="(domain, index) in ruleForm.kubeletItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('kubeletItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('kubeletItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <br />

              <el-form-item
                label="Controller Manaqer 参数"
                style="margin-bottom: 0"
              >
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
                      v-for="(domain, index) in ruleForm.controllerItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('controllerItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('controllerItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <br />

              <el-form-item label="Scheduler 参数" style="margin-bottom: 0">
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
                      v-for="(domain, index) in ruleForm.schedulerItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('schedulerItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('schedulerItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <br />

              <el-form-item label="APIServer 参数" style="margin-bottom: 0">
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
                      v-for="(domain, index) in ruleForm.APIServerParamsItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('APIServerParamsItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('APIServerParamsItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <br />

              <el-form-item label="APIServer 地址" style="margin-bottom: 0">
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
                      v-for="(domain, index) in ruleForm.APIServerAddressItems"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item>
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="
                            handleDeleteParams('APIServerAddressItems', domain, index)
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAddParams('APIServerAddressItems')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
            </foldable-block>
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
      title="添加节点"
      @close="cancelDialog"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <div class="el-dialog-div">
        <line-alert :content="contentDialog" />
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
                        <el-col :span="11">
                          <el-form-item label="网卡名称" label-width="100px">
                            <el-input
                              v-model="domain.netCard"
                              placeholder="请输入需要使用的网卡"
                            />
                          </el-form-item>
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
                      style="flex: 1"
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
            <el-checkbox v-model="nodeForm.config"
              >跳过"警告"检查项</el-checkbox
            >
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
        <el-button type="primary" @click="handleCreateNode"> 添加 </el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

import { nanoid } from "nanoid";

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
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      content:
        "1.集群的控制节点和网络需求根据实际业务和网络情况提前规划好,否则集群部署完成后将无法调整" +
        "\r\n" +
        "  2.请确保集群节点防火墙、selinux、swap分区已关闭,否则可能会导致集群部署失败",
      contentDialog:
        "1. 控制节点至少添加 1 个，不支持设置为 2 个，大于等于 3 个时为高可用集群 (高可用集群，建议设置为奇数个，推荐 3 或 5)；2. 添加控制节点时，若开启 '可部署应用'，该节点可部署业务应用；3. 添加控制节点或计算节点时，若开启 'GPU' 节点，需要手动安装 GPU 驱动和runtime",
      contentParmas:
        "1. 不建议设置扩展参数，设置错误参数可能会导致集群不可用，且集群创建后无法修改；2. 如填写的'键'与默认参数'键'重复，则会覆盖。",
      isVIP: false,
      portPlaceholder: "",
      isFlannel: false,
      isStack: false,

      dialogVisible: false,

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

        nodeInfo: "",

        calico: "",
        flannel: "",
        flannelIP: "128",
        selfDef: "",

        serviceNetSegment: "",
        joinNetSegment: "100.64.0.0/16",
        node: "节点IP作为节点名称",
        networkCard: "",
        // 节点
        monitor: "Prometheus (推荐)",

        depMethod: "部署 VictoriaMetrics",
        nodeSelect: "",
        num: 1,

        dockerItems: [],
        kubeletItems: [],
        controllerItems: [],
        schedulerItems: [],
        APIServerParamsItems: [],
        APIServerAddressItems: [],
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
        kubernetes: [
          { required: true, message: "kubernates是必填项", trigger: "blur" },
        ],
        clusterIp: [
          { required: true, message: "集群地址是必填项", trigger: "blur" },
        ],
        clusterPort: [
          { required: true, message: "端口是必填项", trigger: "blur" },
        ],
        privateIp: [
          {
            required: true,
            message: "私有镜像仓库地址是必填项",
            trigger: "blur",
          },
        ],
        netSegment: [
          { required: true, message: "网段是必填项", trigger: "blur" },
        ],
        defaultGateway: [
          { required: true, message: "默认网关是必填项", trigger: "blur" },
        ],
        vlanID: [
          { required: true, message: "VLAN ID是必填项", trigger: "blur" },
        ],
        serviceNetSegment: [
          { required: true, message: "Service 网段是必填项", trigger: "blur" },
        ],
        joinNetSegment: [
          { required: true, message: "Join 网段是必填项", trigger: "blur" },
        ],
        nodeInfo: [
          { required: true, message: "节点信息是必填项", trigger: "blur" },
        ],
      },

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

      paramsForm: {
        dockerItems: [],
        kubeletItems: [],
        controllerItems: [],
        schedulerItems: [],
        APIServerParamsItems: [],
        APIServerAddressItems: [],
      },
    };
  },

  created() {
    this.ruleForm.name = this.$route.query.name;
    // if (this.ruleForm.name) {
    //   this.fetchData();
    // }
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
        this.$refs["ruleForm"].clearValidate("clusterPort");
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

    // 添加节点
    handleAddNodeDialog() {
      this.dialogVisible = true;
    },

    // 取消dialog
    cancelDialog() {
      this.dialogVisible = false;
    },

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

    handleCreateNode() {
      console.log(this.nodeForm);
    },

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.ruleForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },

    // // 编辑器失去焦点
    // handleBlur(value) {
    //   this.inputCode = value;
    // },
    // // 写入
    // quickInput() {
    //   this.currentCode = this.defaultCodeStr;
    //   this.$refs.monacoEditor.btnFlag = true;
    // },
    // // 查看
    // viewYaml() {
    //   this.detailVisible = true;
    // },
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