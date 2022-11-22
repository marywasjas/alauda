<template>
  <div class="update-container">
    <div class="update-head">
      <div class="update-title">
        <div>
          <span style="margin-right: 5px">更新</span>
          <span>{{ link_name }}</span>
        </div>
        <el-radio-group v-model="activeTab">
          <el-radio-button label="list">表单</el-radio-button>
          <el-radio-button label="yaml">YAML</el-radio-button>
        </el-radio-group>
      </div>
      <el-divider />
      <section v-if="activeTab === 'list'">
        <div style="margin-bottom: 10px">
          <div class="info-title">基本信息</div>
          <el-form label-width="80px" class="formInfo">
            <el-form-item label="名称:">
              <span>{{ link_name }}</span>
            </el-form-item>
            <el-form-item label="显示名称:">
              <el-input v-model="name" style="width: 500px" />
            </el-form-item>
            <el-form-item
              label="实例数:"
              :rules="[
                { required: true, message: '年龄不能为空' },
                { type: 'number', message: '年龄必须为数字值' }
              ]"
            >
              <el-input-number v-model="num" :min="0" @change="handleChange" />
            </el-form-item>
          </el-form>
          <el-button
            v-if="buttonVisible"
            round
            size="mini"
            style="color: #1890ff"
            @click="openTable"
          >更多 <i
            class="el-icon-d-arrow-right"
          /></el-button>
          <div v-if="visible" class="buttonBox">
            <el-form :inline="true">
              <el-row>
                <el-form-item label="更新策略:">
                  <el-input v-model="input1" placeholder="数字或者百分比" style="min-width: 300px; margin-right: 10px">
                    <template slot="prepend">最大可超出数</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="input2" placeholder="数字或者百分比" style="min-width: 300px">
                    <template slot="prepend">最多不可用数</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <i class="el-icon-question" />
                </el-form-item>
              </el-row>
            </el-form>

            <div style="display: flex">
              <span>标签：</span>
              <div>
                <el-table :data="tableDate" header-row-class-name="headerStyle" class="margin-top">
                  <el-table-column label="键" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.key" />
                    </template>
                  </el-table-column>
                  <el-table-column label="值" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.value" />
                    </template>
                  </el-table-column>

                  <el-table-column label="" align="center" width="50" class-name="small-padding fixed-width">
                    <template slot-scope="{ row }">
                      <div class="operation-cell">
                        <i class="el-icon-remove-outline" @click="remove(row.key)" />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px; width: 100%">
                  <el-button style="width: 100%" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
                </div>
              </div>
            </div>

            <el-button
              class="table-button"
              round
              type="primary"
              size="mini"
              @click="closeTable"
            >收起 <i
              class="el-icon-d-arrow-right"
              style="transform: rotate(-90deg)"
            /></el-button>
          </div>
        </div>
        <div style="margin-bottom: 10px">
          <div class="info-title">容器组</div>
          <div style="display: flex; padding: 0 60px; margin-bottom: 10px">
            <span style="line-height: 80px">存储卷：</span>
            <div>
              <el-table :data="tableDate2" header-row-class-name="headerStyle" class="margin-top">
                <el-table-column label="名称" min-width="300">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" />
                  </template>
                </el-table-column>
                <el-table-column label="类型" min-width="300">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.type" />
                  </template>
                </el-table-column>
                <el-table-column label="相关配置" min-width="300">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.configuration" />
                  </template>
                </el-table-column>

                <el-table-column label="" align="center" width="80" class-name="small-padding fixed-width">
                  <template slot-scope="{ row }">
                    <div class="operation-cell">
                      <i class="el-icon-edit" style="margin-right: 10px" />
                      <i class="el-icon-remove-outline" @click="remove(row.key)" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px; width: 100%">
                <el-button
                  style="width: 100%"
                  icon="el-icon-circle-plus-outline"
                  @click="addContainerGroup"
                >添加</el-button>
              </div>
            </div>
          </div>
          <div style="padding: 0 50px">
            <span style="margin-right: 6px">镜像凭据:</span>
            <el-select v-model="value" placeholder="请选择" style="width: 500px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <el-button
            v-if="buttonVisible"
            round
            size="mini"
            style="color: #1890ff"
            @click="openContainer"
          >更多 <i
            class="el-icon-d-arrow-right"
          /></el-button>
          <div v-if="visibleContainer" class="buttonBox">
            <div style="display: flex">
              <span>容器组标签：</span>
              <div>
                <el-table :data="tableDate" header-row-class-name="headerStyle" class="margin-top">
                  <el-table-column label="键" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.key" />
                    </template>
                  </el-table-column>
                  <el-table-column label="值" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.value" />
                    </template>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px; width: 100%">
                  <el-button style="width: 100%" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
                </div>
              </div>
            </div>
            <div style="display: flex; margin-bottom: 10px">
              <span>容器组注解：</span>
              <div>
                <el-table :data="tableDate" header-row-class-name="headerStyle" class="margin-top">
                  <el-table-column label="键" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.key" />
                    </template>
                  </el-table-column>
                  <el-table-column label="值" min-width="450">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.value" />
                    </template>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px; width: 100%">
                  <el-button style="width: 100%" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <span style="line-height: 30px">主机选择器：</span>
              <el-select v-model="value1" multiple placeholder="请选择" style="width: 800px">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <div style="display: flex; margin-left: 30px">
              <span>亲和性：</span>
              <div>
                <el-table
                  :data="tableDate3"
                  header-row-class-name="headerStyle"
                  class="margin-top"
                  style="width: 1000px"
                >
                  <el-table-column label="类型" prop="type" />
                  <el-table-column label="类别" prop="categories" />
                  <el-table-column label="权重" prop="weight" />
                  <el-table-column label="主机拓扑域" prop="topologyDomain" />
                  <el-table-column label="匹配标签" prop="MatchingLabels" />
                </el-table>
                <div style="margin-top: 20px; width: 100%">
                  <el-button style="width: 100%" icon="el-icon-circle-plus-outline">添加亲和性</el-button>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <span style="line-height: 70px">关闭宽限期：</span>
              <span>
                <el-input v-model="input3" style="width: 300px">
                  <template slot="append">秒</template>
                </el-input>
              </span>
            </div>

            <el-button
              class="table-button"
              round
              type="primary"
              size="mini"
              @click="closeContainer"
            >收起 <i
              class="el-icon-d-arrow-right"
              style="transform: rotate(-90deg)"
            /></el-button>
          </div>
        </div>
        <div>
          <div class="info-title">容器</div>
          <div style="height: 50px; background-color: #eee; margin-bottom: 30px">
            <div class="detail-center-container">kibana</div>
          </div>
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
    </div>
    <div class="update-foot">
      <el-button type="primary" style="margin-left: auto">更新</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
