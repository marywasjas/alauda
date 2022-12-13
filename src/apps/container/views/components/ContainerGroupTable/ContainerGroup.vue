<template>
  <div class="container-group">
    <BaseCard>
      <header>
        <div class="card-title right-header">
          <span v-if="title">{{ title }}</span>
          <span v-else />
          <div>
            <el-input
              v-model="filterName"
              placeholder="请输入名称或容器组 IP"
              size="small"
              style="width: 300px"
            >
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
            <el-button
              icon="el-icon-refresh-right"
              size="small"
              class="margin-left10"
            />
          </div>
        </div>
      </header>
      <section>
        <el-table
          class="margin-top"
          :data="tableData.data"
          style="width: 100%"
          height="100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in tableColumnList"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col['show-overflow-tooltip']"
          >
            <template slot-scope="scope">
              <div v-if="col.id === 'name'" class="cursor-pointer">
                <span @click="handelDetails(scope.row)">{{
                  scope.row[col.id]
                }}</span>
              </div>
              <div v-else-if="col.id === 'resource'">
                <p class="margin0">
                  <i class="el-icon-cpu primary2-text" />
                  {{ scope.row.cpu }}{{ scope.row.cpuCompony }}
                </p>
                <p class="margin0">
                  <i class="el-icon-bank-card primary-text" />
                  {{ scope.row.memory }}{{ scope.row.memoryCompony }}
                </p>
              </div>
              <div v-else-if="col.id === 'status'" class="status-cell">
                <i
                  v-if="scope.row.status === 'running'"
                  class="el-icon-video-play running"
                />
                <i
                  v-else-if="scope.row.status === 'stop'"
                  class="el-icon-video-pause stop"
                />
                <i
                  v-else-if="scope.row.status === 'pending'"
                  class="el-icon-loading pending"
                />
                <span>{{ scope.row.statusText }}</span>
              </div>
              <div v-else-if="col.id === 'operation'" class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="update">
                      <el-tooltip
                        placement="left"
                        effect="light"
                        :visible-arrow="false"
                      >
                        <div
                          slot="content"
                          style="display: flex; flex-direction: column"
                        >
                          <el-button
                            type="text"
                            style="padding: 5px 0"
                            @click="handelLog('nginx')"
                          >nginx</el-button>
                          <el-button
                            type="text"
                            style="padding: 5px 0"
                            @click="handelLog('nginx')"
                          >nginx2</el-button>
                        </div>
                        <el-button
                          type="text"
                        >查看日志<i
                          class="el-icon-arrow-right"
                        /></el-button>
                      </el-tooltip>
                    </el-dropdown-item>
                    <el-dropdown-item command="update">
                      <el-tooltip
                        placement="left"
                        effect="light"
                        :visible-arrow="false"
                      >
                        <div
                          slot="content"
                          style="display: flex; flex-direction: column"
                        >
                          <el-button
                            type="text"
                            style="padding: 5px 0"
                            @click="handelExec('nginx')"
                          >nginx</el-button>
                          <el-button
                            type="text"
                            style="padding: 5px 0"
                            @click="handelExec('nginx')"
                          >nginx2</el-button>
                        </div>
                        <el-button
                          type="text"
                        >EXEC<i
                          class="el-icon-arrow-right"
                        /></el-button>
                      </el-tooltip>
                    </el-dropdown-item>
                    <el-dropdown-item command="delete">
                      <el-button
                        type="text"
                        @click.native="handelDelete(scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                {{ scope.row[col.id] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </BaseCard>
    <execute-command-dialog
      :form-visible="formVisible"
      title="执行命令"
      @closeFormDialog="closeFormDialog"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import { tableColumnList, tableData } from './constant/index'
import ExecuteCommandDialog from '@/apps/container/views/components/ExecuteCommandDialog'
export default {
  name: 'ContainerGroup',
  components: { ExecuteCommandDialog },
  props: {
    title: {
      type: String,
      default: ''
    },
    logBackName: {
      type: String,
      default: 'ContainerGroupDetail'
    }
  },
  data() {
    return {
      tableColumnList,
      tableData,
      filterName: '',
      formVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handelDetails(row) {
      this.$router.push({
        name: 'ContainerGroupDetail',
        query: {
          name: row.name
        }
      })
    },
    handelLog(name) {
      this.$router.push({
        name: this.logBackName,
        query: {
          name: name,
          activeName: 'journal'
        }
      })
    },
    closeFormDialog() {
      this.formVisible = false
    },
    submitForm(form) {
      this.formVisible = false
    },
    handelExec(name) {
      this.formVisible = true
    },
    handelDelete(row) {
      const returnMsgList = [
        `确定删除容器组${row.name}吗？`,
        '删除后，系统会根据当前配置情况进行容器组调度或重建。'
      ]
      const newData = []; const h = this.$createElement
      for (const i in returnMsgList) {
        newData.push(h('p', null, returnMsgList[i]))
      }
      this.$confirm(h('div', null, newData), '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container-group {
  margin-top: 20px;
}
</style>
