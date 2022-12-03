import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // fontAwesome 图标库样式
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/styles/admin.scss'
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import './icons' // icon
import './permission' // permission control
import * as filters from './filters' // global filters
import Pagination from '@/components/Pagination'
import VueParticles from 'vue-particles'
// 代码编辑器
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// 富文本编辑器
import VueEditor from 'vue2-editor'
import iconPicker from 'e-icon-picker'
import 'e-icon-picker/dist/index.css'// 基础样式
import 'e-icon-picker/dist/main.css'
import FormMaking from 'form-making'
import { parseTime, resetForm, addDateRange, selectDictLabel } from '@/utils/costum'

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

Vue.use(VueParticles)
Vue.use(VueCodeMirror)
Vue.use(VueEditor)
Vue.use(iconPicker)
Vue.use(permission)
Vue.use(VueI18n)

const messages = {
  'en-US': {
    header: {
      title: 'FormMaking',
      document: 'Docs',
      pricing: 'Pricing',
      advanced: 'Advanced'
    },
    ...enLocale
  },
  'zh-CN': {
    header: {
      title: '表单设计器',
      document: '使用文档',
      pricing: '商业授权',
      advanced: '高级版本'
    },
    ...zhLocale
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-CN', // set locale
  messages // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(FormMaking, { lang: 'zh-CN', i18n })

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
