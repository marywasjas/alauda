<template>
  <div class="not-deployed">
    <div>
      <img :src="notDeployed" alt="">
      <p>未启用{{ dataType }}功能</p>
      <p class="sub-title">请联系平台管理员在平台管理中部署 {{ operator }}</p>
    </div>
  </div>
</template>

<script>
import notDeployed from '@/apps/container/assets/images/dataService/not-deployed.svg'
export default {
  name: 'NotDeployed',
  components: {},
  props: {
    dataType: {
      type: String,
      default: ''
    },
    operator: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      notDeployed
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
.not-deployed{
  width: 100%;
  height: 100%;
  background:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align: center;
}
.sub-title{
  font-size: $font-size-14;
  color: $font-color-text;
}
</style>
