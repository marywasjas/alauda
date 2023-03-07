import axios from 'axios'

export function getClusterList () {
  return axios.get('/api/clusterList')
}

// export function getExpandList () {
//   return axios.get('/api/expandlist')
// }

// export function getNativeAppList () {
//   return axios.get('/api/application')
// }

// export function getResourceList () {
//   return axios.get('/api/resource')
// }