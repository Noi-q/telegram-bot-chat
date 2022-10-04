
const item = (data:[])=>{
  data.reverse()
  const map = new Map()
  let item:any;
  for(item of data){
    if(item.message){
      if(!map.has(item.message.chat.id)){
        map.set(item.message.chat.id, item)
      }
    }else if(item.my_chat_member){
      if(!map.has(item.my_chat_member.chat.id)){
        map.set(item.my_chat_member.chat.id, item)
      }
    }else if(item.channel_post){
      if(!map.has(item.channel_post.chat.id)){
        map.set(item.channel_post.chat.id, item)
      }
    }
  }
  return [...map.values()]
}

const userItem = (data:[])=>{
  data.reverse()
  const map = new Map()
  let item:any;
  for(item of data){
    if(item.message) {
      if (!map.has(item.message.chat.id)) {
        map.set(item.message.chat.id, item)
      }
    }
    // }else if(item.my_chat_member){
    //   if(!map.has(item.my_chat_member.chat.id)){
    //     map.set(item.my_chat_member.chat.id, item)
    //   }
    // }else if(item.channel_post){
    //   if(!map.has(item.channel_post.chat.id)){
    //     map.set(item.channel_post.chat.id, item)
    //   }
    // }
  }
  return [...map.values()]
}

export {
  item,
  userItem
}