<template>
  <el-dialog title="部署" :visible="dialogVisible" width="50%" @close="onClose">
    <el-descriptions :column="1">
      <el-descriptions-item label="名称">{{ form.name }}</el-descriptions-item>
      <el-descriptions-item label="显示名称">{{ form.labelName }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ form.state }}</el-descriptions-item>
      <el-descriptions-item label="CPU使用率">
        {{ form.cpu }}
      </el-descriptions-item>
      <el-descriptions-item label="内存使用率">{{ form.memory }}</el-descriptions-item>
      <el-descriptions-item label="镜像">{{ form.mirrorImage }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ form.data }}</el-descriptions-item>
    </el-descriptions>
    <div class="container">容器：nrcp-afterloan</div>
    <el-table
      class="margin-top"
      :data="tableData"
      style="width: 100%"
      height="100%"
      header-row-class-name="headerStyle"
    >
      <el-table-column label="挂载存储卷名称" prop="name" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="挂载路径" prop="path" />
      <el-table-column label="只读" prop="readOnly" />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'TopoTooltip',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: 'nrcp-afterloan-deployment',
        labelName: '',
        state: '运行中（1/1）',
        cpu: '0.71%',
        memory: '45.45%',
        mirrorImage: 'dsdsdsmksddjksjd',
        data: '2022-04-22  19:02:47'
      },
      tableData: [
        {
          name: 'saaaa',
          type: '配置字典',
          path: '/nrcp/',
          readOnly: '否'
        }
      ]
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-size: 18px;
  font-weight: 700;
}
</style>
