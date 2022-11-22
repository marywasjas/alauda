<template>
  <div class="update-component-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>计算组件</span>
        </div>
        <div class="text item">
          <div class="info-title">基本信息</div>
          <div>
            <el-form
              ref="infoRuleForm"
              :model="infoRuleForm"
              label-width="100px"
              label-suffix=":"
            >
              <el-form-item label="名称" prop="name">
                {{ infoRuleForm.name }}
              </el-form-item>
              <el-form-item label="部署模式" prop="deploymentMode">
                {{ infoRuleForm.deploymentMode }}
              </el-form-item>
              <el-form-item label="实例数" prop="numberInstances">
                <el-input-number
                  v-model="infoRuleForm.numberInstances"
                  :min="1"
                />
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
                      <tr
                        v-for="(domain, index) in infoRuleForm.labels"
                        :key="domain.id"
                      >
                        <td>
                          <el-form-item
                            label=""
                            :prop="'labels.' + index + '.key'"
                          >
                            <el-input v-model="domain.key" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label=""
                            :prop="'labels.' + index + '.value'"
                          >
                            <el-input
                              v-model="domain.value"
                              placeholder="服务端口"
                            />
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="handleDelete(domain, index)"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <div
                            class="cursor-pointer text-center hover-div"
                            @click="handleAdd"
                          >
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
                    <el-input
                      v-model="infoRuleForm.limits"
                      placeholder="数字或者百分比"
                    >
                      <template slot="prepend">最大可超出数</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label=""
                    label-width="0"
                    class="margin-left10"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="infoRuleForm.disabledNUumber"
                      placeholder="数字或者百分比"
                    >
                      <template slot="prepend">最多不可用数</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label=""
                    label-width="0"
                    class="margin-left10"
                    style="margin-bottom: 0"
                  >
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        最大可超出数：Pods
                        数量最大可以超出的值，支持输入实例数量或百分比；<br>最多不可用数：Pods
                        数量最多不可用的值。
                      </div>
                      <i class="el-icon-question question-icon" />
                    </el-tooltip>
                  </el-form-item>
                </div>
              </foldable-block>
            </el-form>
          </div>
          <div class="info-title margin-top">容器组</div>
          <div>
            <el-form
              ref="infoRuleForm"
              :model="infoRuleForm"
              label-width="100px"
              label-suffix=":"
            >
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
                    <tr
                      v-for="(domain, index) in infoRuleForm.storageVolumes"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item
                          label=""
                          :prop="'storageVolumes.' + index + '.name'"
                        >
                          <el-input v-model="domain.name" placeholder="名称" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="'storageVolumes.' + index + '.type'"
                        >
                          <el-input v-model="domain.type" placeholder="类型" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="'storageVolumes.' + index + '.configure'"
                        >
                          <el-input
                            v-model="domain.configure"
                            placeholder="相关配置"
                          />
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
                          @click="handleStorageVolumeDelete(domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleStorageVolumeAdd"
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
                <el-select
                  v-model="infoRuleForm.mirrorCredentials"
                  multiple
                  collapse-tags
                  placeholder="请选择镜像凭据"
                >
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
                      <tr
                        v-for="(
                          domain, index
                        ) in infoRuleForm.containerGroupLabels"
                        :key="domain.id"
                      >
                        <td>
                          <el-form-item
                            label=""
                            :prop="'containerGroupLabels.' + index + '.key'"
                          >
                            <el-input v-model="domain.key" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label=""
                            :prop="'containerGroupLabels.' + index + '.value'"
                          >
                            <el-input v-model="domain.value" placeholder="值" />
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="
                              handleContainerGroupLabelsDelete(
                                'containerGroupLabels',
                                domain,
                                index
                              )
                            "
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <div
                            class="cursor-pointer text-center hover-div"
                            @click="
                              handleContainerGroupLabelsAdd(
                                'containerGroupLabels'
                              )
                            "
                          >
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
                      <tr
                        v-for="(
                          domain, index
                        ) in infoRuleForm.containerGroupNotes"
                        :key="domain.id"
                      >
                        <td>
                          <el-form-item
                            label=""
                            :prop="'containerGroupNotes.' + index + '.key'"
                          >
                            <el-input v-model="domain.key" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label=""
                            :prop="'containerGroupNotes.' + index + '.value'"
                          >
                            <el-input v-model="domain.value" placeholder="值" />
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="
                              handleContainerGroupLabelsDelete(
                                'containerGroupNotes',
                                domain,
                                index
                              )
                            "
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <div
                            class="cursor-pointer text-center hover-div"
                            @click="
                              handleContainerGroupLabelsAdd(
                                'containerGroupNotes'
                              )
                            "
                          >
                            <i class="el-icon-circle-plus-outline" />
                            添加
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </el-form-item>
                <el-form-item label="主机选择器">
                  <el-select
                    v-model="infoRuleForm.hostSelector"
                    multiple
                    collapse-tags
                    placeholder="请选择主机选择器"
                  >
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
                        <tr
                          v-for="(domain, index) in infoRuleForm.affinity"
                          :key="domain.id"
                        >
                          <td>
                            <el-form-item
                              label=""
                              :prop="'affinity.' + index + '.type'"
                            >
                              {{ domain.type }}
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'affinity.' + index + '.category'"
                            >
                              {{ domain.category }}
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'affinity.' + index + '.weight'"
                            >
                              {{ domain.weight }}
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="
                                'affinity.' + index + '.hostTopologyDomain'
                              "
                            >
                              {{ domain.hostTopologyDomain }}
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'affinity.' + index + '.matchLabel'"
                            >
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
                              class="
                                cursor-pointer
                                margin-left10 margin-right10
                              "
                              type="text"
                              @click="handleAffinityEdit(domain, index)"
                            />
                            <el-button
                              icon="el-icon-remove-outline"
                              class="
                                cursor-pointer
                                margin-left10 margin-right10
                              "
                              type="text"
                              @click="
                                handleContainerGroupLabelsDelete(
                                  'affinity',
                                  domain,
                                  index
                                )
                              "
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5">
                            <div
                              class="cursor-pointer text-center hover-div"
                              @click="handleAffinityAdd('affinity')"
                            >
                              <i class="el-icon-circle-plus-outline" />
                              添加亲和性
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        基于与其他容器组的亲和或反亲和设置，调度当前计算组件中的容器组。
                      </div>
                      <i
                        class="
                          el-icon-question
                          question-icon
                          margin-top10 margin-left10
                        "
                      />
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item label="关闭宽限期">
                  <div class="flex-center">
                    <el-input
                      v-model="infoRuleForm.closingGracePeriod"
                      placeholder="关闭宽限期"
                    >
                      <template slot="append">秒</template>
                    </el-input>
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        请求删除 Pod
                        时允许的最长等待时间。默认30秒。当设置0时强制删除。和
                        PreStop 组合使用，优雅下线应用或通知其他服务和应用。
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
                      <el-option
                        v-for="item in fixedIpOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        容器组绑定的固定
                        IP。当容器状态发生变化后，如升级、回滚、切换主机等，IP
                        仍继续保留。
                      </div>
                      <i class="el-icon-question question-icon margin-left10" />
                    </el-tooltip>
                  </div>
                </el-form-item>
              </foldable-block>
            </el-form>
          </div>
          <div class="info-title margin-top">容器</div>
          <div>
            <div class="flex-end">
              <el-dropdown
                split-button
                type="primary"
                trigger="click"
                @click="handleAddContainer"
              >
                添加容器
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="handleAddContainer"
                  >添加初始化容器</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              closable
              class="margin-top10"
              @tab-remove="handleTabsRemove"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <el-form
                  ref="containerForm"
                  :model="containerForm"
                  label-width="130px"
                  label-suffix=":"
                  :rules="containerFormRules"
                >
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="containerForm.name" />
                  </el-form-item>
                  <el-form-item label="镜像地址" prop="mirrorAddress">
                    <div class="flex-center">
                      <el-input v-model="containerForm.mirrorAddress" disabled />
                      <el-button type="info" class="margin-left10" @click="handleAddContainer">选择镜像</el-button>
                    </div>
                  </el-form-item>
                  <div class="flex-center">
                    <el-form-item label="资源限制" prop="cpu">
                      <el-input v-model="containerForm.cpu" placeholder="请输入CPU限制">
                        <template slot="prepend">CPU</template>
                        <el-select
                          slot="append"
                          v-model="containerForm.cpuCompony"
                          placeholder="请选择"
                          style="width: 80px"
                        >
                          <el-option label="核" value="核" />
                          <el-option label="m" value="m" />
                        </el-select>
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      label=""
                      prop="memory"
                      style="margin-bottom: 0"
                      label-width="10px"
                    >
                      <el-input
                        v-model="containerForm.memory"
                        placeholder="请输入CPU限制"
                      >
                        <template slot="prepend">内存</template>
                        <el-select
                          slot="append"
                          v-model="containerForm.memoryCompony"
                          placeholder="请选择"
                          style="width: 80px"
                        >
                          <el-option label="Mi" value="Mi" />
                          <el-option label="Gi" value="Gi" />
                        </el-select>
                      </el-input>
                    </el-form-item>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="容器的限制值，限制容器实例运行过程中， 最多可使用的节点计算资源值。"
                      placement="top"
                    >
                      <i
                        class="el-icon-question question-icon margin-left10"
                      />
                    </el-tooltip>
                  </div>
                  <el-form-item label="端口" prop="port">
                    <table border="0" style="width:100%;">
                      <thead>
                        <tr class="headerStyle">
                          <th>
                            <div class="cell">
                              <span class="requireFlag">*</span>
                              协议
                            </div>
                          </th>
                          <th>
                            <div class="cell">
                              <span class="requireFlag">*</span>
                              端口
                            </div>
                          </th>
                          <th>
                            <div class="cell">端口名称</div>
                          </th>
                          <th>
                            <div class="cell">操作</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(domain, index) in containerForm.domains"
                          :key="domain.id"
                        >
                          <td>
                            <el-form-item
                              label=""
                              :prop="'domains.' + index + '.agreement'"
                              :rules="{
                                required: true,
                                message: '协议不能为空',
                                trigger: 'blur',
                              }"
                            >
                              <el-select
                                v-model="domain.agreement"
                                placeholder="请选择协议"
                                style="width:100%;"
                              >
                                <el-option
                                  v-for="com in agreementList"
                                  :key="com"
                                  :label="com"
                                  :value="com"
                                />
                              </el-select>
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'domains.' + index + '.serverPort'"
                              :rules="{
                                required: true,
                                message: '端口不能为空',
                                trigger: 'blur',
                              }"
                            >
                              <el-input
                                v-model="domain.serverPort"
                                placeholder="端口"
                              />
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'domains.' + index + '.servicePortName'"
                              :rules="{
                                required: false,
                                message: '端口名称不能为空',
                                trigger: 'blur',
                              }"
                            >
                              <el-input
                                v-model="domain.servicePortName"
                              />
                            </el-form-item>
                          </td>
                          <td class="text-center">
                            <el-button
                              icon="el-icon-remove-outline"
                              class="
                                cursor-pointer
                                margin-left10 margin-right10
                              "
                              type="text"
                              @click="handleContainerPortDelete('domains',domain, index)"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5">
                            <div
                              class="cursor-pointer text-center hover-div"
                              @click="handleContainerPortAdd('domains')"
                            >
                              <i class="el-icon-circle-plus-outline" />
                              添加
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </el-form-item>
                  <el-form-item label="启动命令" prop="startCommand">
                    <el-input v-model="containerForm.startCommand" placeholder="启动命令" />
                  </el-form-item>
                  <el-form-item label="参数" prop="parameter">
                    <el-input v-model="containerForm.parameter" placeholder="参数" />
                  </el-form-item>
                  <foldable-block btn-tex="更多">
                    <el-form-item label="环境变量" style="margin-bottom: 0">
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
                            v-for="(domain, index) in containerForm.environmentVariables"
                            :key="domain.id"
                          >
                            <td>
                              <el-form-item
                                label=""
                                :prop="'environmentVariables.' + index + '.key'"
                              >
                                <el-input v-model="domain.key" placeholder="键" />
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item
                                label=""
                                :prop="'environmentVariables.' + index + '.value'"
                              >
                                <el-input
                                  v-model="domain.value"
                                  placeholder="值"
                                />
                              </el-form-item>
                            </td>
                            <td class="text-center">
                              <el-button
                                icon="el-icon-remove-outline"
                                class="cursor-pointer margin-left10 margin-right10"
                                type="text"
                                @click="handleContainerPortDelete('environmentVariables',domain, index)"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="5">
                              <div
                                class="cursor-pointer text-center hover-div"
                                @click="handleContainerPortAdd('environmentVariables')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                添加
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </el-form-item>
                    <el-form-item label="配置引用">
                      <el-select v-model="containerForm.configureReference" placeholder="请选择配置引用" multiple collapse-tags>
                        <el-option-group
                          v-for="group in configureReferenceOptions"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="el in group.options"
                            :key="el.value"
                            :label="el.label"
                            :value="el.value"
                          />
                        </el-option-group>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="健康检查">
                      健康检查
                    </el-form-item>
                    <el-form-item label="存储卷挂载">
                      存储卷挂载
                    </el-form-item>
                    <el-form-item label="日志文件">
                      日志文件
                    </el-form-item>
                    <el-form-item label="排除日志文件">
                      排除日志文件
                    </el-form-item>
                    <el-form-item label="停止前执行">
                      停止前执行
                    </el-form-item>
                  </foldable-block>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button
        type="primary"
        class="margin-left10"
        @click="submitCreate"
      >更新</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
    <!-- 更新 添加存储卷 -->
    <el-dialog
      title="更新存储卷"
      :visible.sync="storageVolumesFormVisible"
      width="800px"
      :before-close="closeStorageVolumesFormDialog"
      :close-on-click-modal="false"
    >
      <div class="formDialog__content">
        <el-form
          ref="storageVolumesDialogForm"
          :model="storageVolumesDialogForm"
          :rules="storageVolumesRules"
          label-width="130px"
          label-suffix=":"
        >
          <el-form-item label="名称" prop="name">
            {{ storageVolumesDialogForm.name }}
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="storageVolumesDialogForm.type">
              <el-radio label="持久卷声明" value="持久卷声明" />
              <el-radio label="配置字典" value="配置字典" />
              <el-radio label="保密字典" value="保密字典" />
              <el-radio label="主机路径" value="主机路径" />
              <el-radio label="空目录" value="空目录" />
            </el-radio-group>
          </el-form-item>
          <div v-if="storageVolumesDialogForm.type === '持久卷声明'">
            <el-form-item label="持久卷声明" prop="persistentVolume">
              <el-select
                v-model="storageVolumesDialogForm.persistentVolume"
                placeholder="请选择持久卷声明"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in persistentVolumeOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '配置字典'">
            <el-form-item label="配置字典" prop="persistentVolume">
              <el-select
                v-model="storageVolumesDialogForm.configureDictionary"
                placeholder="请选择配置字典"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in configureDictionaryOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '保密字典'">
            <el-form-item label="保密字典" prop="confidentialDictionary">
              <el-select
                v-model="storageVolumesDialogForm.confidentialDictionary"
                placeholder="请选择保密字典"
                style="width: 100%"
              >
                <el-option
                  v-for="pro in confidentialDictionaryOptions"
                  :key="pro.value"
                  :label="pro.label"
                  :value="pro.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="storageVolumesDialogForm.type === '主机路径'">
            <el-form-item label="主机路径" prop="hostPath">
              <el-input
                v-model="storageVolumesDialogForm.hostPath"
                placeholder="请输入主机路径"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitStorageVolumesForm"
        >更新</el-button>
        <el-button @click="storageVolumesDialogForm">取消</el-button>
      </span>
    </el-dialog>
    <!-- 添加亲和性 -->
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
    <select-mirror
      :form-visible="formVisible"
      @closeFormDialog="closeFormDialog"
    />
  </div>
