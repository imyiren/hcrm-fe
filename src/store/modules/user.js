import { login, logout, getUserInfoBySession } from '@/api/uop'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    title: '',
    workNo: '0'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_WORK_NO: (state, workNo) => {
    state.workNo = workNo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, validationCode, validationKey } = userInfo
    console.log(username, password, validationCode, validationKey)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, validationCode: validationCode, validationKey: validationKey }).then(response => {
        const { data } = response
        console.log(response)
        commit('SET_TOKEN', data.sessionId)
        setToken(data.sessionId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfoBySession().then(response => {
        const { data } = response

        if (!data) {
          reject('用户信息为空！请重试！')
        }

        const { roleList, realName, avatarUrl, title, workNo } = data

        // roles must be a non-empty array
        if (!roleList || roleList.length <= 0) {
          reject('当前登录用户没有权限角色！')
        }

        commit('SET_ROLES', roleList)
        commit('SET_NAME', realName)
        commit('SET_AVATAR', avatarUrl)
        commit('SET_TITLE', title || '员工')
        commit('SET_WORK_NO', workNo || '000000')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

