<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">基本信息</span>
        </div>
        <div class="text item event-container">
          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="infoRules"
            label-width="135px"
          >
            <!-- 名称 name -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="infoForm.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 显示名称 showName -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="显示名称" prop="showName">
                  <el-input v-model="infoForm.showName" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 项目 -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="项目" prop="project">
                  <el-select
                    v-model="infoForm.project"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                    @change="onSelectItem1"
                  >
                    <el-option
                      v-for="item in projectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 命名空间 -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="命名空间" prop="namespace">
                  <el-select
                    v-model="infoForm.namespace"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                    @change="onSelectItem2"
                  >
                    <el-option
                      v-for="item in namespaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 应用模板 -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="应用模板">
                  <span>{{ appTemp }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 模板版本 -->
            <el-row>
              <el-col :span="20">
                <el-form-item label="模板版本" prop="tempVersion">
                  <el-select
                    v-model="infoForm.tempVersion"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in tempVersionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card
        class="box-card"
        style="margin-top: 20px"
        v-if="infoForm.tempVersion"
      >
        <div slot="header" class="clearfix">
          <span style="font-size: 20px; line-height: 35px">参数配置</span>
          <el-radio-group v-model="activeTab" style="float: right">
            <el-radio-button label="form">表单</el-radio-button>
            <el-radio-button label="yaml">YAML</el-radio-button>
          </el-radio-group>
        </div>

        <div class="text item event-container" v-if="activeTab == 'form'">
          <div class="event-list-wrapper">
            <div v-for="item in divData" :key="item.id" class="event-card">
              <div class="card-header">
                <div class="resource">
                  <el-row>
                    <el-col>
                      <foldable-block :btn-tex="item.label">
                        <BaseCard>
                          <section class="component-div">
                            <el-form
                              v-if="item.id == 1"
                              ref="basicConfigForm"
                              :model="basicConfigForm"
                              :rules="basicConfigRules"
                              label-width="200px"
                            >
                              <el-form-item label="镜像仓库地址" prop="">
                                <el-input v-model="basicConfigForm.address" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  镜像仓库地址
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="镜像拉取策略" prop="">
                                <el-select
                                  v-model="basicConfigForm.pullStrategy"
                                  @focus="setMinWidthEmpty"
                                  style="width: 100%"
                                >
                                  <el-option
                                    v-for="item in pullStrategyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  镜像拉取策略
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Elasticsearch 镜像名称">
                                <el-input
                                  v-model="basicConfigForm.elasticName"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Elasticsearch 镜像名称
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Elasticsearch 镜像版本">
                                <el-input
                                  v-model="basicConfigForm.elasticVersion"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Elasticsearch 镜像版本
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Kibana 镜像名称">
                                <el-input
                                  v-model="basicConfigForm.kibanaName"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Kibana 镜像名称
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Kibana 镜像版本">
                                <el-input
                                  v-model="basicConfigForm.KibanaVersion"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Kibana 镜像版本
                                </el-descriptions-item>
                              </el-descriptions>
                            </el-form>

                            <el-form
                              v-if="item.id == 2"
                              ref="clusterForm"
                              :model="clusterForm"
                              :rules="clusterRules"
                              label-width="200px"
                            >
                              <el-form-item label="集群名称" prop="">
                                <el-input v-model="clusterForm.clusterName" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  集群名称
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="是否开启Es的Security插件">
                                <el-switch v-model="clusterForm.security" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  是否开启Es的Security插件
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Basic认证密码">
                                <el-input v-model="clusterForm.password" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Basic认证密码
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="是否自动创建证书">
                                <el-switch v-model="clusterForm.cerf" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  是否自动创建证书(依赖cerf-manager)
                                </el-descriptions-item>
                              </el-descriptions>
                            </el-form>

                            <el-form
                              v-if="item.id == 3"
                              ref="masterNodesForm"
                              :model="masterNodesForm"
                              :rules="masterNodesRules"
                              label-width="200px"
                            >
                              <el-form-item label="Replicas">
                                <el-input v-model="masterNodesForm.replicas" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Master节点副本数
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="minimumMasterNodes">
                                <el-input v-model="masterNodesForm.minimum" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Master节点最少数量
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Master 是否启用持久存储">
                                <el-switch v-model="masterNodesForm.storage" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Master 是否启用持久存储
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Ingest节点">
                                <el-switch v-model="masterNodesForm.ingest" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Ingest节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Data节点">
                                <el-switch v-model="masterNodesForm.dataNode" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Data节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="esJavaOpts">
                                <el-input
                                  v-model="masterNodesForm.esJavaOpts"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  esJavaOpts
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="资源消耗">
                                <div>请求值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select2"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <div>限制值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select3"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select4"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  资源消耗
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="volumeClaimTemplate">
                                <div
                                  style="
                                    background: rgba(247, 249, 252);
                                    border: 10px solid rgba(247, 249, 252);
                                  "
                                >
                                  <monaco-editor
                                    ref="readmeMonacoEditor"
                                    :code="currentCode"
                                    :read-only="false"
                                    :language="language"
                                    @handleBlur="handleBlur"
                                  />
                                </div>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  volumeClaimTemplate
                                </el-descriptions-item>
                              </el-descriptions>
                            </el-form>

                            <el-form
                              v-if="item.id == 4"
                              ref="dataNodesForm"
                              :model="dataNodesForm"
                              :rules="dataNodesRules"
                              label-width="200px"
                            >
                              <el-form-item label="开启独立Data节点">
                                <el-switch v-model="dataNodesForm.indepNode" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  开启独立Data节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Replicas">
                                <el-input v-model="dataNodesForm.replicas" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Data节点副本数
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Data 是否启用持久存储">
                                <el-switch v-model="dataNodesForm.storage" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Data 是否启用持久存储
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Ingest节点">
                                <el-switch v-model="dataNodesForm.ingest" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Ingest节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Data节点">
                                <el-switch v-model="dataNodesForm.dataNode" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Data节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="esJavaOpts">
                                <el-input v-model="dataNodesForm.esJavaOpts" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  esJavaOpts
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="资源消耗">
                                <div>请求值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      dataNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="dataNodesForm.select"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      dataNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="dataNodesForm.select2"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <div>限制值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select3"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      masterNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="masterNodesForm.select4"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  资源消耗
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="volumeClaimTemplate">
                                <div
                                  style="
                                    background: rgba(247, 249, 252);
                                    border: 10px solid rgba(247, 249, 252);
                                  "
                                >
                                  <monaco-editor
                                    ref="readmeMonacoEditor2"
                                    :code="currentCode"
                                    :read-only="false"
                                    :language="language"
                                    @handleBlur="handleBlur2"
                                  />
                                </div>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  volumeClaimTemplate
                                </el-descriptions-item>
                              </el-descriptions>
                            </el-form>

                            <el-form
                              v-if="item.id == 5"
                              ref="kibanaNodesForm"
                              :model="kibanaNodesForm"
                              :rules="kibanaNodesRules"
                              label-width="200px"
                            >
                              <el-form-item label="开启Kibana节点">
                                <el-switch
                                  v-model="kibanaNodesForm.kibanaNode"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  开启Kibana节点
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Replicas">
                                <el-input v-model="kibanaNodesForm.replicas" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Kibana节点副本数
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Http Port">
                                <el-input v-model="kibanaNodesForm.httpPort" />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Http Port
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="Kibana Service Type">
                                <el-input
                                  v-model="kibanaNodesForm.serviceType"
                                />
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  Kibana Service Type
                                </el-descriptions-item>
                              </el-descriptions>

                              <el-form-item label="资源消耗">
                                <div>请求值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      kibanaNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="kibanaNodesForm.select"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      kibanaNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="kibanaNodesForm.select2"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <div>限制值</div>
                                <el-col :span="11" style="margin-right: 45px">
                                  <el-input
                                    v-model="
                                      kibanaNodesForm.resConsumption.reqCPU
                                    "
                                  >
                                    <template slot="prepend">CPU</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="kibanaNodesForm.select3"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="m" value="1" />
                                        <el-option label="核" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                                <el-col :span="11">
                                  <el-input
                                    v-model="
                                      kibanaNodesForm.resConsumption.reqMemory
                                    "
                                  >
                                    <template slot="prepend">内存</template>
                                    <template slot="append">
                                      <el-select
                                        v-model="kibanaNodesForm.select4"
                                        slot="append"
                                        style="width: 80px"
                                      >
                                        <el-option label="Mi" value="1" />
                                        <el-option label="Gi" value="2" />
                                      </el-select>
                                    </template>
                                  </el-input>
                                </el-col>
                              </el-form-item>
                              <el-descriptions
                                size="small"
                                :colon="false"
                                :contentStyle="rowCenter"
                              >
                                <el-descriptions-item>
                                  资源消耗
                                </el-descriptions-item>
                              </el-descriptions>
                            </el-form>
                          </section>
                        </BaseCard>
                      </foldable-block>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <monaco-editor
            ref="monacoEditor"
            :code="currentCode"
            :read-only="false"
            :language="language"
            @handleBlur="handleBlur"
          />
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleDeploy"> 部署 </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
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
      activeTab: "form",

      currentCode: "",
      language: "yaml",
      // inputCode: {},

      divData: [
        { id: 1, label: "Basic Configuration", children: [] },
        { id: 2, label: "Cluster", children: [] },
        { id: 3, label: "Master Nodes", children: [] },
        { id: 4, label: "Data Nodes", children: [] },
        { id: 5, label: "Kibana Nodes", children: [] },
      ],

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "190px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      appTemp: "",

      infoForm: {
        name: "",
        showName: "",
        project: "",
        namespace: "",
        tempVersion: "",
      },
      infoRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
        showName: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
        project: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
        namespace: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
        ],
        tempVersion: [
          { required: true, message: "显示名称是必填项", trigger: "blur" },
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
      namespaceOptions: [],
      tempVersionOptions: [],

      // basicConfig
      basicConfigForm: {
        address: "25.2.20.203:60080",
        pullStrategy: "always",
        elasticName: "3rdparty/elasticsearch/elasticsearch",
        elasticVersion: "v7.8.0",
        kibanaName: "3rdparty/kibana/kibana",
        KibanaVersion: "7.8.0",
      },
      basicConfigRules: {},
      pullStrategyOptions: [
        { label: "Always", value: "always" },
        { label: "Never", value: "never" },
        { label: "IfNotPresent", value: "ifnotpresent" },
      ],

      // cluster
      clusterForm: {
        clusterName: "elasticsearch",
        security: true,
        password: "elastic",
        cerf: true,
      },
      clusterRules: {},

      // masterNodes
      masterNodesForm: {
        replicas: 2,
        minimum: 2,
        storage: true,
        ingest: true,
        dataNode: false,
        esJavaOpts: "-Xmx1g -Xms 1g",
        resConsumption: {
          reqCPU: "",
          reqMemory: "",
          limitCPU: "",
          limitMemory: "",
        },
        volumeClaimTemplate: "",
        select: "2",
        select2: "1",
        select3: "2",
        select4: "1",
      },
      masterNodesRules: {},

      // dataNodes
      dataNodesForm: {
        indepNode: true,
        replicas: 3,
        storage: true,
        ingest: false,
        dataNode: true,
        esJavaOpts: "-Xmx1g -Xms 1g",
        resConsumption: {
          reqCPU: "",
          reqMemory: "",
          limitCPU: "",
          limitMemory: "",
        },
        volumeClaimTemplate: "",

        select: "2",
        select2: "1",
        select3: "2",
        select4: "1",
      },
      dataNodesRules: {},

      // kibanaNodes
      kibanaNodesForm: {
        kibanaNode: true,
        replicas: 1,
        httpPort: "5601",
        serviceType: "NodePort",
        resConsumption: {
          reqCPU: "",
          reqMemory: "",
          limitCPU: "",
          limitMemory: "",
        },
        select: "2",
        select2: "1",
        select3: "2",
        select4: "1",
      },
      kibanaNodesRules: {},
    };
  },

  created() {
    this.appTemp = this.$route.query.name;
  },

  beforeDestroy() {
    sessionStorage.removeItem("tempVersion");
  },

  methods: {
    // 编辑器失去焦点
    handleBlur(value) {
      this.masterNodesForm.volumeClaimTemplate = value;
      console.log(this.masterNodesForm.volumeClaimTemplate);
    },

    handleBlur2(value) {
      this.dataNodesForm.volumeClaimTemplate = value;
      console.log(this.dataNodesForm.volumeClaimTemplate);
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

    handleDeploy() {
      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     this.active = 1;
      //     // this.$refs["ruleForm"].resetFields();
      //     this.$refs["ruleForm"].clearValidate();
      //     this.ruleForm = this.$options.data().ruleForm;
      //     // this.ruleForm = {
      //     //   name: "",
      //     //   showName: "",
      //     //   desc: "",
      //     //   roleType: "平台角色",
      //     // };
      //   } else {
      //     return false;
      //   }
      // });
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    onSelectItem1() {
      // 根据第一个选择器的选项，动态生成第二个选择器的选项
      if (this.infoForm.project === "bass") {
        this.namespaceOptions = [
          { label: "adminetrustorg1 (集群：region)", value: "adminetrustorg1" },
          { label: "adminetrustorg2 (集群：region)", value: "adminetrustorg2" },

          { label: "adminipsecorg1 (集群：region)", value: "adminipsecorg1" },
          { label: "adminipsecorg2 (集群：region)", value: "adminipsecorg2" },
          { label: "adminipsecorg3 (集群：region)", value: "adminipsecorg3" },

          { label: "admintestorg1 (集群：region)", value: "admintestorg1" },
          { label: "admintestorg2 (集群：region)", value: "admintestorg2" },
          { label: "admintestorg3 (集群：region)", value: "admintestorg3" },

          { label: "baas-dev (集群：region)", value: "baas-dev" },
          { label: "baas-etrust (集群：region)", value: "baas-etrust" },
          { label: "baas-etrust-pro (集群：region)", value: "baas-etrust-pro" },
        ];
      } else if (this.infoForm.project === "chaos") {
        this.namespaceOptions = [
          { label: "chaos-dev (集群：region)", value: "chaos-dev" },
        ];
      }
      this.infoForm.namespace = "";
      this.infoForm.tempVersion = "";
    },

    onSelectItem2() {
      this.infoForm.tempVersion = "";
      this.tempVersionOptions = JSON.parse(
        sessionStorage.getItem("tempVersion")
      ).version.map((item) => {
        if (item.isLatest == true) {
          return {
            label: item.vers + " (最新版本)",
            value: item.vers,
            isLatest: item.isLatest,
          };
        } else {
          return {
            label: item.vers,
            value: item.vers,
            isLatest: item.isLatest,
          };
        }
      });

      console.log(this.tempVersionOptions);
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
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 9px;
  height: 40px;
  line-height: 40px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: -5px;
  top: 48%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.yaml-main[data-v-370b1c7a] {
  margin-top: 0px;
  padding: 0px;
  // background: #ffffff;
  -webkit-box-shadow: 0px 0px 0px 0px rgba(50, 52, 55, 0.16);
  box-shadow: 0px 0px 0px 0px rgba(50, 52, 55, 0.16);
  border-radius: 0px;
  margin-bottom: 16px;
}
</style>