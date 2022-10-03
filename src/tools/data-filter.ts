import {item} from "@/tools/groups-item";

const filter = (data:[])=>{
  const filterData:any = []
  data.filter((e?:any)=>{
    if(e.message){
      if(e.message.chat.type !== "group"){
        // filterData.push(e)
        if(e.message.chat.type !== "supergroup"){
          filterData.push(e)
        }
      }
    }else if (e.my_chat_member){
      if(e.my_chat_member.chat.type !== "group"){
        // filterData.push(e)
      }
    }

  })
  return filterData
}

const groupFilter = (data:[])=>{
  const filterData:any = []
  data.filter((e?:any)=>{
    if(e.message){
      if(e.message.chat.type !== "private"){
        // filterData.push(e)
        if(e.message.text !== undefined){
          filterData.push(e)
        }
      }
    }else if(e.my_chat_member){
      if(e.my_chat_member.chat.type !== "private"){
        // filterData.push(e)
      }
    }else if(e.channel_post){
      if(e.channel_post.chat.type !== "private"){
        filterData.push(e)
      }
    }
  })
  localStorage.setItem("groups", JSON.stringify(filterData))
  return item(filterData)
}

const noticeFilter = (data:[])=>{
  const filterData:any[] = []
  data.filter((e?:any)=>{
    if(e){
      if(e.my_chat_member){
        filterData.push(e)
      }
    }
  })
  return filterData
}

const groupAllInfoFilter = (data:[], id: number)=>{
  const filterData:any[] = []
  data.filter((e?:any)=>{
    if(e.message){
      if(e.message.chat.type !== "private"){
        if(e.message.chat.id === id){
          filterData.push(e)
        }
      }
    }else if(e.channel_post){
      if(e.channel_post.chat.type !== "private"){
        if(e.channel_post.chat.id === id){
          if(e.channel_post.text){
            filterData.push(e)
          }
        }
      }
    }
  })
  return filterData
}

export {filter,groupFilter,noticeFilter,groupAllInfoFilter}