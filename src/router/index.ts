import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from "../layout/index.vue"
import syncRoutes from "./syncRoutes";
import updateMessage from "@/plugins/bridging";
import {Dialog} from "vant";

const defaultRoutes:RouteRecordRaw[] = [
  {
    path:'/:pathMatch(.*)',
    redirect:'/404'
  },
  {
    path:"/404",
    component:()=>import("../view/notFound/index.vue")
  },
  {
    path:"/",
    redirect:"/login",
    // component:()=>import("../components/HelloWorld.vue"),
    children:[
      {
        path:"/login",
        component:()=>import("../view/login/index.vue")
      }
    ]
  },
  {
    path:"/chat",
    component:Layout,
    children:[
      {
        path:"/chat",
        component:()=>import("../view/chat/index.vue")
      }
    ]
  },
  {
    path:"/groups",
    component:Layout,
    children:[
      {
        path:"/groups",
        component:()=>import("@/view/groups/index.vue")
      }
    ]
  },
  {
    path:"/settings",
    component:Layout,
    children:[
      {
        path:"/settings",
        component:()=>import("../view/settings/index.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes:[...defaultRoutes,...syncRoutes]
})

router.beforeEach((to, from)=>{
  const token = localStorage.getItem("token") || ""
  if(to.path === "/login"){
    if(token !== "" || undefined || null){
      router.push({
        path:"/chat"
      })
    }else{
      return true
    }
  }
  if(to.path === "/chat" || to.path === "/settings"){
    updateMessage(token).then(
      res => {
        localStorage.setItem("data", JSON.stringify(res.result))
      },
      err => {
        if(err === "404"){
          Dialog({
            title:"提示",
            message:"token失效，点击重新登录!",
            showCancelButton:false
          }).then(()=>{
            router.push({
              path:"/login"
            })
          }).catch(()=>{})
        }
      }
    )
  }
})

export default router