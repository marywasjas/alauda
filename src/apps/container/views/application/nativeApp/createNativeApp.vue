<template>
  <div class="createNativeApp-container">
    <div class="scroll-div">
      <BaseCard>
        <header>
          <div class="card-title left-header">
            <span>原生应用</span>
          </div>
        </header>
        <section>
          <el-form
            ref="infoRuleForm"
            class="margin-top"
            :model="infoRuleForm"
            :rules="infoRuleFormRules"
            label-width="100px"
          >
            <el-form-item label="名称" prop="name">
              <el-input
                v-model="infoRuleForm.name"
                placeholder="以 a-z、0-9 开头结尾，支持使用 a-z、0-9、.、-，最多 40 个字符"
              />
            </el-form-item>
            <el-form-item label="显示名称" prop="showName">
              <el-input v-model="infoRuleForm.showName" />
            </el-form-item>
          </el-form>
        </section>
      </BaseCard>
      <computer-components-form />
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span>内部路由</span>
            <el-button @click="addInterRoute">添加内部路由</el-button>
          </div>
        </header>
        <section>
          <div v-if="descriptionsList.length>0">
            <el-descriptions
              v-for="(descriptions,index) in descriptionsList"
              :key="descriptions.id"
              class="margin-top10 descriptions-div"
              title=""
              :column="1"
            >
              <template slot="extra">
                <i class="el-icon-edit cursor-pointer margin-right10" @click="handleUpdateInterRule(descriptions)" />
                <i class="el-icon-remove-outline cursor-pointer" @click="handleInterRuleDelete(index)" />
              </template>
              <el-descriptions-item
                v-for="item in descriptions.descriptionsItems"
                :key="item.label"
                :label="item.label"
              >
                <div v-if="item.type !== 'table'" style="width:100%;">{{ item.value }}</div>
                <div v-else style="width:100%;">
                  <el-table
                    :data="item.table.tableData.data"
                    style="width: 100%"
                    header-row-class-name="headerStyle"
                  >
                    <el-table-column
                      v-for="col in item.table.tableColumnList"
                      :key="col.label"
                      :label="col.label"
                    >
                      <template slot-scope="scope">
                        <div>
                          {{ scope.row[col.id] }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div v-else class="empty-div">
            无内部路由
          </div>
        </section>
      </BaseCard>
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span>入站规则</span>
            <el-button @click="addInboundRule">添加入站规则</el-button>
          </div>
        </header>
        <section>
          <div v-if="descriptionsList2.length>0">
            <el-descriptions
              v-for="(descriptions,index) in descriptionsList2"
              :key="descriptions.id"
              class="margin-top10 descriptions-div"
              title=""
              :column="1"
            >
              <template slot="extra">
                <i class="el-icon-edit cursor-pointer margin-right10" @click="handleUpdateInboundRule(descriptions)" />
                <i class="el-icon-remove-outline cursor-pointer" @click="handleInboundRuleDelete(index)" />
              </template>
              <el-descriptions-item
                v-for="item in descriptions.descriptionsItems"
                :key="item.label"
                :label="item.label"
              >
                <div v-if="item.type !== 'table'" style="width:100%;">{{ item.value }}</div>
                <div v-else style="width:100%;">
                  <el-table
                    :data="item.table.tableData.data"
                    style="width: 100%"
                    header-row-class-name="headerStyle"
                  >
                    <el-table-column
                      v-for="col in item.table.tableColumnList"
                      :key="col.label"
                      :label="col.label"
                    >
                      <template slot-scope="scope">
                        <div>
                          {{ scope.row[col.id] }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div v-else class="empty-div">
            无入站规则
          </div>
        </section>
      </BaseCard>
    </div>
    <div class="fixed-div">
      <div>
        <el-button>
          <i class="el-icon-view" />
          预览</el-button>
        <el-button>添加计算机组件</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          class="margin-left10"
          @click="submitCreate"
        >创建</el-button>
        <el-button @click="cancelCreate">取消</el-button>
      </div>
    </div>
    <add-internal-route :form-visible="interRouteVisible" @closeFormDialog="closeInterRouteFormDialog" />
    <add-inbound-rule :form-visible="inboundRuleVisible" @closeFormDialog="closeInboundRuleFormDialog" />
  </div>
</template>

<script>
import ComputerComponentsForm from '@/apps/container/views/components/ComputerComponentsForm/ComputerComponentsForm.vue'
import AddInternalRoute from '@/apps/container/views/components/AddInternalRoute'
import AddInboundRule from '@/apps/container/views/components/AddInboundRule'
import { descriptionsTableData } from './constant/index'

export default {
  name: 'CreateNativeApp',
  components: { ComputerComponentsForm, AddInternalRoute, AddInboundRule },
  props: {},
  data() {
    return {
      infoRuleForm: {
        name: 'test-box',
        showName: ''
      },
      infoRuleFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 0,
            max: 40,
            message: '长度在 0 到 40 个字符',
            trigger: 'blur'
          }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      interRouteVisible: false,
      descriptionsList: [
        {
          id: '1',
          descriptionsItems: [
            {
              label: '名称',
              value: 'nginx-nginx'
            },
            {
              label: '虚拟 IP',
              value: '是'
            },
            {
              label: '外网访问',
              value: '否'
            },
            {
              label: '会话保持',
              value: '否'
            },
            {
              label: '端口',
              value: '',
              type: 'table',
              table: {
                tableColumnList: [
                  {
                    id: 'name',
                    label: '端口名称'
                  },
                  {
                    id: 'mirror',
                    label: '协议'
                  },
                  {
                    id: 'name',
                    label: '服务端口'
                  },
                  {
                    id: 'name',
                    label: '容器端口'
                  }
                ],
                tableData: descriptionsTableData
              }
            }
          ]
        }
      ],
      descriptionsList2: [
        {
          id: '1',
          descriptionsItems: [
            {
              label: '名称',
              value: 'nginx-nginx'
            },
            {
              label: '规则',
              value: '',
              type: 'table',
              table: {
                tableColumnList: [
                  {
                    id: 'name',
                    label: '地址'
                  },
                  {
                    id: 'mirror',
                    label: '内部路由'
                  },
                  {
                    id: 'name',
                    label: '端口'
                  }
                ],
                tableData: descriptionsTableData
              }
            }
          ]
        }
      ],
      inboundRuleVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1)
    },
    // 更新
    submitCreate() {
      this.$refs['infoRuleForm'].validate((valid) => {
        if (valid) {
          console.log(this.infoRuleForm)
        } else {
          return false
        }
      })
    },
    addInterRoute() {
      this.interRouteVisible = true
    },
    addInboundRule() {
      this.inboundRuleVisible = true
    },
    closeInterRouteFormDialog() {
      this.interRouteVisible = false
    },
    closeInboundRuleFormDialog() {
      this.inboundRuleVisible = false
    },
    handleInterRuleDelete(index) {
      this.descriptionsList.splice(index, 1)
    },
    handleInboundRuleDelete(index) {
      this.descriptionsList2.splice(index, 1)
    },
    handleUpdateInboundRule(item) {
      console.log(item)
      this.inboundRuleVisible = true
    },
    handleUpdateInterRule(item) {
      console.log(item)
      this.interRouteVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.createNativeApp-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 86px;
  }
  section {
    border-top: 1px solid $border-color-two;
    margin-top: 10px;
  }
  .fixed-div {
    width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
