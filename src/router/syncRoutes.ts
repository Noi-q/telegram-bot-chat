import {RouteRecordRaw} from 'vue-router'
import itemLayout from "../layout/item/index.vue"
import navBar from "@/components/navBar.vue"
const syncRoutes:RouteRecordRaw[] = [
  {
    path:"/chat/item",
    children:[
      {
        path:"/chat/item",
        component:()=>import("@/view/chat/item/index.vue")
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
  },
  {
    path:"/groups/item",
    component:()=>import("@/view/groups/item/index.vue")
  }
]

export default syncRoutes