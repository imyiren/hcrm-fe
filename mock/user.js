
const tokens = {
  admin: {
    token: 'admin-token'
  },
  user: {
    token: 'user-token'
  }
}

const users = {
  'admin-session': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '罗小虎',
    title: 'CEO'
  },
  'user-session': {
    roles: ['user'],
    introduction: 'I am an User',
    avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
    name: '罗小锋',
    title: '销售部-销售专员'
  }
}

module.exports = [
  // user login
  {
    url: '/api/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账号密码不正确！'
        }
      }

      return {
        code: 20000,
        message: 'success!',
        data: {
          sessionId: username + '-session'
        }
      }
    }
  },

  // get user info
  {
    url: '/api/user/session\.*',
    type: 'get',
    response: config => {
      const { sessionId } = config.query
      const info = users[sessionId]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/api/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
