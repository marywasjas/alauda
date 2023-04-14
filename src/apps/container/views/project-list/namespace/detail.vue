<template>
  <div class="detail-container">
    <div class="detail-header">
      <tab-header
        :name="name"
        :desc="desc"
        :tab-list="tabList"
        :active-name="activeName"
        @changeActive="changeActive"
      >
        <template v-slot:headerRight>
          <el-dropdown trigger="click">
            <el-button type="primary" class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleResource"
                >更新资源配额</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleLimit"
                >更新容器限额</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleRemove"
                >移除命名空间</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleDelete">
                <span style="color: red"> 删除命名空间 </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />

    <el-dialog
      title="更新资源配额"
      @close="resourceVisible = false"
      :visible.sync="resourceVisible"
      width="60%"
    >
      <el-form
        ref="resourceForm"
        :model="resourceForm"
        :rules="resourceRules"
        label-width="135px"
      >
        <el-form-item label="命名空间名称">
          <el-col :span="18">
            <span>{{ resource }}</span>
          </el-col>
        </el-form-item>

        <el-form-item label="CPU">
          <el-col :span="18">
            <el-input v-model="resourceForm.cpu">
              <template slot="append">核</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 不限制 </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="内存">
          <el-col :span="18">
            <el-input v-model="resourceForm.memory">
              <template slot="append">Gi</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 不限制 </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="存储">
          <el-col :span="18">
            <el-input v-model="resourceForm.storage">
              <template slot="append">Gi</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 不限制 </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="Pods 数">
          <el-col :span="18">
            <el-input v-model="resourceForm.pods"> </el-input>
          </el-col>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 最大值 1000 </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="PVC 数">
          <el-col :span="18">
            <el-input v-model="resourceForm.pvc"> </el-input>
          </el-col>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item> 不限制 </el-descriptions-item>
        </el-descriptions>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">更新</el-button>
        <el-button @click="resourceVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="更新容器限额"
      @close="limitVisible = false"
      :visible.sync="limitVisible"
      width="60%"
    >
      <el-form
        ref="limitForm"
        :model="limitForm"
        :rules="limitRules"
        label-width="135px"
      >
        <!-- <el-form-item label="CPU" prop="cpu">
            <el-col :span="10">
              <el-input v-model="limitForm.cpu">
                <template slot="append">m</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-col>
            <el-col :span="10" style="margin-left: 10px">
              <el-input v-model="limitForm.cpu">
                <template slot="append">m</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-col>
          </el-form-item> -->

        <!-- <el-form-item label="内存" prop="memory">
            <el-col :span="10">
              <el-input v-model="limitForm.memory">
                <template slot="append">Mi</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-col>
            <el-col :span="10" style="margin-left: 10px">
              <el-input v-model="limitForm.memory">
                <template slot="append">Mi</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-col>
          </el-form-item> -->

        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item label="CPU" prop="cpu">
              <el-input v-model="limitForm.cpuMax">
                <template slot="append">m</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="13" style="margin-left: -145px">
            <el-form-item prop="clusterPort">
              <el-input v-model="limitForm.cpuDefault">
                <template slot="append">m</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item label="内存" prop="memory">
              <el-input v-model="limitForm.memoryMax">
                <template slot="append">m</template>
                <template slot="prepend">最大值</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="13" style="margin-left: -145px">
            <el-form-item prop="clusterPort">
              <el-input v-model="limitForm.memoryDefault">
                <template slot="append">m</template>
                <template slot="prepend">默认值</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">更新</el-button>
        <el-button @click="limitVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="dialogRemoveVisible = false"
      :visible.sync="dialogRemoveVisible"
      width="45%"
    >
      <div class="el-dialog-div">
        <span
          style="
            text-align: center;
            display: block;
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
          "
        >
          <i class="el-icon-warning" style="color: orange" />
          {{ `确定从项目中移除命名空间 ${this.name} 吗？` }}
        </span>
        <br />
        <span style="text-align: center; display: block">
          从项目中移除，不会删除命名空间及其内部资源
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_remove">移除</el-button>
        <el-button @click="dialogRemoveVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="deleteProjectVisible = false"
      :visible.sync="deleteProjectVisible"
      width="60%"
    >
      <div slot="title" class="header-title">
        <span style="font-size: 22px; line-height: 24px; font-weight: bold">
          <i class="el-icon-warning" style="color: red" />
          删除命名空间
        </span>
      </div>

      <div style="margin-top: 10px">
        <div style="margin-bottom: 15px">
          {{
            `确定删除命名空间"${this.name}"吗？删除后，命名空间下所有资源将被删除。 `
          }}
        </div>

        请输入 <span style="color: red">{{ this.name }}</span> 确定删除
      </div>

      <el-input v-model="command"> </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handle_delete">删除</el-button>
        <el-button @click="deleteProjectVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Node from "./components/Node/Node.vue";

export default {
  name: "ClusterDetail",
  components: {
    TabHeader,
    BaseInfo,
    Node,
  },
  data() {
    return {
      command: "",
      name: "",
      desc: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tabList: [
        {
          label: "基本信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "命名空间成员",
          name: "node",
          com: "Node",
        },
      ],
      activeName: "",
      resourceVisible: false,
      resourceForm: {
        cpu: "",
        memory: "",
        storage: "",
        pods: "",
        pvc: "",
      },
      resourceRules: {},
      resource: "",

      limitForm: {
        cpuMax: "",
        memoryMax: "",
        cpuDefault: "",
        memoryDefault: "",
      },
      limitRules: {
        cpu: [{ required: true, message: "cpu is required", trigger: "blur" }],
        memory: [
          { required: true, message: "memory is required", trigger: "blur" },
        ],
      },
      limitVisible: false,

      dialogRemoveVisible: false,

      deleteProjectVisible: false,
    };
  },
  computed: {
    comName: function () {
      if (!this.activeName) return "";
      const item = this.tabList.filter((el) => el.name === this.activeName);
      return item[0].com;
    },
  },
  created() {
    this.name = this.$route.query.name;
    this.desc = this.$route.query.desc;
    this.activeName = this.tabList[0].name;
  },
  methods: {
    changeActive(value) {
      this.activeName = value;
    },

    handleDelete() {
      this.deleteProjectVisible = true;
    },
    handle_delete() {},

    handleResource() {
      this.resourceVisible = true;
      this.resource = this.$route.query.name;
    },
    handleUpdate() {},

    handleLimit() {
      this.limitVisible = true;
    },
    handle_remove() {},
    handleRemove() {
      this.dialogRemoveVisible = true;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  min-height: 100%;
  padding: 20px;
  background-color: $background-color;
}
</style>