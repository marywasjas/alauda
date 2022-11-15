<template>
  <div class="app-container">
    <div class="card__header">
      创建内部路由
      <div class="flex-center">
        <el-input
          v-model="format"
          placeholder="按名称搜索"
          size="small"
          class="margin-right10"
        />
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col :span="9">
          <el-form-item label="所属协议">
            <el-select v-model="form.collector" class="filter-item" placeholder="请选择">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>基本</el-divider>
      <el-row>
        <el-col :span="9">
          <el-form-item label="设备内名称">
            <el-input v-model="form.pointCode" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="默认名">
            <el-input v-model="form.pointName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="类型">
            <el-select v-model="form.type" class="filter-item" placeholder="请选择">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="精度">
            <el-input-number v-model="form.accuracy" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="可写">
            <el-radio v-model="form.writeAble" label="1">是</el-radio>
            <el-radio v-model="form.writeAble" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="虚拟">
            <el-radio v-model="form.analog" label="1">是</el-radio>
            <el-radio v-model="form.analog" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="单位文字">
            <el-input v-model="form.unit" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="单位符号">
            <el-input v-model="form.unitCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="默认映射名">
            <el-input v-model="form.tagName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>高级</el-divider>
      <el-row>
        <el-col :span="9">
          <el-form-item label="默认值">
            <el-input v-model="form.default" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="量程变换">
            <el-col :span="4">PV=PV*</el-col>
            <el-col :span="8"><el-input v-model="form.change1" /></el-col>
            <el-col :span="1">+</el-col>
            <el-col :span="8"><el-input v-model="form.change2" /></el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="历史数据保存方式">
            <el-select v-model="form.historyType" class="filter-item" placeholder="请选择">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="采集间隔(s)">
            <el-input-number v-model="form.interval" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="上下限验证">
            <el-col :span="3">上限</el-col>
            <el-col :span="8"><el-input v-model="form.ceil" /></el-col>
            <el-col :span="3">下限</el-col>
            <el-col :span="8"><el-input v-model="form.floor" /></el-col>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="正则验证">
            <el-input v-model="form.reg" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="验证不通过时">
            <el-select v-model="form.refuseAction" class="filter-item" placeholder="请选择">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>

const calendarTypeOptions = []
export default {
  data() {
    return {
      isEdit: false,
      form: {
        retryCount: 0
      },
      calendarTypeOptions,
      tempRoute: {},
      format: ''
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id !== '0') {
      this.isEdit = true
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
    },
    setTagsViewTitle() {
      const title = '编辑测点规则'
      const route = Object.assign({}, this.tempRoute, { title: `${title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑测点规则'
      document.title = `${title}`
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

