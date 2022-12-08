<template>
  <div class="dataService-container">
    <not-deployed :data-type="dataType" :operator="operator" />
  </div>
</template>

<script>

import NotDeployed from '@/apps/container/views/components/NotDeployed'

export default {
  name: 'DataServiceKafka',
  components: { NotDeployed },
  props: {},
  data() {
    return {
      dataType: 'Kafka',
      operator: 'Kafka Operator'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.dataService-container{
  padding: 0 20px;
  background-color: $background-color;
  border-radius: $border-radius-l;
  height: 100%;
  width: 100%;
}
</style>
