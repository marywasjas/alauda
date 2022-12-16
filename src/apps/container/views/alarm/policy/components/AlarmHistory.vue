<template>
  <BaseCard class="margin-top">
    <header>
      <div class="card-title right-header">
        <span>{{ name }}</span>
        <el-select
          v-model="filterTime"
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
    </header>
    <section>
      <el-table
        class="margin-top"
        :data="portData.data"
        style="width: 100%"
        height="100%"
        header-row-class-name="headerStyle"
      >
        <el-table-column
          v-for="col in portColumnList"
          :key="col.id"
          :label="col.label"
        >
          <template slot-scope="scope">
            <div v-if="col.id === 'date'" class="name-cell">
              <span>{{ scope.row.startDate }}</span>至
              <span>{{ scope.row.endDate }}</span>
            </div>
            <div v-else>
              {{ scope.row[col.id] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </BaseCard>
</template>

<script>
import Mock from 'mockjs'

export default {
  name: 'AlarmHistory',
  components: {
  },
  props: {},
  data() {
    const portColumnList = [{
      id: 'policy',
      label: '告警策略'
    }, {
      id: 'level',
      label: '等级'
    }, {
      id: 'date',
      label: '起止时间'
    }, {
      id: 'number',
      label: '发送次数'
    }]
    const portData = Mock.mock({
      'data|3': [{
        'id|+1': 1,
        policy: '@word(7,14)',
        level: '@integer(0 ,10)',
        startDate: '@date',
        endDate: '@date',
        number: '@integer(0 ,10)'
      }]
    })
    return {
      portColumnList,
      portData,
      name: '',
      filterTime: '近 1 小时',
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
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.name = this.$route.query.name || ''
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.yaml-main{
  margin-top: 20px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 0px $box-shadow;
  border-radius: $border-radius-l;
  margin-bottom: 16px;
}
</style>
