import {item} from "@/tools/groups-item";

const filter = (data:[])=>{
  const filterData:any = []
  data.filter((e?:any)=>{
    if(e.message.chat.type !== "group"){
      filterData.push(e)
    }
  })
  return filterData
}

const groupFilter = (data:[])=>{
  const filterData:any = []
  data.filter((e?:any)=>{
    if(e.message.chat.type !== "private"){
      filterData.push(e)
    }
  })
  localStorage.setItem("groups", JSON.stringify(filterData))
  return item(filterData)
}

export {filter,groupFilter}