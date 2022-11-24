
<template>
  <div>
    <el-dialog
      :title="affinityFormType === 'add' ? '添加亲和性' : '更新亲和性'"
      :visible.sync="affinityFormVisible"
      width="800px"
      :before-close="closeAffinityFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="affinityDialogForm"
          :model="affinityDialogForm"
          :rules="affinityRules"
          label-width="130px"
          label-suffix=":"
        >
          <div v-if="affinityFormType === 'add'">
            <el-form-item label="亲和性" prop="type">
              <el-radio-group v-model="affinityDialogForm.type">
                <el-radio label="pod亲和" value="pod亲和" />
                <el-radio label="pod反亲和" value="pod反亲和" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="方式" prop="way">
              <el-radio-group v-model="affinityDialogForm.way">
                <el-radio label="基本" value="基本" />
                <el-radio label="高级" value="高级" />
              </el-radio-group>
            </el-form-item>
            <div v-if="affinityDialogForm.way === '基本'">
              <el-form-item label="亲和组件" prop="com">
                <el-select
                  v-model="affinityDialogForm.com"
                  placeholder="请选择亲和组件"
                  style="width: 100%"
                >
                  <el-option
                    v-for="pro in persistentVolumeOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value"
                  />
                </el-select>
                <div class="tips-div">
                  <p v-if="affinityDialogForm.affinity === 'pod亲和'">
                    仅会调度到所选计算组件的容器组所在节点
                  </p>
                  <p v-else>不会调度到所选计算组件的容器组所在节点</p>
                </div>
              </el-form-item>
            </div>
            <div v-if="affinityDialogForm.way === '高级'">
              <el-form-item label="类型" prop="category">
                <el-select
                  v-model="affinityDialogForm.category"
                  placeholder="请选择类型"
                  style="width: 100%"
                >
                  <el-option
                    v-for="pro in affinityDialogFormTypeOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="affinityDialogForm.type === 'Preferred'"
                label="权重"
                prop="weight"
              >
                <el-input-number v-model="affinityDialogForm.weight" :min="1" />
              </el-form-item>
              <el-form-item label="主机拓扑域" prop="hostTopologyDomain">
                <el-input
                  v-model="affinityDialogForm.hostTopologyDomain"
                  placeholder="请输入主机拓扑域"
                />
              </el-form-item>
              <el-form-item
                label="匹配标签"
                prop="matchLabel"
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
                      v-for="(domain, index) in affinityDialogForm.matchLabel"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item
                          label=""
                          :prop="'matchLabel.' + index + '.key'"
                        >
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="'matchLabel.' + index + '.value'"
                        >
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleMatchLabelDelete(domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleMatchLabelAdd"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
            </div>
          </div>
          <div v-else>
            <el-form-item label="主机拓扑域" prop="hostTopologyDomain">
              <el-input
                v-model="affinityDialogForm.hostTopologyDomain"
                placeholder="请输入主机拓扑域"
              />
            </el-form-item>
            <el-form-item
              label="匹配标签"
              prop="matchLabel"
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
                    v-for="(domain, index) in affinityDialogForm.matchLabel"
                    :key="domain.id"
                  >
                    <td>
                      <el-form-item
                        label=""
                        :prop="'matchLabel.' + index + '.key'"
                      >
                        <el-input v-model="domain.key" placeholder="键" />
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item
                        label=""
                        :prop="'matchLabel.' + index + '.value'"
                      >
                        <el-input v-model="domain.value" placeholder="值" />
                      </el-form-item>
                    </td>
                    <td class="text-center">
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="handleMatchLabelDelete(domain, index)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handleMatchLabelAdd"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAffinityForm">{{
          affinityFormType === "add" ? "添加" : "更新"
        }}</el-button>
        <el-button @click="closeAffinityFormDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'AffinityFormDialog',
  components: {},
  props: {
    affinityFormVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    affinityFormType: {
      type: String,
      default: 'add'
    },
    currentAffinityForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      affinityDialogForm: {
        type: '',
        way: '',
        category: '',
        com: '',
        weight: 1,
        hostTopologyDomain: '',
        matchLabel: []
      },
      affinityDialogFormTypeOptions: [
        {
          labe: 'Required',
          value: 'Required'
        },
        {
          labe: 'Preferred',
          value: 'Preferred'
        }
      ],
      affinityRules: {
        com: [{ required: true, message: '请选择亲和组件', trigger: 'change' }],
        weight: [{ required: true, message: '请输入权重', trigger: 'change' }],
        hostTopologyDomain: [
          { required: true, message: '请输入主机拓扑域', trigger: 'blur' }
        ]
      },
      // 亲和组件 下拉数据
      persistentVolumeOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ]
    }
  },
  computed: {},
  watch: {
    currentAffinityForm: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.affinityDialogForm = { ...this.affinityDialogForm, ...this.currentAffinityForm }
      }
    }
  },
  created() {
    this.affinityDialogForm = { ...this.affinityDialogForm, ...this.currentAffinityForm }
  },
  mounted() {},
  methods: {
    // 容器组 亲和性 关闭弹窗
    closeAffinityFormDialog() {
      this.$emit('closeAffinityFormDialog')
    },
    // 容器组 亲和性 弹窗确定按钮
    submitAffinityForm() {
      this.$refs['affinityDialogForm'].validate((valid) => {
        if (valid) {
          this.$emit('submitAffinityForm', this.affinityDialogForm)
        } else {
          return false
        }
      })
    },
    // 删除弹窗内 匹配标签
    handleMatchLabelDelete(item, index) {
      this.affinityDialogForm.matchLabel.splice(
        this.affinityDialogForm.matchLabel.indexOf(item),
        1
      )
    },
    // 添加弹窗内 匹配标签
    handleMatchLabelAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.affinityDialogForm.matchLabel.push(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
