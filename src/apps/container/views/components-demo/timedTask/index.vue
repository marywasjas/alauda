<template>
  <div class="timer-container">
    <DeployHeader :drop="drop" :table-data="tableData" />
  </div>
</template>

<script>
import DeployHeader from '../deploy/DeployHeader.vue'

export default {
  name: 'TimedTask',
  components: {
    DeployHeader
  },
  data() {
    return {
      drop: {
        dropVal: '创建定时任务',
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

<style rel="stylesheet/scss" lang="scss" scoped></style>
