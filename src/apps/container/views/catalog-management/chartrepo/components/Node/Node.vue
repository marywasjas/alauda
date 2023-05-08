<template>
  <div class="calculation-container-group">
    <BaseCard>
      <section>
        <div style="text-align: left">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-position="left"
            inline
          >
            <el-form-item label="容器组：">
              <el-select
                filterable
                placeholder="请选择"
                style="margin-right: 10px"
                v-model="ruleForm.containerGroup"
              >
                <el-option
                  v-for="item in [
                    {
                      value: 'cpaas-system-rdsgs87g89',
                      label: 'cpaas-system-rdsgs87g89',
                    },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="容器：">
              <el-select
                filterable
                placeholder="请选择"
                v-model="ruleForm.container"
              >
                <i slot="prefix" class="el-input__icon el-icon-search" />
                <el-option
                  v-for="item in [{ value: 'nginx', label: 'nginx' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <!-- 2 表格 和 分页器-->
        <div class="card__content">
          <Yaml />
        </div>
      </section>
    </BaseCard>
  </div>
</template>

<script>
import { tableColumnList, tableData } from "./constant/index";
import Yaml from "@/apps/container/views/components/Details/Yaml";
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: { Yaml },

  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },
      tableColumnList,
      tableData,

      ruleForm: {
        containerGroup: "",
        container: "",
      },
      rules: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
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
  },
};
</script>
<style lang="scss" scoped>
.calculation-container-group {
  margin-top: 20px;
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