export default {
  name: 'DeployUpdate',
  components: { MonacoEditor },
  data() {
    return {
      link_name: '',
      activeTab: 'list',
      name: '',
      num: 0,
      input1: 1,
      input2: 2,
      input3: 3,
      currentCode: '',
      inputCode: {},
      language: 'yaml',
      visible: false,
      buttonVisible: true,
      options: [
        {
          value: '',
          label: ''
        }
      ],
      value: '',
      obj: {
        key: '',
        value: ''
      },
      // 基本信息
      tableDate: [
        {
          key: 'iiooo1',
          value: 'looksLikeNumbers'
        },
        {
          key: 'iiooo',
          value: 'looksLikeNumbers'
        }
      ],
      tableDate2: [
        {
          name: 'iiooo1',
          type: '存储卷声明',
          configuration: 'sjdksjs'
        },
        {
          name: 'iiooo',
          type: '存储卷声明',
          configuration: 'sjdksjs'
        }
      ],
      // 下拉框
      options1: [
        {
          value: '',
          label: ''
        }
      ],
      value1: [],
      // 亲和性
      tableDate3: [
        {
          type: 'iiooo1',
          categories: '存储卷声明',
          weight: 'sjdksjs',
          topologyDomain: '',
          MatchingLabels: ''
        }
      ],
      visibleContainer: false
    }
  },
  created() {
    this.link_name = this.$route.query.link_name
  },
  methods: {
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    handleChange(value) {
      console.log(value)
    },
    openTable() {
      this.visible = true
      this.buttonVisible = false
    },
    closeTable() {
      this.visible = false
      this.buttonVisible = true
    },
    remove(key) {
      console.log(key)
    },
    add() {
      this.tableDate.push(JSON.parse(JSON.stringify(this.obj)))
    },
    addContainerGroup() {
      this.tableDate2.push(JSON.parse(JSON.stringify(this.obj)))
    },
    openContainer() {
      this.buttonVisible = false
      this.visibleContainer = true
    },
    closeContainer() {
      this.buttonVisible = true
      this.visibleContainer = false
    }
  }
}
</script>

<style lang="scss" scoped>
.update-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .update-head {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    .update-title {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 18px;
        font-weight: 700;
        color: rgb(50, 52, 55);
      }
    }
    .info-title {
      padding-left: 5px;
      margin-bottom: 20px;
      border-left: 5px solid #1890ff;
    }
    .formInfo {
      width: 700px;
      padding: 0 50px;
    }
    .buttonBox {
      position: relative;
      padding: 30px 50px;
      margin: 0 0 20px 0;
      border: 1px solid #1890ff;
      border-radius: 5px;
      span {
        margin-right: 10px;
        height: 40px;
        line-height: 80px;
      }
      .table-button {
        position: absolute;
        bottom: -15px;
        left: 20px;
      }
    }
    .detail-center-container {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-top: 3px solid #1890ff;
      text-align: center;
      line-height: 50px;
      margin-bottom: 30px;
    }
  }
  .update-foot {
    display: flex;
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
