<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>: &nbsp;&nbsp;
            <span v-if="item.label=='标签'">
              <span v-if="tagSelector.length>0">
                <el-tag v-for="el in tagSelector" :key="el.key" type="info" class="margin-right10">
                  {{ el.value }}
                </el-tag>
              </span>
              <span v-else>-</span>
              <span @click="editTag">
                <i class="el-icon-edit cursor-pointer margin-left10" />
              </span>
            </span>
            <span v-else>
              <i :class="item.frontIcon" />
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>规则</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="ruleData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in ruleColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'url'" class="cursor-pointer">
                {{ scope.row[col.id] }}
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span>证书</span>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="certiData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in certiColumnList"
            :key="col.id"
            :label="col.label"
          >
            <template slot-scope="scope">
              {{ scope.row[col.id] }}
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <el-dialog
      title="更新标签"
      :visible.sync="tagVisible"
      width="840px"
      :close-on-click-modal="false"
      :before-close="closeTagDialog"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-suffix=":"
        >
          <table border="0" style="width:95%">
            <thead>
              <tr class="headerStyle">
                <th>
                  <div class="cell">键</div>
                </th>
                <th>
                  <div class="cell">值</div>
                </th>
                <th>
                  <div class="cell">操作</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(tag, index) in ruleForm.editTags"
                :key="tag.id"
              >
                <td>
                  <el-form-item
                    label=""
                    :prop="'editTags.' + index + '.key'"
                    :rules="{
                      required: true,
                      message: '键不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="tag.key"
                      placeholder="键"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'editTags.' + index + '.value'"
                    :rules="{
                      required: true,
                      message: '值不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="tag.value"
                      placeholder="值"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-button
                    icon="el-icon-remove-outline"
                    class="
                            cursor-pointer
                            margin-left10 margin-right10
                          "
                    type="text"
                    @click="handleTagDelete(tag, index)"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="cursor-pointer text-center hover-div" @click="handleTagAdd">
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTagDialog">更新</el-button>
        <el-button @click="closeTagDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ruleColumnList, ruleData, certiColumnList, certiData } from './constant/index'
import { nanoid } from 'nanoid'

export default {
  name: 'BaseInfo',
  props: {},
  data() {
    return {
      baseInfoData: [
        {
          label: '显示名称',
          value: 'hhh'
        },
        {
          label: '所属应用',
          value: ''
        },
        {
          label: '标签',
          value: []
        },
        {
          label: '所用负载均衡',
          value: '无'
        },
        {
          label: '创建人',
          value: 'admin@cpaas.io'
        },
        {
          label: '创建时间',
          value: '2022-09-28 16:06:17'
        },
        {
          label: '更新时间',
          value: '2022-09-28 16:05:55'
        }
      ],
      configData: [
        {
          label: '虚拟 IP',
          value: '10.4.52.209'
        },
        {
          label: '会话保持',
          value: '否'
        },
        {
          label: 'lb',
          value: '111111'
        }
      ],
      filterContainer: '',
      ruleColumnList,
      ruleData,
      certiColumnList,
      certiData,
      tagVisible: false,
      ruleForm: {
        editTags: []
      },
      tagSelector: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleRefresh() {
      console.log('resfresh container list')
    },
    handleFilter() {
      console.log('search container')
    },
    editTag() {
      this.ruleForm.editTags = JSON.parse(JSON.stringify(this.tagSelector))
      this.tagVisible = true
    },
    handleTagDelete(item, index) {
      this.ruleForm.editTags.splice(this.ruleForm.editTags.indexOf(item), 1)
    },
    handleTagAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.ruleForm.editTags.push(obj)
    },
    submitTagDialog() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.tagSelector = this.ruleForm.editTags
          this.tagVisible = false
        } else {
          return false
        }
      })
    },
    closeTagDialog() {
      this.tagVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
}
.headerStyle {
  height: 36px;
}
.el-form-item {
  margin-bottom: 0px;
  line-height: 36px;
}
.hover-div{
  height: 36px;
  line-height: 36px;
}
.hover-div:hover{
  background:$color-primary-rgba1;
}
</style>
