
const item = (data:[])=>{



  data.reverse()
  const map = new Map()
  let item:any;
  for(item of data){
    if(!map.has(item.message.chat.id)){
      map.set(item.message.chat.id, item)
    }
  }
  return [...map.values()]
}

export {
  item
}