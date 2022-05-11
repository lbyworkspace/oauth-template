import Layout from '@/layout'

export default {
    path:'/user',
    component:Layout,
    name:'User',
    redirect: 'noRedirect',
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    children: [
        {
          path:'account',
          component:()=>import('@/views/user/account'),
          name:'Account',
          hidden:true,
          meta:{
            title:'账号管理'
          }
        },
        {
          path: 'user1',
          component: () => import('@/views/user/user1'),
          name: 'User1',
          meta: { title: 'User1', noCache: true }
        },
        {
            path: 'user2',
            component: () => import('@/views/user/user2'),
            name: 'User2',
            meta: { title: 'User2', noCache: true }
        },
    ]
}
