<template>
  <div class="create-update-container">
    <div class="scroll-div">
      <BaseCard>
        <header>
          <div class="card-title right-header">
            <span style="font-size: 18px; line-height: 24px; font-weight: bold">
              {{ `更新 ${ruleForm.name}` }}
            </span>
            <el-radio-group v-model="activeTab">
              <el-radio-button label="form">表单</el-radio-button>
              <el-radio-button label="yaml">YAML</el-radio-button>
            </el-radio-group>
          </div>
        </header>
        <section v-if="activeTab === 'form'">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="margin-top"
          >
            <el-form-item label="名称" prop="name">
              <span>{{ ruleForm.name }}</span>
            </el-form-item>

            <el-form-item label="大小" prop="container" style="width: 60%">
              <el-input v-model="ruleForm.container">
                <template slot="append">Gi</template>
              </el-input>
            </el-form-item>
            <el-descriptions
              size="small"
              :colon="false"
              :contentStyle="rowCenter"
            >
              <el-descriptions-item>
                存储大小的修改，依赖于底层存储产品的支持
              </el-descriptions-item>
            </el-descriptions>

            <el-form-item label="类型" prop="type">
              <span>{{ "-" }}</span>
            </el-form-item>

            <el-form-item label="访问模式" prop="accessMode">
              <el-radio-group v-model="ruleForm.accessMode">
                <el-radio-button label="rox">多节点只读（ROX）</el-radio-button>
                <el-radio-button label="rwo">单节点读写（RWO）</el-radio-button>
                <el-radio-button label="rwx">多节点读写（RWX）</el-radio-button>
              </el-radio-group>
              <!-- <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  单节点读写（ReadWriteOnce），即持久卷可以被一个节点以读写方式挂载；<br />
                  多节点只读（ReadOnlyMany），即持久卷可以被多个节点以只读方式挂载；<br />
                  多节点读写（ReadWriteMany），即持久卷可以被多个节点以读写方式挂载。<br />
                </div>
                <i class="el-icon-question question-icon margin-left10" />
              </el-tooltip> -->
            </el-form-item>

    
            <el-form-item label="回收策略" prop="recycPolicy">
              <el-radio-group v-model="ruleForm.recycPolicy">
                <el-radio-button label="remain">保留</el-radio-button>
                <el-radio-button label="delete">删除</el-radio-button>
              </el-radio-group>
              <!-- <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  文件系统：支持以文件目录方式挂载到容器组中使用，支持所有计算组件类型<br />
                  块设备：支持以原始块设备方式挂载使用，仅支持虚拟机类型计算组件<br />
                </div>
                <i class="el-icon-question question-icon margin-left10" />
              </el-tooltip> -->
            </el-form-item>


            <foldable-block btn-tex="高级">
              <el-form-item label="标签" prop="labels" style="margin-bottom: 0">
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
              <el-form-item
                label="注解"
                prop="annotations"
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
                      v-for="(domain, index) in ruleForm.annotations"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item
                          label=""
                          :prop="'annotations.' + index + '.key'"
                        >
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="'annotations.' + index + '.value'"
                        >
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleDelete('annotations', domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAdd('annotations')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
              <el-form-item
                v-if="ruleForm.createType === 'static'"
                label="选择器"
                prop="selectors"
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
                      v-for="(domain, index) in ruleForm.selectors"
                      :key="domain.id"
                    >
                      <td>
                        <el-form-item
                          label=""
                          :prop="'selectors.' + index + '.key'"
                        >
                          <el-input v-model="domain.key" placeholder="键" />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="'selectors.' + index + '.value'"
                        >
                          <el-input v-model="domain.value" placeholder="值" />
                        </el-form-item>
                      </td>
                      <td class="text-center">
                        <el-button
                          icon="el-icon-remove-outline"
                          class="cursor-pointer margin-left10 margin-right10"
                          type="text"
                          @click="handleDelete('selectors', domain, index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <div
                          class="cursor-pointer text-center hover-div"
                          @click="handleAdd('selectors')"
                        >
                          <i class="el-icon-circle-plus-outline" />
                          添加
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
            </foldable-block>
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
      <el-button type="primary" class="margin-left10" @click="submitCreate"
        >更新</el-button
      >
      <el-button @click="cancelCreate">取消</el-button>
    </div>
  </div>
</template>

<script>
import MonacoEditor from "@/apps/container/views/components/MonacoEditor";
import FoldableBlock from "@/apps/container/views/components/FoldableBlock";

import { nanoid } from "nanoid";

export default {
  name: "PersistentVolumeCreateUpdate",
  components: { MonacoEditor, FoldableBlock },
  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
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
        type: "",
        container: "",
        accessMode: "rox",
        recycPolicy: "remain",
        labels: [
          {
            id: nanoid(),
            key: "",
            value: "",
          },
        ],
        annotations: [
          {
            id: nanoid(),
            key: "",
            value: "",
          },
        ],
        selectors: [
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
        capacity: [{ required: true, message: "请输入容量", trigger: "blur" }],
      },
      storageClassOptions: [
        {
          value: "1",
          label: "储存类1",
        },
        {
          value: "2",
          label: "储存类2",
        },
      ],
      currentCode: "{}",
      inputCode: {},
      language: "yaml",
    };
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.name = this.$route.query.name;
    // this.type = this.$route.query.type
  },
  mounted() {},
  methods: {
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
