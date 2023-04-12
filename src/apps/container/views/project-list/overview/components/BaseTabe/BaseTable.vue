<template>
  <div class="custom-table">
    <el-table
      ref="tableRef"
      :data="data"
      :row-class-name="rowClassName"
      :max-height="maxHeight"
      :highlight-current-row="openRowSelect"
      :row-key="rowsKey"
      :stripe="stripe"
      :border="border"
      @row-click="rowClick"
    >
      <!-- @selection-change="selectionChange" -->
      <slot name="column" />
      <el-table-column
        v-if="showSelection"
        :reserve-selection="true"
        type="selection"
        width="55"
      />
      <template v-for="item in columnList">
        <el-table-column
          v-if="item.slot"
          :key="item.id"
          :label="item.label"
          :property="item.id"
          :align="item.align || 'center'"
          :fixed="item.fixed"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot
              :name="item.slot"
              :column="item"
              :data="scope.row"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <TableColumn v-else :key="item.id" :column-item="item" />
      </template>
      <slot name="options" />
      <template slot="empty">
        <slot name="empty" />
      </template>
    </el-table>
    <div v-if="showPage" class="mt16 text-right">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import TableColumn from './TableColumn.vue'
export default {
  components: {
    TableColumn
  },
  props: {
    columnList: {}, // 列配置，可以传入配置，也可以同slot传入
    data: {}, // 表格数据
    tableOption: {}, // 表格配置，参考elementui-table
    pageOption: {}, // 分液配制，参考elementui-pager
    total: {
      // 列表总数
      default: 0
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    currentPage: {
      // 当前页
      default: 1
    },
    currentChange: {
      // 页码变化监听函数
      type: Function
    },
    rowClick: {
      // 行点击事件
      default: () => function() {}
    },
    rowClassName: {
      // 行样式名
      default: () => function() {}
    },
    showPage: {
      // 是否显示分页
      default: true
    },
    maxHeight: {}, // 最大高度
    showSelection: {
      // 是否显示多选框
      type: Boolean,
      default: false
    },
    rowsKey: {
      // 行KEY，唯一值
      type: String
    },
    // selectionChange: {}, // checkbox改变时处理函数
    openRowSelect: {
      // 开启行选择
      type: Boolean,
      default: false
    }
  },
  created() {
    this.selectRows = [] // 记录选择的所有行
    this.currentSelectLen = 0 // 记录当前页选择的行
  }
}
</script>

<style lang="scss">
.el-table__body tr.current-row > td {
  background-color: #c6e2ff !important;
}
</style>
