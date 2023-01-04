import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from '@/language/config/cn'
import en from '@/language/config/en'

Vue.use(VueI18n)
// 使用的是sessionStroage中存储的的lang，默认是中文简体cn
const language = window.sessionStorage.getItem('lang') || 'cn'
console.log(language)
const i18n = new VueI18n({
  locale: language, // 将i18n的locale设置为你需要的语言
  messages: {
    cn: cn, // 中文语言包
    en: en // 英文语言包
    // cn: require('./config/cn'), //中文简体
    // tw: require('./config/tw'), //中文繁体
    // en: require('./config/en') //英文
  }
})
console.log(i18n.locale)
export default i18n
