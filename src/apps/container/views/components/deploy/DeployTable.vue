<template>
  <div class="m-table">
    <el-table :data="tableData" size="large" :header-cell-style="{ background: 'rgb(64, 158, 255, 0.2)' }">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <a class="link_name" @click="detail(scope.row.name.link_name)">{{ scope.row.name.link_name }}</a>
          <div class="v_name">{{ scope.row.name.txt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <i :class="scope.row.status.done === '运行中' ? 'el-icon-success' : 'el-icon-warning'" />
          <span class="v_txt">{{ scope.row.status.done }}{{ scope.row.status.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="application" label="所属应用">
        <template slot-scope="scope">
          <a class="link_name" href="#">{{ scope.row.application }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column label="" align="center" width="70" class-name="small-padding fixed-width">
        <template>
          <i class="el-icon-more" />
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
  </div>
</template>

<script>
export default {
  name: 'DeployTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    detail(link_name) {
      this.$router.push({
        path: '/detail',
        query: {
          link_name: link_name // 传递的参数: 键值对
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$color: #333;
$light_gray: #eee;

.m-table {
  margin-top: 20px;
  padding: 0px 12px;
  border-radius: 5px;
  border: 1px solid $light_gray;
  background-color: rgb(64, 158, 255, 0.2);
  .el-table tr th {
    background-color: rgb(64, 158, 255, 0.2);
    color: $color;
  }
  .el-table tbody tr:hover > td {
    background-color: rgb(64, 158, 255, 0.2) !important;
  }
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: rgb(64, 158, 255, 0.2) !important;
  }

  .el-table td {
    padding: 15px 0;
  }
  .v_txt {
    margin-left: 5px;
  }
  .v_name {
    color: $bg;
  }
  .link_name {
    color: rgb(64, 158, 255);
  }
  .el-icon-success {
    color: rgb(64, 158, 255);
    font-size: 16px;
  }
  .el-icon-warning {
    font-size: 16px;
    color: $color;
  }
  .el-icon-more {
    transform: rotate(90deg);
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .el-pagination {
    background-color: #fff;
    padding: 25px 0 15px;
    text-align: right;
  }
}
</style>
