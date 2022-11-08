<template>
  <div class="t-operation">
    <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="dialogFormVisible = true">
      {{ drop.dropVal }}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in drop.dropList" :key="item.id" :command="item.txt">{{
          item.txt
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="flex_row">
      <el-input
        v-model="searchVal"
        placeholder="按名称搜索"
        class="input_val"
        clearable
        @clear="searchClick"
        @keyup.enter.native="searchClick"
      >
        <el-button slot="append" icon="el-icon-search" class="input_btn" @click="searchClick" />
      </el-input>
      <el-button icon="el-icon-refresh-right" class="refresh_btn" @click="searchClick('refresh')" />
    </div>

    <el-dialog title="选择镜像" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="方式：" :label-width="formLabelWidth">
          <el-button-group>
            <el-button plain>选择</el-button>
            <el-button plain>输入</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="集成项目名称：" :label-width="formLabelWidth">
          <el-select v-model="value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="镜像地址：" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="选择镜像仓库">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span style="margin: 0 10px">:</span>
          <el-select v-model="value" placeholder="选择或输入Tag">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeployHeader',
  props: {
    drop: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      searchVal: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      options: [
        {
          value: '选项1',
          label: 'library(harbor-demo-1g7ligh)'
        },
        {
          value: '选项2',
          label: 'library(harbor-demo-1g7ligh)'
        }
      ],
      value: ''
    }
  },
  created() {},
  methods: {
    handleClick() {
      console.log(11)
    },
    searchClick(type) {
      if (type === 'refresh') {
        this.searchVal = ''
      }
      console.log(this.searchVal)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="less" scoped>
.flex_row {
  display: flex;
  flex-direction: row;
}
.t-operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .input_val {
    width: 300px;
  }
  .refresh_btn {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 12px 12px;
    margin-left: 10px;
    i {
      font-weight: 600;
      color: #000;
    }
  }
  .el-input-group__append {
    padding: 0 10px;
    i {
      font-weight: 600;
    }
  }
}
</style>
