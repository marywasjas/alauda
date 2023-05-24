<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px">创建服务网络</div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>

          <el-form-item label="名称" prop="name">
            <el-col :span="22">
              <el-input
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-，最多 32 个字符。"
              >
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称">
            <el-col :span="22">
              <el-input v-model="infoForm.showName"> </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="Istio 版本" prop="version">
            <el-col :span="22">
              <el-select
                v-model="infoForm.version"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in versionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="集群" prop="cluster">
            <el-col :span="22">
              <el-select
                v-model="infoForm.cluster"
                @focus="setMinWidthEmpty"
                style="width: 100%"
                @change="clusterChange"
              >
                <el-option
                  v-for="item in clusterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <div class="component-div">
            <el-row :gutter="24" class="container-div">
              <el-col
                class="label-value"
                v-for="item in detailData"
                :key="item.label"
                :span="12"
              >
                <span> {{ item.label }} </span>
                : &nbsp;&nbsp;

                <span v-if="item.label == '状态'">
                  <i
                    :class="
                      item.value === '部署成功'
                        ? 'el-icon-success running'
                        : 'el-icon-warning stop'
                    "
                  />
                  {{ item.value }}
                </span>

                <span v-else-if="item.label == '标签'">
                  <el-tooltip
                    placement="top"
                    effect="dark"
                    style="margin-right: 10px"
                  >
                    <div slot="content">{{ item.value[0] }}</div>
                    <el-tag size="mini">
                      {{
                        item.value[0].length > 15
                          ? item.value[0].substring(0, 30) + "..."
                          : item.value[0]
                      }}
                    </el-tag>
                  </el-tooltip>

                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content" v-for="ele in item.value" :key="ele">
                      <el-tag size="mini" style="margin-bottom: 10px">
                        {{ ele }}
                      </el-tag>
                      <br />
                    </div>
                    <el-tag size="mini" style="cursor: pointer">
                      {{ "..." }}
                    </el-tag>
                  </el-tooltip>
                </span>

                <span v-else>
                  {{ item.value ? item.value : "-" }}
                </span>
              </el-col>
            </el-row>
          </div>

          <div class="recomend-list">
            <h2>{{ "网格配置" }}</h2>
          </div>

          <el-row type="flex">
            <el-col :span="10">
              <el-form-item prop="cpu" label="Sidecar 资源配置">
                <el-input v-model="infoForm.cpu">
                  <template slot="prepend">CPU</template>
                  <template slot="append">核</template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10" style="margin-left: -100px">
              <el-form-item prop="memory">
                <el-input v-model="infoForm.memory">
                  <template slot="prepend">内存</template>
                  <template slot="append">Mi</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <label class="el-form-item__label" style="width: 135px">
            调用链配置
          </label>
          <div class="component-div">
            <el-row type="flex" class="container-div" style="padding-top: 20px">
              <el-col :span="11">
                <el-form-item label="采样率">
                  <el-input v-model="infoForm.sampleRate" style="width: 85%">
                    <template slot="append">%</template>
                  </el-input>
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 450px">
                        为减少数据采集对系统的压力，根据业务需要设置监控数据的采样率，用于控制调用链数据采集的比率，默认为
                        100%
                      </div>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="对接 Kafka">
                  <el-switch v-model="infoForm.kafka"></el-switch>
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 450px">
                        开启时，调用链数据将通过 Kafka 写入
                        Elasticsearch，避免流量过大时增加对 Elasticsearch
                        的写入压力，但存在一定的调用链查询延迟；关闭时，调用链数据将直接写入
                        Elasticsearch。
                      </div>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <label class="el-form-item__label" style="width: 135px">
            Elasticsearch 对接
          </label>
          <div class="component-div">
            <el-row class="container-div" style="padding-top: 20px">
              <el-col :span="24">
                <el-form-item label="来源">
                  <el-radio-group
                    v-model="infoForm.origin_elastic"
                    @input="handleRadio"
                  >
                    <el-radio-button label="平台提供"></el-radio-button>
                    <el-radio-button label="自定义"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="URL" prop="url">
                  <el-input
                    v-model="infoForm.url_elastic"
                    :disabled="urlDisabled"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="infoForm.origin_elastic == '自定义'">
                <el-form-item label="保密字典">
                  <el-select
                    v-model="infoForm.dictionary_elastic"
                    @focus="setMinWidthEmpty"
                    style="width: 65%"
                    placeholder="请选择保密字典"
                  >
                    <el-option
                      v-for="item in dictionaryOptions_elastic"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>

                  <el-button
                    type="primary"
                    style="margin-left: 40px"
                    @click="handleCreateDict('elastic')"
                    >新建保密字典</el-button
                  >
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    您可前往 global 集群的 cpaas-system
                    命名空间管理存储了认证信息的保密字典
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </div>

          <label class="el-form-item__label" style="width: 135px">
            监控系统对接
          </label>
          <div class="component-div">
            <el-row class="container-div" style="padding-top: 20px">
              <el-col :span="24">
                <el-form-item label="来源">
                  <el-radio-group
                    v-model="infoForm.origin_monitor"
                    @input="handleRadio2"
                  >
                    <el-radio-button label="平台提供"></el-radio-button>
                    <el-radio-button label="自定义"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="监控系统类型">
                  <span v-if="infoForm.origin_monitor == '平台提供'">
                    Prometheus
                  </span>

                  <el-select
                    v-else
                    v-model="infoForm.monitorType"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                    placeholder="请选择保密字典"
                  >
                    <el-option
                      v-for="item in monitorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="URL" prop="url_monitor">
                  <el-input
                    v-model="infoForm.url_monitor"
                    :disabled="urlDisabled2"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="infoForm.origin_monitor == '自定义'">
                <el-form-item label="保密字典">
                  <el-select
                    v-model="infoForm.dictionary"
                    @focus="setMinWidthEmpty"
                    style="width: 65%"
                    placeholder="请选择保密字典"
                  >
                    <el-option
                      v-for="item in dictionaryOptions_monitor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>

                  <el-button
                    type="primary"
                    style="margin-left: 40px"
                    @click="handleCreateDict('monitor')"
                    >新建保密字典</el-button
                  >
                </el-form-item>
                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    您可前往 global 集群的 cpaas-system
                    命名空间管理存储了认证信息的保密字典
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </div>

          <div class="recomend-list">
            <h2>{{ "网关" }}</h2>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px"
            >
              <el-col :span="6" style="height: 100px">
                <div style="font-size: 16px; font-weight: 500">
                  istio-ingressgateway
                </div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  入口网关，外部请求仅可通过定点部署节点访问网格内服务
                </div>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="节点反亲和">
                  <el-radio-group
                    v-model="infoForm.origin_monitor"
                    @input="handleRadio2"
                    size="small"
                  >
                    <el-radio-button label="强制"></el-radio-button>
                    <el-radio-button label="期望"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="部署节点">
                  <el-select
                    v-model="infoForm.deployNode"
                    @focus="setMinWidthEmpty"
                    style="width: 120%"
                    size="small"
                  >
                    <el-option
                      v-for="item in []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="自动扩缩容">
                  <el-switch
                    v-model="infoForm.automatic"
                    size="small"
                  ></el-switch>
                </el-form-item>

                <el-form-item label="实例数" prop="instanceNum">
                  <el-input
                    v-model="infoForm.instanceNum"
                    size="small"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="资源配额" prop="cpu_gateway">
                  <el-input
                    v-model="infoForm.cpu_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_gateway" style="margin-left: -100px">
                  <el-input
                    v-model="infoForm.memory_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px"
            >
              <el-col :span="6" style="">
                <div style="font-size: 16px; font-weight: 500">
                  istio-egressgateway
                </div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  出口网关，网络内注册的外部服务可以绑定到Egress,使得对外访问流量从
                  Egress 定点出发。
                </div>
              </el-col>

              <el-col :span="18" style="display: flex">
                <el-form-item label="节点反亲和">
                  <el-radio-group
                    v-model="infoForm.origin_monitor"
                    @input="handleRadio2"
                    size="small"
                  >
                    <el-radio-button label="强制"></el-radio-button>
                    <el-radio-button label="期望"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="部署节点">
                  <el-select
                    v-model="infoForm.deployNode"
                    @focus="setMinWidthEmpty"
                    style="width: 120%"
                    size="small"
                  >
                    <el-option
                      v-for="item in []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="自动扩缩容">
                  <el-switch
                    v-model="infoForm.automatic"
                    size="small"
                  ></el-switch>
                </el-form-item>

                <el-form-item label="实例数" prop="instanceNum">
                  <el-input
                    v-model="infoForm.instanceNum"
                    size="small"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="资源配额" prop="cpu_gateway">
                  <el-input
                    v-model="infoForm.cpu_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_gateway" style="margin-left: -100px">
                  <el-input
                    v-model="infoForm.memory_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="recomend-list">
            <h2>{{ "组件配置" }}</h2>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">istio</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  istiod 控制面组件，负责配置下发等功能。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic"
                      size="small"
                    ></el-switch>
                  </el-form-item>

                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
              <!-- <el-col :span="6" style="">
                <div style="font-size: 16px; font-weight: 500">istio</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  istiod 控制面组件，负责配置下发等功能。
                </div>
              </el-col> -->

              <!-- <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="自动扩缩容">
                  <el-switch
                    v-model="infoForm.automatic"
                    size="small"
                  ></el-switch>
                </el-form-item>

                <el-form-item label="实例数" prop="instanceNum">
                  <el-input
                    v-model="infoForm.instanceNum"
                    size="small"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 234px">
                <el-form-item label="资源配额" prop="cpu_gateway">
                  <el-input
                    v-model="infoForm.cpu_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_gateway" style="margin-left: -100px">
                  <el-input
                    v-model="infoForm.memory_gateway"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">
                  asm-controller
                </div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  平台业务核心组件。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">flagger</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  灰度发布组件,用于执行自动化灰度发布。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">
                  jaeger-prod-collector
                </div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  调用链组件,负责接收服务上报的服务链数据,并存储到 ES 中。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic"
                      size="small"
                    ></el-switch>
                  </el-form-item>

                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">
                  jaeger-prod-query
                </div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  调用链组件,负责调用链数据查询。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">grafana</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  服务网格监控组件。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic"
                      size="small"
                    ></el-switch>
                  </el-form-item>

                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">CPU</template>
                      <template slot="append">核</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="memory_gateway"
                    style="margin-left: -100px"
                  >
                    <el-input
                      v-model="infoForm.memory_gateway"
                      size="small"
                      style="width: 220px"
                    >
                      <template slot="prepend">内存</template>
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-form>
      </el-card>
    </div>

    <div class="fixed-div">
      <div style="float:left">资源总量 : 2.6核 5572Mi</div>
      <el-button type="primary" @click="submitCreate">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <el-dialog
      title="新建保密字典"
      @close="dictionaryVisible = false"
      :visible.sync="dictionaryVisible"
      width="60%"
    >
      <el-form
        ref="dictionaryForm"
        :model="dictionaryForm"
        :rules="dictionaryRules"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="dictionaryForm.name">
            <template slot="prepend"> servicemesh-elasticsearch- </template>
          </el-input>
        </el-form-item>

        <label class="el-form-item__label" style="width: 135px">
          认证信息
        </label>
        <div class="component-div">
          <el-row class="container-div" style="padding-top: 20px">
            <el-col :span="22">
              <el-form-item label="用户名" prop="userName">
                <el-input
                  v-model="dictionaryForm.userName"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="22">
              <el-form-item label="密码" prop="password">
                <el-input
                  show-password
                  v-model="dictionaryForm.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSure">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

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
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      detailData: [
        {
          label: "网络模式",
          value: "calico",
        },
        {
          label: "Kubernetes 版本",
          value: "1.21.10",
        },
        {
          label: "可用资源",
          value: "CPU 6.47核/192.00核 内存 76.83Gi/371.0",
        },

        {
          label: "所属地域",
          value: "",
        },
      ],

      regionForm: {
        type: "用户名/密码",
        userName: "",
        password: "",
        serverAddress: "",
        mailAddress: "",
      },

      regionRules: {
        userName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        serverAddress: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        mailAddress: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        clientSecret: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        clientID: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        ssh: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        keyID: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        key: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
        token: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur",
          },
        ],
      },

      infoForm: {
        name: "",
        showName: "",
        version: "1.12.4",
        cluster: "",
        cpu: "",
        memory: "",
        sampleRate: "100",
        kafka: false,
        origin_elastic: "平台提供",
        url_elastic: "http://25.2.20.203:443/es_proxy",
        dictionary_elastic: "",
        origin_monitor: "平台提供",
        url_monitor: "http://25.2.20.203:443/es_proxy",
        monitorType: "victoriaMetrics",
        automatic: false,

        nodeAntiAffi: "期望",

        instanceNum: 1,

        cpu_gateway: "0.5",
        memory_gateway: "0.5",
      },

      infoRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        version: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cluster: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        memory: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        url_elastic: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        url_monitor: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        instanceNum: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        cpu_gateway: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        memory_gateway: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      versionOptions: [
        { label: "1.12.4(推荐)", value: "1.12.4" },
        { label: "1.10.5", value: "1.10.5" },
      ],

      clusterOptions: [
        { label: "region(region)", value: "region" },
        { label: "global(global)", value: "global" },
      ],

      dictionaryOptions_elastic: [],
      dictionaryOptions_monitor: [],

      monitorOptions: [
        { label: "Prometheus", value: "prometheus" },
        { label: "VictoriaMetrics", value: "victoriaMetrics" },
      ],

      urlDisabled: true,
      urlDisabled2: true,

      formType: "",

      dictionaryVisible: false,

      dictionaryForm: {
        name: "",
        userName: "",
        password: "",
      },

      dictionaryRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        userName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
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

    clusterChange(val) {},

    handleRadio(val) {
      if (val == "自定义") {
        this.urlDisabled = false;
      } else {
        this.urlDisabled = true;
      }
    },

    handleRadio2(val) {
      if (val == "自定义") {
        this.urlDisabled2 = false;
      } else {
        this.urlDisabled2 = true;
      }
    },

    handleCreateDict(type) {
      this.$nextTick(() => {
        this.$refs["dictionaryForm"].resetFields();
      });
      this.dictionaryVisible = true;
      this.formType = type;
    },

    handleCancel() {
      this.formType = "";
      this.dictionaryForm = this.$options.data().dictionaryForm;
      this.dictionaryVisible = false;
      this.dictionaryForm = {
        name: "",
        userName: "",
        password: "",
      };
    },

    handleSure() {
      this.dictionaryVisible = false;
      if (this.formType == "elastic") {
        this.dictionaryOptions_elastic.push({
          label: `servicemesh-elasticsearch-${this.dictionaryForm.name}`,
          value: `servicemesh-elasticsearch-${this.dictionaryForm.name}`,
        });
      } else {
        this.dictionaryOptions_monitor.push({
          label: `servicemesh-elasticsearch-${this.dictionaryForm.name}`,
          value: `servicemesh-elasticsearch-${this.dictionaryForm.name}`,
        });
      }
      this.formType = "";
      this.dictionaryForm = this.$options.data().dictionaryForm;
    },

    // 提交创建表单
    submitCreate() {
      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     console.log(this.ruleForm);
      //   } else {
      //     return false;
      //   }
      // });
    },

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
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
    // width: calc(100% - 42px);
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
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}

.create-container[data-v-5e8ccdd2] {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100%;
  position: relative;
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 11px;
  height: 40px;
  line-height: 42px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
::v-deep .el-card__body {
  padding: 20px;
  padding-top: 0;
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
.component-div {
  margin-top: 16px;
  margin-left: 136px;
  padding: 10px;
  background: rgba(247, 249, 252);
  .container-div {
    background: #fff;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.label-value {
  margin-bottom: 12px;
  margin-top: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}

</style>