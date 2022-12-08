<template>
  <div class="event-container margin-top">
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span />
        </div>
      </header>
      <section class="component-div">
        <el-form :model="searchForm" label-width="90px" label-suffix=":">
          <div class="flex-start">
            <el-form-item label="资源类型" style="margin-bottom: 10px;width:40%;">
              <el-select
                v-model="searchForm.containerGroup"
                placeholder="默认为全部"
                style="width: 100%"
              >
                <el-option
                  v-for="con in containerGroupList"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="事件原因" style="margin-bottom: 10px;width:40%;">
              <el-select
                v-model="searchForm.container"
                placeholder="默认为全部"
                style="width: 100%"
              >
                <el-option
                  v-for="con in containerList"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex-center">
            <el-form-item label="资源名称" style="margin-bottom: 10px;flex:1;">
              <el-select
                v-model="searchForm.logType"
                placeholder="可输可选，按回车确定，支持添加多个资源名称"
                multiple
                collapse-tags
                style="width: 100%"
              >
                <el-option label="当前容器日志" value="currentLog" />
                <el-option label="历史容器日志" value="historyLog" />
              </el-select>
            </el-form-item>
            <el-form-item label="" style="margin-bottom: 10px;margin-left:10px;" label-width="0px">
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </section>
    </BaseCard>
    <BaseCard>
      <header>
        <div class="card-title left-header">
          <span>共{{ page.total }}条</span>
        </div>
      </header>
      <section class="component-div">
        <div>
          <div class="text-right">
            <el-select
              v-model="containerTime"
              filterable
              placeholder="请选择"
              size="mini"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <div class="event-list-wrapper">
              <div v-for="event in eventData.data" :key="event.id" class="event-card">
                <div class="card-header flex-center">
                  <div class="resource flex-center">
                    <el-tag effect="dark">{{ event.type }}</el-tag>
                    <div class="text margin-left10">
                      <span>{{ event.title }}</span>
                      <i class="el-icon-thumb cursor-pointer margin-left10" @click="openDetails(event)" />
                    </div>
                  </div>
                  <div class="time" title="触发时间">
                    <i class="el-icon-stopwatch margin-right10" />
                    <span>{{ event.time }}</span>
                  </div>
                </div>
                <div class="card-context flex-center margin-top10">
                  <div class="detail">
                    <span class="circle" />
                    <span class="message">{{ event.message }}</span>
                  </div>
                  <div class="number">过去{{ event.date }}天发生{{ event.number }}次</div>
                </div>
              </div>
            </div>
            <el-pagination
              :current-page="page.current"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </section>
    </BaseCard>
    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      title="事件详情"
      :visible="detailVisible"
      :code="code"
      :read-only="true"
      :btn-visible="btnVisible"
      :language="language"
      @closeDetailsDialog="closeDetailsDialog"
    />
  </div>
</template>

<script>
import Mock from 'mockjs'
import MonacoEditorDialog from '@/apps/container/views/components/MonacoEditorDialog'

export default {
  name: 'Event',
  components: { MonacoEditorDialog },
  props: {},
  data() {
    const eventData = Mock.mock({
      'data|10': [{
        'id|+1': 1,
        type: 'pod',
        title: '@word(10,30)',
        time: '@time',
        message: '@word(10,30)',
        number: '@integer(0 ,1000)',
        date: '@integer(0 ,10)',
        spec: {
          detail: {
            cluster_name: 'global',
            event: {
              count: 6713,
              eventTime: null,
              firstTimestamp: '2022-10-14T05:33:11Z',
              involvedObject: {
                apiVersion: 'v1',
                fieldPath: 'spec.containers{ubuntu}',
                kind: 'Pod',
                name: 'ubuntu-bq84l',
                namespace: 'toda-elasticsearch-system',
                resourceVersion: '519516627',
                uid: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0'
              },
              lastTimestamp: '2022-11-07T01:33:22Z',
              message:
                'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
              metadata: {
                creationTimestamp: '2022-11-07T01:18:15Z',
                name: 'ubuntu-bq84l.171dd899b971f3ab',
                namespace: 'toda-elasticsearch-system',
                resourceVersion: '603142979',
                uid: 'c61582db-0ce2-469d-8606-9854962ffc82'
              },
              reason: 'Pulled',
              reportingComponent: '',
              reportingInstance: '',
              source: {
                component: 'kubelet',
                host: '172.16.129.51'
              },
              type: 'Normal'
            },
            operation: 'Pulled',
            operator: 'kubelet@172.16.129.51',
            source: 'kubernetes'
          },
          log_level: 0,
          resource_id: '441f41bd-77d5-4f1d-90c4-2b0aee37e7e0',
          resource_type: 'Pod',
          time: '1667783895000000'
        }
      }]
    })
    return {
      searchForm: {
        containerGroup: '',
        container: '',
        logType: ''
      },
      containerGroupList: [
        {
          label: 'nginx-nginx-75b4568c7c-fphvc',
          value: 'nginx-nginx-75b4568c7c-fphvc'
        }
      ],
      containerList: [{ label: 'nginx', value: 'nginx' }],
      containerTime: '近 1 小时',
      timeOptions: [
        {
          value: '近 1 小时',
          label: '近 1 小时'
        },
        {
          value: '近 3 小时',
          label: '近 3 小时'
        },
        {
          value: '近 12 小时',
          label: '近 12 小时'
        },
        {
          value: '近 1 天',
          label: '近 1 天'
        },
        {
          value: '近 3 天',
          label: '近 3 天'
        },
        {
          value: '近 7 天',
          label: '近 7 天'
        }
      ],
      eventData,
      page: {
        total: 10,
        current: 1,
        pageSize: 10
      },
      // 事件详情数据
      detailVisible: false,
      code: '',
      language: 'json',
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 事件详情
    openDetails(row) {
      this.detailVisible = true
      this.code = JSON.stringify(row.spec, null, 2)
    },
    closeDetailsDialog() {
      this.detailVisible = false
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.current = val
    }
  }
}
</script>
<style lang="scss" scoped>
.event-container {
  .event-list-wrapper{
    margin-top: 10px;
    .event-card{
      border-radius: 2px;
      margin-bottom: 8px;
      padding: 20px;
      border:1px solid $border-color-one;
      .card-header{
        box-sizing: border-box;
      }
      .text{
        color: $font-color-title;
        font-weight: bold;
      }
      .number,.time{
        color: $font-color-text;
        font-size: $font-size-14;
      }
      .circle{
        display:inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background:$color-primary;
        margin-right: 8px;
      }
    }
  }
  .el-pagination{
    text-align: right;
  }
}
</style>
