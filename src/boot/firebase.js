import firebase from 'firebase/app'
import 'firebase/firestore' // eslint-disable-line
import 'firebase/auth' // eslint-disable-line
import 'firebase/database' // eslint-disable-line
import utils from '../utils'

export default ({
  Vue,
  store,
  router
}) => {
  // Initialize firebase from settings
  var firebaseConfig = {
    apiKey: "AIzaSyCsRlBYM_fyPoIPxee7DrDuC43dWRSwsNg",
    authDomain: "easylinks-ecf14.firebaseapp.com",
    databaseURL: "https://easylinks-ecf14.firebaseio.com",
    projectId: "easylinks-ecf14",
    storageBucket: "easylinks-ecf14.appspot.com",
    messagingSenderId: "727431137305",
    appId: "1:727431137305:web:2bb26a4da3cda889114288"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (router.path != '/home')
        router.push('/home')
      firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          store.dispatch('setUser', {
            user,
            res: doc.data()
          })
          /**
           * Call it , For pouchDB sync functionality
           */
          //  utils.initBackgroundProcess(user.uid)
        } else {
          store.dispatch('setUser', {
            user,
            res: {}
          })
          store.commit('setNewUser', true)
        }
      })
    }
  })
  firebase.firestore().enablePersistence()
    .catch(function (err) {
      alert(err)
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  //Cache size is set to 40 MB    to disable  un comment the line below
  // firebase.firestore().settings({
  //   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  // });
  // firebase.firestore().disableNetwork()
  Vue.prototype.$fb = firebase
}
