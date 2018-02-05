import iCookie from 'js-icookie';

const vueIcookie = {
    install(Vue, options) {
        Vue.iCookie = iCookie;
        Vue.prototype.$iCookie = {
            set: iCookie.set,
            get: iCookie.get,
            remove: iCookie.remove
        }

    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueIcookie);
}

export default vueIcookie