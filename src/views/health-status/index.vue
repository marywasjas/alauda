<template>
  <div class="health-status">
    <div class="banner">
      <div class="content">
        <div class="title">
          <span class="name">全栈云原生开放平台</span>平台实时监控数据
        </div>
        <div class="count">
          <i class="el-icon-success icon-success" />
          健康功能数10
        </div>
        <div class="tip" style="margin-bottom: 20px">故障数 = 0 的功能个数</div>
        <div class="count">
          <i class="el-icon-warning icon-danger" />
          故障功能数1
        </div>
        <div class="tip">故障数 > 0 的功能个数</div>
      </div>
      <img :src="health_check_banner" alt="">
    </div>
    <div class="flex-div-main">
      <div class="div-main">
        <div v-for="item in gridData" :key="item.label" class="flex-cell">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="flex-center">
              <div class="left-header">
                <i :class="item.icon" style="margin-right: 6px" />
                <span>{{ item.label }}</span>
              </div>
              <span style="float: right; font-size: 12px; color: #999999">
                <i class="el-icon-stopwatch" />
                {{ item.time }}
              </span>
            </div>
            <div>
              <transverse-bar :chart-data="item.barData" />
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import health_check_banner from '@/assets/health-status/health_check_banner.svg'
import TransverseBar from '@/apps/container/views/components/TransverseBar'
import Mock from 'mockjs'
export default {
  name: 'HealthStatus',
  components: { TransverseBar },
  props: {},
  data() {
    const gridData = Mock.mock([
      {
        label: '监控',
        icon: 'el-icon-s-marketing',
        time: '3分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '监控',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '告警',
        icon: 'el-icon-message-solid',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '告警',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '日志',
        icon: 'el-icon-tickets',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '日志',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '事件',
        icon: 'el-icon-s-unfold',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '事件',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '通知',
        icon: 'el-icon-chat-dot-square',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '通知',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '审计',
        icon: 'el-icon-notebook-2',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '审计',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '运营统计',
        icon: 'el-icon-notebook-1',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '运营统计',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '集群',
        icon: 'el-icon-film',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '集群',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '项目管理',
        icon: 'el-icon-s-finance',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '项目管理',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      },
      {
        label: '用户权限',
        icon: 'el-icon-set-up',
        time: '1分钟之前',
        barData: {
          fields: [
            {
              name: '健康',
              flied: 'jk',
              itemStyle: {
                color: '#29C78E'
              }
            },
            {
              name: '故障',
              flied: 'gz',
              itemStyle: {
                color: '#F56C6C'
              }
            }
          ],
          data: [
            {
              label: '用户权限',
              jk: '@integer(0 ,10)',
              gz: '@integer(0 ,10)'
            }
          ]
        }
      }
    ])
    return {
      health_check_banner,
      gridData
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
.health-status {
  width: 100%;
  min-height: 100%;
  background: $background-color;
  .banner {
    position: relative;
    color: #fff;
    padding: 20px 0 20px 206px;
    height: 232px;
    overflow: hidden;
    .content {
      position: relative;
      z-index: 1;
      .title {
        margin-top: 10px;
        font-size: $font-size-24;
        line-height: $line-height-38;
        margin-bottom: 20px;
        .name {
          margin-right: 8px;
        }
      }
      .count {
        font-size: $font-size-20;
        margin-bottom: 4px;
        i {
          margin-right: 8px;
        }
      }
      .tip {
        color: $font-color-subtext;
        line-height: $line-height-20;
        font-size: $font-size-14;
      }
      .icon-success {
        color: $button-color-success;
      }
      .icon-danger {
        color: $button-color-danger;
      }
    }
    > img {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
  }
  .flex-div-main {
    max-width: 1770px;
    margin: 0 auto;
    padding: 20px;
    .div-main {
      gap: 16px 16px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
    .left-header {
      i {
        color: $color-primary;
      }
    }
  }
}
</style>
