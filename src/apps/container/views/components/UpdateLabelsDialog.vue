<template>
  <el-dialog title="更新标签" :visible="updateLabelsVisible" width="50%" @close="closeUpdateLabelsDialog">
    <table border="0" style="width: 100%">
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
        <tr v-for="(domain, index) in labelsDialogForm" :key="domain.id">
          <td>
            <el-input v-model="domain.key" placeholder="键" />
          </td>
          <td>
            <el-input v-model="domain.value" placeholder="值" />
          </td>
          <td class="text-center">
            <el-button
              icon="el-icon-remove-outline"
              class="cursor-pointer margin-left10 margin-right10"
              type="text"
              @click="handleUpdateLabelsDelete(domain, index)"
            />
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="cursor-pointer text-center hover-div" @click="handleUpdateLabelsAdd">
              <i class="el-icon-circle-plus-outline" />
              添加
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeUpdateLabelsDialog">更新</el-button>
      <el-button @click="closeUpdateLabelsDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'UpdateLabelsDialog',
  props: {
    updateLabelsVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      labelsDialogForm: [
        {
          key: 'app',
          value: 'chaosbale'
        },
        {
          key: 'name',
          value: 'chaosbale'
        }
      ]
    }
  },
  methods: {
    closeUpdateLabelsDialog() {
      this.$emit('update:updateLabelsVisible', false)
    },
    // 删除弹窗内 匹配标签
    handleUpdateLabelsDelete(item, index) {
      this.labelsDialogForm.splice(this.labelsDialogForm.indexOf(item), 1)
    },
    // 添加弹窗内 匹配标签
    handleUpdateLabelsAdd() {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }
      this.labelsDialogForm.push(obj)
    }
  }
}
</script>

<style lang="scss" scoped></style>
