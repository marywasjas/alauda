<template>
  <div class="create-container">
    <div class="scroll-div">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div style="font-size: 20px; line-height: 24px; font-weight: bold">
            创建通知服务器
          </div>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          :rules="infoRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "基本信息" }}</h2>
          </div>

          <el-form-item label="名称" prop="name">
            <el-col :span="16">
              <span v-if="this.name">{{ infoForm.name }}</span>
              <el-input
                v-else
                v-model="infoForm.name"
                placeholder="以 a-z 开头，以 a-z、0-9 结尾，支持使用 a-z、0-9、-"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="显示名称" prop="showName">
            <el-col :span="16">
              <el-input
                v-model="infoForm.showName"
                placeholder="输入显示名称"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="描述" prop="desc">
            <el-col :span="16">
              <el-input
                type="textarea"
                :row="1"
                v-model="infoForm.desc"
                placeholder="输入描述信息"
              />
            </el-col>
          </el-form-item>
        </el-form>

        <el-form
          ref="regionForm"
          :model="regionForm"
          :rules="regionRules"
          label-width="135px"
        >
          <div class="recomend-list">
            <h2>{{ "服务器配置" }}</h2>
          </div>

          <el-form-item label="服务器地址" prop="serverAddress">
            <el-col :span="16">
              <el-input
                v-model="regionForm.serverAddress"
                placeholder="输入服务器地址"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="端口" prop="port">
            <el-col :span="16">
              <el-input
                v-model="regionForm.port"
                placeholder="输入服务器地址"
              />
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-checkbox-group v-model="regionForm.ssl">
              <el-checkbox label="使用 SSL" name="ssl"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-checkbox-group v-model="regionForm.verification">
              <el-checkbox
                label="跳过非安全验证"
                name="verification"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="fixed-div">
      <el-button v-if="this.name" type="primary" @click="handleUpdate"
        >更新</el-button
      >
      <el-button v-else type="primary" @click="handleCreate">创建</el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "ClusterCreate",
  components: {},
  data() {
    return {
      name: "",
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "125px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      regionForm: {
        serverAddress: "",
        port: "",
        ssl: false,
        verification: false,
      },

      regionRules: {
        serverAddress: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
        port: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
      },

      infoForm: {
        name: "",
        showName: "",
        desc: "",
      },

      infoRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        showName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.name = this.$route.query.name;
    if (this.name) {
      this.infoForm = {
        name: this.name,
        showName: "msg-server001",
        desc: "",
      };
      this.regionForm = {
        serverAddress: "1",
        port: "1",
        ssl: false,
        verification: false,
      };
    }
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

    handleCreate() {},
    handleUpdate() {},

    // 取消-返回
    cancelCreate() {
      this.$router.go(-1);
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
</style>