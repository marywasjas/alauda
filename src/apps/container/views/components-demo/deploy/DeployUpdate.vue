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
                  <el-input v-model="input1" placeholder="数字或者百分比" style="width: 500px; margin-right: 10px">
                    <template slot="prepend">最大可超出数</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="input2" placeholder="数字或者百分比" style="width: 500px">
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
              <el-table header-row-class-name="headerStyle" class="margin-top">
                <el-table-column label="键" />
                <el-table-column label="值" />
              </el-table>
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
            <el-table header-row-class-name="headerStyle" class="margin-top">
              <el-table-column label="名称" />
              <el-table-column label="类型" />
              <el-table-column label="相关配置" />
            </el-table>
          </div>
          <div style="padding: 0 60px">
            <span>镜像凭据:</span>
            <el-select v-model="value" placeholder="请选择" style="width: 500px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
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
      currentCode: '',
      inputCode: {},
      language: 'yaml',
      visible: false,
      buttonVisible: true,
      options: [],
      value: ''
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