</template>

<script>
import SelectMirror from '@/apps/container/views/components/SelectMirror'
import FoldableBlock from '@/apps/container/views/components/FoldableBlock'
import { nanoid } from 'nanoid'
export default {
  name: 'UpdateComponent',
  components: { SelectMirror, FoldableBlock },
  props: {},
  data() {
    return {
      infoRuleForm: {
        name: 'test-box',
        deploymentMode: 'deployment',
        numberInstances: 1,
        labels: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ],
        disabledNUumber: 1,
        limits: 1,
        storageVolumes: [
          {
            id: nanoid(),
            name: '',
            type: '',
            configure: ''
          }
        ],
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
        fixedIp: []
      },
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
      formVisible: false,
      // 更新 增加 存储卷
      storageVolumesFormVisible: false,
      storageVolumesDialogForm: {
        name: '',
        type: '',
        persistentVolume: '',
        configureDictionary: '',
        confidentialDictionary: '',
        hostPath: ''
      },
      storageVolumesRules: {
        persistentVolume: [
          { required: true, message: '请选择持久卷声明', trigger: 'change' }
        ],
        configureDictionary: [
          { required: true, message: '请选择配置字典', trigger: 'change' }
        ],
        confidentialDictionary: [
          { required: true, message: '请选择保密字典', trigger: 'change' }
        ],
        hostPath: [
          { required: true, message: '请输入主机路径', trigger: 'blur' }
        ]
      },
      // 持久卷声明 下拉数据
      persistentVolumeOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
      // 配置字典 下拉数据
      configureDictionaryOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
      // 保密字典 下拉数据
      confidentialDictionaryOptions: [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2'
        }
      ],
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
      fixedIpOptions: ['20.3.4.5', '22.2.3.4', '30.30.34.4'],
      // 动态容器 数据
      editableTabsValue: 'nginx',
      editableTabs: [
        {
          title: 'nginx',
          name: 'nginx'
        },
        {
          title: 'redis',
          name: 'redis'
        }
      ],
      containerForm: {
        name: '',
        mirrorAddress: '',
        cpu: '',
        cpuCompony: '',
        memory: '',
        memoryCompony: '',
        domains: [
          {
            id: nanoid(),
            agreement: 'TCP',
            serverPort: '',
            containerPort: '',
            servicePortName: 'tcp'
          }
        ],
        startCommand: '',
        parameter: '',
        environmentVariables: [
          {
            id: nanoid(),
            key: '',
            value: ''
          }
        ],
        configureReference: []
      },
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      containerFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        mirrorAddress: [{ required: true, message: '请输入权重', trigger: 'blur' }],
        hostTopologyDomain: [
          { required: true, message: '请输入主机拓扑域', trigger: 'blur' }
        ]
      },
      // 配置引用
      configureReferenceOptions: [{
        label: '配置字段',
        options: [{
          value: 'harbor.kauto',
          label: 'harbor.kauto'
        }]
      }, {
        label: '保密字典（用户名/密码）',
        options: [{
          value: 'kube-root-ca.crt',
          label: 'kube-root-ca.crt'
        }]
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 标签 删除
    handleDelete(item, index) {
      this.infoRuleForm.labels.splice(
        this.infoRuleForm.labels.indexOf(item),
        1
      )
    },
    // 标签 增加
    handleAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.infoRuleForm.labels.push(obj)
    },
    // 容器组 存储卷 删除
    handleStorageVolumeDelete(item, index) {
      this.infoRuleForm.storageVolumes.splice(
        this.infoRuleForm.storageVolumes.indexOf(item),
        1
      )
    },
    // 容器组 存储卷 增加
    handleStorageVolumeAdd() {
      const obj = {
        id: nanoid(),
        name: '',
        type: '',
        configure: ''
      }
      this.infoRuleForm.storageVolumes.push(obj)
    },
    // 容器组 存储卷 编辑
    handleStorageVolumeEdit(item, index) {
      console.log(item, index)
      this.storageVolumesDialogForm.name = 'new-volume'
      this.storageVolumesDialogForm.type = '持久卷声明'
      this.storageVolumesFormVisible = true
    },
    // 容器组 存储卷 关闭弹窗
    closeStorageVolumesFormDialog() {
      this.storageVolumesFormVisible = false
    },
    // 容器组 存储卷 弹窗确定按钮
    submitStorageVolumesForm() {
      this.$refs['storageVolumesDialogForm'].validate((valid) => {
        if (valid) {
          console.log(this.storageVolumesDialogForm)
          this.storageVolumesFormVisible = false
        } else {
          return false
        }
      })
    },
    // 容器组 容器组标签 删除
    handleContainerGroupLabelsDelete(filed, item, index) {
      this.infoRuleForm[filed].splice(
        this.infoRuleForm[filed].indexOf(item),
        1
      )
    },
    // 容器组 容器组标签 增加
    handleContainerGroupLabelsAdd(filed) {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.infoRuleForm[filed].push(obj)
    },
    // 添加亲和性
    handleAffinityAdd() {
      this.affinityFormType = 'add'
      this.currentAffinityForm = {}
      this.affinityDialogForm.type = 'pod亲和'
      this.affinityDialogForm.way = '基本'
      this.affinityDialogForm.category = 'Required'
      this.affinityDialogForm.hostTopologyDomain = 'hostname'
      this.affinityFormVisible = true
    },
    // 编辑亲和性
    handleAffinityEdit(item, index) {
      this.currentAffinityForm = item
      this.affinityFormType = 'edit'
      this.affinityDialogForm.hostTopologyDomain = item.hostTopologyDomain
      this.affinityDialogForm.matchLabel = item.matchLabel
      this.affinityFormVisible = true
    },
    // 容器组 亲和性 关闭弹窗
    closeAffinityFormDialog() {
      this.affinityFormVisible = false
    },
    // 容器组 亲和性 弹窗确定按钮
    submitAffinityForm() {
      this.$refs['affinityDialogForm'].validate((valid) => {
        if (valid) {
          const obj = {
            id: nanoid(),
            ...this.affinityDialogForm
          }

          if (this.affinityFormType === 'edit') {
            const newData = JSON.parse(
              JSON.stringify(this.infoRuleForm.affinity)
            )
            newData.map((el) => {
              if (el.id === this.currentAffinityForm.id) {
                el.hostTopologyDomain =
                  this.affinityDialogForm.hostTopologyDomain
                el.matchLabel = this.affinityDialogForm.matchLabel
              }
            })
            this.$set(this.infoRuleForm, 'affinity', newData)
          } else {
            this.infoRuleForm.affinity.push(obj)
          }
          this.affinityDialogForm = {
            affinity: '',
            way: '',
            com: '',
            type: '',
            hostTopologyDomain: '',
            matchLabel: []
          }
          this.affinityFormVisible = false
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
    },
    // 动态容器 操作
    handleTabsRemove(targetName, action) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    // 添加容器
    handleAddContainer() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    // 容器  端口、环境变量 删除
    handleContainerPortDelete(filed, item, index) {
      this.containerForm[filed].splice(this.containerForm[filed].indexOf(item), 1)
    },
    // 容器  端口 增加
    handleContainerPortAdd(filed) {
      if (filed === 'domains') {
        const obj = {
          id: nanoid(),
          agreement: 'TCP',
          serverPort: '',
          containerPort: '',
          servicePortName: 'tcp'
        }
        this.containerForm.domains.push(obj)
      } else {
        const obj = {
          id: nanoid(),
          key: '',
          value: ''
        }
        this.containerForm.environmentVariables.push(obj)
      }
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['infoRuleForm'].validate((valid) => {
        if (valid) {
          console.log(this.infoRuleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.update-component-container {
  padding: 0 20px;
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
