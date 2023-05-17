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
            <span v-if="item.label == '标签'">
              <el-tag size="mini" closable
                >bate.kubernetes.io/arch:amd64</el-tag
              >
              <i :class="item.afterIcon" @click="handleAddTag" />
            </span>
            <span v-else-if="item.label == '注解'">
              <el-tag size="mini" closable
                >bate.kubernetes.io/arch:amd64</el-tag
              >
              <i :class="item.afterIcon" @click="handleNoteTag" />
            </span>
            <span v-else>
              {{ item.value ? item.value : "-" }}
              <i :class="item.afterIcon" @click="updateName(item.label)" />
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>资源配额</span>
        </div>
      </header>
      <section>
        <div class="card__content">
          <el-table
            :data="table.tableData"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <el-table-column
              v-for="col in table.cols"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div v-if="col.id === 'disrate'">
                  <progress-card :chartData="progressData" />
                  {{ scope.row[col.id] }}
                </div>

                <div v-else>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>

    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>容器限额</span>
        </div>
      </header>
      <section>
        <div class="card__content">
          <el-table
            :data="tableData.data"
            style="width: 100%"
            header-row-class-name="headerStyle"
            class="margin-top"
          >
            <el-table-column
              v-for="col in tableColumnList"
              :key="col.id"
              :label="col.label"
              :show-overflow-tooltip="col['show-overflow-tooltip']"
              :sortable="col.sortable"
              :width="col.width"
              :fixed="col.fixed"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row[col.id] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </BaseCard>

    <el-dialog
      title="更新显示名称"
      @close="cancelUpdateNameDialog"
      :visible.sync="updateNameDialog"
      width="60%"
    >
      <el-form
        ref="updateNameForm"
        :model="updateNameForm"
        :rules="updateNameRules"
        label-width="135px"
      >
        <el-form-item label="名称"> {{ detailName }} </el-form-item>
        <div style="margin-top: 20px">
          <el-form-item label="显示名称">
            <el-input v-model="updateNameForm.showName"> </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateName"> 更新 </el-button>
        <el-button @click="updateNameDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="addTagVisible = false"
      :visible.sync="addTagVisible"
      title="更新标签"
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
          <tr v-for="(domain, index) in roleItems" :key="domain.id">
            <td>
              <el-input v-model="domain.key"> </el-input>
            </td>
            <td>
              <el-input v-model="domain.value"> </el-input>
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
                @click="handleDeleteParams('roleItems', domain, index)"
              />
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <div
                class="cursor-pointer text-center hover-div"
                @click="handleAddParams('roleItems')"
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
        <el-button type="primary" @click="handleAdd">更新</el-button>
        <el-button @click="addTagVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="addNoteVisible = false"
      :visible.sync="addNoteVisible"
      title="更新注释"
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
          <tr v-for="(domain, index) in noteItems" :key="domain.id">
            <td>
              <el-input v-model="domain.key"> </el-input>
            </td>
            <td>
              <el-input v-model="domain.value"> </el-input>
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
                @click="handleDeleteNote('noteItems', domain, index)"
              />
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <div
                class="cursor-pointer text-center hover-div"
                @click="handleAddNote('noteItems')"
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
        <el-button type="primary" @click="handle_AddNote">更新</el-button>
        <el-button @click="addNoteVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import ProgressCard from "./ProgressCard.vue";
import { nanoid } from "nanoid";
import { tableData, tableColumnList } from "./constant/index";

export default {
  name: "BaseInfo",
  components: {
    LineAlert,
    ProgressCard,
  },
  props: {},
  data() {
    return {
      tableData,
      tableColumnList,

      detailName: "",
      baseInfoData: [
        {
          label: "显示名称",
          value: "",
          afterIcon: "el-icon-edit",
        },
        {
          label: "创建人",
          value: "",
        },
        {
          label: "命名空间管理员",
          value: "",
        },
        {
          label: "创建于",
          value: "2023-02-23 08:42:21",
        },
        {
          label: "注解",
          value: "",
          afterIcon: "el-icon-edit",
        },
        {
          label: "标签",
          value: "",
          afterIcon: "el-icon-edit",
        },
        {
          label: "所属集群",
          value: "region",
        },
      ],

      progressData: [
        {
          normal: 12,
          abnormal: 0,
          total: 12,
        },
      ],

      updateNameDialog: false,

      updateNameForm: {
        showName: "",
      },
      updateNameRules: {},

      table: {
        tableData: [
          {
            roleName: "CPU",
            quota: "不限制",
            usage: "-",
            disrate: "-",
          },
          {
            roleName: "内存",
            quota: "不限制",
            usage: "-",
            disrate: "-",
          },
          {
            roleName: "存储",
            quota: "不限制",
            usage: "-",
            disrate: "-",
          },
          {
            roleName: "Pods 数",
            quota: "不限制",
            usage: "-",
            disrate: "-",
          },
          {
            roleName: "PVC 数",
            quota: "不限制",
            usage: "-",
            disrate: "-",
          },
        ],
        cols: [
          { label: "资源类型", id: "roleName", width: 250 },
          { label: "已分配", id: "usage", width: 250 },
          { label: "配额", id: "quota", width: 250 },
          { label: "分配率", id: "disrate" },
        ],
      },

      updateLabelsVisible: false,
      dialogTitle: "显示更新名称",

      addTagVisible: false,

      roleItems: [],

      addNoteVisible: false,

      noteItems: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.detailName = this.$route.query.name;
    // this.detailData.filter((item) => {
    //   return item.label == "显示名称";
    // })[0].value = this.$route.query.name;

    // this.resource = this.resourceList[0];
    // this.version = this.resource.version[0];
  },
  mounted() {},
  methods: {
    handleUpdateName() {},
    updateName() {
      // this.updateNameForm.showName = this.detailName;
      this.updateNameDialog = true;
    },
    cancelUpdateNameDialog() {
      this.updateNameDialog = false;
    },
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    handleAddTag() {
      this.addTagVisible = true;
    },

    handleAddParams(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.roleItems.push(obj);
    },

    handleDeleteParams(filed, item, index) {
      this.roleItems.splice(index, 1);
    },
    handleAdd() {},

    handleNoteTag() {
      this.addNoteVisible = true;
    },

    handleAddNote(filed) {
      const obj = {
        id: nanoid(),
        key: "",
        value: "",
      };
      this.noteItems.push(obj);
    },

    handleDeleteNote(filed, item, index) {
      this.noteItems.splice(index, 1);
    },
    handle_AddNote() {},
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
.box-card-component[data-v-bf9aba9c] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  padding: 0px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
