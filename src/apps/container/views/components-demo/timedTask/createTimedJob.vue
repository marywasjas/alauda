<template>
  <div class="computer-componentsForm-container">
    <div class="scroll-div">
      <BaseCard>
        <header style="display: flex; justify-content: space-between">
          <div class="card-title left-header">
            <span>创建定时任务</span>
          </div>
          <el-radio-group v-model="activeTab">
            <el-radio-button label="list">表单</el-radio-button>
            <el-radio-button label="yaml">YAML</el-radio-button>
          </el-radio-group>
        </header>
        <section v-if="activeTab === 'list'">
          <div class="margin-top" style="padding: 0 20px">
            <div class="info-title">基本信息</div>
            <el-form ref="infoRuleForm" :model="infoRuleForm" label-width="100px" label-suffix=":">
              <el-form-item label="名称" prop="name">
                <el-input v-model="infoRuleForm.name" style="width: 500px" />
              </el-form-item>
              <el-form-item label="显示名称" prop="deploymentMode">
                <el-input v-model="infoRuleForm.deploymentMode" style="width: 500px" />
              </el-form-item>
            </el-form>
            <div style="margin-bottom: 10px">定时配置</div>
            <el-form ref="timingForm" :model="infoRuleForm" label-width="150px" label-suffix=":">
              <el-form-item label="执行方式">
                <el-radio-group v-model="infoRuleForm.radio">
                  <el-radio :label="3">定时触发</el-radio>
                  <el-radio :label="6">手动触发</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="触发规则">
                <el-input v-model="infoRuleForm.triggerRules" />
                <span
                  style="color: #666666"
                >例如：输入'0 18***'.意为每天18点。详细输入规则请前往<a href="#" style="color: #1890ff">参考文档</a>.以协调世界时（UTC）表示.</span>
              </el-form-item>
              <el-form-item label="定时并发策略">
                <template>
                  <el-radio-group v-model="infoRuleForm.radio1">
                    <el-radio :label="1">允许并发执行任务</el-radio><br>
                    <el-radio :label="2">仅当前一个任务执行完毕，才可开始新任务</el-radio><br>
                    <el-radio :label="4">终止当前任务，以开始新任务</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>

              <div class="flex-center" style="justify-content: start">
                <el-form-item label="保留任务历史">
                  <el-input v-model="infoRuleForm.successTask">
                    <template slot="prepend">成功任务历史</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="infoRuleForm.failedTask">
                    <template slot="prepend">失败任务历史</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <div style="margin-bottom: 10px">任务配置</div>
            <el-form ref="infoRuleForm" :model="infoRuleForm" label-width="150px" label-suffix=":">
              <el-form-item label="任务类型">
                <el-radio-group v-model="infoRuleForm.timedRadio">
                  <el-radio label="单次作业" value="单次作业" />
                  <el-radio label="并行作业" value="并行作业" />
                  <el-radio label="固定次数作业" value="固定次数作业" />
                </el-radio-group>
                <el-tooltip effect="dark" placement="top">
                  <div slot="content">
                    单次作业：任务一次执行单个作业，作业成功一次后，任务即为成功<br>并行作业：任务可并行执行多次作业，任意一次作业成功，任务即为成功<br>固定次数作业：任务可并行执行多次作业，任务在达到计划成功作业次数后即为成功
                  </div>
                  <i style="margin-left: 10px" class="el-icon-question question-icon" />
                </el-tooltip>
              </el-form-item>
              <el-form-item label="失败重试次数" prop="num">
                <el-input-number v-model="infoRuleForm.num" :min="1" />
              </el-form-item>
              <el-form-item label="任务超时时间">
                <el-input v-model="infoRuleForm.timeout" style="width: 400px" placeholder="请输入CPU限制">
                  <el-select
                    slot="append"
                    v-model="infoRuleForm.timeoutCompony"
                    placeholder="请选择"
                    style="width: 80px"
                  >
                    <el-option label="小时" value="小时" />
                    <el-option label="分钟" value="分钟" />
                  </el-select>
                </el-input>
              </el-form-item>
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
                    <tr v-if="infoRuleForm.storageVolumes.length === 0">
                      <td colspan="5">
                        <div class="empty-div">无存储卷</div>
                      </td>
                    </tr>
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
                      <tr v-if="infoRuleForm.containerGroupNotes.length === 0">
                        <td colspan="5">
                          <div class="empty-div">无数据</div>
                        </td>
                      </tr>
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
                  <div style="color: #666666">固定IP应为10.4.0.0/16子网内的IP</div>
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
            <el-tabs
              v-model="currentTabsValue"
              type="card"
              closable
              class="margin-top10"
              @tab-remove="handleTabsRemove"
            >
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
                  <div class="flex-center" style="justify-content: start">
                    <el-form-item
                      label="资源限制"
                      prop="cpu"
                      :rules="{
                        required: true,
                        message: '请输入CPU限制',
                        trigger: 'blur'
                      }"
                    >
                      <el-input v-model="infoRuleForm.cpu" placeholder="请输入CPU限制">
                        <template slot="prepend">CPU</template>
                        <el-select
                          slot="append"
                          v-model="infoRuleForm.cpuCompony"
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
                      label-width="10px"
                      :rules="{
                        required: true,
                        message: '请输入内存限制',
                        trigger: 'blur'
                      }"
                    >
                      <el-input v-model="infoRuleForm.memory" placeholder="请输入内存限制">
                        <template slot="prepend">内存</template>
                        <el-select
                          slot="append"
                          v-model="infoRuleForm.memoryCompony"
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
                      <i class="el-icon-question question-icon margin-left10" style="margin-bottom: 22px" />
                    </el-tooltip>
                  </div>
                  <el-form-item label="端口" prop="port">
                    <table border="0" style="width: 100%">
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
                        <tr v-if="infoRuleForm.containerPorts.length === 0">
                          <td colspan="5">
                            <div class="empty-div">无数据</div>
                          </td>
                        </tr>
                        <tr v-for="(domain, index) in infoRuleForm.containerPorts" :key="domain.id">
                          <td>
                            <el-form-item
                              label=""
                              :prop="'containerPorts.' + index + '.agreement'"
                              :rules="{
                                required: true,
                                message: '协议不能为空',
                                trigger: 'blur'
                              }"
                            >
                              <el-select v-model="domain.agreement" placeholder="请选择协议" style="width: 100%">
                                <el-option v-for="com in agreementList" :key="com" :label="com" :value="com" />
                              </el-select>
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'containerPorts.' + index + '.serverPort'"
                              :rules="{
                                required: true,
                                message: '端口不能为空',
                                trigger: 'blur'
                              }"
                            >
                              <el-input v-model="domain.serverPort" placeholder="端口" />
                            </el-form-item>
                          </td>
                          <td>
                            <el-form-item
                              label=""
                              :prop="'containerPorts.' + index + '.servicePortName'"
                              :rules="{
                                required: false,
                                message: '端口名称不能为空',
                                trigger: 'blur'
                              }"
                            >
                              <el-input v-model="domain.servicePortName" />
                            </el-form-item>
                          </td>
                          <td class="text-center">
                            <el-button
                              icon="el-icon-remove-outline"
                              class="cursor-pointer margin-left10 margin-right10"
                              type="text"
                              @click="handleDelete('containerPorts', domain, index)"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5">
                            <div class="cursor-pointer text-center hover-div" @click="handleAdd('containerPorts')">
                              <i class="el-icon-circle-plus-outline" />
                              添加
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </el-form-item>
                  <el-form-item label="启动命令" prop="startCommand">
                    <el-input v-model="infoRuleForm.startCommand" placeholder="启动命令" />
                  </el-form-item>
                  <el-form-item label="参数" prop="parameter">
                    <el-input v-model="infoRuleForm.parameter" placeholder="参数" />
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
                          <tr v-if="infoRuleForm.environmentVariables.length === 0">
                            <td colspan="5">
                              <div class="empty-div">无数据</div>
                            </td>
                          </tr>
                          <tr v-for="(domain, index) in infoRuleForm.environmentVariables" :key="domain.id">
                            <td>
                              <el-form-item label="" :prop="'environmentVariables.' + index + '.key'">
                                <el-input v-model="domain.key" placeholder="键" />
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" :prop="'environmentVariables.' + index + '.value'">
                                <el-select
                                  v-if="domain.state"
                                  v-model="domain.obj"
                                  style="width: 50%"
                                  placeholder="引用对象"
                                >
                                  <el-option
                                    v-for="item in objOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                                <el-select v-if="domain.state" style="width: 50%" placeholder="">
                                  <el-option />
                                </el-select>

                                <el-input
                                  v-if="!domain.state"
                                  v-model="domain.value"
                                  placeholder="值"
                                  :style="{ width: domain.state === true ? '50%' : '100%' }"
                                />
                              </el-form-item>
                            </td>
                            <td class="text-center">
                              <el-button
                                icon="el-icon-remove-outline"
                                class="cursor-pointer margin-left10 margin-right10"
                                type="text"
                                @click="handleDelete('environmentVariables', domain, index)"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="5" style="width: 100%">
                              <div
                                style="width: 50%; float: left"
                                class="cursor-pointer text-center hover-div"
                                @click="handleAdd('environmentVariables')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                添加
                              </div>
                              <div
                                class="cursor-pointer text-center hover-div"
                                style="color: #666666; width: 50%; float: left"
                                @click="handleCite('environmentVariables')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                引用
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </el-form-item>
                    <el-form-item label="配置引用">
                      <el-select
                        v-model="infoRuleForm.configureReference"
                        placeholder="请选择配置引用"
                        multiple
                        collapse-tags
                      >
                        <el-option-group
                          v-for="group in configureReferenceOptions"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option v-for="el in group.options" :key="el.value" :label="el.label" :value="el.value" />
                        </el-option-group>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="存储卷挂载" style="margin-bottom: 0">
                      <table border="0" style="width: 100%">
                        <thead>
                          <tr class="headerStyle">
                            <th>
                              <div class="cell">
                                <span class="requireFlag">*</span>
                                存储卷名称
                              </div>
                            </th>
                            <th>
                              <div class="cell">子路径</div>
                            </th>
                            <th>
                              <div class="cell">
                                <span class="requireFlag">*</span>
                                挂载路径
                              </div>
                            </th>
                            <th>
                              <div class="cell">只读</div>
                            </th>
                            <th>
                              <div class="cell">操作</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="infoRuleForm.storageVolumeMounts.length === 0">
                            <td colspan="5">
                              <div class="empty-div">无数据</div>
                            </td>
                          </tr>
                          <tr v-for="(domain, index) in infoRuleForm.storageVolumeMounts" :key="domain.id">
                            <td>
                              <el-form-item label="" :prop="'storageVolumeMounts.' + index + '.name'">
                                <el-input v-model="domain.name" placeholder="存储卷名称" />
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" :prop="'storageVolumeMounts.' + index + '.path'">
                                <el-input v-model="domain.path" placeholder="子路径" />
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" :prop="'storageVolumeMounts.' + index + '.mountPath'">
                                <el-input v-model="domain.mountPath" placeholder="挂载路径" />
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item
                                label=""
                                :prop="'storageVolumeMounts.' + index + '.readeOnly'"
                                class="text-center"
                              >
                                <el-switch v-model="domain.readeOnly" />
                              </el-form-item>
                            </td>
                            <td class="text-center">
                              <el-button
                                icon="el-icon-remove-outline"
                                class="cursor-pointer margin-left10 margin-right10"
                                type="text"
                                @click="handleDelete('storageVolumeMounts', domain, index)"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colspan="5" style="width: 100%">
                              <div
                                style="width: 50%; float: left"
                                class="cursor-pointer text-center hover-div"
                                @click="handleAdd('storageVolumeMounts')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                添加
                              </div>
                              <div
                                class="cursor-pointer text-center hover-div"
                                style="color: #333333; width: 50%; float: left"
                                @click="handleStorageVolumeAdd('storageVolumes')"
                              >
                                <i class="el-icon-circle-plus-outline" />
                                添加存储卷并挂载
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </el-form-item>
                    <el-form-item label="日志文件">
                      <div v-if="infoRuleForm.logFiles.length > 0">
                        <div v-for="(domain, index) in infoRuleForm.logFiles" :key="domain.id" class="flex-center">
                          <el-form-item
                            label=""
                            label-width="0"
                            :prop="'logFiles.' + index + '.value'"
                            :rules="{
                              required: true,
                              message: '必填项不能为空',
                              trigger: 'blur'
                            }"
                            style="margin-bottom: 22px; flex: 1"
                          >
                            <el-input v-model="domain.value" />
                          </el-form-item>
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10"
                            type="text"
                            style="margin-bottom: 22px"
                            @click="handleDelete('logFiles', domain, index)"
                          />
                        </div>
                      </div>
                      <div v-else class="empty-div">无日志文件</div>
                      <div class="cursor-pointer text-center hover-div" @click="handleAdd('logFiles')">
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </el-form-item>
                    <el-form-item label="排除日志文件">
                      <div v-if="infoRuleForm.excludeLogFiles.length > 0">
                        <div
                          v-for="(domain, index) in infoRuleForm.excludeLogFiles"
                          :key="domain.id"
                          class="flex-center"
                        >
                          <el-form-item
                            label=""
                            label-width="0"
                            :prop="'excludeLogFiles.' + index + '.value'"
                            :rules="{
                              required: true,
                              message: '必填项不能为空',
                              trigger: 'blur'
                            }"
                            style="margin-bottom: 22px; flex: 1"
                          >
                            <el-input v-model="domain.value" />
                          </el-form-item>
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10"
                            type="text"
                            style="margin-bottom: 22px"
                            @click="handleDelete('excludeLogFiles', domain, index)"
                          />
                        </div>
                      </div>
                      <div v-else class="empty-div">无排除日志文件</div>
                      <div class="cursor-pointer text-center hover-div" @click="handleAdd('excludeLogFiles')">
                        <i class="el-icon-circle-plus-outline" />
                        添加
                      </div>
                    </el-form-item>
                    <el-form-item label="停止前执行">
                      <div class="flex-center">
                        <el-input v-model="infoRuleForm.executeBeforeStopping" placeholder="停止前执行" />
                        <el-tooltip class="item" effect="dark" placement="top">
                          <div slot="content">停止容器前执行必要的清除操作，优雅下线应用或通知其他服务和应用。</div>
                          <i class="el-icon-question question-icon margin-left10" />
                        </el-tooltip>
                      </div>
                    </el-form-item>
                  </foldable-block>
                </el-form>
              </el-tab-pane>
            </el-tabs>
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
    </div>
    <div class="fixed-div">
      <div>
        <el-button type="primary" class="margin-left10" @click="submitCreate">创建</el-button>
        <el-button @click="cancelCreate">取消</el-button>
      </div>
    </div>
    <!-- 更新 添加存储卷 -->
    <storage-volume-dialog
      :storage-volumes-form-visible="storageVolumesFormVisible"
      :storage-volumes-form-type="storageVolumesFormType"
      :current-storage-volume="currentStorageVolume"
      @closeStorageVolumesFormDialog="closeStorageVolumesFormDialog"
      @submitStorageVolumesForm="submitStorageVolumesForm"
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
import { nanoid } from 'nanoid'
export default {
  name: 'CreateTimedJob',
  components: {
    MonacoEditor,
    SelectMirror,
    FoldableBlock,
    StorageVolumeDialog
  },
  props: {},
  data() {
    return {
      activeTab: 'list',
      currentCode: '',
      language: 'yaml',
      infoRuleForm: {
        name: 'test-box',
        deploymentMode: 'deployment',
        radio: 3,
        radio1: 1,
        timedRadio: '单次作业',
        num: '1',
        timeout: '2',
        timeoutCompony: '小时',
        triggerRules: '',
        successTask: 12,
        failedTask: 10,
        storageVolumes: [],
        mirrorCredentials: [],
        containerGroupNotes: [
          {
            id: nanoid(),
            type: '',
            value: ''
          }
        ],
        closingGracePeriod: 30,
        fixedIp: [],
        containerName: '',
        mirrorAddress: '',
        cpu: '',
        cpuCompony: 'm',
        memory: '',
        memoryCompony: 'Mi',
        containerPorts: [
          {
            id: nanoid(),
            agreement: 'TCP',
            serverPort: '',
            servicePortName: 'tcp'
          }
        ],
        startCommand: '',
        parameter: '',
        environmentVariables: [
          {
            id: nanoid(),
            obj: '',
            state: true,
            key: '',
            value: ''
          },
          {
            id: nanoid(),
            state: false,
            key: '1',
            value: '2'
          }
        ],
        configureReference: [],
        storageVolumeMounts: [
          {
            id: nanoid(),
            name: '',
            path: '',
            mountPath: '',
            readeOnly: false
          }
        ],
        executeBeforeStopping: '',
        logFiles: [],
        excludeLogFiles: []
      },
      objOption: [
        {
          label: 'chaosblade-box',
          value: 'chaosblade-box'
        }
      ],
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
      affinityFormVisible: false,
      affinityFormType: 'add',
      currentAffinityForm: {},
      fixedIpOptions: ['20.3.4.5', '22.2.3.4', '30.30.34.4'],
      // 动态容器 数据
      currentTabsValue: 'nginx',
      containerTabs: [
        {
          title: 'nginx',
          name: 'nginx'
        },
        {
          title: 'redis',
          name: 'redis'
        }
      ],
      agreementList: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'HTTP2', 'gRPC'],
      // 配置引用
      configureReferenceOptions: [
        {
          label: '配置字段',
          options: [
            {
              value: 'harbor.kauto',
              label: 'harbor.kauto'
            }
          ]
        },
        {
          label: '保密字典（用户名/密码）',
          options: [
            {
              value: 'kube-root-ca.crt',
              label: 'kube-root-ca.crt'
            }
          ]
        }
      ],
      // 健康检查 弹窗数据
      healthExaminationFormVisible: false,
      healthExaminationFormType: 'add',
      currentHealthExamination: {},
      currentHealthExaminationFiled: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
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
      } else if (filed === 'environmentVariables') {
        obj = {
          id: nanoid(),
          key: '',
          value: ''
        }
      }
      this.infoRuleForm[filed].push(obj)
    },
    // 容器 引用
    handleCite(filed) {
      this.infoRuleForm.objVisible = true
      let obj = {
        id: nanoid(),
        state: true,
        obj: '',
        key: '',
        value: ''
      }
      if (filed === 'environmentVariables') {
        obj = {
          id: nanoid(),
          state: true,
          obj: '',
          key: '',
          value: ''
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

    // 动态容器 操作
    handleTabsRemove(targetName, action) {
      const tabs = this.containerTabs
      let activeName = this.currentTabsValue
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
      this.currentTabsValue = activeName
      this.containerTabs = tabs.filter(tab => tab.name !== targetName)
    },
    // 添加容器
    handleAddContainer() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },

    closeHealthExaminationFormDialog() {
      this.healthExaminationFormVisible = false
    },
    submitHealthExaminationForm(filed, type, form) {
      if (type === 'add') {
        this.infoRuleForm[filed].push(form)
      } else {
        this.$set(this.infoRuleForm, filed, [{ ...form }])
      }
      this.healthExaminationFormVisible = false
    },

    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['infoRuleForm'].validate(valid => {
        if (valid) {
          let flag = true
          this.$refs.infoRuleForm.map(el => {
            el.validate(va => {
              if (!va) {
                flag = false
              }
            })
          })
          if (flag) {
            console.log(this.infoRuleForm)
            console.log(this.infoRuleForm)
          } else {
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.computer-componentsForm-container {
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  padding: 0 20px 20px 20px;
  .scroll-div {
    padding-bottom: 66px;
  }
  section {
    border-top: 1px solid $border-color-two;
    margin-top: 10px;
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
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
