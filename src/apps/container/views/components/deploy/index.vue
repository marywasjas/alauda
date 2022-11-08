<template>
  <div class="deploy-container">
    <DeployHeader :drop="drop" />
    <DeployTable :table-data="tableData" />
  </div>
</template>

<script>
import DeployHeader from './DeployHeader.vue'
import DeployTable from './DeployTable.vue'

export default {
  name: 'Deploy',
  components: {
    DeployHeader,
    DeployTable
  },
  data() {
    return {
      drop: {
        dropVal: '创建部署',
        dropList: [{ id: 0, txt: 'YAML创建' }]
      },
      tableData: [
        {
          name: { txt: '测试', link_name: 'builder-python' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: {
            txt: '测试',
            link_name: 'builder-python'
          },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '已停止', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '已停止', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        },
        {
          name: { txt: '测试', link_name: 'builder-python', link: 'https://www.baidu.com/' },
          create_time: '2016-05-03',
          status: { done: '运行中', desc: '（1/1）' },
          application: 'gzvhs-s1-km'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$color: #333;
$light_gray: #eee;

.deploy-container {
  width: 100%;
  padding: 20px 25px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid $light_gray;
}
</style>
