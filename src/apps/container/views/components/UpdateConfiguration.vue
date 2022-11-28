<template>
  <el-dialog title="更新配置引用" :visible="configurationVisible" width="40%" @close="closeConfiguration">
    <div class="configTitle">artifact-controller</div>
    <div class="configContainer">
      配置引用
      <el-select v-model="value" placeholder="请选择" style="width: 80%">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeConfiguration">取 消</el-button>
      <el-button type="primary" @click="closeConfiguration">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateConfigurationDialog',
  props: {
    configurationVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      options: [
        {
          label: '配置字典',
          options: [
            {
              value: '56828802.alauda.io',
              label: '56828802.alauda.io'
            },
            {
              value: '56828802.alauda.io',
              label: '56828802.alauda.io'
            }
          ]
        }
      ],
      value: ''
    }
  },
  methods: {
    closeConfiguration() {
      this.$emit('update:configurationVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.configTitle {
  padding: 0 10px;
  margin-bottom: 20px;
  border-left: 3px solid #1890ff;
}
.configContainer {
  width: 100%;
  padding-left: 50px;
}
</style>
