export function computetime(date){
    if(Date.now()-date<60000){
        return Math.floor((Date.now()-date)/1000)+'秒前'
      }else if(Date.now()-date<3600000){
        return Math.floor((Date.now()-date)/60000)+'分钟前'
      }else if(Date.now()-date<86400000){
        return Math.floor((Date.now()-date)/3600000)+'小时前'
      }else if(Date.now()-date<2592000000){
        return Math.floor((Date.now()-date)/86400000)+'天前'
      }else if(Date.now()-date<31104000000){
        return Math.floor((Date.now()-date)/2592000000)+'个月前'
      }else{
        return Math.floor((Date.now()-date)/31104000000)+'年前'
      }
}