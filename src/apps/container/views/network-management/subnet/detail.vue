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
              <el-dropdown-item @click.native="handleGateway"
                >更新网关</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleNamespace"
                >更新命名空间</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleWhitelist"
                >更新白名单</el-dropdown-item
              >
              <el-dropdown-item @click.native="handleExpandsubnet"
                >扩容子网</el-dropdown-item
              >
              <el-dropdown-item :disabled="true">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tab-header>
    </div>
    <component :is="comName" />

    <!-- 更新网关 -->
    <el-dialog
      title="更新网关"
      @close="gatewayVisible = false"
      :visible.sync="gatewayVisible"
      width="60%"
    >
      <el-form
        ref="gatewayForm"
        :model="gatewayForm"
        :rules="gatewayRules"
        label-width="135px"
      >
        <line-alert
          content="更新过程会重建网关，出网数据包都会被丢弃！请确保当前无对集群外访问的业务应用。"
        />

        <el-form-item label="子网名称">
          <span>{{ "ovn-default" }}</span>
        </el-form-item>

        <el-form-item label="网段">
          <span>{{ "10.1.0.0/16" }}</span>
        </el-form-item>

        <el-form-item label="网关类型">
          <el-radio-group v-model="gatewayForm.gatewayType">
            <el-radio-button label="分布式"></el-radio-button>
            <el-radio-button label="集中式"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="网关节点"
          v-if="gatewayForm.gatewayType == '集中式'"
        >
          <el-select
            v-model="gatewayForm.netSegmentNode"
            @focus="setMinWidthEmpty"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="外出流量 NAT">
          <el-switch v-model="gatewayForm.nat"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_gateway">更新</el-button>
        <el-button @click="gatewayVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 更新命名空间 -->
    <el-dialog
      title="更新命名空间"
      @close="namespaceVisible = false"
      :visible.sync="namespaceVisible"
      width="60%"
    >
      <el-form
        ref="namespaceForm"
        :model="namespaceForm"
        :rules="namespaceRules"
        label-width="135px"
      >
        <line-alert
          content="更新过程会重建网关，出网数据包都会被丢弃！请确保当前无对集群外访问的业务应用。"
        />

        <el-form-item label="子网名称">
          <span>{{ "ovn-default" }}</span>
        </el-form-item>

        <el-form-item label="命名空间">
          <el-select
            v-model="namespaceForm.namespace"
            @focus="setMinWidthEmpty"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_namespace">更新</el-button>
        <el-button @click="namespaceVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 更新白名单 -->
    <el-dialog
      title="更新白名单"
      @close="whitelistVisible = false"
      :visible.sync="whitelistVisible"
      width="60%"
    >
      <el-form
        ref="whitelistForm"
        :model="whitelistForm"
        :rules="whitelistRules"
        label-width="135px"
      >
        <line-alert
          content="更新过程会重建网关，出网数据包都会被丢弃！请确保当前无对集群外访问的业务应用。"
        />

        <el-form-item label="子网名称">
          <span>{{ "ovn-default" }}</span>
        </el-form-item>

        <el-form-item label="网段">
          <span>{{ "10.1.0.0/16" }}</span>
        </el-form-item>

        <el-form-item label="子网隔离">
          <el-switch v-model="whitelistForm.subnetIsolation"></el-switch>
        </el-form-item>

        <el-form-item
          label="白名单"
          v-if="whitelistForm.subnetIsolation == true"
        >
          <el-input
            v-model="whitelistForm.whitelist"
            placeholder='输入 cidr 格式字段，例如 "192.168.0.0/16"'
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_whitelist">更新</el-button>
        <el-button @click="whitelistVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 扩容子网 -->
    <el-dialog
      title="扩容子网"
      @close="expandsubnetVisible = false"
      :visible.sync="expandsubnetVisible"
      width="60%"
    >
      <el-form
        ref="expandsubnetForm"
        :model="expandsubnetForm"
        :rules="expandsubnetRules"
        label-width="135px"
      >
        <line-alert
          content="更新过程会重建网关，出网数据包都会被丢弃！请确保当前无对集群外访问的业务应用。"
        />

        <el-form-item label="子网名称">
          <span>{{ "ovn-default" }}</span>
        </el-form-item>

        <el-form-item label="网段">
          <el-input v-model="expandsubnetForm.netSegment"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_expandsubnet">更新</el-button>
        <el-button @click="expandsubnetVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabHeader from "@/apps/container/views/components/TabHeader";
import BaseInfo from "./components/BaseInfo/BaseInfo.vue";
import Node from "./components/Node/Node.vue";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "ClusterDetail",
  components: { TabHeader, BaseInfo, Node, LineAlert },
  data() {
    return {
      name: "",
      desc: "",
      tabList: [
        {
          label: "详情信息",
          name: "baseInfo",
          com: "BaseInfo",
        },
        {
          label: "已用 IP",
          name: "node",
          com: "Node",
        },
      ],
      activeName: "",

      gatewayVisible: false,
      gatewayForm: {
        gatewayType: "分布式",
        nat: true,
        netSegmentNode: "",
      },
      gatewayRules: {},

      namespaceVisible: false,
      namespaceForm: {
        namespace: "",
      },
      namespaceRules: {},

      whitelistVisible: false,
      whitelistForm: {
        subnetIsolation: false,
        whitelist: "",
      },
      whitelistRules: {},

      expandsubnetVisible: false,
      expandsubnetForm: {
        netSegment: "",
      },
      expandsubnetRules: {},
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
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    changeActive(value) {
      this.activeName = value;
    },

    handleGateway() {
      this.gatewayVisible = true;
    },
    handle_gateway() {},

    handleNamespace() {
      this.namespaceVisible = true;
    },
    handle_namespace() {},

    handleWhitelist() {
      this.whitelistVisible = true;
    },
    handle_whitelist() {},

    handleExpandsubnet() {
      this.expandsubnetVisible = true;
    },

    handle_expandsubnet() {},
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