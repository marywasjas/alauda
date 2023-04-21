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
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }}</span>
            : &nbsp;&nbsp;
            <span v-if="item.label == '状态'">
              <i
                :class="
                  item.value === '已绑定' ? 'el-icon-lock' : 'el-icon-unlock'
                "
                style="color: #67c23a"
              />
              {{ item.value }}
            </span>

            <span v-else-if="item.label == '标签'">
              <el-tooltip placement="top" effect="dark">
                <div slot="content">{{ item.value }}</div>
                <el-tag size="mini">
                  {{
                    item.value.length > 15
                      ? item.value.substring(0, 30) + "..."
                      : item.value
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
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
              <el-tooltip placement="top" effect="dark">
                <div slot="content">{{ item.value }}</div>
                <el-tag size="mini">
                  {{
                    item.value.length > 15
                      ? item.value.substring(0, 30) + "..."
                      : item.value
                  }}
                </el-tag>
              </el-tooltip>

              <el-tooltip placement="bottom" effect="light">
                <div slot="content">
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
                  </el-tag>
                  <br />
                  <el-tag size="mini" style="margin-bottom: 10px">
                    {{ item.value }}
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

      <header>
        <div class="card-title left-header">
          <span>配置信息</span>
        </div>
      </header>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData2"
            :key="item.label"
            :span="24"
            class="label-value"
          >
            <span>{{ item.label }}</span>
            : &nbsp;&nbsp;
            <span v-if="item.label == '关联持久卷声明'">
              <el-tooltip placement="top" effect="dark">
                <template slot="content">{{ item.value }}</template>
                <span>
                  {{
                    item.value.length > 15
                      ? item.value.substring(0, 30) + "..."
                      : item.value
                  }}
                </span>
              </el-tooltip>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-dialog
      @close="labelVisible = false"
      :visible.sync="labelVisible"
      :title="title"
      width="60%"
    >
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
          <tr v-for="(domain, index) in obj[arrName]" :key="domain.id">
            <td>
              <el-input v-model="domain.key"></el-input>
            </td>
            <td>
              <el-input v-model="domain.value"></el-input>
            </td>
            <td class="text-center">
              <el-button
                icon="el-icon-remove-outline"
                class="
                  cursor-pointer
                  margin-left10 margin-right10
                  margin-top:-10px
                "
                type="text"
                @click="handleDeleteParams(arrName, domain, index)"
              />
            </td>
          </tr>

          <tr v-if="obj[arrName] == 0">
            <td colspan="5">
              <div style="height: 35px; line-height: 35px; text-align: center">
                无数据
              </div>
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <div
                class="cursor-pointer text-center hover-div"
                @click="handleAddParams(arrName)"
                style="height: 35px; line-height: 35px"
              >
                <i class="el-icon-circle-plus-outline" />
                添加
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleUpdateLabel"
          v-if="title == '更新标签'"
          >更新</el-button
        >
        <el-button
          type="primary"
          @click="handleUpdateNote"
          v-if="title == '更新注解'"
          >更新</el-button
        >
        <el-button @click="labelVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: {},
  props: {},
  data() {
    return {
      title: "",
      baseInfoData: [
        {
          label: "资源类型",
          value: "Production",
        },
        {
          label: "创建人",
          value: "",
        },
        {
          label: "标签",
          value: "bate.kubernetes.io/arch:amd64xxxyyyyysdgsdgasdads",
          afterIcon: "el-icon-edit",
        },
        {
          label: "注解",
          value: "bate.kubernetes.io/arch:amd64xxxyyyyysdgsdgasdads",
          afterIcon: "el-icon-edit",
        },
        {
          label: "创建时间",
          value: "2022-10-24 18:45:36",
        },

        {
          label: "更新时间",
          value: "",
        },
      ],

      baseInfoData2: [
        {
          label: "Description",
          value: "企业级云原生平台，帮助企业数字化转型，提升企业 IT 交付",
        },
        {
          label: "Group",
          value: "production",
        },
        {
          label: "HomePage",
          value: "/console-acp/",
        },
        {
          label: "Index",
          value: "",
        },
        {
          label: "Logo URL",
          value: "logos/tencent.svg",
        },
        {
          label: "Open In Black",
          value: "关闭",
        },
        {
          label: "Title",
          value: "Container Platform",
        },
        {
          label: "Version",
          value: "v2.15.0",
        },
      ],

      labelVisible: false,

      obj: {
        labelItems: [],
        nodeItems: [],
      },
      arrName: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    this.detailName = this.$route.query.name;
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

    handleUpdate(title, arr) {
      this.title = title;
      this.arrName = arr;
      this.labelVisible = true;
    },

    handleUpdateLabel() {},
    handleUpdateNote() {},

    handleAddParams(filed) {
      const itemObj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.obj[filed].push(itemObj);
    },

    handleDeleteParams(filed, item, index) {
      this.obj[filed].splice(index, 1);
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
.li-version {
  font-size: 14px;
  color: rgb(100, 102, 105);
  margin-top: 8px;
  display: flex;
  align-items: center;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
// .el-tag {
//   .el-tag--mini {
//     .el-tag--light {
//       white-space: nowrap; /*强制单行显示*/
//       text-overflow: ellipsis; /*超出部分省略号表示*/
//       overflow: hidden; /*超出部分隐藏*/
//       width: 260px; /*设置显示的最大宽度*/
//       display: inline-flex;
//       cursor:pointer
//     }
//   }
// }
</style>
