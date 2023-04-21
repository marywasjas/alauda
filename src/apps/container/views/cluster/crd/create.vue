<template>
  <div class="create-update-container">
    <div class="scroll-div">
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span v-if="type == 'add'">创建 {{ ruleForm.name }}</span>
            <span v-if="type == 'update'">更新 {{ ruleForm.name }}</span>
            <el-radio-group v-model="activeTab">
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="yaml">YAML</el-radio-button>
            </el-radio-group>
          </div>
        </header>
        <section v-if="activeTab === 'form'">
          <LineAlert
            content='某些字段可能无法以表单形式表示，请选择 "YAML视图" 编辑完整字段设置。'
            style="margin-top: 20px"
          />
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="margin-top"
          >
            <el-form-item label="资源类型">
              <span>{{ "Production" }}</span>
            </el-form-item>

            <el-row>
              <el-col :span="20">
                <el-form-item label="版本">
                  <span v-if="type == 'update'">{{ ruleForm.version }}</span>
                  <el-select
                    v-else
                    v-model="ruleForm.version"
                    @focus="setMinWidthEmpty"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in []"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="名称" prop="newName">
                  <el-input v-model="ruleForm.newName" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin-bottom: 10px">
              <el-col :span="20">
                <el-form-item
                  label="标签"
                  prop="labels"
                  style="margin-bottom: 0"
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
                      <tr
                        v-for="(domain, index) in ruleForm.labels"
                        :key="domain.id"
                      >
                        <td>
                          <el-form-item
                            label=""
                            :prop="'labels.' + index + '.key'"
                          >
                            <el-input v-model="domain.key" placeholder="键" />
                          </el-form-item>
                        </td>
                        <td>
                          <el-form-item
                            label=""
                            :prop="'labels.' + index + '.value'"
                          >
                            <el-input v-model="domain.value" placeholder="值" />
                          </el-form-item>
                        </td>
                        <td class="text-center">
                          <el-button
                            icon="el-icon-remove-outline"
                            class="cursor-pointer margin-left10 margin-right10"
                            type="text"
                            @click="handleDelete('labels', domain, index)"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                          <div
                            class="cursor-pointer text-center hover-div"
                            @click="handleAdd('labels')"
                          >
                            <i class="el-icon-circle-plus-outline" />
                            添加
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Description" prop="">
                  <el-input v-model="ruleForm.description" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    description of production
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Group" prop="">
                  <el-input v-model="ruleForm.group" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    which group it belong to. group is defined in layout.yaml.
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Homepage" prop="">
                  <el-input v-model="ruleForm.homepage" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item> URL </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="Index" prop="">
                  <el-input v-model="ruleForm.index" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    index of production.</el-descriptions-item
                  >
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Logo URL" prop="">
                  <el-input v-model="ruleForm.logoUrl" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    url of logo. MUST be svg or png.</el-descriptions-item
                  >
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Open in Blank" prop="">
                  <el-switch v-model="ruleForm.blank" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    will open homepage url in new tab if it is
                    true</el-descriptions-item
                  >
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Title" prop="">
                  <el-input v-model="ruleForm.title" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    Title of this production, read by
                    human</el-descriptions-item
                  >
                </el-descriptions>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="Version" prop="">
                  <el-input v-model="ruleForm.version2" />
                </el-form-item>

                <el-descriptions
                  size="small"
                  :colon="false"
                  :contentStyle="rowCenter"
                >
                  <el-descriptions-item>
                    version string of this production</el-descriptions-item
                  >
                </el-descriptions>
              </el-col>
            </el-row>
          </el-form>
        </section>

        <section v-if="activeTab === 'yaml'">
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
      <el-button type="primary" class="margin-left10" @click="submitCreate">
        {{ type === "add" ? "创建" : "更新" }}
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
      activeTab: "form",
      type: "",
      ruleForm: {
        name: "",
        labels: [
          {
            id: nanoid(),
            key: "",
            value: "",
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 0,
            max: 40,
            message: "长度在 0 到 40 个字符",
            trigger: "blur",
          },
        ],
        showName: [
          { required: true, message: "请输入显示名称", trigger: "blur" },
        ],
      },
      fileList: [],
      currentCode: "{}",
      inputCode: {},
      language: "yaml",
    };
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.name = this.$route.query.name;
    this.type = this.$route.query.type;
    if (this.type == "update") {
      this.ruleForm = {
        name: this.$route.query.name,
        version: "v1",
        newName: this.$route.query.name,
        labels: [
          { id: nanoid(), key: "chart", value: "alauda-container-platform" },
          { id: nanoid(), key: "chart", value: "alauda-container-platform" },
          { id: nanoid(), key: "chart", value: "alauda-container-platform" },
          { id: nanoid(), key: "chart", value: "alauda-container-platform" },
        ],
        description: "企业级云原生平台，帮助企业数字化转型，提升企业 IT 交付",
        group: "production",
        homepage: "/console-acp/",
        index: "0",
        logoUrl: "logos/tencent.svg",
        blank: false,
        title: "Container Platform",
        version2: "v2.15.0",
      };
    }
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
    // 删除
    handleDelete(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },
    // 增加
    handleAdd(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.ruleForm[filed].push(obj);
    },
    // 取消 按钮
    cancelCreate() {
      this.$router.go(-1);
    },
    // 更新
    submitCreate() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$set(this.ruleForm, "code", this.inputCode);
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },
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