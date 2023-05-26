<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px">创建命名空间</div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
          style="margin-top: -20px"
        >
          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>

          <el-form-item label="名称" prop="name">
            <el-col :span="16">
              <el-input
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-'，最多 32 个字符。"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称">
            <el-col :span="16">
              <el-input
                v-model="infoForm.showName"
                placeholder="支持输入中英文，最大支持64位字符"
              />
            </el-col>
          </el-form-item>
        </el-form>

        <el-form
          ref="deployForm"
          :model="deployForm"
          :rules="deployRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "部署配置" }}</h2>
          </div>

          <el-form-item label="网关类型">
            <el-col :span="16">
              <el-radio-group v-model="deployForm.gateType">
                <el-radio label="入口网关"></el-radio>
                <el-radio label="出口网关"></el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item label="命名空间" prop="namespace">
            <el-col :span="16">
              <el-select
                v-model="deployForm.namespace"
                @focus="setMinWidthEmpty"
                style="width: 100%"
                placeholder="请输入命名空间"
              >
                <el-option
                  v-for="item in namespaceOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-form-item>

          <label class="el-form-item__label" style="width: 135px">
            节点配置
          </label>
          <div class="component-div">
            <el-row class="container-div" style="padding-top: 20px">
              <el-col :span="24">
                <el-form-item label="节点反亲和">
                  <el-radio-group
                    v-model="deployForm.node"
                    @input="handleRadio"
                  >
                    <el-radio-button label="强制"></el-radio-button>
                    <el-radio-button label="期望"></el-radio-button>
                  </el-radio-group>
                  <el-tooltip effect="dark" class="item" placement="top">
                    <template slot="content">
                      <div style="max-width: 450px">
                        节点反亲和类型为"强制"，则实例数等于部署节点数，不能修改<br />
                        节点反亲和类型为"期望"，实例数可手动修改，可控制自动扩缩容状态
                        <br />
                      </div>
                    </template>
                    <i class="el-icon-question margin-left10 question-icon" />
                  </el-tooltip>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="部署节点" prop="deployNode">
                  <el-select
                    v-model="deployForm.deployNode"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                    multiple
                    placeholder="请选择部署节点"
                  >
                    <el-option
                      v-for="item in nodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22" v-if="deployForm.node == '强制'">
                <el-form-item label="实例数">
                  <span>{{ deployForm.instance }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="4" v-if="deployForm.node == '期望'">
                <el-form-item label="自动扩缩容">
                  <el-switch v-model="deployForm.auto"></el-switch>
                </el-form-item>
              </el-col>

              <el-col
                :span="12"
                v-if="deployForm.node == '期望' && deployForm.auto == false"
              >
                <el-form-item label="实例数">
                  <el-input-number
                    :max="9007199254"
                    :min="0"
                    v-model="deployForm.instance"
                  />
                </el-form-item>
              </el-col>

              <el-col
                :span="11"
                v-if="deployForm.node == '期望' && deployForm.auto == true"
              >
                <el-form-item label="实例数">
                  <el-input v-model="deployForm.instance_min">
                    <template slot="prepend">最小值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col
                style="margin-left: -100px"
                :span="11"
                v-if="deployForm.node == '期望' && deployForm.auto == true"
              >
                <el-form-item>
                  <el-input v-model="deployForm.instance_max">
                    <template slot="prepend">最大值</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="资源限额">
                  <el-input v-model="deployForm.cpu">
                    <template slot="prepend">CPU</template>
                    <template slot="append">核</template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col style="margin-left: -100px" :span="12">
                <el-form-item>
                  <el-input v-model="deployForm.memory">
                    <template slot="prepend">内存</template>
                    <template slot="append">Mi</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-form-item label="固定 IP" style="margin-top: 22px">
            <el-col :span="16">
              <el-input
                v-model="deployForm.ip"
                placeholder="输入子网内有效 IP 按回车确定"
                disabled
              />
            </el-col>
            <el-tooltip effect="dark" class="item" placement="top">
              <template slot="content">
                <div style="max-width: 450px">
                  容器组绑定的固定
                  IP。当容器状态发生变化后，如升级、回滚、切换主机等，IP
                  仍继续保留。
                </div>
              </template>
              <i class="el-icon-question margin-left10 question-icon" />
            </el-tooltip>
          </el-form-item>
        </el-form>

        <el-form
          ref="portForm"
          :model="portForm"
          :rules="portRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "端口规划" }}</h2>
          </div>

          <LineAlert
            content="根据实际实际业务场景，选择监听端口的添加方式。若网关部署时，端口数量或端口号仍未确定，可在部署完成后通过更新网关添加端口。快速添加：为网关快速新增指定数量的端口，端口号由平台后台生成。自定义：自由填写网关的服务端口和容器端口。主机端口由 Kubernetes 自动分配，不支持定义。"
          />

          <el-form-item label="外网访问">
            <el-col :span="16">
              <el-switch v-model="portForm.extranet"> </el-switch>
              <el-tooltip effect="dark" class="item" placement="top">
                <template slot="content">
                  <div style="max-width: 450px">
                    通过访问集群节点的对应端口来访问网关 (NodePort)
                  </div>
                </template>
                <i class="el-icon-question margin-left10 question-icon" />
              </el-tooltip>
            </el-col>
          </el-form-item>

          <el-form-item label="监听端口" prop="listenPort">
            <el-col :span="16">
              <el-radio-group v-model="portForm.listenPort">
                <el-radio-button label="快速添加"></el-radio-button>
                <el-radio-button label="自定义"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 0"
            v-if="portForm.listenPort == '快速添加'"
          >
            <table border="0" style="width: 60%">
              <thead>
                <tr class="headerStyle">
                  <th style="width: 40%">
                    <div class="cell">协议</div>
                  </th>
                  <th>
                    <div class="cell">端口数量</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="text-align: center">HTTP</div>
                  </td>
                  <td>
                    <el-form-item prop="portNum_http">
                      <el-input v-model="portForm.portNum_http">
                        <template slot="append">组</template>
                      </el-input>
                    </el-form-item>
                    <el-descriptions
                      size="small"
                      :colon="false"
                      :contentStyle="rowCenter_port"
                    >
                      <el-descriptions-item>
                        建议端口数量不超过 20 组
                      </el-descriptions-item>
                    </el-descriptions>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="text-align: center">TCP</div>
                  </td>
                  <td>
                    <el-form-item prop="portNum_tcp">
                      <el-input v-model="portForm.portNum_tcp">
                        <template slot="append">组</template>
                      </el-input>
                    </el-form-item>
                    <el-descriptions
                      size="small"
                      :colon="false"
                      :contentStyle="rowCenter_port"
                    >
                      <el-descriptions-item>
                        建议端口数量不超过 20 组
                      </el-descriptions-item>
                    </el-descriptions>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>

          <el-form-item
            style="margin-bottom: 0"
            v-if="portForm.listenPort == '自定义'"
          >
            <table border="0" style="width: 60%">
              <thead>
                <tr class="headerStyle">
                  <th>
                    <div class="cell">协议</div>
                  </th>
                  <th>
                    <div class="cell">服务端口</div>
                  </th>
                  <th>
                    <div class="cell">容器端口</div>
                  </th>
                  <th>
                    <div class="cell">操作</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(domain, index) in portForm.noteItems"
                  :key="domain.id"
                >
                  <td>
                    <el-form-item>
                      <span>{{ domain.protocol }}</span>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.serverPort"> </el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="domain.containerPort"> </el-input>
                    </el-form-item>
                  </td>
                  <td class="text-center">
                    <el-button
                      icon="el-icon-remove-outline"
                      class="cursor-pointer margin-left10 margin-right10"
                      type="text"
                      @click="handleDeleteParams('noteItems', domain, index)"
                    />
                  </td>
                </tr>

                <tr>
                  <td colspan="5" v-if="portForm.noteItems.length == 0">
                    <div class="text-center" style="color: rgba(200, 202, 205)">
                      无数据
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colspan="5">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAdd_http('noteItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加 HTTP/HTTPS 端口
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colspan="5">
                    <div
                      class="cursor-pointer text-center hover-div"
                      @click="handleAdd_tcp('noteItems')"
                    >
                      <i class="el-icon-circle-plus-outline" />
                      添加 TCP 端口
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button type="primary" @click="handleSubmit">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "ClusterCreate",
  components: { LineAlert },
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      rowCenter_port: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "-10px",
        "margin-top": "-5px",
        color: "#A9A9A9",
      },

      deployForm: {
        gateType: "入口网关",
        namespace: "",
        node: "强制",
        deployNode: [],
        instance: "1",
        instance_min: "1",
        instance_max: "1",
        auto: false,
        cpu: "0.5",
        memory: "500",
        ip: "",
      },

      deployRules: {
        namespace: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
        deployNode: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
      },

      namespaceOptions: [
        { label: "bass (项目：bass)", id: "bass" },
        { label: "chaos (项目：chaos)", id: "chaos" },
        { label: "cpass-dev (项目：cpass-dev)", id: "cpass-dev" },
        { label: "cpass-system (项目：cpass-system)", id: "cpass-system" },
        { label: "default (项目：cpass-system)", id: "default" },
      ],

      nodeOptions: [
        {
          value: "25.2.20.108",
          label: "25.2.20.108",
        },
        {
          value: "25.2.20.10822",
          label: "25.2.20.10822",
        },
        {
          value: "25.2.20.10833",
          label: "25.2.20.10833",
        },
        {
          value: "25.2.20.10844",
          label: "25.2.20.10844",
        },
      ],

      infoForm: {
        name: "",
        showName: "",
      },

      infoRules: {
        name: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
      },

      portForm: {
        extranet: true,
        listenPort: "快速添加",
        portNum_http: "1",
        portNum_tcp: "0",
        noteItems: [],
      },

      portRules: {
        listenPort: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
        portNum_tcp: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
        portNum_http: [
          { required: true, message: "所属集群是必填项", trigger: "blur" },
        ],
      },
    };
  },

  created() {},

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

    handleRadio() {},

    handleSubmit() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
    },

    handleAdd_http(filed) {
      const obj_http = {
        id: nanoid(),
        protocol: "HTTP",
        serverPort: "",
        containerPort: "",
      };
      const obj_https = {
        id: nanoid(),
        protocol: "HTTPS",
        serverPort: "",
        containerPort: "",
      };
      this.portForm[filed].push(obj_http, obj_https);
    },

    handleAdd_tcp(filed) {
      const obj = {
        id: nanoid(),
        protocol: "TCP",
        serverPort: "",
        containerPort: "",
      };
      this.portForm[filed].push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.portForm[filed].splice(index, 1);
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
    // width: calc(100% - 42px);
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
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}

.create-container[data-v-5e8ccdd2] {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100%;
  position: relative;
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 11px;
  height: 40px;
  line-height: 42px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.el-card__body {
  padding: 20px;
  padding-top: 0;
}
.row-bg {
  padding: 0;
  background-color: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
}
.bg-purple {
  background: #fff;
  padding: 10px;
  margin: 10px;
}
.component-div {
  margin-top: 16px;
  margin-left: 136px;
  padding: 10px;
  background: rgba(247, 249, 252);
  .container-div {
    background: #fff;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
.label-value {
  margin-bottom: 12px;
  margin-top: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>