<template>
  <div class="yaml-create-container">
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
              <el-input
                v-model="ruleForm.name"
                placeholder="以 a-z、0-9 开头结尾，支持使用 a-z、0-9、.、-，最多 40 个字符"
              />
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="ruleForm.showName" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="yaml-div">
        <monaco-editor
          id="monacoEditorYaml"
          :code="currentCode"
          :read-only="false"
          :is-fullscreen="false"
          :btn-visible="btnVisible"
          :language="language"
          @handleBlur="handleBlur"
          @changeFull="changeFull"
        />
        <div class="tips-div">
          YAML样例:
          <p @click="quickInput">
            <i class="el-icon-top" />
            <span>写入</span>
          </p>
          <p @click="viewYaml">
            <i class="el-icon-view" />
            <span>查看</span>
          </p>
        </div>
      </div>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
    <monaco-editor-dialog
      v-if="detailVisible"
      title="YAML样例"
      :visible="detailVisible"
      :code="defaultCodeStr"
      :read-only="readOnly"
      :btn-visible="defaultBtnVisible"
      :language="language"
      :big-full="bigFull"
      @closeDetailsDialog="closeDetailsDialog"
      @handleBlurDialog="handleBlurDialog"
    />
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'

export default {
  name: 'YamlCreate',
  components: { MonacoEditor, MonacoEditorDialog },
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        showName: ''
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
        showName: [{ required: true, message: '请输入显示名称', trigger: 'blur' }]
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
      btnVisible: {
        autoUpdate: false,
        import: true,
        export: false,
        find: false,
        reset: false,
        copy: false,
        full: true,
        exit: true
      },
      defaultBtnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        find: true,
        reset: false,
        copy: true,
        full: true,
        exit: true
      },
      detailVisible: false,
      isFullscreen: false,
      readOnly: true,
      bigFull: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    // 写入
    quickInput() {
      this.currentCode = JSON.stringify(this.defaultCode, null, 2)
      const obj = {
        autoUpdate: false,
        import: true,
        export: true,
        reset: true,
        find: true,
        copy: true
      }
      this.$set(this, 'btnVisible', obj)
    },
    // 查看
    viewYaml() {
      this.detailVisible = true
      this.readOnly = true
      this.bigFull = false
      this.defaultBtnVisible = {
        autoUpdate: false,
        import: false,
        export: true,
        find: true,
        reset: false,
        copy: true,
        full: true,
        exit: true
      }
      this.defaultCodeStr = JSON.stringify(this.defaultCode, null, 2)
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    // 改变全屏
    changeFull(val) {
      this.detailVisible = true
      this.readOnly = false
      this.bigFull = true
      this.defaultBtnVisible = {
        autoUpdate: false,
        import: true,
        export: false,
        find: false,
        reset: false,
        copy: false,
        full: false,
        exit: true
      }
      this.defaultCodeStr = JSON.stringify(this.inputCode, null, 2)
    },
    // 改变全屏 弹窗
    changeFullDialog(val) {
      this.isFullscreen = val
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
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
    closeDetailsDialog() {
      this.detailVisible = false
      this.bigFull = false
      this.defaultBtnVisible = {
        autoUpdate: false,
        import: true,
        export: false,
        find: false,
        reset: false,
        copy: false,
        full: true,
        exit: true
      }
    },
    handleBlurDialog(code) {
      this.currentCode = code
    }
  }
}
</script>
<style lang="scss" scoped>
.yaml-create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
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
