export default [
  {
    path: '/',
    component: './index',
    routes:[
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes:[
          {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
              {
                name: 'login',
                path: '/user/login',
                component: './User/Login',
              },
              {
                name:'register',
                path: '/user/register',
                component: './User/Register',
              }
            ],
          },
          {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
              {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                routes: [
                  {
                    path: '/',
                    redirect: './home',
                  },
                  {
                    path: '/home',
                    name: 'home',
                    icon: 'smile',
                    component: './Home',
                  },
                  {
                    path: '/device',
                    name: 'device',
                    icon: 'smile',
                    component: './Device',
                  },
                  {
                    component: './404',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
        ]
      }

    ]

  },
  {
    component: './404',
  },
];
