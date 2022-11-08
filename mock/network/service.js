const List = [
  {
    id: '11-11-11',
    name: 'service-1',
    type: 'Service',
    ip: '10.4.93.122',
    port: [
      { request: '10.4.93.122:1', protocol: 'TCP', targetPort: '1', nodePort: '22', service: 'service-1' }
    ],
    createtime: '2022-07-13'
  },
  {
    id: '22-22-22',
    name: 'service-2',
    type: 'LoadBalancer',
    ip: '10.4.148.157',
    port: [
      { request: '10.4.148.157:1', protocol: 'TCP', targetPort: '1', nodePort: '32189', service: 'service-2' }
    ],
    createtime: '2022-08-10'
  }
]

module.exports = [
  {
    url: '/vue-element-admin/service/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },

  {
    url: '/vue-element-admin/service/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const unit of List) {
        if (unit.id === id) {
          return {
            code: 20000,
            data: unit
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/service/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/service/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

