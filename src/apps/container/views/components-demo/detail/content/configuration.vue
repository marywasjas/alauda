<template>
  <div class="configuration-center">
    <div style="font-weight: 700; font-size: 20px; margin-bottom: 20px; color: rgb(50, 52, 55)">配置</div>
    <div style="height: 50px; background-color: #eee; margin-bottom: 30px">
      <div class="configuration-center-container">nginx</div>
    </div>
    <div class="flex-center">
      <span>环境变量</span>
      <el-button>更新</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
      <el-table-column label="键" prop="key" />

      <el-table-column prop="value" label="值/引用值" />
    </el-table>
    <div class="flex-center" style="margin-top: 20px">
      <span>配置引用</span>
      <el-button>更新</el-button>
    </div>
    <el-table :data="tableData1" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
      <el-table-column label="类型" prop="type" />

      <el-table-column prop="name" label="名称" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Configuration',
  data() {
    return {
      tableData: [
        {
          key: 'sjjjsjs',
          value: 'sjakasjajsj'
        },
        {
          key: 'sjjjsjs',
          value: 'sjakasjajsj'
        }
      ],
      tableData1: [
        {
          type: 'sjjjsjs',
          name: 'sjakasjajsj'
        },
        {
          type: 'sjjjsjs',
          name: 'sjakasjajsj'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.configuration-center {
  margin-bottom: 10px;
  padding: 20px 20px;
  background-color: #fff;
  border: 1px solid #eee;
  .configuration-center-container {
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-top: 3px solid #1890ff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
  }
}
</style>
