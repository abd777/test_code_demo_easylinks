import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import utils from '../utils/index'
import cordovaVuexPersistent from './cordova-vuex-persistent'

Vue.use(Vuex)
export default function ( /* { ssrContext } */ ) {
  const Store = new Vuex.Store({
    state: {
      user: null,
      isNewUser: false,
      joinedGroups: [],
      loadedChat: null
    },
    getters: {
      getUser(s) {
        return s.user
      },
      getLoadedChat(s) {
        return s.loadedChat
      },
      joinedGroups(s) {
        return s.joinedGroups
      }
    },
    mutations: {
      setUser(state, p) {
        state.user = p
      },
      setNewUser(s, p) {
        s.isNewUser = p
      },
      setLoadChat(s, p) {
        s.loadedChat = p
      },
      joinedGroups(s, p) {
        console.log('uid is ',p)
        firebase.firestore().collection('users').doc(p).collection('groups')
          .onSnapshot(function (querySnapshot) {
            var groups = [];
            querySnapshot.forEach(function (doc) {
              if (doc.exists) {
                var data = doc.data()
                var obj = {}
                obj.key = doc.id
                data.groupRef.get().then((snap) => {
                  obj.group = snap.data()
                  obj.group.id = snap.id
                  groups.push(obj)
                })
              }
            });
            s.joinedGroups = groups
          });
      },
    },
    actions: {
      signout() {
        firebase.auth().signOut()
      },
      setUser(s, p) {
        var obj = {}
        Object.assign(obj,p.res)
        obj.fbAuth = p.user
        console.log('response',obj)
        s.commit('setUser', obj)
        s.commit('joinedGroups', p.user.uid)
      },

      handleJoinGroupRequest(s, p) {
        var jG = s.getters.joinedGroups
        var c = 0
        for (var i in jG) {
          console.log(jG[i].group.id)
          if (jG[i].group.id === p.value) {
            c = 1
          }
        }
        if (c == 0) {
          utils.joinGroup(p);
        } else if (c == 1) {
          this._vm.$q.notify('alreay joined')

        }
        console.log('payload', p)
      },
      loadChat(s, p) {
        s.commit('setLoadChat', p)
      }
    },
    // plugins: [cordovaVuexPersistent([
    //   'user',
    // ])],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false
  })
  return Store
}
