<template>
  <div class="resource-management-container">
    <el-row>
      <el-col :span="7">
        <div class="group-pannel">
          <el-form>
            <!-- 1 -->
            <el-form-item label="">
              <el-button type="primary" @click="handelAdd">
                创建资源对象
              </el-button>
            </el-form-item>
            <!-- 2 -->
            <el-form-item label="">
              <el-select
                v-model="selectedGroup"
                style="width: 100%"
                size="small"
                @change="handleGroupChange"
                class="resourceGroup"
              >
                <span slot="prefix"> 资源组： </span>
                <el-option label="全部" value="all" />
              </el-select>
            </el-form-item>
            <!-- 3 -->
            <el-form-item>
              <el-input
                v-model="inputResource"
                placeholder="按名称过滤"
                prefix-icon="el-icon-search"
                clearable
                size="small"
                @input="handleResourceFilter"
                @clear="handleResourceClear"
              />
            </el-form-item>
          </el-form>
          <!-- <ul style="height: 420px; overflow-y: scroll">
            <li
              v-for="(item, index) in resourceList"
              :key="index"
              class="li-link"
              :class="{ isActive: compare(item.id) }"
              @click="handleResourceChange(item.id)"
            >
              <span>{{ item.name }}</span>
              <div class="li-version">
                <span class="dot" />
                <span>{{ item.version[0] }}</span>
              </div>
            </li>
          </ul> -->

          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item
              :title="'命名空间相关' + ' (' + resourceList.length + ')'"
              name="1"
            >
              <ul class="scrollUL" style="">
                <li
                  v-for="(item, index) in resourceList"
                  :key="index"
                  class="li-link"
                  :class="{ isActive: compare(item.id) }"
                  @click="handleResourceChange(item.id)"
                >
                  <span>{{ item.name }}</span>
                  <div class="li-version">
                    <span class="dot" />
                    <span>{{ item.version[0] }}</span>
                  </div>
                </li>
              </ul>
            </el-collapse-item>
            <el-collapse-item
              :title="'集群相关' + ' (' + resourceList.length + ')'"
              name="2"
            >
              <ul class="scrollUL">
                <li
                  v-for="(item, index) in resourceList"
                  :key="index"
                  class="li-link"
                  :class="{ isActive: compare(item.id) }"
                  @click="handleResourceChange(item.id)"
                >
                  <span>{{ item.name }}</span>
                  <div class="li-version">
                    <span class="dot" />
                    <span>{{ item.version[0] }}</span>
                  </div>
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>

      <el-col :span="17">
        <div class="filter-container">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            style="float: right"
            @click="handleRefresh"
          />
          <el-input
            v-model="listQuery.title"
            placeholder="按名称搜索"
            size="small"
            class="margin-right10"
            style="float: right; width: 240px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleFilter"
            />
          </el-input>
          <span style="font-size: 18px">{{ resource.name }}</span>
          <div>
            <el-select
              v-model="version"
              size="small"
              @change="handleVersionChange"
            >
              <el-option
                v-for="(v, index) in resource.version"
                :key="index"
                :label="`${v}/v1`"
                :value="v"
              />
            </el-select>
          </div>
        </div>

        <el-table
          :data="list.data"
          style="width: 100%"
          header-row-class-name="headerStyle"
        >
          <el-table-column label="名称">
            <template slot-scope="scope">
              <span class="cursor-pointer" @click="openDetails(scope.row)">{{
                scope.row.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>
                <el-tag
                  v-for="item in scope.row.tag"
                  :key="item"
                  type="info"
                  class="tagItem"
                  style="margin:5px;10px;"
                  >{{ item }}</el-tag
                >
              </span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createtime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="60px">
            <template slot-scope="scope">
              <div class="operation-cell">
                <el-dropdown trigger="click">
                  <i class="el-icon-more" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleEdit(scope.row)"
                      >更新</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="handleDeleteResource(scope.row)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="详情"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />

    <el-dialog
      @close="dialogDeleteVisible = false"
      :visible.sync="dialogDeleteVisible"
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
          {{ `确定删除资源 "${instanceName}" 吗？` }}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_delete"> 删除 </el-button>
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Mock from "mockjs";
// import { getResourceList } from "../../../../../mock/alarm/axiosApi";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog";
export default {
  name: "ResourceManagement",
  components: { MonacoEditorDialog },
  data() {
    const list = Mock.mock({
      "data|10": [
        {
          "id|+1": 1,
          name: "@word(10,20)",
          tag: [
            "app.kubernetes.io/instance: test",
            "app.kubernetes.io/managed-by: Helm",
          ],
          // namespace: "toda-elasticsearch-system",
          createtime: "2022-04-25 16:52:56",
          spec: {
            detail: {
              cluster_name: "global",
              event: {
                count: 6713,
                eventTime: null,
                firstTimestamp: "2022-10-14T05:33:11Z",
                involvedObject: {
                  apiVersion: "v1",
                  fieldPath: "spec.containers{ubuntu}",
                  kind: "Pod",
                  name: "ubuntu-bq84l",
                  namespace: "toda-elasticsearch-system",
                  resourceVersion: "519516627",
                  uid: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
                },
                lastTimestamp: "2022-11-07T01:33:22Z",
                message:
                  'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
                metadata: {
                  creationTimestamp: "2022-11-07T01:18:15Z",
                  name: "ubuntu-bq84l.171dd899b971f3ab",
                  namespace: "toda-elasticsearch-system",
                  resourceVersion: "603142979",
                  uid: "c61582db-0ce2-469d-8606-9854962ffc82",
                },
                reason: "Pulled",
                reportingComponent: "",
                reportingInstance: "",
                source: {
                  component: "kubelet",
                  host: "172.16.129.51",
                },
                type: "Normal",
              },
              operation: "Pulled",
              operator: "kubelet@172.16.129.51",
              source: "kubernetes",
            },
            log_level: 0,
            resource_id: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
            resource_type: "Pod",
            time: "1667783895000000",
          },
        },
      ],
    });
    return {
      activeNames: "",
      selectedGroup: "all",
      version: "",
      inputResource: "",
      resourceList: [],
      resource: {
        id: "",
        name: "",
        version: [],
      },
      initResourceList: [
        { id: 1, name: "ALB2", version: ["crd.alauda.io"] },
        {
          id: 2,
          name: "AlaudaFeatureGate",
          version: ["alauda.io", "v2", "v3"],
        },
        {
          id: 3,
          name: "AlertRule",
          version: ["ait.alauda.io", "v2", "v3"],
        },
        {
          id: 4,
          name: "Alertmanager",
          version: ["monitoring.coreos.com", "v2", "v3"],
        },
        {
          id: 5,
          name: "AlertmanagerConfig",
          version: ["monitoring.coreos.com", "v2", "v3"],
        },
        { id: 6, name: "AppRelease", version: ["operator.alauda.io"] },
        { id: 7, name: "AppStatus", version: ["oam.alauda.io"] },
        { id: 8, name: "Application", version: ["core.oam.dev"] },
        { id: 9, name: "ApplicationHistory", version: ["app.k8s.io"] },
        { id: 10, name: "ApplicationRevision", version: ["core.oam.dev"] },
        { id: 11, name: "Artifact", version: ["app.alauda.io"] },
        { id: 12, name: "ArtifactVersion", version: ["app.alauda.io"] },
        { id: 13, name: "CSIStorageCapacity", version: ["storage.k8s.io"] },
        { id: 14, name: "CatalogSource", version: ["operators.coreos.com"] },
        { id: 15, name: "Certificate", version: ["cert-manager.io"] },
        { id: 16, name: "Challenge", version: ["acme.cert-maneger.io"] },
        {
          id: 17,
          name: "ClusterServiceVersion",
          version: ["operators.coreos.com"],
        },
        { id: 18, name: "ComponentDefinition", version: ["core.oam.dev"] },
        { id: 19, name: "ConfigMap", version: ["v1"] },
        { id: 20, name: "ControllerRevision", version: ["apps"] },
        { id: 21, name: "CronHPA", version: ["tkestack.io"] },
        { id: 22, name: "CronJob", version: ["batch"] },
        { id: 23, name: "DaemonSet", version: ["apps"] },
        { id: 24, name: "Dashboard", version: ["ait.alauda.io"] },
        { id: 25, name: "DefinitionRevision", version: ["core.oam.dev"] },
        { id: 26, name: "Deployment", version: ["apps"] },
        { id: 27, name: "EndpointSlice", version: ["discovery.k8s.io"] },
        { id: 28, name: "Endpoints", version: ["v1"] },
        { id: 29, name: "EnvBinding", version: ["core.oam.dev"] },
        { id: 30, name: "EtcdBackupRecord", version: ["etcdbackup.alauda.io"] },
        { id: 31, name: "Event", version: ["v1"] },
        { id: 32, name: "Frontend", version: ["crd.alauda.io"] },
        { id: 33, name: "Gateway", version: ["gateway.networking.k8s.io"] },
        { id: 34, name: "Gitea", version: ["operator.devops.alauda.io"] },
        { id: 35, name: "Gitlab", version: ["operator.devops.alauda.io"] },
        {
          id: 36,
          name: "GitlabOfficial",
          version: ["operator.devops.alauda.io"],
        },
        { id: 37, name: "GrafanaDashboard", version: ["ait.alauda.io"] },
        { id: 38, name: "HTTPRoute", version: ["gateway.networking.k8s.io"] },
        { id: 39, name: "Harbor", version: ["operator.devops.aluada.io"] },
        { id: 40, name: "HealthScope", version: ["core.oam.dev"] },
        { id: 41, name: "HelmRequest", version: ["app.alauda.io"] },
        { id: 42, name: "HorizontalPodAutoscaler", version: ["autoscaling"] },
        { id: 43, name: "Ingress", version: ["networking.k8s.io"] },
        { id: 44, name: "InstallPlan", version: ["operators.coreos.com"] },
        { id: 45, name: "Issuer", version: ["cert-manager.io"] },
        { id: 46, name: "Jenkins", version: ["operator.devops.alauda.io"] },
        { id: 47, name: "Job", version: ["batch"] },
        { id: 48, name: "Lease", version: ["coordination.k8s.io"] },
        { id: 49, name: "Library", version: ["app.alauda.io"] },
        { id: 50, name: "LimitRange", version: ["v1"] },
        { id: 51, name: "ManualScalerTrait", version: ["core.oam.dev"] },
        { id: 52, name: "MonitorTrait", version: ["oam.alauda.io"] },
        { id: 53, name: "NamespaceOverview", version: ["k8s.io"] },
        { id: 54, name: "NetworkPolicy", version: ["networking.k8s.io"] },
        { id: 55, name: "NetworkSet", version: ["crd.projectcalico.org"] },
        { id: 56, name: "Nexus", version: ["operator.devops.alauda.io"] },
        {
          id: 57,
          name: "OperatorCondition",
          version: ["operators.coreos.com"],
        },
        { id: 58, name: "OperatorGroup", version: ["operators.coreos.com"] },
        { id: 59, name: "Order", version: ["acme.cert-manager.io"] },
        {
          id: 60,
          name: "PackageManifest",
          version: ["packages.operators.coreos.com"],
        },
        { id: 61, name: "PatchTrait", version: ["oam.alauda.io"] },
        { id: 62, name: "PersistentVolumeClaim", version: ["v1"] },
        { id: 63, name: "Pod", version: ["v1"] },
        { id: 64, name: "PodDisruptionBudget", version: ["policy"] },
        { id: 65, name: "PodMetrics", version: ["metrics.k8s.io"] },
        { id: 66, name: "PodMonitor", version: ["monitoring.coreos.com"] },
        { id: 67, name: "PodTemplate", version: ["v1"] },
        { id: 68, name: "PolicyDefinition", version: ["core.oam.dev"] },
        { id: 69, name: "Probe", version: ["monitoring.coreos.com"] },
        { id: 70, name: "Prometheus", version: ["monitoring.coreos.com"] },
        { id: 71, name: "PrometheusRule", version: ["monitoring.coreos.com"] },
        {
          id: 72,
          name: "ReferencePolicy",
          version: ["gateway.networking.k8s.io"],
        },
        { id: 73, name: "Rel", version: ["operator.alaula.io"] },
        { id: 74, name: "Release", version: ["app.alaula.io"] },
        { id: 75, name: "ReplicaSet", version: ["apps"] },
        { id: 76, name: "ReplicationController", version: ["v1"] },
        { id: 77, name: "ResourceQuota", version: ["v1"] },
        { id: 78, name: "Role", version: ["rbac.authorization.k8s.io"] },
        { id: 79, name: "RoleBinding", version: ["rbac.authorization.k8s.io"] },
        { id: 80, name: "Rollout", version: ["standard.oam.dev"] },
        { id: 81, name: "Rule", version: ["crd.alauda.io"] },
      ],
      list,
      // list: { data: [] },
      listQuery: {
        page: 1,
        limit: 20,
        title: "",
      },
      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },

      dialogDeleteVisible: false,
      instanceName: "",
    };
  },
  created() {
    this.resourceList = this.initResourceList;
    this.resource = this.resourceList[0];
    this.version = this.resource.version[0];
    // this.getList();
  },
  methods: {
    // getList() {
    //   getResourceList().then((res) => {
    //     console.log(res.data);
    //     this.list.data = res.data.data;
    //   });
    // },

    // 事件详情
    openDetails(row) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.code = JSON.stringify(row.spec, null, 2);
    },
    closeDetailsDialog() {
      this.detailVisible = false;
    },
    handleRefresh() {
      console.log(this.ResourceList);
    },
    handleFilter() {
      console.log(this.listQuery.title);
    },
    // 下拉框
    handleGroupChange(val) {
      console.log(val);
    },
    handleResourceChange(currentId) {
      this.resource = this.resourceList.find((item) => {
        return item.id === currentId;
      });
      this.version = this.resource.version[0];
    },
    // 输入框
    handleResourceFilter(val) {
      if (val) {
        this.resourceList = this.resourceList.filter((item) => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      } else {
        this.resourceList = this.initResourceList;
      }
    },
    // 输入框--清除
    handleResourceClear() {
      this.resourceList = this.initResourceList;
    },
    handleVersionChange(val) {
      console.log(val);
    },
    handleEdit(row) {
      this.detailVisible = true;
      this.readOnly = false;
      this.submitTxt = "更新";
      this.code = JSON.stringify(row.spec, null, 2);
    },
    // 创建资源对象
    handelAdd() {
      this.detailVisible = true;
      this.readOnly = false;
      this.submitTxt = "创建";
      this.code = JSON.stringify("", null, 2);
    },
    handleDelete(id) {
      console.log(id);
    },
    compare(currentId) {
      if (this.resource.id === currentId) {
        return true;
      } else {
        return false;
      }
    },

    handleDeleteResource(obj) {
      this.dialogDeleteVisible = true;
      this.instanceName = obj.name;
    },

    handle_delete() {},

    handleChange() {},
  },
};
</script>

<style lang="scss" scoped>
.resource-management-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
}
.el-row {
  padding: 20px;
  background: #fff;
  border-radius: $border-radius-l;
  box-shadow: 0 0 4px 0 $box-shadow;
  min-height: 100%;
}
.group-pannel {
  margin-right: 30px;
}
.el-form-item {
  margin-bottom: 5px;
}
ul {
  overflow: auto;
  list-style: none;
}
ul {
  padding: 0;
  margin: 0;
  width: 200px;
}
li {
  padding: 0;
  margin: 0;
}
.li-link {
  widows: 100%;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  font-size: 16px;
  color: rgb(50, 52, 55);
}
.li-link:hover,
.isActive {
  color: $color-primary;
  background-color: $background-color;
}
.li-version {
  font-size: 14px;
  color: rgb(100, 102, 105);
  margin-top: 8px;
  display: flex;
  align-items: center;
}
.tagItem {
  margin-left: 3px;
}
.el-select-dropdown__item {
  padding-left: 6px;
}
.dot {
  width: 5px;
  height: 5px;
  margin-right: 8px;
  background-color: rgb(0, 194, 97);
}
.operation-cell {
  i {
    font-size: $font-size-20;
    color: $color-primary;
    cursor: pointer;
  }
}
::v-deep .resourceGroup {
  .el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
}
.scrollUL {
  height: 420px;
  overflow-y: scroll;
  width: 100%;
}
</style>
