import Firebase from 'firebase/app'
import 'firebase/auth'

export default ({
  app,
  router,
  Vue,
  store
}) => {
  router.beforeEach((to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    let authRequired = to.matched.some(route => route.meta.authRequired)
    if (authRequired) {
      if (Firebase.auth().currentUser) {
        // User is already signed in. Continue on.
        console.log('signed in', Firebase.auth().currentUser)
        next()
      } else {
        // Not signed in. Redirect to login page.
        console.log('not signd in')
        next({
          name: 'signin'
        })
      }
    } else {
      // Doesn't require authentication. Just continue on.
      next()
    }
  })
}
