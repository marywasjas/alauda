<template>
  <div class="native-update-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>原生应用</span>
        </div>
        <div class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="名称" prop="name">
              {{ ruleForm.name }}
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="margin-top">
        <BaseCard>
          <header>
            <div class="card-title right-header">
              <div v-if="activeTab === 'list'">
                <el-dropdown split-button type="primary" trigger="click">
                  <div @click="addComputerCom">
                    <i class="el-icon-plus" />
                    添加计算机组件
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="item in dropList"
                      :key="item.txt"
                      split-button
                      :command="item.txt"
                      @click.native="handelOperation(item)"
                    >{{ item.txt }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-if="activeTab === 'yaml'" />
              <el-radio-group v-model="activeTab">
                <el-radio-button label="list">资源列表</el-radio-button>
                <el-radio-button label="yaml">YAML</el-radio-button>
              </el-radio-group>
            </div>
          </header>
          <section v-if="activeTab === 'list'">
            <el-descriptions
              v-for="descriptions in descriptionsList"
              :key="descriptions.id"
              class="margin-top10 descriptions-div"
              title=""
              :column="1"
            >
              <template slot="extra">
                <i class="el-icon-edit cursor-pointer margin-right10" @click="handleUpdateCom(descriptions)" />
                <i class="el-icon-remove-outline cursor-pointer" @click="handleDelete(descriptions)" />
              </template>
              <el-descriptions-item
                v-for="item in descriptions.descriptionsItems"
                :key="item.label"
                :label="item.label"
              >
                <div v-if="item.type !== 'table'" style="width:100%;">{{ item.value }}</div>
                <div v-else style="width:100%;">
                  <el-table
                    :data="item.table.tableData.data"
                    style="width: 100%"
                    header-row-class-name="headerStyle"
                  >
                    <el-table-column
                      v-for="col in item.table.tableColumnList"
                      :key="col.label"
                      :label="col.label"
                    >
                      <template slot-scope="scope">
                        <div v-if="col.id === 'resource'">
                          cpu:{{ scope.row.cpu }},内存:{{ scope.row.memory }}
                        </div>
                        <div v-else>
                          {{ scope.row[col.id] }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </section>
          <section v-if="activeTab === 'yaml'">
            <div class="yaml-div">
              <monaco-editor
                ref="monacoEditor"
                :code="currentCode"
                :read-only="false"
                :language="language"
                @handleBlur="handleBlur"
              />
            </div>
          </section>
        </BaseCard>
      </div>
    </div>
    <div class="fixed-div">
      <el-input
        v-model="ruleForm.version"
        placeholder="版本注释"
        style="width: 300px"
      />
      <el-checkbox
        v-model="ruleForm.forceUpdate"
        class="margin-left10"
      >强制更新</el-checkbox>
      <el-tooltip
        class="item"
        effect="dark"
        content="应用下的所有计算组件无论是否有改动都会触发滚动更新"
        placement="top"
      >
        <i class="el-icon-question margin-left10 question-icon" />
      </el-tooltip>
      <el-button
        type="primary"
        class="margin-left10"
        @click="submitCreate"
      >更新</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
    <select-mirror
      :form-visible="formVisible"
      @closeFormDialog="closeFormDialog"
    />
    <monaco-editor-dialog
      v-if="yamlVisible"
      title="通过YAML添加"
      :visible="yamlVisible"
      sub-title="YAML(读写)"
      :code="currentCodeDialog"
      :language="language"
      :read-only="false"
      submit-txt="添加"
      @closeDetailsDialog="closeYamlDialog"
      @handleBlur="handleBlurDialog"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
import SelectMirror from '@/apps/container/views/components/SelectMirror'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'
import { descriptionsTableData } from '../constant/index'

export default {
  name: 'NativeUpdate',
  components: { MonacoEditor, SelectMirror, MonacoEditorDialog },
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        showName: '',
        version: '',
        forceUpdate: false
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 0,
            max: 40,
            message: '长度在 0 到 40 个字符',
            trigger: 'blur'
          }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      currentCode: '',
      inputCode: {},
      defaultCode: {
        detail: {
          cluster_name: 'global',
          event: {
            count: 6713,
            eventTime: null,
            firstTimestamp: '2022-10-14T05:33:11Z',
            involvedObject: {
              apiVersion: 'v1',
              fieldPath: 'spec.containers{ubuntu}',
              kind: 'Pod',
              name: 'ubuntu-bq84l',
              namespace: 'toda-elasticsearch-system',
              resourceVersion: '519516627',
              uid: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0'
            },
            lastTimestamp: '2022-11-07T01:33:22Z',
            message:
              'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
            metadata: {
              creationTimestamp: '2022-11-07T01:18:15Z',
              name: 'ubuntu-bq84l.171dd899b971f3ab',
              namespace: 'toda-elasticsearch-system',
              resourceVersion: '603142979',
              uid: 'c61582db-0ce2-469d-8606-9854962ffc82'
            },
            reason: 'Pulled',
            reportingComponent: '',
            reportingInstance: '',
            source: {
              component: 'kubelet',
              host: '172.16.129.51'
            },
            type: 'Normal'
          },
          operation: 'Pulled',
          operator: 'kubelet@172.16.129.51',
          source: 'kubernetes'
        },
        log_level: 0,
        resource_id: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0',
        resource_type: 'Pod',
        time: '1667783895000000'
      },
      language: 'yaml',
      activeTab: 'list',
      dropList: [
        {
          txt: '添加内部路由'
        },
        {
          txt: '添加入站规则'
        },
        {
          txt: '通过YAML添加'
        }
      ],
      formVisible: false,
      yamlVisible: false,
      currentCodeDialog: '',
      descriptionsList: [
        {
          id: '1',
          descriptionsItems: [
            {
              label: '资源类型',
              value: '部署'
            },
            {
              label: '名称',
              value: 'nginx-nginx'
            },
            {
              label: '实例数',
              value: '0'
            },
            {
              label: '容器',
              value: '',
              type: 'table',
              table: {
                tableColumnList: [
                  {
                    id: 'name',
                    label: '名称'
                  },
                  {
                    id: 'mirror',
                    label: '镜像'
                  },
                  {
                    id: 'resource',
                    label: '资源限制'
                  }
                ],
                tableData: descriptionsTableData
              }
            }
          ]
        },
        {
          id: '2',
          descriptionsItems: [
            {
              label: '资源类型',
              value: '部署112312'
            },
            {
              label: '名称',
              value: 'nginx-nginx'
            },
            {
              label: '实例数',
              value: '0'
            },
            {
              label: '容器',
              value: '',
              type: 'table',
              table: {
                tableColumnList: [
                  {
                    id: 'name',
                    label: '名称'
                  },
                  {
                    id: 'mirror',
                    label: '镜像'
                  },
                  {
                    id: 'resource',
                    label: '资源限制'
                  }
                ],
                tableData: descriptionsTableData
              }
            }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.name = this.$route.query.name
    this.ruleForm.showName = this.$route.query.desc
  },
  mounted() {
    this.defaultCodeStr = JSON.stringify(this.defaultCode, null, 2)
  },
  methods: {
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$set(this.ruleForm, 'code', this.inputCode)
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    },
    // 添加计算机组件
    addComputerCom() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    handelOperation(item) {
      const txt = item.txt
      if (txt === '通过YAML添加') {
        this.yamlVisible = true
      }
    },
    closeYamlDialog() {
      this.yamlVisible = false
    },
    handleBlurDialog(val) {
      console.log(val)
    },
    submitForm(val) {
      console.log(val)
    },
    handleDelete(item) {
      this.descriptionsList.splice(this.descriptionsList.indexOf(item), 1)
    },
    handleUpdateCom(item) {
      this.$router.push({
        name: 'UpdateComponent'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.native-update-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
  }
  section {
    border-top: 1px solid $border-color-two;
    margin-top: 10px;
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
}
</style>
