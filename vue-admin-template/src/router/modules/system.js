import Layout from '@/layout'

export default {
    order:2,
    path:'/system',
    component:Layout,
    name:'SystemManage',
    redirect: 'noRedirect',
    meta: {
      title: '系统管理',
      icon: 'setting',
    },
    children: [
        {
          path:'account',
          component:()=>import('@/views/user/account'),
          name:'Account',
          hidden:true,
          meta:{
            title:'账号管理',
          }
        },
        {
          path: 'user1',
          component: () => import('@/views/user/user1'),
          name: 'User1',
          meta: { title: '系统账号管理', noCache: true }
        },
        {
            path: 'user2',
            component: () => import('@/views/user/user2'),
            name: 'User2',
            meta: { title: '系统权限管理', noCache: true }
        },
    ]
}
