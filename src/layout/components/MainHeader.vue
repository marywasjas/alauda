<template>
  <div class="main-header">
    <div class="page-header__left">
      <div class="page-header__logo">
        <a href="/">
          <img :src="logoSrc" alt="logo">
        </a>
      </div>
      <div class="page-header__separator" />
      <product-select />
    </div>
    <div class="page-header__center">
      <namespace-selector />
    </div>
    <div class="page-header__right">
      <right-menu />
    </div>
  </div>
</template>

<script>
import logoSrc from '@/assets/logo/logo.png'
import ProductSelect from './ProductSelect.vue'
import RightMenu from './RightMenu.vue'
import NamespaceSelector from './NamespaceSelector.vue'
export default {
  name: 'MainHeader',
  components: {
    ProductSelect,
    RightMenu,
    NamespaceSelector
  },
  props: {},
  data() {
    return {
      logoSrc
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.main-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 20px 0 16px;
    background: #fff;
  }
.page-header__left {
  min-width: 280px;
  max-width: 400px;
  display: flex;
  align-items: center;
  .page-header__logo {
    display: flex;
    align-items: center;
    min-width: 32px;
    max-width: 160px;
    img {
      height: 32px;
    }
  }
  .page-header__separator {
    height: 32px;
    width: 1px;
    background-color: #646669;
    margin: 0 8px 0 16px;
    opacity: 0.1;
  }
}
.page-header__center{
  flex: 1;
}
</style>
