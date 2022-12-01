<template>
  <div class="computer-componentsForm-container">
    <BaseCard>
      <div style="display: flex; justify-content: space-between">
        <div class="card-title left-header">
          <span>更新{{ infoRuleForm.name }}</span>
        </div>
        <el-radio-group v-model="activeTab">
          <el-radio-button label="list">表单</el-radio-button>
          <el-radio-button label="yaml">YAML</el-radio-button>
        </el-radio-group>
      </div>
      <section v-if="activeTab === 'list'">
        <div class="margin-top" style="padding: 0 20px">
          <div class="info-title">基本信息</div>
          <el-form ref="infoRuleForm" :model="infoRuleForm" label-width="100px" label-suffix=":">
            <el-form-item label="名称" prop="name">
              {{ infoRuleForm.name }}
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="infoRuleForm.showName" style="width: 500px" />
            </el-form-item>
            <el-form-item label="实例数" prop="numberInstances">
              <el-input-number v-model="infoRuleForm.numberInstances" :min="1" />
            </el-form-item>
            <foldable-block btn-tex="更多">
              <el-form-item label="标签" prop="port" style="margin-bottom: 0">
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
                    <tr v-for="(domain, index) in infoRuleForm.labels" :key="domain.id">
                      <td>
                        <el-form-item label="" :prop="'labels.' + index + '.key'">
                          <el-input v-model="domain.key" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item label="" :prop="'labels.' + index + '.value'">
                          <el-input v-model="domain.value" placeholder="服务端口" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleDelete('labels', domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div class="cursor-pointer text-center hover-div" @click="handleAdd('labels')">
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <div class="flex-start">
                <el-form-item label="更新策略" style="margin-bottom: 0">
                  <el-input v-model="infoRuleForm.limits" placeholder="数字或者百分比">
                    <template slot="prepend">最大可超出数</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" label-width="0" class="margin-left10" style="margin-bottom: 0">
                  <el-input v-model="infoRuleForm.disabledNUumber" placeholder="数字或者百分比">
                    <template slot="prepend">最多不可用数</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" label-width="0" class="margin-left10" style="margin-bottom: 0">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      最大可超出数：Pods 数量最大可以超出的值，支持输入实例数量或百分比；<br>最多不可用数：Pods
                      数量最多不可用的值。
                    </div>
                    <i class="el-icon-question question-icon" />
                  </el-tooltip>
                </el-form-item>
              </div>
            </foldable-block>
          </el-form>
          <div class="info-title margin-top">容器组</div>
          <el-form ref="infoRuleForm" :model="infoRuleForm" label-width="100px" label-suffix=":">
            <el-form-item label="存储卷" style="margin-bottom: 0">
              <table border="0" style="width: 100%">
                <thead>
                  <tr class="headerStyle">
                    <th>
                      <div class="cell">名称</div>
                    </th>
                    <th>
                      <div class="cell">类型</div>
                    </th>
                    <th>
                      <div class="cell">相关配置</div>
                    </th>
                    <th>
                      <div class="cell">操作</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(domain, index) in infoRuleForm.storageVolumes" :key="domain.id">
                    <td>
                      <el-form-item label="" :prop="'storageVolumes.' + index + '.name'">
                        {{ domain.name }}
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" :prop="'storageVolumes.' + index + '.type'">
                        {{ domain.type }}
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" :prop="'storageVolumes.' + index + '.configure'">
                        {{ domain.configure }}
                      </el-form-item>
                    </td>
                    <td class="text-center">
                      <el-button
                        icon="el-icon-edit"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="handleStorageVolumeEdit(domain, index)"
                      />
                      <el-button
                        icon="el-icon-remove-outline"
                        class="cursor-pointer margin-left10 margin-right10"
                        type="text"
                        @click="handleDelete('storageVolumes', domain, index)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div
                        class="cursor-pointer text-center hover-div"
                        @click="handleStorageVolumeAdd('storageVolumes')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
            <el-form-item label="镜像凭据">
              <el-select v-model="infoRuleForm.mirrorCredentials" multiple collapse-tags placeholder="请选择镜像凭据">
                <el-option
                  v-for="item in mirrorCredentialsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <foldable-block btn-tex="更多">
              <el-form-item label="容器组标签" style="margin-bottom: 0">
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
                    <tr v-for="(domain, index) in infoRuleForm.containerGroupLabels" :key="domain.id">
                      <td>
                        <el-form-item label="" :prop="'containerGroupLabels.' + index + '.key'">
                          <el-input v-model="domain.key" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item label="" :prop="'containerGroupLabels.' + index + '.value'">
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleDelete('containerGroupLabels', domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div class="cursor-pointer text-center hover-div" @click="handleAdd('containerGroupLabels')">
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <el-form-item label="容器组注解" style="margin-bottom: 0">
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
                    <tr v-for="(domain, index) in infoRuleForm.containerGroupNotes" :key="domain.id">
                      <td>
                        <el-form-item label="" :prop="'containerGroupNotes.' + index + '.key'">
                          <el-input v-model="domain.key" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item label="" :prop="'containerGroupNotes.' + index + '.value'">
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleDelete('containerGroupNotes', domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div class="cursor-pointer text-center hover-div" @click="handleAdd('containerGroupNotes')">
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <el-form-item label="主机选择器">
                <el-select v-model="infoRuleForm.hostSelector" multiple collapse-tags placeholder="请选择主机选择器">
                  <el-option
                    v-for="pro in hostSelectorOptions"
                    :key="pro.value"
                    :label="pro.label"
                    :value="pro.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="亲和性" style="margin-bottom: 0">
                <div class="flex-end" style="align-items: start">
                  <table border="0" style="width: 100%">
                    <thead>
                      <tr class="headerStyle">
                        <th>
                          <div class="cell">类型</div>
                        </th>
                        <th>
                          <div class="cell">类别</div>
                        </th>
                        <th>
                          <div class="cell">权重</div>
                        </th>
                        <th>
                          <div class="cell">主机拓扑域</div>
                        </th>
                        <th>
                          <div class="cell">匹配标签</div>
                        </th>
                        <th>
                          <div class="cell">操作</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(domain, index) in infoRuleForm.affinity" :key="domain.id">
                        <td>
                          <el-form-item label="" :prop="'affinity.' + index + '.type'">
                            {{ domain.type }}
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item label="" :prop="'affinity.' + index + '.category'">
                            {{ domain.category }}
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item label="" :prop="'affinity.' + index + '.weight'">
                            {{ domain.weight }}
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item label="" :prop="'affinity.' + index + '.hostTopologyDomain'">
                            {{ domain.hostTopologyDomain }}
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item label="" :prop="'affinity.' + index + '.matchLabel'">
                            <el-tag
                              v-for="el in domain.matchLabel"
                              :key="el.id"
                              type="warning"
                              class="margin-right10"
                            >{{ el.key }}:{{ el.value }}</el-tag>
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-edit"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="handleAffinityEdit(domain, index)"
                          />
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="handleDelete('affinity', domain, index)"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <div class="cursor-pointer text-center hover-div" @click="handleAffinityAdd('affinity')">
                            <i class="el-icon-circle-plus-outline" />
                            添加亲和性
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">基于与其他容器组的亲和或反亲和设置，调度当前计算组件中的容器组。</div>
                    <i class="el-icon-question question-icon margin-top10 margin-left10" />
                  </el-tooltip>
                </div>
              </el-form-item>
              <el-form-item label="关闭宽限期">
                <div class="flex-center">
                  <el-input v-model="infoRuleForm.closingGracePeriod" placeholder="关闭宽限期">
                    <template slot="append">秒</template>
                  </el-input>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      请求删除 Pod 时允许的最长等待时间。默认30秒。当设置0时强制删除。和 PreStop
                      组合使用，优雅下线应用或通知其他服务和应用。
                    </div>
                    <i class="el-icon-question question-icon margin-left10" />
                  </el-tooltip>
                </div>
              </el-form-item>
              <el-form-item label="Host模式">
                <el-switch v-model="infoRuleForm.isHost" />
              </el-form-item>
              <el-form-item v-if="!infoRuleForm.isHost" label="固定IP">
                <div class="flex-center">
                  <el-select
                    v-model="infoRuleForm.fixedIp"
                    filterable
                    multiple
                    collapse-tags
                    placeholder="输入子网内有效IP按回车确定"
                    style="width: 100%"
                  >
                    <el-option v-for="item in fixedIpOptions" :key="item" :label="item" :value="item" />
                  </el-select>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      容器组绑定的固定 IP。当容器状态发生变化后，如升级、回滚、切换主机等，IP 仍继续保留。
                    </div>
                    <i class="el-icon-question question-icon margin-left10" />
                  </el-tooltip>
                </div>
              </el-form-item>
            </foldable-block>
          </el-form>
          <div class="info-title margin-top">容器</div>
          <div class="flex-end">
            <el-dropdown split-button type="primary" trigger="click" @click="handleAddContainer">
              添加容器
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleAddContainer">添加初始化容器</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-tabs v-model="currentTabsValue" type="card" class="margin-top10">
            <el-tab-pane v-for="item in containerTabs" :key="item.name" :label="item.title" :name="item.name">
              <el-form ref="infoRuleForm" :model="infoRuleForm" label-width="130px" label-suffix=":">
                <el-form-item
                  label="名称"
                  prop="containerName"
                  :rules="{
                    required: true,
                    message: '名称不能为空',
                    trigger: 'blur'
                  }"
                >
                  <el-input v-model="infoRuleForm.containerName" />
                </el-form-item>
                <el-form-item
                  label="镜像地址"
                  prop="mirrorAddress"
                  :rules="{
                    required: true,
                    message: '请选择镜像地址',
                    trigger: 'change'
                  }"
                >
                  <div class="flex-center">
                    <el-input v-model="infoRuleForm.mirrorAddress" disabled />
                    <el-button type="info" class="margin-left10" @click="handleAddContainer">选择镜像</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="display: flex">
          <el-button type="primary" style="margin-left: auto">更新</el-button>
          <el-button @click="cancelCreate">取消</el-button>
        </div>
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

    <!-- 更新 添加存储卷 -->
    <storage-volume-dialog
      :storage-volumes-form-visible="storageVolumesFormVisible"
      :storage-volumes-form-type="storageVolumesFormType"
      :current-storage-volume="currentStorageVolume"
      @closeStorageVolumesFormDialog="closeStorageVolumesFormDialog"
      @submitStorageVolumesForm="submitStorageVolumesForm"
    />
    <!-- 添加亲和性 -->
    <affinity-form-dialog
      :affinity-form-visible="affinityFormVisible"
      :affinity-form-type="affinityFormType"
      :current-affinity-form="currentAffinityForm"
      @closeAffinityFormDialog="closeAffinityFormDialog"
      @submitAffinityForm="submitAffinityForm"
    />
    <!-- 选择镜像 -->
    <select-mirror :form-visible="formVisible" @closeFormDialog="closeFormDialog" />
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
import SelectMirror from '@/apps/container/views/components/SelectMirror'
import FoldableBlock from '@/apps/container/views/components/FoldableBlock'
import StorageVolumeDialog from '@/apps/container/views/components/ComputerComponentsForm/StorageVolumeDialog.vue'
import AffinityFormDialog from '@/apps/container/views/components/ComputerComponentsForm/AffinityFormDialog.vue'
import { nanoid } from 'nanoid'
export default {
  name: 'StatefulSetUpdate',
  components: { SelectMirror, FoldableBlock, StorageVolumeDialog, AffinityFormDialog, MonacoEditor },
  props: {},
  data() {
    return {
      activeTab: 'list',
      infoRuleForm: {
        name: '',
        showName: '',
        numberInstances: 1,
        labels: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ],
        disabledNUumber: 1,
        storageVolumes: [],
        mirrorCredentials: [],
        containerGroupLabels: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ],
        containerGroupNotes: [
          {
            id: nanoid(),
            type: '',
            value: ''
          }
        ],
        hostSelector: [],
        affinity: [],
        closingGracePeriod: 30,
        isHost: false,
        fixedIp: [],
        containerName: '',
        mirrorAddress: '',
        storageVolumeMounts: [
          {
            id: nanoid(),
            name: '',
            path: '',
            mountPath: '',
            readeOnly: false
          }
        ]
      },
      // 镜像凭据
      mirrorCredentialsOptions: [
        {
          label: 'test',
          value: 'test'
        },
        {
          label: 'test1',
          value: 'test1'
        }
      ],
      // 选择镜像 弹窗数据
      formVisible: false,
      // 更新 增加 存储卷
      storageVolumesFormVisible: false,
      storageVolumesFormType: 'add',
      currentStorageVolume: {},
      // 主机选择器
      hostSelectorOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
      affinityFormVisible: false,
      affinityFormType: 'add',
      currentAffinityForm: {},
      fixedIpOptions: ['20.3.4.5', '22.2.3.4', '30.30.34.4'],
      // 动态容器 数据
      currentTabsValue: '',
      containerTabs: [
        {
          title: '',
          name: ''
        }
      ],
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC']
    }
  },
  computed: {},
  watch: {},
  created() {
    this.infoRuleForm.name = this.$route.query.link_name
    this.currentTabsValue = this.infoRuleForm.name
    this.containerTabs[0].title = this.currentTabsValue
    this.containerTabs[0].name = this.currentTabsValue
  },
  mounted() {},
  methods: {
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 标签 删除
    handleDelete(filed, item, index) {
      this.infoRuleForm[filed].splice(index, 1)
    },
    // 标签 增加
    handleAdd(filed) {
      let obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      if (filed === 'storageVolumes') {
        obj = {
          id: nanoid(),
          name: '',
          type: '',
          configure: ''
        }
      } else if (filed === 'containerPorts') {
        obj = {
          id: nanoid(),
          agreement: 'TCP',
          serverPort: '',
          servicePortName: 'tcp'
        }
      } else if (filed === 'storageVolumeMounts') {
        obj = {
          id: nanoid(),
          name: '',
          path: '',
          mountPath: '',
          readeOnly: false
        }
      }
      this.infoRuleForm[filed].push(obj)
    },
    // 容器组 存储卷 编辑
    handleStorageVolumeEdit(item, index) {
      this.currentStorageVolume = {
        ...item,
        persistentVolume: item.configure,
        configureDictionary: item.configure,
        confidentialDictionary: item.configure,
        hostPath: item.configure
      }
      this.storageVolumesFormVisible = true
      this.storageVolumesFormType = 'edit'
    },
    // 容器组 存储卷 添加
    handleStorageVolumeAdd() {
      this.currentStorageVolume = {
        name: 'text-hostname',
        type: '持久卷声明',
        persistentVolume: '',
        configureDictionary: '',
        confidentialDictionary: '',
        hostPath: '',
        configure: ''
      }
      this.storageVolumesFormVisible = true
      this.storageVolumesFormType = 'add'
    },
    // 容器组 存储卷 关闭弹窗
    closeStorageVolumesFormDialog() {
      this.storageVolumesFormVisible = false
    },
    // 容器组 存储卷 弹窗确定按钮
    submitStorageVolumesForm(form) {
      const obj = {
        id: form.id ? form.id : nanoid(),
        ...form,
        configure: form.persistentVolume || form.configureDictionary || form.confidentialDictionary || form.hostPath
      }
      if (this.storageVolumesFormType === 'edit') {
        const newData = JSON.parse(JSON.stringify(this.infoRuleForm.storageVolumes))
        newData.map(el => {
          if (el.id === form.id) {
            el.name = form.name
            el.type = form.type
            el.configure =
              form.persistentVolume || form.configureDictionary || form.confidentialDictionary || form.hostPath
          }
        })
        this.$set(this.infoRuleForm, 'storageVolumes', newData)
        console.log(this.infoRuleForm.storageVolumes)
      } else {
        this.infoRuleForm.storageVolumes.push(obj)
      }
      this.storageVolumesFormVisible = false
    },
    // 添加亲和性
    handleAffinityAdd() {
      this.affinityFormType = 'add'
      this.currentAffinityForm = {
        type: 'pod亲和',
        way: '基本',
        category: 'Required',
        hostTopologyDomain: 'hostname'
      }
      this.affinityFormVisible = true
    },
    // 编辑亲和性
    handleAffinityEdit(item, index) {
      this.affinityFormType = 'edit'
      this.currentAffinityForm = { ...item }
      this.affinityFormVisible = true
    },
    // 容器组 亲和性 关闭弹窗
    closeAffinityFormDialog() {
      this.affinityFormVisible = false
    },
    // 容器组 亲和性 弹窗确定按钮
    submitAffinityForm(form) {
      const obj = {
        id: nanoid(),
        ...form
      }
      if (this.affinityFormType === 'edit') {
        const newData = JSON.parse(JSON.stringify(this.infoRuleForm.affinity))
        newData.map(el => {
          if (el.id === this.currentAffinityForm.id) {
            el.hostTopologyDomain = form.hostTopologyDomain
            el.matchLabel = form.matchLabel
          }
        })
        this.$set(this.infoRuleForm, 'affinity', newData)
      } else {
        this.infoRuleForm.affinity.push(obj)
      }
      this.affinityFormVisible = false
    },

    // 添加容器
    handleAddContainer() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.computer-componentsForm-container {
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
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
  .info-title {
    padding-left: 5px;
    margin-bottom: 20px;
    border-left: 5px solid $color-primary;
  }
}
</style>
