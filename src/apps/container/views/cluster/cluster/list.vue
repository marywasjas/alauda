<template>
  <div class="oam-container">
    <div class="oam-main">
      <!-- 1 搜索框 和 按钮-->
      <div class="card__header">
        <span>
          <el-button type="primary">创建集群</el-button>
          <el-button>接入集群</el-button>
        </span>

        <div class="flex-center">
          <el-input
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
          >
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-button icon="el-icon-refresh-right" size="small" />
          <el-button icon="el-icon-s-tools" size="small" />
        </div>
      </div>

      <!-- 2 表格 和 分页器-->
      <div class="card__content">
        <el-table
          :data="tableData.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
          class="margin-top"
        >
          <!-- <el-table-column fixed prop="date" label="名称" >
          </el-table-column> -->
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
            :sortable="col.sortable"
            :width="col.width"
            :fixed="col.fixed"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handelDetails(scope.row)">
                  {{ scope.row[col.id] }}
                </span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown>
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      command="update"
                      @click.native="handleCapacityExpansion(scope.row)"
                    >扩容</el-dropdown-item>
                    <el-dropdown-item
                      command="delete"
                      @click.native="handleUpdate(scope.row)"
                    >更新</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import { alarmColumnList, alarmList } from "../const";
// import axios from "axios";
import {
  getAlarmList,
  getExpandList
} from '../../../../../../mock/alarm/axiosApi'
// import SetSilenceDialog from './components/SetSilenceDialog.vue'
import LineAlert from '@/apps/container/views/components/LineAlert'
import { tableData, tableColumnList } from '../constant'

export default {
  name: 'AlarmList',
  // components: { SetSilenceDialog },
  data() {
    return {
      tableData,
      tableColumnList,
      formInline: {
        tag: '',
        name: ''
      },
      tagOptions: [
        {
          value: '标签1',
          label: '标签1'
        },
        {
          value: '标签2',
          label: '标签2'
        }
      ],
      content:
        '持久卷声明（PVC） 是用户使用存储资源的声明。平台会根据声明中的大小和访问模式静态匹配或动态创建不同属性的持久卷（PV）。选择动态创建方式时，平台基于管理员提供的存储类（StorageClass）来按需创建持久卷。'
    }
  },

  created() {
    // 获取列表数据
    // this.getList();
  },

  methods: {
    // 搜索
    onSearch() {
      console.log(this.formInline)
    },
    handelCreate() {
      this.$router.push({
        name: 'PersistentVolumeCreateUpdate',
        query: {
          type: 'add'
        }
      })
    },
    handelDetails(row) {
      this.$router.push({
        name: 'PersistentVolumeDetail',
        query: {
          name: row.name
        }
      })
    },
    handleCapacityExpansion() {},
    handleUpdate(row) {
      this.$router.push({
        name: 'PersistentVolumeCreateUpdate',
        query: {
          type: 'edit'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.oam-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-content {
    margin: 15px 20px 0px 0px;
    .filter-row {
      display: flex;
      .filter-item {
        flex: 1;
        margin-bottom: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .oam-main {
    background: #fff;
    padding: 20px;
  }
  .operation-cell {
    i {
      font-size: $font-size-20;
      color: $color-primary;
      cursor: pointer;
    }
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
  }
  .bg-color {
    background: #fff;
  }
}
// ::v-deep .el-table td.el-table__cell {
//   border-bottom: 0px solid #dfe6ec;
// }
::v-deep .el-table--border .el-table__cell {
  border-right: 0px solid #dfe6ec;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px solid #dfe6ec;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: #fff !important;
}
</style>
