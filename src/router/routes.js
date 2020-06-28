import signin from '../pages/Signin.vue'
import signup from '../pages/Signup.vue'
import home from '../pages/Home.vue'
import chat from '../pages/Chat.vue'
import passwordreset from '../pages/Passwordreset.vue'
const routes = [{
  path: '/',
  name: 'signin',
  component: signin,
},
{
  path: '/signup',
  component: signup
},
{
  path: '/passwordreset',
  component: passwordreset
},
{
  path: '/Home',
  component: home,
  meta: {
    authRequired: true
  }
},
{
  path: '/chat',
  component: chat
}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
