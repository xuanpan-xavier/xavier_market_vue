import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
import messageBox from 'element-ui/packages/message-box'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.prototype.$message = Message
Vue.prototype.$confirm = messageBox.confirm
