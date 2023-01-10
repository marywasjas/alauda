<template>
  <div class="container margin-top">
    <div class="flexbox">
      <div class="container-left">
        <el-input v-model="filterText" placeholder="按名称过滤" prefix-icon="el-icon-search" />
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
        />
      </div>
      <div class="container-right">
        <div class="flex-end margin-bottom10">
          <el-input v-model="formInline.colony" style="width: 200px" placeholder="目标集群：" class="margin-right10" />
          <el-input
            v-model="formInline.namespace"
            style="width: 300px"
            placeholder="目标命名空间："
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-button icon="el-icon-refresh-right" @click="onSearch" />
        </div>
        <monaco-editor
          ref="monacoEditor"
          :code="currentCode"
          :read-only="false"
          :language="language"
          :btn-visible="btnVisible"
          @handleBlur="handleBlur"
        />
      </div>
    </div>
    <div class="container-bottom margin-top flex-center">
      <div>
        <el-button>批量转换</el-button>
        <el-button>转换</el-button>
        <el-button>配置</el-button>
      </div>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
  <!-- <ConfigurationDialog :dialogVisible="dialogVisible"></ConfigurationDialog> -->
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'
// import ConfigurationDialog from './configurationDialog.vue'
export default {
  name: 'YamlList',
  components: { MonacoEditor },
  data() {
    return {
      filterText: '',
      data: [
        {
          id: 1,
          label: '部署（2）',
          children: [
            {
              id: 4,
              label: 'awp-bes-wap-web'
            },
            {
              id: 5,
              label: 'awp-bes-wap-vue'
            }
          ]
        },
        {
          id: 2,
          label: '内部路由(5)',
          children: [
            {
              id: 6,
              label: 'awp-bes-wap-vue'
            },
            {
              id: 7,
              label: 'awp-bes-wap-vue'
            }
          ]
        },
        {
          id: 3,
          label: '存储（1）',
          children: [
            {
              id: 8,
              label: 'awp-bes-wap-vue'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      formInline: {
        colony: '',
        namespace: ''
      },
      currentCode: '',
      inputCode: {},
      language: 'yaml',
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
            message: 'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
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
      btnVisible: {
        export: true,
        import: true,
        reset: true,
        find: true,
        copy: true,
        full: true
      },
      dialogVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.currentCode = JSON.stringify(this.defaultCode, null, 2)
  },
  methods: {
    onSearch() {
      console.log(this.formInline)
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
    // openDialog() {
    //   this.dialogVisible = true
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .container-left {
    width: 20%;
    margin-right: 10px;
    padding: 20px;
    background-color: #fff;
  }
  .container-right {
    width: 80%;
    padding: 20px;
    background-color: #fff;
  }
  .container-bottom {
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
