<template>
  <el-dialog
    v-if="visible"
    :title="title"
    :visible="visible"
    width="900px"
    :fullscreen="isFullscreen"
    :before-close="closeDetailsDialog"
    :close-on-click-modal="false"
  >
    <div class="editor-toolbar">
      <div class="editor-toolbar__language">{{ (readOnly?'YAML只读':'YAML读写') }}</div>
      <div class="editor-toolbar-wrap">
        <el-checkbox v-if="btnVisible.autoUpdate" v-model="autoUpdate" label="自动更新" style="margin-right:10px;" />
        <el-button v-if="btnVisible.import" icon="el-icon-upload2" size="mini">导入</el-button>
        <el-button v-if="btnVisible.export" icon="el-icon-download" size="mini" @click="handleDownload">导出</el-button>
        <el-button v-if="btnVisible.reset" icon="el-icon-circle-close" size="mini" @click="resetCode">清理</el-button>
        <el-button v-if="btnVisible.find" icon="el-icon-search" size="mini" @click="find">查找</el-button>
        <el-button v-if="btnVisible.copy" icon="el-icon-copy-document" size="mini" @click="handleCopy(null,$event)">复制</el-button>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <el-button icon="el-icon-thumb" size="mini" class="margin-left10 margin-right10">{{ currentThemeObj.label }}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="autoTheme({label:'自动',value:currentThemeObj.value})">
              <div class="flex-start">
                <i class="el-icon-user" />
                <span>自动</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="autoTheme({label:'日间',value:'vs'})">
              <div class="flex-start">
                <i class="el-icon-monitor" />
                <span>日间</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="autoTheme({label:'日间',value:'vs-dark'})">
              <div class="flex-start">
                <i class="el-icon-refresh" />
                <span>夜间</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-if="!isFullscreen" icon="el-icon-full-screen" size="mini" @click="handleFull">全屏</el-button>
        <el-button v-if="isFullscreen" icon="el-icon-document-delete" size="mini" @click="handleFullExit">退出</el-button>

      </div>
    </div>
    <div class="border-box">
      <div :id="id" :style="{width:'100%',height:editHeight}" />
    </div>
    <span v-if="submitTxt" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{ submitTxt }}</el-button>
      <el-button @click="closeDetailsDialog">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as monaco from 'monaco-editor'
import FileSaver from 'file-saver'
import clip from '@/utils/clipboard'

export default {
  name: 'MonacoEditorDialog',
  components: {
  },
  props: {
    id: {
      type: String,
      default: 'MonacoEditorDialog'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    submitTxt: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    bigFull: {
      type: Boolean,
      default: false
    },
    btnVisible: {
      type: Object,
      default: () => {
        return {
          autoUpdate: false,
          export: false,
          import: true,
          reset: false,
          find: false,
          copy: false
        }
      }
    },
    autoUpdate:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputCode: '',
      isFullscreen: false,
      editHeight: '400px',
      currentThemeObj: {
        label: '自动',
        value: 'vs'
      },
      standaloneEditorConstructionOptions: {
        acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
        acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart"
        accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
        accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
        autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
        autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
        autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoIndent: 'None', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
        automaticLayout: true, // 自动布局
        codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
        codeLensFontFamily: '', // codeLens的字体样式
        codeLensFontSize: 14, // codeLens的字体大小
        colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
        comments: {
          ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
          insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
        }, // 注释配置
        contextmenu: true, // 启用上下文菜单
        columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
        autoSurround: 'never', // 是否应自动环绕选择
        copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
        cursorBlinking: 'Solid', // 光标动画样式
        cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        cursorStyle: 'UnderlineThin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
        cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
        cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
        cursorWidth: 2, // <=25 光标宽度
        minimap: {
          enabled: false // 是否启用预览图
        }, // 预览图设置
        folding: true, // 是否启用代码折叠
        links: true, // 是否点击链接
        overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
        renderLineHighlight: 'gutter', // 当前行突出显示方式
        roundedSelection: false, // 选区是否有圆角
        scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
        fontSize: 12,
        find: {
          seedSearchStringFromSelection: 'never',
          autoFindInSelection: 'never'
        },
        mouseWheelZoom: true,
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible'
        },
        fixedOverflowWidgets: true,
        value: '', // 编辑器的值
        language: 'javascript', // 语言
        theme: 'hc-dark', // 编辑器主题：vs, hc-black, or vs-dark
        // autoIndent: true, // 自动缩进
        readOnly: true // 是否只读
      }
    }
  },
  computed: {},
  watch: {
    code: {
      handler(newVal, oldVal) {
        this.currentCode = newVal
      },
      deep: true
    },
    isFullscreen: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.editHeight = '600px'
        } else {
          this.editHeight = '400px'
        }
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    this.currentCode = this.code
    setTimeout(() => {
      this.createMonacoEditor()
    }, 0)
  },
  methods: {
    // 创建 editor
    createMonacoEditor() {
      this.$set(this.standaloneEditorConstructionOptions, 'readOnly', this.readOnly)
      this.$set(this.standaloneEditorConstructionOptions, 'language', this.language)
      this.$set(this.standaloneEditorConstructionOptions, 'value', this.currentCode)
      this.$set(this.standaloneEditorConstructionOptions, 'theme', this.currentThemeObj.value)
      const container = document.getElementById(this.id)
      this.monacoEditor = monaco.editor.create(
        container,
        this.standaloneEditorConstructionOptions
      )
      // 监听内容变化
      this.monacoEditor.onDidChangeModelContent((e) => {
        // this.inputCode = this.monacoEditor.getValue()
        // this.$emit('handleBlur', this.inputCode)
      })
      // 监听失去焦点事件
      this.monacoEditor.onDidBlurEditorText((e) => {
        this.inputCode = this.monacoEditor.getValue()
        this.$emit('handleBlur', this.inputCode)
      })
    },
    // 更新数据
    updateMonacoEditor() {
      if (this.monacoEditor === null) {
        this.createMonacoEditor()
      }
      const oldModel = this.monacoEditor.getModel()
      const newModel = monaco.editor.createModel(
        this.value,
        this.language
      )
      if (oldModel) {
        oldModel.dispose()
      }
      this.monacoEditor.setModel(newModel)
    },
    // 清理
    resetCode() {
      this.value = ''
      this.updateMonacoEditor()
    },
    // 查找
    find() {
      this.monacoEditor.getAction('actions.find').run()
    },
    // 复制
    handleCopy(text, event) {
      clip(this.currentCode, event)
    },
    // 改变主题
    autoTheme(obj) {
      this.currentThemeObj = obj
      this.monacoEditor._themeService.setTheme(this.currentThemeObj.value)
    },
    // 导出
    handleDownload() {
      const blob = new Blob([this.value], {
        type: 'application/json'
      })
      FileSaver.saveAs(blob, `default.json`)
    },
    // 全屏
    handleFull() {
      this.isFullscreen = true
    },
    // 退出
    handleFullExit() {
      this.isFullscreen = false
    },
    // 关闭弹窗
    closeDetailsDialog() {
      this.$emit('closeDetailsDialog')
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
      this.$emit('handleBlurDialog', this.inputCode)
    },
    submitForm() {
      this.$emit('submitForm', this.inputCode)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
