<template>
  <el-drawer
    v-if="xtermVisible"
    :before-close="handleClose"
    :visible.sync="xtermVisible"
    direction="btt"
    :append-to-body="true"
    :modal="false"
    :wrapper-closable="false"
  >
    <div slot="title" class="flex-center">
      <span>{{ xtermTitle }}</span>
    </div>
    <div id="container">
      <div ref="terminal" />
    </div>
  </el-drawer>
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'LogXterm',
  components: {},
  props: {
    xtermVisible: {
      type: Boolean,
      default: false
    },
    xtermTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      terminal: null,
      socketUri: 'ws://127.0.0.1:8088/podname',
      socket: '',
      accessToken: 'token',
      baseTerminalOptions: {
        fontSize: 12,
        lineHeight: 1.2,
        letterSpacing: 0,
        fontWeight: '400',
        fontFamily: 'Consolas, "Courier New", monospace',
        bellStyle: 'sound',
        rendererType: 'canvas', // 渲染类型
        rows: 40, // 行数
        cols: 100, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, // 启用时，光标将设置为下一行的开头
        // scrollback: 50, //终端中的回滚量  Number.MAX_SAFE_INTEGER
        disableStdin: false, // 是否应禁用输入
        windowsMode: true, // 根据窗口换行
        cursorStyle: 'underline', // 光标样式
        cursorBlink: true, // 光标闪烁
        theme: {
          foreground: '#ECECEC', // 字体
          background: '#000000', // 背景色
          cursor: 'help', // 设置光标
          lineHeight: 20
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.initTerm()
    }, 0)
  },
  beforeDestroy() {
    this.socket && this.socket.close()
    this.term && this.term.dispose()
  },
  methods: {
    initTerm() {
      // 1.xterm终端初始化
      const term = new Terminal(this.baseTerminalOptions)
      // 2.webSocket初始化
      if (this.socketUri === '') return
      this.socket = new WebSocket(this.socketUri, this.accessToken) // 带 token 发起连接
      // 3.websocket集成的插件,这里要注意,网上写了很多websocket相关代码.xterm4版本没必要.
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon() // 全屏插件
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(this.$refs.terminal)
      fitAddon.fit()
      term.focus()
      this.term = term
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
<style scoped>
#container{
  width:100%;
  height:800px;
}
</style>
