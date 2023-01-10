<template>
  <div>
    <el-card style="width: 99%">
      <el-form ref="form" :model="form" label-width="100px" inline>
        <el-form-item label="备份文件夹：">
          <el-select v-model="form.data" style="width: 250px" placeholder="">
            <el-option label="data1" value="data1" />
            <el-option label="data2" value="data2" />
          </el-select>
        </el-form-item>

        <el-form-item label="查询条件：" style="margin-left: 80px">
          <el-input placeholder="按名称搜索" style="width: 250px" />
        </el-form-item>

        <el-form-item style="margin-left: 80px">
          <el-button>搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px; width: 99%">
      <el-row type="flex" class="row-bg">
        <el-col :span="24" style="margin-left: 20px">
          <el-checkbox v-model="checked">全选</el-checkbox>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="24" style="margin-left: 10px; margin-right: 10px">
          <div
            class="grid-content bg-color"
            style="
              height: 60px;
              border: 1px solid #ccc;
              text-align: center;
              line-height: 60px;
              color: #ccc;
            "
          >
            无备份
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="fixed-div">
      <el-row>
        <el-col :span="16">
          <div style="float: left">
            <el-button @click="backupVisible = true">生成备份</el-button>
            <el-button @click="configVisible = true">配置</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">
            <span>恢复</span>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="replace" :visible.sync="backupVisible">
      <template slot="title">
        <span>生成备份</span>
        <el-divider />
      </template>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item
          label="备份文件夹前缀:"
          prop="prefix"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm.prefix" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">
          确定
        </el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="replace" :visible.sync="configVisible">
      <template slot="title">
        <span>配置</span>
        <el-divider />
      </template>
      <el-form
        ref="ruleForm_config"
        :model="ruleForm_config"
        :rules="rules_config"
      >
        <!-- 1 -->
        <el-form-item
          label="Git 仓库URL:"
          prop="url"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="ruleForm_config.url"
            autocomplete="off"
            placeholder="http:// 或https:// 开头"
          />
        </el-form-item>
        <!-- 2 -->
        <el-form-item
          label="Git 仓库路径:"
          prop="path"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm_config.path" autocomplete="off" />
        </el-form-item>
        <!-- 3 -->
        <el-form-item
          label="备份文件夹前缀:"
          prop="prefix2"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm_config.prefix2" autocomplete="off" />
        </el-form-item>
        <!-- 4 -->
        <el-form-item
          label="Git-Token:"
          prop="getToken"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="ruleForm_config.getToken"
            autocomplete="off"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_config('ruleForm_config')">
          确定
        </el-button>
        <el-button @click="resetForm_config('ruleForm_config')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from "@/api/article";

export default {
  name: 'ExportZip',
  data() {
    return {
      form: {
        date: ''
      },
      checked: false, // 多选框的 v-model
      backupVisible: false, // 生成备份--对话框的显示
      configVisible: false, // 配置-----对话框的显示
      formLabelWidth: '150px',
      ruleForm: {
        prefix: ''
      },
      rules: {
        prefix: [
          { required: true, message: '请输入备份文件夹前缀', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      ruleForm_config: {
        url: '',
        path: '',
        prefix2: '',
        getToken: ''
      },
      rules_config: {
        url: [
          { required: true, message: '请输入备份文件夹前缀', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入备份文件夹前缀', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        prefix2: [
          { required: true, message: '请输入备份文件夹前缀', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        getToken: [
          { required: true, message: '请输入备份文件夹前缀', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.backupVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.backupVisible = false
    },
    submitForm_config(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.backupVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm_config(formName) {
      this.$refs[formName].resetFields()
      this.configVisible = false
    }
  }

  // data() {
  //   return {
  //     list: null,
  //     listLoading: true,
  //     downloadLoading: false,
  //     filename: ''
  //   }
  // },
  // created() {
  //   this.fetchData()
  // },
  // methods: {
  //   async fetchData() {
  //     this.listLoading = true
  //     const { data } = await fetchList()
  //     this.list = data.items
  //     this.listLoading = false
  //   },
  //   handleDownload() {
  //     this.downloadLoading = true
  //     import('@/vendor/Export2Zip').then(zip => {
  //       const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
  //       const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
  //       const list = this.list
  //       const data = this.formatJson(filterVal, list)
  //       zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
  //       this.downloadLoading = false
  //     })
  //   },
  //   formatJson(filterVal, jsonData) {
  //     return jsonData.map(v => filterVal.map(j => v[j]))
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f5f6f9;
}
.grid-content {
  // border-radius: 4px;
  min-height: 36px;
}
.bg-color {
  background: #fff;
}
.el-row {
  height: 100%;
}
.fixed-div {
  // width: calc(100% - 250px);
  width: calc(100% - 220px);
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  // right: 20px;
  background: #fff;
  text-align: right;
  border-radius: $border-radius-m;
  box-shadow: 0 0 4px 0 $box-shadow;
}
</style>

<style lang="scss">
.el-dialog__body {
  padding: 5px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>
