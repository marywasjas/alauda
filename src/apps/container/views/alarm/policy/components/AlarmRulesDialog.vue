<template>
  <div>
    <el-dialog
      title="添加告警规则(部署)"
      :visible.sync="tagVisible"
      width="840px"
      :close-on-click-modal="false"
      :before-close="closeTagDialog"
    >
      <el-form
        ref="dialogForm"
        :model="dialogForm"
        label-suffix=":"
        :rules="dialogRule"
        label-width="90px"
      >
        <el-form-item label="告警类型" prop="alarmType">
          <el-radio-group v-model="dialogForm.alarmType">
            <el-radio label="指标告警">指标告警</el-radio>
            <el-radio label="日志告警">日志告警</el-radio>
            <el-radio label="事件告警">事件告警</el-radio>
            <el-radio label="自定义告警">自定义告警</el-radio>
          </el-radio-group>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              平台支持如下 4 种告警类型：<br>
              指标告警：是平台根据客户需求而提炼的满足大部分客户需求大多数的指标项，通过选择企业可快速达到对业务的监控及告警。<br>
              日志告警：是对平台日志内容进行监控及告警。<br>
              事件告警：是对平台事件原因进行监控及告警。<br>
              自定义告警：则可由客户按照自己公司的使用特定，添加企业专属的指标规则，更好的满足企业对于告警的高阶需求。
            </div>
            <i class="el-icon-question question-icon margin-left10" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="指标名称" prop="ruleName">
          <el-select v-model="dialogForm.ruleName" style="width: 100%">
            <el-option
              label="工作负载的CPU使用率(workload.cpu.utilization)"
              value="工作负载的CPU使用率"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="触发条件" prop="condition">
          <div class="flex-center">
            <el-select
              v-model="dialogForm.condition"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label=">" value=">" />
              <el-option label="<" value="<" />
              <el-option label="=" value="=" />
            </el-select>
            <el-input
              v-model="dialogForm.percent"
              class="margin-left10 margin-right10"
              placeholder="仅支持数字，最多17位整数、4位小数"
            >
              <template slot="append">%</template>
            </el-input>
            <el-select
              v-model="dialogForm.durarion"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="持续30秒" value="持续30秒" />
              <el-option label="持续60秒" value="持续60秒" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="告警等级" prop="alarmLevel">
          <el-radio-group v-model="dialogForm.alarmLevel">
            <el-radio label="灾难告警">灾难告警</el-radio>
            <el-radio label="严重告警">严重告警</el-radio>
            <el-radio label="警告告警">警告告警</el-radio>
            <el-radio label="提示告警">提示告警</el-radio>
          </el-radio-group>
        </el-form-item>
        <foldable-block>
          <el-form-item label="标签" prop="tags">
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
                <tr v-if="dialogForm.tags.length == 0">
                  <td colspan="3" class="no-data">无标签</td>
                </tr>
                <tr v-for="(tag, index) in dialogForm.tags" :key="tag.id">
                  <td>
                    <el-form-item
                      label=""
                      :prop="'tags.' + index + '.key'"
                      :rules="{
                        required: true,
                        message: '键不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="tag.key" placeholder="键" />
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'tags.' + index + '.value'"
                      :rules="{
                        required: true,
                        message: '值不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="tag.value" placeholder="值" />
                    </el-form-item>
                  </td>
                  <td>
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="handleTagDelete(tag, index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleTagAdd"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
          <el-form-item label="注解" prop="annotation">
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
                <tr v-if="dialogForm.annotation.length == 0">
                  <td colspan="3" class="no-data">无注解</td>
                </tr>
                <tr
                  v-for="(row, index) in dialogForm.annotation"
                  :key="row.id"
                >
                  <td>
                    <el-form-item
                      label=""
                      :prop="'annotation.' + index + '.key'"
                      :rules="{
                        required: true,
                        message: '键不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="row.key" placeholder="键" />
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item
                      label=""
                      :prop="'annotation.' + index + '.value'"
                      :rules="{
                        required: true,
                        message: '值不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="row.value" placeholder="值" />
                    </el-form-item>
                  </td>
                  <td>
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="handleAnnotDelete(row, index)"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAnnotAdd"
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTagDialog">添加</el-button>
        <el-button @click="closeTagDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FoldableBlock from '@/apps/container/views/components/FoldableBlock'
import { nanoid } from 'nanoid'

export default {
  name: 'AlarmRulesDialog',
  components: { FoldableBlock },
  props: {
    tagVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogForm: {
        ruleName: '工作负载的CPU使用率',
        condition: '>',
        percent: '',
        durarion: '持续30秒',
        alarmLevel: '严重告警',
        alarmType: '指标告警',
        tags: [],
        annotation: [],
        type: 'default',
        enable: '否'
      },
      dialogRule: {
        ruleName: [
          { required: true, message: '请输入指标名称', trigger: 'blur' }
        ],
        condition: [
          { required: true, message: '请选择触发条件', trigger: 'blur' }
        ],
        alarmLevel: [
          { required: true, message: '请选择告警等级', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closeTagDialog() {
      this.$emit('closeTagDialog')
    },
    submitTagDialog() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.dialogForm.id = nanoid()
          this.$emit('submitTagDialog', this.dialogForm)
        } else {
          return false
        }
      })
    },
    handleAnnotDelete(item, index) {
      this.dialogForm.annotation.splice(this.dialogForm.annotation.indexOf(item), 1)
    },
    handleAnnotAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.dialogForm.annotation.push(obj)
    },
    handleTagDelete(item, index) {
      this.dialogForm.tags.splice(this.dialogForm.tags.indexOf(item), 1)
    },
    handleTagAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.dialogForm.tags.push(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
