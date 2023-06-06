<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px">添加集群</div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "网格信息" }}</h2>
          </div>

          <!-- 服务网络 -->
          <el-form-item label="服务网络">
            <el-col :span="22">
              <span>{{ infoForm.name }}</span>
            </el-col>
          </el-form-item>

          <!-- istio 版本-->
          <el-form-item label="istio 版本">
            <el-col :span="22">
              {{ infoForm.version }}
            </el-col>
          </el-form-item>

          <!-- 网格的集群 -->
          <el-form-item label="已加入网格的集群">
            <el-col :span="22">
              <el-table
                :data="infoForm.clusterData"
                style="width: 100%"
                header-row-class-name="headerStyle"
                size="middle"
              >
                <el-table-column
                  v-for="col in [
                    { value: 'cluster', label: '集群' },
                    { value: 'region', label: '所属地域' },
                    { value: 'version', label: 'Kubernetes 版本' },
                  ]"
                  :key="col.label"
                  :label="col.label"
                  :value="col.value"
                >
                  <template slot-scope="scope">
                    <div v-if="col.value === 'cluster'">
                      <div
                        class="cursor-pointer"
                        @click="handleToCluster(scope.row.cluster)"
                      >
                        {{ scope.row[col.value] }}
                      </div>
                      <div style="color: rgba(150, 152, 155)">
                        {{ scope.row[col.value] }}
                      </div>
                    </div>
                    <div v-else>
                      {{ scope.row[col.value] ? scope.row[col.value] : "-" }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>

          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>

          <!-- 集群 -->
          <el-form-item label="集群" prop="cluster">
            <el-col :span="22">
              <el-select
                v-model="infoForm.cluster"
                @focus="setMinWidthEmpty"
                style="width: 100%"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="当前服务网络已存在该集群"
                  placement="top-start"
                >
                  <el-option label="global(global)" value="global" disabled />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="该集群网络模式与已加入网络的集群不一致"
                  placement="top-start"
                >
                  <el-option label="region(region)" value="region" disabled />
                </el-tooltip>
              </el-select>
            </el-col>
          </el-form-item>

          <div class="recomend-list">
            <h2>{{ "网关" }}</h2>
          </div>

          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px"
            >
              <el-col :span="6" style="height: 50px">
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
                    v-model="infoForm.nodeAntiAffi_ingress"
                    size="small"
                  >
                    <el-radio-button label="强制"></el-radio-button>
                    <el-radio-button label="期望"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="部署节点">
                  <el-select
                    multiple
                    v-model="infoForm.deployNode_ingress"
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

              <el-col
                :span="18"
                style="display: flex; margin-left: 239px"
                v-if="infoForm.nodeAntiAffi_ingress == '期望'"
              >
                <el-form-item label="自动扩缩容">
                  <el-switch
                    v-model="infoForm.automatic_ingress"
                    size="small"
                  />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == false"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress"
                    size="small"
                    style="width: 300px"
                  />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == true"
                  style="margin-left: -50px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress_min"
                    size="small"
                  >
                    <template slot="prepend">最小值</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == true"
                  style="margin-left: -100px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress_max"
                    size="small"
                  >
                    <template slot="prepend">最大值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col
                :span="18"
                style="display: flex; margin-left: 239px"
                v-if="infoForm.nodeAntiAffi_ingress == '强制'"
              >
                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == false"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress"
                    size="small"
                    style="width: 475px"
                    disabled
                  />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == true"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress_min"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">最小值</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_ingress == true"
                  style="margin-left: -100px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_ingress_max"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">最大值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 239px">
                <el-form-item label="资源配额" prop="cpu_gateway">
                  <el-input
                    v-model="infoForm.cpu_ingress"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_gateway" style="margin-left: -100px">
                  <el-input
                    v-model="infoForm.cpu_ingress"
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
              <el-col :span="6" style="height: 50px">
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
                    v-model="infoForm.nodeAntiAffi_egress"
                    size="small"
                  >
                    <el-radio-button label="强制"></el-radio-button>
                    <el-radio-button label="期望"></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="部署节点">
                  <el-select
                    multiple
                    v-model="infoForm.deployNode_egress"
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

              <el-col
                :span="18"
                style="display: flex; margin-left: 239px"
                v-if="infoForm.nodeAntiAffi_egress == '期望'"
              >
                <el-form-item label="自动扩缩容">
                  <el-switch v-model="infoForm.automatic_egress" size="small" />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == false"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress"
                    size="small"
                    style="width: 300px"
                  />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == true"
                  style="margin-left: -50px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress_min"
                    size="small"
                  >
                    <template slot="prepend">最小值</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == true"
                  style="margin-left: -100px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress_max"
                    size="small"
                  >
                    <template slot="prepend">最大值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col
                :span="18"
                style="display: flex; margin-left: 239px"
                v-if="infoForm.nodeAntiAffi_egress == '强制'"
              >
                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == false"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress"
                    size="small"
                    style="width: 475px"
                    disabled
                  />
                </el-form-item>

                <el-form-item
                  label="实例数"
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == true"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress_min"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">最小值</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  prop="instanceNum_ingress"
                  v-if="infoForm.automatic_egress == true"
                  style="margin-left: -100px"
                >
                  <el-input
                    v-model="infoForm.instanceNum_egress_max"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">最大值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="display: flex; margin-left: 239px">
                <el-form-item label="资源配额" prop="cpu_gateway">
                  <el-input
                    v-model="infoForm.cpu_egress"
                    size="small"
                    style="width: 220px"
                  >
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="memory_gateway" style="margin-left: -100px">
                  <el-input
                    v-model="infoForm.memory_egress"
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

          <!-- istiod -->
          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">istiod</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  istio 控制面组件，负责配置下发等功能。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic_istiod"
                      size="small"
                    />
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_istiod == false"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_istiod"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_istiod == true"
                    style="margin-left: -60px"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_istiod_min"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最小值</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="instanceNum_istiod"
                    style="margin-left: -125px"
                    v-if="infoForm.automatic_istiod == true"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_istiod_max"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最大值</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_istiod"
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
                      v-model="infoForm.memory_istiod"
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

          <!-- asm-controller -->
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
                      v-model="infoForm.instanceNum_asm"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_asm"
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
                      v-model="infoForm.memory_asm"
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

          <!-- flagger -->
          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">flagger</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  灰度发布组件，用于执行自动化灰度发布。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum_flagger"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_flagger"
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
                      v-model="infoForm.memory_flagger"
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

          <!-- jaeger_collector -->
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
                  调用链组件,负责接收服务上报的调用链数据,并存储到 ES 中。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic_collector"
                      size="small"
                    />
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_collector == false"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_collector"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_collector == true"
                    style="margin-left: -60px"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_collector"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最小值</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="instanceNum_istiod"
                    style="margin-left: -125px"
                    v-if="infoForm.automatic_collector == true"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_collector"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最大值</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_collector"
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
                      v-model="infoForm.memory_collector"
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

          <!-- jaeger_query -->
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
                  调用链组件，负责调用链数据查询。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="实例数" prop="instanceNum">
                    <el-input
                      v-model="infoForm.instanceNum_query"
                      size="small"
                      style="width: 475px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_query"
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
                      v-model="infoForm.memory_query"
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

          <!-- grafana -->
          <div class="component-div" style="margin-left: 0px">
            <el-row
              :gutter="20"
              class="container-div"
              style="padding-top: 20px; display: flex"
            >
              <div style="flex: 3 1 60%; padding-left: 10px">
                <div style="font-size: 16px; font-weight: 500">grafana</div>
                <div style="font-size: 14px; color: rgba(150, 152, 155)">
                  服务网络监控组件。
                </div>
              </div>

              <div>
                <el-col :span="18" style="display: flex">
                  <el-form-item label="自动扩缩容">
                    <el-switch
                      v-model="infoForm.automatic_grafana"
                      size="small"
                    />
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_grafana == false"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_grafana"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="实例数"
                    prop="instanceNum"
                    v-if="infoForm.automatic_grafana == true"
                    style="margin-left: -60px"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_grafana"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最小值</template>
                    </el-input>
                  </el-form-item>

                  <el-form-item
                    prop="instanceNum_istiod"
                    style="margin-left: -125px"
                    v-if="infoForm.automatic_grafana == true"
                  >
                    <el-input
                      v-model="infoForm.instanceNum_grafana"
                      size="small"
                      style="width: 175px"
                    >
                      <template slot="prepend">最大值</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="display: flex">
                  <el-form-item label="资源配额" prop="cpu_gateway">
                    <el-input
                      v-model="infoForm.cpu_grafana"
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
                      v-model="infoForm.memory_grafana"
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
      <div style="float: left">
        资源总量 :
        <i class="el-icon-cpu primary2-text" />2.6核
        <i class="el-icon-bank-card primary-text" /> 5572Mi
      </div>
      <el-button type="primary" @click="submitCreate">添加</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <!-- 新建保密字典 -->
    <el-dialog
      title="新建保密字典"
      @close="dictionaryVisible = false"
      :visible.sync="dictionaryVisible"
      width="60%"
    >
      <el-form
        v-if="formType == 'elastic'"
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

      <el-form
        v-if="formType == 'monitor'"
        ref="dictionaryForm_monitor"
        :model="dictionaryForm_monitor"
        :rules="dictionaryRules_monitor"
        label-width="135px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="dictionaryForm_monitor.name">
            <template slot="prepend">
              {{ "servicemesh-" + this.infoForm.monitorType + "- " }}
            </template>
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
                  v-model="dictionaryForm_monitor.userName"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="22">
              <el-form-item label="密码" prop="password">
                <el-input
                  show-password
                  v-model="dictionaryForm_monitor.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSure">添加</el-button>
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

      clusterInfo: false,

      infoForm: {},

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
        monitorType: [
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
        { label: "VictoriaMetrics", value: "victoriametrics" },
      ],

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
      dictionaryForm_monitor: {
        name: "",
        userName: "",
        password: "",
      },

      dictionaryRules_monitor: {
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

  created() {
    // this.name = this.$route.query.name
    this.infoForm = {
      name: this.$route.query.name,
      version: "1.12.4",
      clusterData: [{ cluster: "global", region: "", version: "1.21.10" }],
      // 网关
      nodeAntiAffi_ingress: "期望",
      deployNode_ingress: [],
      automatic_ingress: false,
      instanceNum_ingress: 1,
      instanceNum_ingress_min: 2,
      instanceNum_ingress_max: 4,
      cpu_ingress: "0.5",
      memory_ingress: "500",

      nodeAntiAffi_egress: "期望",
      deployNode_egress: [],
      automatic_egress: false,
      instanceNum_egress: 1,
      instanceNum_egress_min: 2,
      instanceNum_egress_max: 4,
      cpu_egress: "0.5",
      memory_egress: "500",

      // istiod
      automatic_istiod: false,
      instanceNum_istiod: 1,
      instanceNum_istiod_min: 2,
      instanceNum_istiod_max: 4,
      cpu_istiod: "0.5",
      memory_istiod: "2048",

      // asm
      instanceNum_asm: 1,
      cpu_asm: "0.5",
      memory_asm: "360",

      // flagger
      instanceNum_flagger: 1,
      cpu_flagger: "0.5",
      memory_flagger: "3600",

      // collector
      automatic_collector: false,
      instanceNum_collector: 1,
      instanceNum_collector_min: 2,
      instanceNum_collector_max: 4,
      cpu_collector: "0.5",
      memory_collector: "3000",

      // query
      instanceNum_query: 1,
      cpu_query: "0.5",
      memory_query: "3600",

      // grafana
      automatic_grafana: false,
      instanceNum_grafana: 1,
      instanceNum_grafana: 2,
      instanceNum_grafana: 4,
      cpu_grafana: "0.5",
      memory_grafana: "3000",
    };
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

    handleToCluster(cluster) {
      this.$router.push({
        path: "/cluster-management/cluster/detail",
        query: { name: cluster },
      });
    },

    handleCreateDict(type) {
      this.dictionaryVisible = true;
      this.dictionaryForm = this.$options.data().dictionaryForm;
      this.dictionaryForm_monitor = this.$options.data().dictionaryForm_monitor;
      // this.$nextTick(() => {
      //   this.$refs["dictionaryForm"].resetFields();
      // });
      // this.$nextTick(() => {
      //   this.$refs["dictionaryForm_monitor"].resetFields();
      // });
      this.formType = type;
    },

    handleCancel() {
      this.formType = "";
      this.dictionaryVisible = false;
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
          label: `servicemesh-${this.infoForm.monitorType}-${this.dictionaryForm_monitor.name}`,
          value: `servicemesh-${this.infoForm.monitorType}-${this.dictionaryForm_monitor.name}`,
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