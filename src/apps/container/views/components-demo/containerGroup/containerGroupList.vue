<template>
  <div class="group-container">
    <LineAlert :content="content" />
    <ContainerGroupTable log-back-name="ContainerGroupDetail" />
  </div>
</template>

<script>
import LineAlert from '@/apps/container/views/components/LineAlert/index.vue'
import ContainerGroupTable from '@/apps/container/views/components/ContainerGroupTable/ContainerGroup.vue'
export default {
  name: 'ContainerGroupList',
  components: { LineAlert, ContainerGroupTable },
  props: {},
  data() {
    return {
      content: '容器组即 Kubernetes Pod，是在 Kubernetes 中可以创建和管理的最小计算单元。'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.group-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
}
</style>
