import request from '@/util/request'

// 用户注册
const register = ({ Name, Telephone, Password }) => {
  return request.post('/register', { Name, Telephone, Password })
}
// 用户登录
const login = ({ Telephone, Password }) => {
  return request.post('/login', { Telephone, Password })
}
// 获取用户信息
const info = () => {
  return request.get('/info')
}
export default {
  register,
  info,
  login
}
