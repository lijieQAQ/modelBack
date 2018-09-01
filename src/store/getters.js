const getters = {
  sidebar: state => state.app.sidebar,
  avatar: state => state.user.avatar,
  staff: state => state.user.staff,
  roles: state => state.user.roles
}
export default getters
