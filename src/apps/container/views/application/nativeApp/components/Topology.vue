<template>
  <div class="topo">
    <div class="container">
      <div class="container-title">
        <el-popover placement="bottom-start" width="230" trigger="click">
          <div class="legendForm">
            <div class="top">
              <div>
                <div class="div1"><span class="span1" /> <span class="span3">计算组件</span></div>
                <div class="div2"><span class="span2" /> <span class="span4">非计算机组件</span></div>
              </div>
              <div>
                <div><span style="font-weight: 700; color: #8a2be2">一</span> 引用关系</div>
                <div><span style="font-weight: 700; color: #00ced1">一</span> 挂载关系</div>
                <div><span style="font-weight: 700; color: #ffa500">一</span> 关联关系</div>
              </div>
            </div>
            <div class="bottom">
              <i class="el-icon-info" />
              暂不支持用户自定义资源展示
            </div>
          </div>
          <el-button slot="reference" size="mini" style="box-shadow: 0 0 5px #d1d2d4">图例</el-button>
        </el-popover>
        <el-button icon="el-icon-refresh-right" size="mini" style="box-shadow: 0 0 5px #d1d2d4; margin-left: 5px" />
      </div>
      <div id="container" />
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6'

const result = {
  dependency_graph: [
    {
      parent: 'node1',
      child: 'node2',
      code: '0'
    },
    {
      parent: 'node1',
      child: 'node3',
      code: '1'
    },
    {
      parent: 'node1',
      child: 'node4',
      code: '1'
    }
  ],
  svc_sequence_diagrams: [
    {
      id: 'node3',
      title: '内部路由',
      name: 'nrcp-afterloan-manage-1',
      desc: 'nrcp-afterloan-deployment',
      lineDash: [5, 5],
      type: 'right'
    },
    {
      title: '配置字典',
      name: 'nrcp-afterloan-manage-2',
      lineDash: [],
      id: 'node4',
      type: 'right'
    },
    {
      title: '持久卷声明',
      name: 'nrcp-afterloan-manage-3',
      id: 'node2',
      type: 'right'
    },
    {
      isRoot: true,
      title: '部署',
      name: 'nrcp-afterloan-deployment',
      state: '运行中（0/2）',
      containerGroupName: 'nrcp-afterloan-deployment',
      containerGroupTitle: '容器组',
      containerGroupState: '处理中',
      id: 'node1',
      type: 'left'
    }
  ]
}

