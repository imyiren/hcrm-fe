const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  workNo: state => state.user.workNo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  title: state => state.user.title
}
export default getters
