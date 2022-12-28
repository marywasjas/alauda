<template>
  <div>
    <el-dialog
      :show-close="false"
      :visible.sync="visible"
      width="800px"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      custom-class="platform-dialog"
    >
      <div slot="title" class="platform_version">
        <div class="title-main">
          <div class="title">
            <img :src="logos" alt="">
            <div class="line" />
            <span>全栈云原生开放平台v3.8</span>
          </div>
          <div class="desc">
            直面业务挑战，助力数字化转型，为企业提供一站式云原生平台
          </div>
        </div>
        <img :src="platform_version_bg" alt="" class="bg-img">
      </div>
      <div class="dialog__content">
        <span>以下为平台默认开源组件及版本</span>
        <div class="select-cards">
          <div
            v-for="item in cards"
            :key="item.name"
            class="select-cards__item"
          >
            <img class="icon" :src="item.img">
            <div>
              <div class="title">{{ item.name }}</div>
              <div class="desc">{{ item.version }}</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import logos from '@/assets/logo.svg'
import platform_version_bg from '@/assets/platform_version_bg.svg'
import Kubernetes from '@/assets/icons/Kubernetes.svg'
import Docker from '@/assets/icons/Docker.svg'
import Containerd from '@/assets/icons/Containerd.svg'
import ETCD from '@/assets/icons/ETCD.svg'
import ElasticSearch from '@/assets/icons/ElasticSearch.svg'
import Kibana from '@/assets/icons/Kibana.svg'
import Zookeeper from '@/assets/icons/Zookeeper.svg'
import Kafka from '@/assets/icons/Kafka.svg'
import Grafana from '@/assets/icons/Kafka.svg'
import Prometheus from '@/assets/icons/Prometheus.svg'
import VictoriaMetrics from '@/assets/icons/VictoriaMetrics.svg'
import Istio from '@/assets/icons/Istio.svg'
import Jaeger from '@/assets/icons/Jaeger.svg'
export default {
  name: 'AboutPlatformsDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logos,
      platform_version_bg,
      cards: [
        {
          img: Kubernetes,
          name: 'Kubernetes',
          version: 'v1.21.10'
        },
        {
          img: Docker,
          name: 'Docker',
          version: 'v20.10.7'
        },
        {
          img: Containerd,
          name: 'Containerd',
          version: 'v1.4.6'
        },
        {
          img: ETCD,
          name: 'ETCD',
          version: 'v3.4.13'
        },
        {
          img: ElasticSearch,
          name: 'ElasticSearch',
          version: 'v6.8.13'
        },
        {
          img: Kibana,
          name: 'Kibana',
          version: 'v6.8.13'
        },
        {
          img: Zookeeper,
          name: 'Zookeeper',
          version: 'v3.5.6'
        },
        {
          img: Kafka,
          name: 'Kafka',
          version: 'v2.2.2'
        },
        {
          img: Grafana,
          name: 'Grafana',
          version: 'v7.5.16'
        },
        {
          img: Prometheus,
          name: 'Prometheus',
          version: 'v2.29.2'
        },
        {
          img: VictoriaMetrics,
          name: 'VictoriaMetrics',
          version: 'v1.67.0'
        },
        {
          img: Istio,
          name: 'Istio',
          version: 'v1.10.5/v1.12.4'
        },
        {
          img: Jaeger,
          name: 'Jaeger',
          version: 'v1.29.0'
        }
      ],
      formVisible: false
    }
  },
  computed: {},
  watch: {},
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
    },
    submitForm() {
      this.$router.push({
        name: 'CreateNativeApp'
      })
    }
  }
}
</script>
<style>
.platform-dialog .el-dialog__header {
  padding: 0;
  padding-bottom: 0;
}
.platform-dialog .el-dialog__body {
  padding: 0 20px 30px 20px;
}
</style>
<style lang="scss" scoped>
.platform_version {
  font-size: $font-size-18;
  padding: 0 24px;
  position: relative;
  height: 140px;
  color: #fff;
  display: flex;
  align-items: center;
  .title-main {
    z-index: 999;
    position: relative;
    .title {
      display: flex;
      align-items: center;
    }
    .line {
      height: 32px;
      width: 1px;
      opacity: 0.66;
      margin: 0 12px;
      background: $background-color;
    }
    img {
      width: 42px;
      height: 42px;
    }
  }
  .bg-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 140px;
  }
}
.dialog__content {
  .select-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    max-height: 312px;
    overflow-y: auto;
    .select-cards__item {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 2px;
      background-color: $background-color;
      .icon {
        grid-area: icon/icon;
        height: 40px;
        width: 40px;
        margin-right: 12px;
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
  }
}
</style>
