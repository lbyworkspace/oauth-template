const files = require.context('.', false, /\.js$/)
let modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  modules.push(item)
})

// 排序侧边栏
modules = modules.sort((a,b)=>{return a.order - b.order})

export default modules
