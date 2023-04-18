<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>{{ name }}</span>
        </div>
        <div style="float: right; margin-top: -35px">
          <el-dropdown trigger="click">
            <el-button class="margin-left10">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdate()">
                更新
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete()">
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <el-divider></el-divider>
      <section class="component-div">
        <el-row :gutter="24">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label === '状态'">
              <i
                :class="
                  item.value === '正常'
                    ? 'el-icon-success running'
                    : 'el-icon-warning stop'
                "
                style="color: #67c23a"
              />
              <span> {{ item.value }} </span>
            </span>

            <span v-else>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="update(item)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-dialog
      title="更新域名"
      @close="updateVisible = false"
      :visible.sync="updateVisible"
      width="60%"
    >
      <el-form
        ref="updateForm"
        :model="updateForm"
        :rules="updateRules"
        label-width="135px"
      >
        <el-form-item label="域名"> {{ updateForm.domainName }} </el-form-item>

        <el-form-item label="分配集群">
          <el-select
            v-model="updateForm.cluster"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in clusterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分配项目">
          <el-select
            v-model="updateForm.project"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="证书">
          <el-switch v-model="updateForm.cert"></el-switch>
        </el-form-item>

        <el-form-item label="公钥" v-if="updateForm.cert == true">
          <el-input
            v-model="updateForm.public"
            type="textarea"
            :rows="4"
          ></el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" style="color: #409eff">导入</i>
          </el-upload>
        </el-form-item>

        <el-form-item label="私钥" v-if="updateForm.cert == true">
          <el-input
            v-model="updateForm.private"
            type="textarea"
            :rows="4"
          ></el-input>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" style="color: #409eff">导入</i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_update"> 更新 </el-button>
        <el-button @click="updateVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="dialogDeleteVisible = false"
      :visible.sync="dialogDeleteVisible"
      width="40%"
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
          {{ `确定删除域名"${name}"吗` }}
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
import { nanoid } from "nanoid";
import LineAlert from "@/apps/container/views/components/LineAlert";

export default {
  name: "BaseInfo",
  components: { LineAlert },

  props: {},
  data() {
    return {
      name: "",
      baseInfoData: [
        {
          label: "类型",
          value: "泛域名",
        },
        {
          label: "创建人",
          value: "admin@cpaas.io",
        },
        {
          label: "集群",
          value: "region(region)",
        },
        {
          label: "创建时间",
          value: "2022-11-17",
        },
        {
          label: "项目",
          value: "所有项目",
        },
      ],
      // table: {
      //   tableData: [
      //   ],
      //   cols: [
      //     { label: "工具项目名称", id: "toolName" },
      //     { label: "访问级别", id: "viewLevel" },
      //     { label: "是否已关联", id: "relation" },
      //     {
      //       id: "operation",
      //       label: "",
      //       width: "60px",
      //       fixed: "right",
      //     },
      //   ],
      // },

      clusterOptions: [
        { label: "global(global)", value: "global(global)" },
        { label: "region(region)", value: "region(region)" },
      ],
      updateVisible: false,
      updateForm: {
        domainName: "",
        cluster: "",
        project: "",
        cert: false,
      },
      updateRules: {},

      dialogDeleteVisible: false,

      createVisible: false,
      createForm: {
        type: "全域名",
        domainName: "",
        cluster: "",
        project: "",
        cert: false,
      },
      createRules: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.name = this.$route.query.name;
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

    handelCreate() {
      this.createVisible = true;
    },
    handle_create() {},

    handleUpdate(obj) {
      this.updateVisible = true;
      this.updateForm.domainName = this.name;
      this.updateForm.cluster = "region(region)";
      this.updateForm.project = "所有项目";
    },

    handle_update() {},

    handleDelete(obj) {
      this.dialogDeleteVisible = true;
      this.name = obj.name;
    },

    handle_delete() {},
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
    // width: calc(100% - 250px);
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
  .el-row {
    margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
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
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
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
// .container-top-left {
//   width: 32%;
//   height: 250px;
//   border-right: 1px solid $border-color-one;
//   padding-right: 20px;
//   display: flex;
//   align-items: center;
//   .chart {
//     height: 200px !important;
//   }
// }
// .container-top-right {
//   flex: 1;
//   height: 250px;
//   .el-select {
//     margin-bottom: 20px;
//   }
//   .chart {
//     height: 200px !important;
//   }
//   .el-divider--vertical {
//     display: inline-block;
//     width: 1px;
//     height: 100%; //更改竖向分割线长度
//     margin: 0 8px;
//     vertical-align: middle;
//     position: relative;
//   }
// }
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 9px;
  height: 40px;
  line-height: 40px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: -5px;
  top: 48%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>