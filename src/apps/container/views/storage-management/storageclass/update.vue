<template>
  <div class="create-update-container">
    <div class="scroll-div">
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span>更新 {{ name }}</span>
          </div>
        </header>

        <section>
          <div class="yaml-div">
            <monaco-editor
              ref="monacoEditor"
              :code="currentCode"
              :read-only="false"
              :language="language"
              @handleBlur="handleBlur"
            />
          </div>
        </section>
      </BaseCard>
    </div>

    <div class="fixed-div">
      <el-button type="primary" class="margin-left10" @click="submitForm">
        更新
      </el-button>
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import LineAlert from "@/apps/container/views/components/LineAlert";
import { nanoid } from "nanoid";

export default {
  name: "ConfigureDictionaryCreateUpdate",
  components: { MonacoEditor, LineAlert },
  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "600px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "110px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      name: "",

      currentCode: "{}",
      inputCode: {},
      language: "yaml",
    };
  },
  computed: {},

  created() {
    this.name = this.$route.query.name;
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
    // 编辑器失去焦点
    handleBlur(value) {
      this.inputCode = value;
    },
    // 取消
    cancelCreate() {
      this.$router.go(-1);
    },
    // 更新
    submitForm() {},
  },
};
</script>
<style lang="scss" scoped>
.create-update-container {
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
  .item-div {
    background: $background-color;
    border-radius: $border-radius-l;
    padding: 10px;
  }
  .file-icon {
    font-size: 40px;
    color: $font-color-subtext;
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
}
</style>