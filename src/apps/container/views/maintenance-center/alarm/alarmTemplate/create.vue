<template>
  <div class="create-container">
    <div class="scroll-div">
      <!-- 基本信息 -->
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
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" prop="name">
                  <span v-if="name">{{ this.name }}</span>
                  <el-input
                    v-else
                    v-model="infoForm.name"
                    placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="描述" prop="desc">
                  <el-input v-model="infoForm.desc" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="资源类型">
                  <span v-if="name">{{ infoForm.type }}</span>
                  <el-radio-group v-model="infoForm.type" v-else>
                    <el-radio-button label="cluster">集群</el-radio-button>
                    <el-radio-button label="node">节点</el-radio-button>
                    <el-radio-button label="microserver"
                      >微服务</el-radio-button
                    >
                    <el-radio-button label="component"
                      >计算组件</el-radio-button
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!-- 告警规则 -->
      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">告警规则</span>
        </div>
        <div class="text item event-container">
          <el-form ref="alarmForm" :model="alarmForm" :rules="alarmRules">
            <el-form-item>
              <table border="0" style="width: 100%">
                <thead>
                  <tr class="headerStyle">
                    <th>
                      <span class="left-cell">规则</span>
                    </th>
                    <th>
                      <span class="left-cell">告警类型</span>
                    </th>
                    <th>
                      <span class="left-cell">等级</span>
                    </th>
                    <th>
                      <!-- <div class="left-cell">操作</div> -->
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(domain, index) in alarmForm.nodeUpdateItems"
                    :key="domain.id"
                  >
                    <td>
                      <el-form-item style="width: 80%">
                        <span>{{ domain.rule }}</span>
                        <el-tooltip
                          content="Bottom center"
                          placement="top"
                          effect="light"
                        >
                          <div slot="content">
                            标签：
                            <el-tag
                              size="mini"
                              style="margin-bottom: 10px"
                              v-for="item in domain.labelItems"
                              :key="item.value"
                            >
                              {{ `${item.key}:${item.value}` }}
                            </el-tag>
                            <br />
                            注解：
                            <el-tag
                              size="mini"
                              style="margin-bottom: 10px"
                              v-for="item in domain.noteItems"
                              :key="item.value"
                            >
                              {{ `${item.key}:${item.value}` }}
                            </el-tag>
                          </div>
                          <i
                            class="el-icon-document cursor-pointer"
                            style="margin-left: 5px"
                            v-if="
                              domain.labelItems.length > 0 ||
                              domain.noteItems.length > 0
                            "
                          />
                        </el-tooltip>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item>
                        <span>{{ domain.type }}</span>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item>
                        <span>{{ domain.level }}</span>
                      </el-form-item>
                    </td>
                    <td class="text-center">
                      <el-button
                        icon="el-icon-edit-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="
                          handleEditAlarmRules('nodeUpdateItems', domain, index)
                        "
                      />
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="
                          handleDeleteAlarmRules(
                            'nodeUpdateItems',
                            domain,
                            index
                          )
                        "
                      />
                    </td>
                  </tr>

                  <tr v-if="alarmForm.nodeUpdateItems.length == 0">
                    <td colspan="5">
                      <div class="text-center" style="color: #a6a6a6">
                        <i class="el-icon-warning" style="color: orange" />
                        请至少添加一条告警规则
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handleAddAlarmRules"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加告警规则
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <!-- 策略配置 -->
      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px">策略配置</span>
        </div>
        <div class="text item event-container">
          <el-form
            ref="configForm"
            :model="configForm"
            :rules="configRules"
            label-width="135px"
          >
            <el-form-item label="通知策略">
              <el-col :span="22">
                <el-select
                  @focus="setMinWidthEmpty"
                  style="width: 100%"
                  v-model="configForm.noticePolicy"
                  placeholder="支持选择多个"
                  multiple
                >
                  <el-option
                    v-for="item in policyOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="告警发送间隔">
              <el-col :span="22">
                <el-radio-group v-model="configForm.sendInterval">
                  <el-radio-button label="global">全局</el-radio-button>
                  <el-radio-button label="custom">自定义</el-radio-button>
                </el-radio-group>
                <el-tooltip effect="dark" class="item" placement="top">
                  <template slot="content">
                    <div style="max-width: 450px">
                      •
                      如告警发生后未恢复正常，可设置间隔多久发送一次告警消息;<br />
                      • 如设置为 "不重复"，则只在告警和恢复时发送告警消息;<br />
                    </div>
                  </template>
                  <i class="el-icon-question margin-left10 question-icon" />
                </el-tooltip>
              </el-col>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                灾难告警 5分钟，严重告警 15分钟，警告告警 30分钟，提示告警 1小时
              </el-descriptions-item>
            </el-descriptions>

            <el-row :gutter="20" v-if="configForm.sendInterval == 'custom'">
              <el-col :span="10" style="padding-left: 75px">
                <el-form-item label="灾难告警" prop="disaster">
                  <el-select v-model="configForm.disaster">
                    <el-option
                      v-for="item in timeOptions"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="严重告警" prop="clusterPort">
                  <el-select v-model="configForm.serious">
                    <el-option
                      v-for="item in timeOptions"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20" v-if="configForm.sendInterval == 'custom'">
              <el-col :span="10" style="padding-left: 75px">
                <el-form-item label="警告告警" prop="disaster">
                  <el-select v-model="configForm.warning">
                    <el-option
                      v-for="item in timeOptions"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="提示告警" prop="clusterPort">
                  <el-select v-model="configForm.tips">
                    <el-option
                      v-for="item in timeOptions"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleSubmit">
        <span v-if="name">更新</span>
        <span v-else>创建</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>

    <el-dialog
      :title="alarmRulesTitle"
      @close="alarmRulesVisible = false"
      :visible.sync="alarmRulesVisible"
      width="70%"
    >
      <el-form
        ref="alarmRulesForm"
        :model="alarmRulesForm"
        :rules="alarmRulesRules"
        label-width="135px"
      >
        <el-form-item label="告警类型">
          <el-radio-group v-model="alarmRulesForm.type">
            <el-radio-button label="metric">指标告警</el-radio-button>
            <el-radio-button label="custom">自定义告警</el-radio-button>
          </el-radio-group>
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                平台支持如下 2 种警告类型：<br />
                指标警告：是平台根据客户需求而提炼的满足大部分客户需求大多数的指标项目，通过选择企业可快速达到对业务的监控及警告。<br />
                自定义警告：则可由客户根据自己公司的使用特定，添加企业专属的指标规则，更好的满足企业对于告警的高阶需求。<br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item
          label="指标名称"
          prop="metricName"
          v-if="alarmRulesForm.type == 'metric'"
        >
          <el-select v-model="alarmRulesForm.metricName" style="width: 80%">
            <el-option
              v-for="item in metricNameOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="指标名成"
          prop="metricName2"
          v-if="alarmRulesForm.type == 'custom'"
        >
          <el-input v-model="alarmRulesForm.metricName2" style="width: 80%" />
        </el-form-item>

        <el-form-item
          label="表达式"
          prop="expression"
          v-if="alarmRulesForm.type == 'custom'"
        >
          <el-input v-model="alarmRulesForm.expression" style="width: 80%" />
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            例如：(sum(up{job="apiserver"} == 1) / count(up{job="apiserver"})) *
            100
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="指标单位" v-if="alarmRulesForm.type == 'custom'">
          <el-select style="width: 60%" v-model="alarmRulesForm.measure">
            <el-option
              v-for="item in measureOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图例参数" v-if="alarmRulesForm.type == 'custom'">
          <el-input v-model="alarmRulesForm.params" style="width: 60%" />
          <el-tooltip effect="dark" class="item" placement="top">
            <template slot="content">
              <div style="max-width: 450px">
                •
                说明：控制图表中曲线对应的名称，可以使用文本或者模板的形式。<br />
                • 规则：输入值必须为 {{ ".xxxx" }} 格式，例如
                {{ ".hostname" }}
                将替换为表达式返回值的主机名标签对应的值。<br />
                •
                注：当输入了错误格式的图例参数时，图标种曲线对应名称将按照原始格式展示。<br />
              </div>
            </template>
            <i class="el-icon-question margin-left10 question-icon" />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="触发条件" prop="triggerCond">
          <el-row>
            <el-col :span="6">
              <el-select
                v-model="alarmRulesForm.triggerCond"
                style="width: 95%"
              >
                <el-option
                  v-for="item in operatorOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="10">
              <el-input
                style="width: 95%"
                v-model="alarmRulesForm.number"
                placeholder="仅支持数字，最多 17 位整数、4 位小数"
              />
            </el-col>

            <el-col :span="8">
              <el-select v-model="alarmRulesForm.persist" style="width: 95%">
                <el-option
                  v-for="item in persistOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="告警等级">
          <el-radio-group v-model="alarmRulesForm.level">
            <el-radio-button label="disaster">灾难告警</el-radio-button>
            <el-radio-button label="serious">严重告警</el-radio-button>
            <el-radio-button label="warning">警告告警</el-radio-button>
            <el-radio-button label="tips">提示告警</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <FoldableBlock btn-tex="更多">
          <el-form-item label="标签" style="margin-bottom: 0">
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
                  v-for="(domain, index) in alarmRulesForm.labelItems"
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
                      @click="handleDeleteLabel('labelItems', domain, index)"
                    />
                  </td>
                </tr>

                <tr v-if="alarmRulesForm.labelItems.length == 0">
                  <td colspan="5">
                    <div class="text-center" style="color: #a6a6a6">无标签</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAddLabel('labelItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>

          <el-form-item label="注解" style="margin-bottom: 0">
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
                  v-for="(domain, index) in alarmRulesForm.noteItems"
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
                      @click="handleDeleteLabel('noteItems', domain, index)"
                    />
                  </td>
                </tr>

                <tr v-if="alarmRulesForm.noteItems.length == 0">
                  <td colspan="5">
                    <div class="text-center" style="color: #a6a6a6">无标签</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAddLabel('noteItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
        </FoldableBlock>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddRules('nodeUpdateItems')">
          <span>{{ btnText }}</span>
        </el-button>
        <el-button @click="alarmRulesVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock.vue";

export default {
  name: "ClusterCreate",
  components: { FoldableBlock },
  data() {
    return {
      name: "",
      btnText: "",

      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      infoForm: {
        name: "",
        desc: "",
        type: "cluster",
      },
      infoRules: {
        name: [{ required: true, message: "名称是必填项", trigger: "blur" }],
      },
      configForm: {
        noticePolicy: "",
        sendInterval: "global",
        disaster: "5min",
        serious: "5min",
        warning: "5min",
        tips: "5min",
      },
      configRules: {},

      alarmForm: {
        nodeUpdateItems: [],
      },
      alarmRules: {},

      // 告警规则
      alarmRulesVisible: false,
      alarmRulesTitle: "",
      alarmRulesForm: {
        type: "metric",
        metricName: "集群内的处于告警状态的告警数(cluster.alert.firing)",
        metricName2: "",
        triggerCond: ">",
        number: "",
        persist: "30s",
        level: "disaster",
        expression: "",
        measure: "",
        params: "",
        labelItems: [],
        noteItems: [],
      },
      alarmRulesRules: {
        metricName: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        metricName2: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        triggerCond: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        expression: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      measureOptions: [
        { label: "%", value: "%" },
        { label: "byte/second", value: "byte/second" },
        { label: "byte", value: "byte" },
        { label: "kb", value: "kb" },
        { label: "mb", value: "mb" },
        { label: "gb", value: "gb" },
        { label: "core", value: "core" },
        { label: "s", value: "s" },
        { label: "ms", value: "ms" },
      ],
      metricNameOptions: [
        {
          label: "集群内的处于告警状态的告警数(cluster.alert.firing)",
          value: "集群内的处于告警状态的告警数(cluster.alert.firing)",
        },
        {
          label: "集群内的cpu使用率(cluster.cpu.utilization)",
          value: "集群内的cpu使用率(cluster.cpu.utilization)",
        },
        {
          label: "集群物理GPU显存使用率(cluster.gpu.memory.utilization)",
          value: "集群物理GPU显存使用率(cluster.gpu.memory.utilization)",
        },
        {
          label: "集群的物理GPU使用率(cluster.gpu.utilization)",
          value: "集群的物理GPU使用率(cluster.gpu.utilization)",
        },
      ],
      operatorOptions: [
        { label: ">", value: ">" },
        { label: ">=", value: ">=" },
        { label: "==", value: "==" },
        { label: "<=", value: "<=" },
        { label: "<", value: "<" },
        { label: "!=", value: "!=" },
      ],
      persistOptions: [
        { label: "持续 30 秒", value: "30s" },
        { label: "持续 1 分钟", value: "1min" },
        { label: "持续 2 分钟", value: "2min" },
        { label: "持续 3 分钟", value: "3min" },
        { label: "持续 5 分钟", value: "5min" },
        { label: "持续 10 分钟", value: "10min" },
        { label: "持续 30 分钟", value: "30min" },
      ],
      policyOptions: [],
      timeOptions: [
        { label: "5分钟", value: "5min" },
        { label: "10分钟", value: "10min" },
        { label: "15分钟", value: "15min" },
        { label: "30分钟", value: "30min" },
        { label: "1小时", value: "1h" },
        { label: "3小时", value: "3h" },
        { label: "6小时", value: "6h" },
        { label: "12小时", value: "12h" },
        { label: "1天", value: "1day" },
        { label: "不重复", value: "no-repeat" },
      ],
    };
  },

  created() {
    this.name = this.$route.query.name;
    if (this.name) {
      this.infoForm = {
        name: this.name,
        desc: "",
        type: "cluster",
      };

      this.alarmForm = {
        nodeUpdateItems: [
          {
            id: nanoid(),
            rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
            type: "指标告警",
            level: "严重",
            labelItems: [],
            noteItems: [],
          },
        ],
      };

      this.configForm = {
        noticePolicy: "",
        sendInterval: "global",
        disaster: "5min",
        serious: "5min",
        warning: "5min",
        tips: "5min",
      };
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

    handleSubmit() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    // 添加
    handleAddAlarmRules() {
      this.alarmRulesTitle = "添加告警规则";
      this.btnText = "添加";
      this.alarmRulesForm = this.$options.data().alarmRulesForm;
      this.alarmRulesVisible = true;
    },
    // 删除
    handleDeleteAlarmRules(filed, item, index) {
      this.alarmForm[filed].splice(index, 1);
    },

    handleEditAlarmRules(filed, item, index) {
      this.alarmRulesTitle = "编辑告警规则";
      this.btnText = "确定";
      this.alarmRulesVisible = true;
      this.alarmRulesForm = Object.assign(
        {
          type: "metric",
          metricName: "集群内的处于告警状态的告警数(cluster.alert.firing)",
          metricName2: "",
          triggerCond: ">",
          number: "30",
          persist: "30s",
          level: "disaster",
          expression: "",
          measure: "",
          params: "",
          labelItems: [],
          noteItems: [],
        },
        { ...item, type: "metric", level: "disaster" }
      );
    },

    handleAddRules(filed) {
      this.alarmRulesVisible = false;
      const obj = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        labelItems: [],
        noteItems: [],
      };
      const obj2 = {
        id: nanoid(),
        rule: "集群内的处于警告状态的警告数 > 30 且持续 30 秒",
        type: "指标告警",
        level: "严重",
        labelItems: [{ key: "a", value: "b" }],
        noteItems: [{ key: "c", value: "d" }],
      };
      this.alarmForm[filed].push(obj, obj2);
    },

    // 添加
    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.alarmRulesForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.alarmRulesForm[filed].splice(index, 1);
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
.left-cell {
  float: left;
  margin-left: 1px;
}
</style>