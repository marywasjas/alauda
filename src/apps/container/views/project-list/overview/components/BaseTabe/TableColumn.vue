<template>
  <el-table-column
    v-if="columnItem.children"
    :align="columnItem.align || 'center'"
    :label="columnItem.label"
  >
    <template v-for="item in columnItem.children">
      <TableColumn :key="item.id" :column-item="item" />
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :align="columnItem.align || 'center'"
    :fixed="columnItem.fixed"
    :formatter="columnItem.formatter"
    :label="columnItem.label"
    :property="columnItem.id"
    :show-overflow-tooltip="getShowOverflowTooltip(columnItem.showOverflowTooltip)"
    :type="columnItem.type"
    :width="getColumnWidth(columnItem)"
    :sortable="columnItem.sortable"
    :sort-method="columnItem.sortMethod"
  />
</template>

<script>

export default {
  name: 'TableColumn',
  props: {
    columnItem: {
      type: Object,
      default: () => ({})
    }

  },
  methods: {
    getShowOverflowTooltip(showOverflowTooltip) {
      return typeof showOverflowTooltip === 'undefined' ? true : showOverflowTooltip
    },
    getColumnWidth(item) {
      switch (item.type) {
        case 'index':
          return 80
        default:
          return item.width
      }
    }
  }
}
</script>

<style scoped>

</style>
