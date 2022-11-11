<template>
  <div>
    <el-dialog
      title="创建原生应用"
      :visible.sync="visible"
      width="800px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
    >
      <div class="dialog__content">
        <div class="select-cards">
          <div
            v-for="item in cards"
            :key="item.title"
            class="select-cards__item"
            @click="openCreate(item)"
          >
            <img class="icon" :src="item.img">
            <div class="title">
              <span>{{ item.title }}</span>
              <i class="el-icon-right" />
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <select-mirror :form-visible="formVisible" @closeFormDialog="closeFormDialog" />
  </div>
</template>

<script>
import formCreate from '@/apps/container/assets/images/nativeApp/form-create.svg'
import templateCreate from '@/apps/container/assets/images/nativeApp/template-create.svg'
import yamlCreate from '@/apps/container/assets/images/nativeApp/yaml-create.svg'
import SelectMirror from '@/apps/container/views/components/SelectMirror'
export default {
  name: 'AddNativeDialog',
  components: {
    SelectMirror
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cards: [
        {
          img: formCreate,
          title: '表单创建',
          desc: '通过表单界面手动创建应用，并在该应用下添加组件'
        },
        {
          img: templateCreate,
          title: '模板部署',
          desc: '通过应用市场内的应用模板，快速部署定制化的应用实例'
        },
        {
          img: yamlCreate,
          title: 'YAML一键创建',
          desc: '上传符合 Kubernetes 标准的 YAML 文件，一次性创建应用及其包含的组件'
        }
      ],
      formVisible: false
    }
  },
  computed: {},
  watch: {

  },
  created() {},
  mounted() {},
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 打开弹窗
    openDialog() {
      this.$emit('openDialog')
    },
    openCreate(item) {
      if (item.title === '表单创建') {
        this.formVisible = true
        this.closeDialog()
      } else if (item.title === 'YAML一键创建') {
        this.$router.push({
          name: 'YamlCreate'
        })
      }
    },
    closeFormDialog() {
      this.formVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog__content {
  .select-cards {
    display: grid;
    grid: 112px 112px/350px 350px;
    grid-gap: 20px;
    margin: 20px;
    .select-cards__item {
      display: grid;
      padding: 20px 12px 20px 28px;
      grid-template:
        "icon title" 24px
        "icon desc" 40px/40px 250px;
      grid-gap: 8px 20px;
      border-radius: $border-radius-m;
      border: 1px solid $border-color-one;
      .icon {
        grid-area: icon/icon;
        height: 40px;
        width: 40px;
      }
      .title {
        grid-area: title;
        font-size: $font-size-18;
        line-height: $line-height-20;
        font-weight: 500;
        color: $font-color-title;
        i {
          margin-left: 8px;
        }
      }
      .desc {
        grid-area: desc;
        font-size: $font-size-14;
        line-height: $line-height-18;
        color: $font-color-text;
      }
    }
    .select-cards__item:hover {
      box-shadow: 0 4px 16px 0 $box-shadow;
      cursor: pointer;
      .title {
        color: $color-primary;
      }
    }
  }
}
</style>
