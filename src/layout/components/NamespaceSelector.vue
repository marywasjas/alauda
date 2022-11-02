<template>
  <div class="namespace-selector-container">
    <div class="namespace-selector">
      <el-popover
        ref="namespace-selector-popover"
        trigger="click"
      >
        <div class="namespace-selector-tooltip">
          <div class="filter">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="项目">
                <el-select v-model="formInline.project" filterable placeholder="请选择项目">
                  <el-option
                    v-for="item in projectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="集群">
                <el-select v-model="formInline.region" placeholder="请选择集群">
                  <el-option
                    v-for="item in regionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="resource-data-grid">
            <div class="header">
              <div class="header__title">
                <span>命名空间</span>
                <span class="header__desc">（{{ gridList.length }}）</span>
              </div>
              <el-input
                v-model="searchName"
                placeholder="按名称过滤"
                size="small"
                clearable
              >
                <i slot="prefix" class="el-input__icon el-icon-search" />
              </el-input>
            </div>
            <div class="grid">
              <div v-for="item in gridList" :key="item.name" :class="{'grid__item':true,'grid__item--selected':currentProjectNamespace===item.name}" @click="changeProject(item)">
                <!-- <i class="el-icon-check grid__field" /> -->
                <i class="grid__field el-icon-s-opportunity grid__field-icon" />
                <div class="grid__field grid__field-name">
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
                <div class="grid__field grid__field-cluster flex">
                  <div class="belonged-cluster">
                    <span class="with-colon">所属集群：</span>
                    <span>{{ item.region }}</span>
                  </div>
                </div>
                <div class="grid__field grid__field-time">
                  <span class="with-colon">创建时间：</span>
                  <span>{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          slot="reference"
          class="click-namespace-selector"
        >
          <div class="resource-selector__item project">
            <i class="el-icon-s-order" />
            <span class="with-colon">项目</span>
            <span class="selected-name text-truncate">{{ currentProjectName }}</span>
          </div>
          <div class="resource-selector__item namespace">
            <i class="el-icon-s-opportunity" />
            <span class="with-colon">命名空间</span>
            <span class="selected-name text-truncate">
              {{ currentProjectNamespace }} (
              <span class="with-colon">集群</span>
              )
            </span>
          </div>
          <div class="esource-selector__arrow">
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NamespaceSelector',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        project: '',
        region: ''
      },
      projectOptions: [
        {
          label: 'liuyu',
          value: 'liuyu'
        },
        {
          label: 'tenant905-01',
          value: 'tenant905-01'
        },
        {
          label: 'test',
          value: 'test'
        },
        {
          label: 'toda',
          value: 'toda'
        }

      ],
      regionOptions: [
        {
          label: '全部集群',
          value: '全部集群'
        },
        {
          label: 'global',
          value: 'global'
        },
        {
          label: 'region',
          value: 'region'
        },
        {
          label: 'region1',
          value: 'region1'
        }

      ],
      searchName: '',
      gridList: [
        {
          name: 'toda-elasticsearch-system',
          region: 'region1',
          time: '2022-04-26',
          id: '1'
        },
        {
          name: 'toda-elasticsearch',
          region: ' region2',
          time: '2022-04-30',
          id: '2'
        },
        {
          name: 'toda-elasticsearch3',
          region: ' region3',
          time: '2022-04-30',
          id: '3'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentProjectName',
      'currentProjectNamespace'
    ])
  },
  watch: {
    // formInline: {
    //   handler(newVal, oldVal) {
    //     const checkProject = newVal.project
    //     if (checkProject !== this.currentProjectName) {
    //       this.$store.dispatch('app/setCurrentProjectName', checkProject)
    //       this.$refs['namespace-selector-popover'].doClose()
    //     }
    //   },
    //   deep: true
    // }
  },
  created() {},
  mounted() {
    this.formInline.project = this.currentProjectName
    this.formInline.region = '全部集群'
  },
  methods: {
    changeProject(item) {
      this.$store.dispatch('app/setCurrentProjectNamespace', item.name)
      this.$refs['namespace-selector-popover'].doClose()
      if (this.formInline.project !== this.currentProjectName) {
        this.$store.dispatch('app/setCurrentProjectName', this.formInline.project)
        this.$refs['namespace-selector-popover'].doClose()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.namespace-selector-container {
  display: flex;
}
.namespace-selector-tooltip {
  display: flex;
  flex-direction: column;
  width: 1024px;
  max-height: 602px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 20px 8px 20px;
  margin-top: 8px;
  .filter {
    border-bottom: 1px solid rgb(237, 239, 242);
    box-shadow: none;
    // padding: 20px 0 0 0;
    margin-bottom: 20px;
    .el-form-item{
      margin-bottom: 20px;
    }
  }
  .resource-data-grid {
    padding: 0;
    box-shadow: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
      align-items: center;
      margin-bottom: 20px;
      height: 28px;
      justify-content:space-between;
      .header__title {
        font-size: 18px;
        font-weight: 500;
        line-height: 28px;
        color: #323437;
        .header__desc {
          color: #96989b;
        }
      }
      .el-input{
        width:200px;
      }
    }
    .grid {
      max-height: 382px;
      padding: 12px;
      overflow-y: auto;
      padding: 20px;
      background-color: rgb(247, 249, 252);
      border-radius: 4px;
      .grid__item {
        padding: 10px 20px;
        min-height: 60px;
        font-size: 14px;
        background-color: #FFF;
        margin-bottom: 8px;
        display: flex;
        position: relative;
        flex-direction: row;
        border-radius: 4px;
        color: rgb(50, 52, 55);
        align-items: center;
        border: 1px solid rgba(50,52,55,0.3);
        cursor: pointer;
        .grid__field {
          margin-right: 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .grid__field:last-child{
          margin-right: 0;
        }
        .grid__field-icon {
          font-size: 28px;
          display: inline-flex;
          color:#007af5
        }
        .grid__field-name {
          flex: 2;
          flex-direction: column;
          max-width: 280px;
          .name{
            font-size: 18px;
            line-height: 25px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .grid__field-cluster{
          flex: 2;
          display: flex;
          .belonged-cluster {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            padding-right: 44px;
          }
        }
        .grid__field-time{
          flex: 2;
        }
      }
      .grid__item:hover{
        border: 1px solid rgb(0,122,245);
        box-shadow: 0 0 8px 0 rgba(0,122,245,0.5);
      }
      .grid__item:last-child{
        margin-bottom: 0;
      }
      .grid__field{
        margin-right: 20px;
      }
      .grid__field:last-child{
        margin-right: 0;
      }
      .grid__item--selected {
        border: 1px solid #007af5;
        border-radius: 4px;
        background-color: #007af5;
        border-color: #007af5;
        color: #fff;
        cursor: default;
        .grid__field-icon {
          color:#fff
        }
      }
    }
  }
}
.click-namespace-selector {
  user-select: none;
  display: flex;
  color: rgb(50, 52, 55);
  cursor: pointer;
  padding: 0 8px 0 8px;
  align-items: center;
  .resource-selector__item {
    margin-right: 20px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    max-width: 270px;
    > i {
      color: #007af5;
      margin-right: 4px;
      font-size: 16px;
    }
    .selected-name {
      color: #646669;
    }
    .text-truncate {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .esource-selector__arrow {
    margin-left: -16px;
    align-items: center;
    display: inline-flex;
    width: 16px;
    justify-content: center;
  }
}
.click-namespace-selector:hover {
  background-color: #007af5;
  color: #fff;
  border-radius: 2px;
  i {
    color: #fff;
  }
  .selected-name {
    color: #fff;
  }
}
.product-select-tooltip {
  // margin-top: 18px;
  background-color: #fff;
  padding: 20px 20px 12px 20px;
  border-radius: 4px;
  // max-width: 840px;
  .menu {
    display: flex;
    flex-wrap: wrap;
    .menu__item {
      width: 120px;
      height: 148px;
      display: flex;
      position: relative;
      flex-direction: column;
      border-radius: 4px;
      border: 1px solid rgba(50, 52, 55, 0.3);
      padding: 20px 8px 12px 8px;
      margin-left: 16px;
      margin-bottom: 12px;
      align-items: center;
      cursor: pointer;
      background-color: rgb(247, 249, 252);
      > i {
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(0, 122, 245);
        margin-bottom: 12px;
      }
      .menu__item-info {
        min-width: 0;
        height: 44px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(50, 52, 55);
        display: flex;
        align-items: flex-start;
        text-align: center;
        overflow: hidden;
        overflow-wrap: anywhere;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .menu__item:hover {
      border: 1px solid rgb(0, 122, 245);
      box-shadow: 0 0 8px 0 rgba(0, 122, 245, 0.5);
    }
    .menu__item--actived {
      border: 1px solid rgb(0, 122, 245);
      background-color: rgb(0, 122, 245);
      border-color: rgb(0, 122, 245);
      color: white;
      cursor: default;
      position: relative;
      > i {
        color: #fff;
      }
      .menu__item-info {
        color: #fff;
      }
    }
  }
  .portal {
    display: flex;
    justify-content: flex-end;
    .portal__item {
      display: flex;
      align-items: center;
      height: 26px;
      padding: 0 8px;
      font-size: 16px;
      font-weight: 500;
      color: #007af5;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
.with-colon {
  display: inline-flex;
  word-break: keep-all;
  flex-shrink: 0;
  font-weight: 500;
}
</style>
