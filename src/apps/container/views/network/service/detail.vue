<template>
  <div class="app-container">
    <el-descriptions class="margin-top" title="基本信息" :column="2" :size="'medium'" border>
      <el-descriptions-item>
        <template slot="label">
          显示名称
        </template>
        {{ form.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          来源
        </template>
        55
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          设备内名称
        </template>
        {{ form.pointCode }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          标签
        </template>
        11111
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          会话保持
        </template>
        否
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          标签选择器
        </template>
        11111
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建人
        </template>
        admin@cpaas.io
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建时间
        </template>
        {{ form.createtime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          更新时间
        </template>
        2022-10-09 15:07:54
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { detail } from '@/api/network/service'
export default {
  name: 'ServiceDetail',
  data() {
    return {
      form: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      detail(id).then(response => {
        this.form = response.data
        console.log(response.data)
        // set tagsview title
        // this.setTagsViewTitle()

        // set page title
        // this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.mark{
  font-size: 10px;
  color: grey;
}
</style>

