<template>
  <div class="yaml-main">
    <monaco-editor ref="monacoEditor" :code="currentCode" :read-only="true" :language="language" />
  </div>
</template>

<script>
import MonacoEditor from '@/apps/container/views/components/MonacoEditor'

export default {
  name: 'Yaml',
  components: {
    MonacoEditor
  },
  props: {},
  data() {
    return {
      defaultCode: {
        kind: 'SelfSubjectAccessReview',
        apiVersion: 'authorization.k8s.io/v1',
        metadata: {
          creationTimestamp: null,
          managedFields: [
            {
              manager: 'Mozilla',
              operation: 'Update',
              apiVersion: 'authorization.k8s.io/v1',
              time: '2022-11-14T09:04:04Z',
              fieldsType: 'FieldsV1',
              fieldsV1: {
                'f:spec': {
                  'f:resourceAttributes': {
                    '.': {},
                    'f:group': {},
                    'f:namespace': {},
                    'f:resource': {},
                    'f:verb': {}
                  }
                }
              }
            }
          ]
        },
        spec: {
          resourceAttributes: {
            namespace: 'toda',
            verb: 'update',
            group: 'app.alauda.io',
            resource: 'helmrequests'
          }
        },
        status: {
          allowed: true,
          reason:
            'RBAC: allowed by ClusterRoleBinding "default-sa:cluster-admin" of ClusterRole "cluster-admin" to User "admin@cpaas.io"'
        }
      },
      currentCode: '',
      language: 'yaml'
    }
  },
  computed: {},
  watch: {},
  created() {
    this.currentCode = JSON.stringify(this.defaultCode, null, 2)
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.yaml-main {
  margin-top: 20px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 6px 16px 0px $box-shadow;
  border-radius: $border-radius-l;
  margin-bottom: 16px;
}
</style>
