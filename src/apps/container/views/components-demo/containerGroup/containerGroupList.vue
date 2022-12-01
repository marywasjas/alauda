<template>
  <div class="group-container">
    <LineAlert :content="content" />
    <div class="container-group">
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span />
            <div>
              <el-input v-model="filterName" placeholder="请输入名称或容器组 IP" size="small" style="width: 300px">
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
              <el-button icon="el-icon-refresh-right" size="small" class="margin-left10" />
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
                <div v-if="col.id === 'name'" class="cursor-pointer" @click="detail(scope.row.name)">
                  {{ scope.row[col.id] }}
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
                  <i v-if="scope.row.status === 'running'" class="el-icon-video-play running" />
                  <i v-else-if="scope.row.status === 'stop'" class="el-icon-video-pause stop" />
                  <i v-else-if="scope.row.status === 'pending'" class="el-icon-loading pending" />
                  <span>{{ scope.row.statusText }}</span>
                </div>
                <div v-else-if="col.id === 'operation'" class="operation-cell">
                  <el-dropdown>
                    <i class="el-icon-more" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="update">
                        <el-tooltip placement="left" effect="light" :visible-arrow="false">
                          <div slot="content">
                            <el-button type="text">nginx</el-button>
                          </div>
                          <el-button type="text">查看日志<i class="el-icon-arrow-right" /></el-button>
                        </el-tooltip>
                      </el-dropdown-item>
                      <el-dropdown-item command="update">
                        <el-tooltip placement="left" effect="light" :visible-arrow="false">
                          <div slot="content">
                            <el-button type="text" disabled>nginx</el-button>
                          </div>
                          <el-button type="text">EXEC<i class="el-icon-arrow-right" /></el-button>
                        </el-tooltip>
                      </el-dropdown-item>
                      <el-dropdown-item command="delete">
                        <el-button type="text">删除</el-button>
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
    </div>
  </div>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert/index.vue'
import { tableColumnList, tableData } from '@/apps/container/views/components/ContainerGroupTable/constant/index'
export default {
  name: 'ContainerGroupList',
  components: { LineAlert },
  props: {},
  data() {
    return {
      content: '容器组即 Kubernetes Pod，是在 Kubernetes 中可以创建和管理的最小计算单元。',
      formInline: {
        name: ''
      },
      filterName: '',
      tableColumnList,
      tableData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {},
    detail(name) {
      console.log(name)
      this.$router.push({
        name: 'ContainerGroupDetail',
        query: {
          name: name // 传递的参数: 键值对
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
}
</style>
