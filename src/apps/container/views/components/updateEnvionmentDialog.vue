<template>
  <el-dialog title="更新环境变量" :visible="envionmentVisible" width="60%" @close="closeEnvionment">
    <div class="configTitle">artifact-controller</div>
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
        <tr v-for="(domain, index) in envionmentForm" :key="domain.id">
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
              @click="handleDelete('envionmentForm', domain, index)"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div class="cursor-pointer text-center hover-div" @click="handleAdd('environmentVariables')">
              <i class="el-icon-circle-plus-outline" />
              添加
            </div>
          </td>
          <td>
            <div class="cursor-pointer text-center hover-div">
              <i class="el-icon-circle-plus-outline" />
              引用
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeEnvionment">取 消</el-button>
      <el-button type="primary" @click="closeEnvionment">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'UpdateEnvionmentDialog',
  props: {
    envionmentVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      envionmentForm: [
        {
          id: nanoid(),
          key: '',
          value: ''
        }
      ]
    }
  },
  methods: {
    closeEnvionment() {
      this.$emit('update:envionmentVisible', false)
    },
    handleDelete(item, index) {
      this.envionmentForm.splice(index, 1)
    },
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        key: '',
        value: ''
      }

      this.envionmentForm.push(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.configTitle {
  padding: 0 10px;
  margin-bottom: 20px;
  border-left: 3px solid #1890ff;
}
.configContainer {
  width: 100%;
  padding-left: 50px;
}
</style>
