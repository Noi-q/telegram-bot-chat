import {RouteRecordRaw} from 'vue-router'
import itemLayout from "../layout/item/index.vue"
import navBar from "@/components/navBar.vue"
const syncRoutes:RouteRecordRaw[] = [
  {
    path:"/user",
    component:itemLayout,
    children:[
      {
        path:"/user",
        component:()=>import("../view/chat/index.vue")
      }
    ]
  },
  {
    path:"/bot_info",
    component:navBar,
    children:[
      {
        path:"/bot_info",
        component:()=>import("@/view/settings/botInfo/index.vue")
      }
    ]
  }
]

export default syncRoutes