<template>
  <div class="create-container">
    <line-alert :content="content" />

    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="!isEdit">创建集群</span>
        </div>
        <div v-if="fillType == 'form'" class="text item">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="125px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="以 a-z、0-9 开头结尾，支持使用 a-z、0-9、-,最多32个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="显示名称" prop="showName">
                  <el-input
                    v-model="ruleForm.showName"
                    placeholder="最多 64 个字符"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="GPU">
              <el-checkbox v-model="ruleForm.gpu"></el-checkbox>
              <br />
              <el-select
                v-model="ruleForm.gpuSelect"
                v-if="ruleForm.gpu == true"
              >
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select>
            </el-form-item>

            <el-row>
              <el-col :span="24">
                <el-form-item label="Kubernetes版本" prop="kubernetes">
                  <el-select v-model="ruleForm.kubernetes">
                    <el-option
                      label="v1.12.10 (Docker v20.10.7)"
                      value="docker"
                    />
                    <el-option
                      label="v1.12.10 (Containerd v1.4.6)"
                      value="containerd"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="集群地址">
              <el-row>
                <el-col :span="16">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.ip"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-col>

                <el-col :span="8" style="padding-left: 30px">
                  <el-input v-model="ruleForm.port">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="自建 VIP">
              <el-switch v-model="ruleForm.vip" />
              <el-tooltip
                content="集群内部通过此 IP 来访问服务"
                effect="dark"
                class="item"
                placement="top"
              >
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-form-item label="VRID" v-if="ruleForm.vip == true">
              <el-input v-model="ruleForm.vrid" />
            </el-form-item>

            <el-form-item label="镜像仓库">
              <el-radio-group v-model="ruleForm.store">
                <el-radio-button label="平台默认"></el-radio-button>
                <el-radio-button label="外部"></el-radio-button>
              </el-radio-group>
              <el-tooltip
                content="集群内部通过此 IP 来访问服务"
                effect="dark"
                class="item"
                placement="top"
              >
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-form-item
              label="私有镜像仓库地址"
              v-if="ruleForm.store == '外部'"
            >
              <el-row>
                <el-col :span="16">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.ip"
                  >
                    <template slot="prepend">IP 地址/域名</template>
                  </el-input>
                </el-col>
                <el-col :span="8" style="padding-left: 30px">
                  <el-input v-model="ruleForm.port">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-col>
              </el-row>

              <el-row style="padding-top: 5px">
                <el-col :span="16">
                  <el-input
                    placeholder="例如: 100.0.0.100 或 example.com"
                    v-model="ruleForm.username"
                  >
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-col>
                <el-col :span="8" style="padding-left: 30px">
                  <el-input v-model="ruleForm.password">
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="IPv4/IPv6 双栈">
              <el-switch v-model="ruleForm.protocol" />
            </el-form-item>

            <el-form-item label="网络模式">
              <el-radio-group v-model="ruleForm.netMode">
                <el-radio-button label="Kube-OVN"></el-radio-button>
                <el-radio-button label="Calico"></el-radio-button>
                <el-radio-button label="Flannel"></el-radio-button>
                <el-radio-button label="自定义"></el-radio-button>
              </el-radio-group>
              <el-tooltip
                content="集群内部通过此 IP 来访问服务"
                effect="dark"
                class="item"
                placement="top"
              >
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-form-item>

            <el-form-item label="默认子网">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item label="网段">
                      <el-input
                        placeholder="如: 10.3.0.0/16"
                        v-model="ruleForm.netSegment"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="传输方式">
                      <el-radio-group v-model="ruleForm.transMethod">
                        <el-radio label="overlay"></el-radio>
                        <el-radio label="underlay"></el-radio>
                      </el-radio-group>
                      <el-tooltip
                        content="集群内部通过此 IP 来访问服务"
                        effect="dark"
                        class="item"
                        placement="top"
                      >
                        <i
                          class="el-icon-question margin-left10 question-icon"
                        />
                      </el-tooltip>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="Service 网段">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.serviceNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="Join 网段">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.joinNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="节点名称设置">
              <el-radio-group v-model="ruleForm.node">
                <el-radio label="节点IP作为节点名称"></el-radio>
                <el-radio label="主机名称作为节点名称"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="网卡">
              <el-input
                placeholder="如: 10.3.0.0/16"
                v-model="ruleForm.joinNetSegment"
              ></el-input>
            </el-form-item>

            <el-form-item label="节点信息">
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="flex-center">
                      <div
                        class="cursor-pointer text-center hover-div"
                        style="flex: 1"
                        @click="handleAdd('configurationItems')"
                      >
                        <i class="el-icon-circle-plus-outline" />
                        添加节点
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="如何选择监控组件">
              <el-radio-group v-model="ruleForm.monitor">
                <el-radio-button label="Prometheus (推荐)"></el-radio-button>
                <el-radio-button label="VictoriaMetrics"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="部署方法"
              v-if="ruleForm.monitor == 'VictoriaMetrics'"
            >
              <el-radio-group v-model="ruleForm.depMethod">
                <el-radio label="部署 VictoriaMetrics"></el-radio>
                <el-radio label="部署 VictoriaMetrics 代理"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="监控组件部署节点">
              <el-select v-model="ruleForm.gpuSelect">
                <el-option label="vGPU" value="vGPU"></el-option>
                <el-option label="pGPU" value="pGPU"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="VictoriaMetrics 代理实例数">
              <el-input-number
                v-model="ruleForm.num"
                :min="1"
                :max="3"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="fixed-div">
      <el-button type="primary" @click="submitCreate">
        <span v-if="!isEdit">创建</span>
        <span v-if="isEdit">更新</span>
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: { LineAlert, MonacoEditor },
  data() {
    return {
      content:
        "1.集群的控制节点和网络需求根据实际业务和网络情况提前规划好,否则集群部署完成后将无法调整" +
        "\r\n" +
        " 2.请确保集群节点防火墙、selinux、swap分区已关闭,否则可能会导致集群部署失败",
      isEdit: false,
      fillType: "form",
      ruleForm: {
        gpu: false,
        gpuSelect: "vGPU",
        kubernetes: "docker",
        ip: "",
        port: "",
        vip: false,
        vrid: "137",
        store: "平台默认",
        username: "",
        password: "",
        protocol: false,
        netMode: "Kube-OVN",
        transMethod: "overlay",
        node: "节点IP作为节点名称",
        monitor: "Prometheus (推荐)",
        depMethod: "部署 VictoriaMetrics",
        num: 1,
      },

      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/,
            message: "以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-",
            trigger: "blur",
          },
        ],
        showName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        kubernates: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  created() {
    this.ruleForm.name = this.$route.query.name;
    if (this.ruleForm.name) {
      this.isEdit = true;
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      this.ruleForm = {
        name: this.ruleForm.name,
        virtualIP: true,
        internetAccess: false,
        targetComponents: "计算组件",
        calculationType: "部署",
        keepSession: false,
        domains: [
          {
            id: nanoid(),
            agreement: "TCP",
            serverPort: "5201",
            containerPort: "443",
            servicePortName: "tcp-5201-443",
          },
          {
            id: nanoid(),
            agreement: "TCP",
            serverPort: "5202",
            containerPort: "80",
            servicePortName: "tcp-5202-80",
          },
        ],
        tagSelector: [],
      };
    },
    submitCreate() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    cancelCreate() {
      this.$router.go(-1);
    },
    changeTableItem(item, index) {
      const oldItem = this.ruleForm.domains[index];
      let str = `${oldItem.agreement}`;
      if (oldItem.serverPort) {
        str += `-${oldItem.serverPort}`;
      }
      if (oldItem.containerPort) {
        str += `-${oldItem.containerPort}`;
      }
      oldItem.servicePortName = str;
      this.$set(this.ruleForm.domains, [index], oldItem);
    },
    handleDelete(item, index) {
      this.ruleForm.domains.splice(this.ruleForm.domains.indexOf(item), 1);
    },
    handleAdd() {
      const obj = {
        id: nanoid(),
        agreement: "TCP",
        serverPort: "",
        containerPort: "",
        servicePortName: "tcp",
      };
      this.ruleForm.domains.push(obj);
    },
    handleTagDelete(item, index) {
      this.ruleForm.tagSelector.splice(
        this.ruleForm.tagSelector.indexOf(item),
        1
      );
    },
    handleTagAdd() {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.ruleForm.tagSelector.push(obj);
    },
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },
    // 写入
    quickInput() {
      this.currentCode = this.defaultCodeStr;
      this.$refs.monacoEditor.btnFlag = true;
    },
    // 查看
    viewYaml() {
      this.detailVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
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
  }
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    background: #fff;
    padding: 10px;
    margin: 10px;
  }
}
</style>