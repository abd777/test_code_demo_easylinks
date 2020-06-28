import Vue from 'vue';
import PouchVue from 'pouch-vue';
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'

PouchDB.plugin(PouchFind)
PouchDB.plugin(PouchLiveFind)
PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
export default ({
  Vue,
  store,
  router
}) => {
  Vue.use(PouchVue, {
    pouch: PouchDB, // optional if `PouchDB` is available on the global object
    defaultDB: 'defaultDB', // this is used as a default connect/disconnect database 
  });
}
