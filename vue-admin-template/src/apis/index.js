export default {
    install(Vue){
        const files = require.context('.',true,/\.js$/)
        files.keys().forEach(key => {
            if (key === './index.js') return
            const name = '$api_' + key.replace('./modules/', '').replace('.js', '')
            const value = files(key).default
            Object.defineProperty(Vue.prototype,name,{value})
        })
    }
}