export default {
  name: 'Topology',
  components: {},
  props: {},
  data() {
    return {
      graph: null,
      data: {
        nodes: [],
        edges: []
      },
      dataLeft: [],
      dataRight: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAjax()
  },
  mounted() {
    this.initG6()
  },
  methods: {
    getAjax() {
      const array = result.svc_sequence_diagrams
      console.log(array)
      const x = 200
      const y = 100
      array.forEach((item, i) => {
        if (item.type === 'left') {
          this.dataLeft.push(item)
        } else {
          this.dataRight.push(item)
        }
        console.log(this.dataLeft)
        console.log(this.dataRight)
      })
      this.dataLeft.forEach((item, i) => {
        this.data.nodes.push({
          id: item.id,
          title: item.title,
          name: item.name,
          desc: item.desc,
          lineDash: item.lineDash,
          state: item.state,
          containerGroupName: item.containerGroupName,
          containerGroupTitle: item.containerGroupTitle,
          containerGroupState: item.containerGroupState,
          isRoot: item.isRoot,
          x: x,
          y: y + 100 * i
        })
      })
      this.dataRight.forEach((item, i) => {
        this.data.nodes.push({
          id: item.id,
          title: item.title,
          name: item.name,
          desc: item.desc,
          lineDash: item.lineDash,
          x: x + 400,
          y: y + 100 * i
        })
      })

      console.log(this.data)
      result.dependency_graph.forEach(item => {
        const stroke = () => {
          if (item.code === '0') {
            return '#8a2be2'
          } else if (item.code === '1') {
            return '#00ced1'
          } else if (item.code === '2') {
            return '#ffa500'
          }
        }
        this.data.edges.push({
          source: item.parent,
          target: item.child,
          style: {
            stroke: stroke(),
            lineWidth: 2
          }
        })
        console.log(this.data)
        if (this.graph) {
          this.graph.data(this.data)
          this.graph.render()
        }
      })
    },
    initG6() {
      G6.registerNode('card-node', {
        draw: (cfg, group) => {
          const keyShape = group.addShape('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: 250,
              fill: '#fff',
              stroke: '#696969',
              lineDash: cfg.lineDash,
              cursor: 'pointer'
            },
            name: 'card-node-keyshape'
          })
          // const titleRect = group.addShape('rect', {
          //   attrs: {
          //     x: 0,
          //     y: 0,
          //     width: 250,
          //     height: 20,
          //     fill: '#fff',
          //     stroke: '#696969',
          //     lineDash: cfg.lineDash
          //   },
          //   name: 'card-node-title'
          // })
          // const title = group.addShape('text', {
          //   attrs: {
          //     text: cfg.title,
          //     x: 10,
          //     y: 3,
          //     fill: 'black',
          //     textBaseline: 'top'
          //   }
          // })
          // if (cfg.isRoot === true) {
          //   const containerRect = group.addShape('rect', {
          //     attrs: {
          //       x: 0,
          //       y: 20,
          //       width: 250,
          //       height: 150,
          //       stroke: '#696969',
          //       fill: '#fff',
          //       radius: 2
          //     },
          //     name: 'card-node-containerRect',
          //     draggable: true
          //   })
          //   const container = group.addShape('text', {
          //     attrs: {
          //       text: cfg.name,
          //       x: 10,
          //       y: 30,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 12
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          //   const state = group.addShape('text', {
          //     attrs: {
          //       text: cfg.state,
          //       x: 10,
          //       y: 50,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 13
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          //   const containerGroup = group.addShape('rect', {
          //     attrs: {
          //       x: 25,
          //       y: 70,
          //       width: 200,
          //       height: 100,
          //       stroke: '#696969',
          //       fill: 'pink',
          //       radius: 2
          //     },
          //     name: 'card-node-containerRect',
          //     draggable: true
          //   })
          //   const containerGroupTitle = group.addShape('text', {
          //     attrs: {
          //       text: cfg.containerGroupTitle,
          //       x: 30,
          //       y: 80,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 13
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          //   const containerGroupName = group.addShape('text', {
          //     attrs: {
          //       text: cfg.containerGroupName,
          //       x: 30,
          //       y: 100,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 13
          //       // overflow: hidden
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          //   const containerGroupState = group.addShape('text', {
          //     attrs: {
          //       text: cfg.containerGroupState,
          //       x: 30,
          //       y: 130,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 13
          //       // overflow: hidden
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          // } else {
          //   const containerRect = group.addShape('rect', {
          //     attrs: {
          //       x: 0,
          //       y: 20,
          //       width: 250,
          //       height: 60,
          //       stroke: '#696969',
          //       fill: '#fff',
          //       radius: 2,
          //       lineDash: cfg.lineDash
          //     },
          //     name: 'card-node-containerRect',
          //     draggable: true
          //   })
          //   const container = group.addShape('text', {
          //     attrs: {
          //       text: cfg.name,
          //       x: 10,
          //       y: 30,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 12
          //     },
          //     name: 'card-node-container',
          //     draggable: true
          //   })
          //   const desc = group.addShape('text', {
          //     attrs: {
          //       text: cfg.desc,
          //       x: 10,
          //       y: 45,
          //       fill: 'black',
          //       textBaseline: 'top',
          //       fontSize: 10
          //     },
          //     name: 'card-node-desc',
          //     draggable: true
          //   })
          // }

          return keyShape
        }
      })
      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      this.graph = new G6.Graph({
        container: 'container',
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
        },
        defaultNode: {
          type: 'card-node',
          anchorPoints: [[0.5, 0.5]]
        },
        defaultEdge: {
          type: 'cubic-horizontal'
        }
      })

      const data = this.data

      this.graph.data(data)
      this.graph.render()

      function refreshDragedNodePosition(e) {
        const model = e.item.get('model')
        model.fx = e.x
        model.fy = e.y
      }
      this.graph.on('node:dragstart', e => {
        this.graph.layout()
        refreshDragedNodePosition(e)
      })
      this.graph.on('node:drag', e => {
        refreshDragedNodePosition(e)
      })
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!this.graph || this.graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          this.graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.topo {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  .container {
    padding: 10px;
    height: 800px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0), linear-gradient(90deg, #f4f4f4 1px, transparent 0);
    background-size: 6px 6px;
  }
}
.legendForm {
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .div1 {
      position: relative;
      .span1 {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 18px;
        height: 18px;
        border: #696969 1px solid;
      }
      .span3 {
        margin-left: 20px;
      }
    }
    .div2 {
      position: relative;
      .span2 {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 18px;
        height: 18px;
        border: #696969 1px dashed;
      }
      .span4 {
        margin-left: 20px;
      }
    }
  }
  .bottom {
    padding-top: 10px;
    border-top: #f4f4f4 1px solid;
  }
}
</style>
