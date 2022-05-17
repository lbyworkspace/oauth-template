const files = require.context('.',true,/\.js$/)

var modules = {}

files.keys().forEach(key => {
    if (key === './index.js') return
    // const name = '$api_' + key.replace('./modules/', '').replace('.js', '')
    const value = files(key).default
    modules = Object.assign({},modules,value)
    // Object.defineProperty(modules,name,{value})
})

export default modules