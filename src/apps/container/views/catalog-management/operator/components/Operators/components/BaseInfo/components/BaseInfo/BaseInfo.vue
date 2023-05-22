<template>
  <div class="base-info">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>基本信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            class="label-value"
            v-for="item in detailData"
            :key="item.label"
            :span="12"
          >
            <span> {{ item.label }} </span>
            : &nbsp;&nbsp;

            <span v-if="item.label == '状态'">
              <i
                :class="
                  item.value === '部署成功'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
              />
              {{ item.value }}
            </span>

            <span v-else-if="item.label == '标签'">
              <el-tooltip
                placement="top"
                effect="dark"
                style="margin-right: 10px"
              >
                <div slot="content">{{ item.value[0] }}</div>
                <el-tag size="mini">
                  {{
                    item.value[0].length > 15
                      ? item.value[0].substring(0, 30) + "..."
                      : item.value[0]
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content" v-for="ele in item.value" :key="ele">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ ele }}
                  </el-tag>
                  <br />
                </div>
                <el-tag size="mini" style="cursor: pointer">
                  {{ "..." }}
                </el-tag>
              </el-tooltip>

              <i
                :class="item.afterIcon"
                @click="handleUpdate('更新标签', 'labelItems')"
              />
            </span>

            <span v-else-if="item.label == '注解'">
              <el-tooltip
                placement="top"
                effect="dark"
                style="margin-right: 10px"
              >
                <div slot="content">{{ item.value[0] }}</div>
                <el-tag size="mini">
                  {{
                    item.value[0].length > 15
                      ? item.value[0].substring(0, 30) + "..."
                      : item.value[0]
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content" v-for="ele in item.value" :key="ele">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ ele }}
                  </el-tag>
                  <br />
                </div>
                <el-tag size="mini" style="cursor: pointer">
                  {{ "..." }}
                </el-tag>
              </el-tooltip>

              <i
                :class="item.afterIcon"
                @click="handleUpdate('更新注解', 'nodeItems')"
              />
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <header>
            <div class="card-title left-header">
              <span>配置信息</span>
            </div>
          </header>

          <section class="component-div">
            <el-row :gutter="24">
              <div
                style="
                  background: rgba(247, 249, 252);
                  border: 10px solid rgba(247, 249, 252);
                "
              >
                <monaco-editor
                  class="yamlStyle"
                  ref="monacoEditor"
                  :code="currentCode"
                  :read-only="true"
                  :language="language"
                  @handleBlur="handleBlur"
                  :btn-visible="btnVisible"
                />
              </div>
            </el-row>
          </section>
        </BaseCard>
      </el-col>
    </el-row>

    <UpdateLabelsDialog
      :title="title"
      :updateLabelsVisible="labelOrNodeVisible"
      @update:updateLabelsVisible="closeFormDialog"
      :labelsDialogForm="title == '更新标签' ? obj.labelItems : obj.nodeItems"
    />
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";
import UpdateLabelsDialog from "@/apps/container/views/components/UpdateLabelsDialog.vue";
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";

import { tableData, tableColumnList } from "./constant/index";

export default {
  name: "BaseInfo",
  components: {
    LineAlert,
    FoldableBlock,
    MonacoEditor,
    UpdateLabelsDialog,
  },
  props: {},
  data() {
    return {
      activeName: "1",

      title: "",

      labelOrNodeVisible: false,

      detailData: [
        {
          label: "资源类型",
          value: "KnativeEventing",
        },
        {
          label: "创建人",
          value: "",
        },

        {
          label: "创建时间",
          value: "所有命名空间",
        },

        {
          label: "标签",
          value: [
            "operatorframework.io/arch.amd64:supported",
            "operatorframework.io/arch.arm64:supported",
            "operatorframework.io/devops-tool-operator.operat....",
          ],
          afterIcon: "el-icon-edit",
        },

        {
          label: "注解",
          value: [
            "operatorframework.io/arch.amd64:supported",
            "operatorframework.io/arch.arm64:supported",
            "operatorframework.io/devops-tool-operator.operat....",
          ],
          afterIcon: "el-icon-edit",
        },
        {
          label: "更新时间",
          value: "",
        },
      ],

      obj: {
        labelItems: [
          { key: "label1", value: "chaosbale" },
          { key: "label2", value: "chaosbale" },
          { key: "label3", value: "chaosbale" },
          { key: "label4", value: "chaosbale" },
        ],
        nodeItems: [
          { key: "node1", value: "chaosbale" },
          { key: "node2", value: "chaosbale" },
        ],
      },

      // 事件详情数据
      language: "yaml",
      currentCode: "",
      inputCode: {},
      btnVisible: {
        autoUpdate: false, //自动更新
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
        full: true,
      },
      defaultCode: {
        clusterDefault: {
          apiVersion: "v1",
          kind: "ConfigMap",
          name: "config-br-default-channel",
        },
      },

      tableData,
      tableColumnList,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.currentCode = JSON.stringify(this.defaultCode, null, 2);
  },
  mounted() {},
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

    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },

    handleCreate(obj) {
      this.$router.push({
        path: "/catalog-management/operator/createInstance",
        query: { name: obj.label },
      });
    },

    handleUpdate(title, arr) {
      this.title = title;
      this.labelOrNodeVisible = true;
      // this.arrName = arr;
    },

    closeFormDialog() {
      this.labelOrNodeVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.base-info {
  margin-top: 20px;
}
.component-div {
  margin-top: 16px;
  padding: 0 20px;
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.container-top-left {
  width: 32%;
  height: 250px;
  border-right: 1px solid $border-color-one;
  padding-right: 20px;
  display: flex;
  align-items: center;
  .chart {
    height: 200px !important;
  }
}
.container-top-right {
  flex: 1;
  height: 250px;
  .el-select {
    margin-bottom: 20px;
  }
  .chart {
    height: 200px !important;
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%; //更改竖向分割线长度
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
}
.component-div-computed {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.component-div-computed2 {
  height: 200px;
  margin-top: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    height: 100%;
  }
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
// .li-link {
//   widows: 100%;
//   padding: 12px 16px;
//   text-align: left;
//   border-bottom: 1px solid #ccc;
//   overflow: hidden;
//   cursor: pointer;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   position: relative;
//   font-size: 16px;
//   color: rgb(50, 52, 55);
// }
// .li-link:hover,
// .isActive {
//   color: $color-primary;
//   background-color: $background-color;
// }
// .li-version {
//   font-size: 14px;
//   color: rgb(100, 102, 105);
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
// }
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 290px;
  height: 180px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  font-size: 14px;
  height: 65px;
  line-height: 21px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
