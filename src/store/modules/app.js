import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  // 当前系统信息
  currentProduct: 'Container',
  currentProductTitle: 'Container Platform',
  currentProductPath: '/dashboard',
  // 当前项目信息
  currentProjectName: 'test',
  currentProjectNamespace: 'toda-elasticsearch3'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_CURRENT_PRODUCT: (state, product) => {
    state.currentProduct = product
    Cookies.set('currentProduct', product)
  },
  SET_CURRENT_PRODUCT_TITLE: (state, productTitle) => {
    state.currentProductTitle = productTitle
    Cookies.set('currentProductTitle', productTitle)
  },
  SET_CURRENT_PRODUCT_PATH: (state, productPath) => {
    state.currentProductPath = productPath
    Cookies.set('currentProductPath', productPath)
  },
  SET_CURRENT_PROJECT_NAME: (state, name) => {
    state.currentProjectName = name
    Cookies.set('currentProjectName', name)
  },
  SET_CURRENT_PROJECT_NAMESPACE: (state, namespace) => {
    state.currentProjectNamespace = namespace
    Cookies.set('currentProjectNamespace', namespace)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setCurrentProduct({ commit }, product) {
    commit('SET_CURRENT_PRODUCT', product)
  },
  setCurrentProductTitle({ commit }, productTitle) {
    commit('SET_CURRENT_PRODUCT_TITLE', productTitle)
  },
  setCurrentProductPath({ commit }, productPath) {
    commit('SET_CURRENT_PRODUCT_PATH', productPath)
  },
  setCurrentProjectName({ commit }, name) {
    commit('SET_CURRENT_PROJECT_NAME', name)
  },
  setCurrentProjectNamespace({ commit }, namespace) {
    commit('SET_CURRENT_PROJECT_NAMESPACE', namespace)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
