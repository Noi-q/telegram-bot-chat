import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from "../layout/index.vue"
import syncRoutes from "./syncRoutes";

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
})

export default router