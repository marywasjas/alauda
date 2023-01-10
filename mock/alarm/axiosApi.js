import axios from 'axios'

export function getAlarmList () {
  return axios.get('/api/alarmlist')
}

export function getNativeAppList () {
  return axios.get('/api/application')
}

export function getResourceList () {
  return axios.get('/api/resource')
}


