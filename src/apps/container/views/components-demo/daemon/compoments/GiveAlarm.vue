<template>
  <div class="alarm-container">
    <div class="alarm-main">
      <div class="card__header">
        <el-dropdown split-button type="primary" trigger="click" @command="handleClick" @click="openDialog">
          创建告警策略
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>模版创建告警策略 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="flex-center">
          <el-input v-model="formInline.name" placeholder="按名称模糊搜索" size="small" class="margin-right10">
            <el-button slot="append" icon="el-icon-search" @click="onSearch" />
          </el-input>
          <el-popover placement="bottom" width="50" trigger="click">
            <el-checkbox-group v-model="checkedCities" style="margin-top: 12px" @change="changes">
              <el-checkbox
                v-for="item in checkboxList"
                :key="item.prop"
                :label="item"
                :checked="item.checked"
                :disabled="item.disabled"
                style="margin-bottom: 10px; width: 50"
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
            <el-button slot="reference" icon="el-icon-s-tools" size="small" />
          </el-popover>
        </div>
      </div>

      <div class="card__content">
        <el-table :data="tableData" style="width: 100%" header-row-class-name="headerStyle" class="margin-top">
          <el-table-column v-for="(item, index) in listData" :key="index" :prop="item.prop" :label="item.label" />
          <el-table-column label="" align="center" width="80" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <div class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="handleEdit(row.id)">更新</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GiveAlarm',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        name: ''
      },
      formVisible: false,
      shows: false,
      checkedCities: [],
      // 下拉框数据
      checkboxList: [
        {
          prop: 'name',
          label: '名称',
          // 控制是否选中
          checked: true,
          // 控制是否禁用
          disabled: true
        },
        {
          prop: 'notification_policy',
          label: '通知策略',
          checked: true,
          disabled: false
        },
        {
          prop: 'alarm_state',
          label: '告警状态',
          checked: true,
          disabled: true
        },
        {
          prop: 'creator',
          label: '创建人',
          checked: true,
          disabled: false
        },
        {
          prop: 'create_time',
          label: '创建时间',
          checked: false,
          disabled: false
        },
        {
          prop: 'operation',
          label: '操作',
          checked: true,
          disabled: true
        }
      ],
      // 表头
      List: [
        {
          prop: 'name',
          label: '名称',
          show: true
        },
        {
          prop: 'notification_policy',
          label: '通知策略',
          show: true
        },
        {
          prop: 'alarm_state',
          label: '告警状态',
          show: true
        },
        {
          prop: 'creator',
          label: '创建人',
          show: true
        },
        {
          prop: 'create_time',
          label: '创建时间',
          show: false
        }
      ],
      // 表格数据
      tableData: [
        {
          name: 'ddcddcds',
          notification_policy: 'cdsdsdada',
          alarm_state: 'cfdsdsds',
          creator: 'dcdaa',
          create_time: '2016-05-02'
        },
        {
          name: 'ddcddcds',
          notification_policy: 'cdsdsdada',
          alarm_state: 'cfdsdsds',
          creator: 'dcdaa',
          create_time: '2016-05-02'
        }
      ]
    }
  },
  computed: {
    listData: function() {
      return this.List.filter(item => {
        return item.show === true
      })
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    handleClick() {},
    detail(link_name) {
      this.$router.push({
        path: '/detail',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    },

    openDialog() {
      this.formVisible = true
    },
    closeFormDialog() {
      this.formVisible = false
    },
    changes(e, index) {
      // console.log(this.checkedCities)
      // console.log('e: ', e, index)
      const result = []
      for (let i = 0; i < this.List.length; i++) {
        const obj = this.List[i]
        const num = obj.prop
        let isExist = false
        for (let j = 0; j < e.length; j++) {
          const aj = e[j]
          const n = aj.prop
          if (n === num) {
            isExist = true
            break
          }
        }
        if (!isExist) {
          result.push(obj)
        }
      }
      // console.log(result)
      this.List = this.List.map(item => {
        item.show = true
        result.forEach(item2 => {
          if (item.prop === item2.prop) {
            item.show = false
          }
        })
        return item
      })
      // console.log(this.List)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-container {
  margin-top: 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .alarm-main {
    background: #fff;
    padding: 20px;
  }

  .link_name {
    color: #1890ff;
  }
  .el-icon-success {
    color: #1890ff;
  }
  .el-icon-more {
    color: #1890ff;
  }
}
</style>
