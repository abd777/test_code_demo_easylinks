import firebase from 'firebase'
export default {
  getCities() {
    return new Promise((resolve, reject) => {
      var arr = [];
      firebase
        .firestore()
        .collection("cities")
        .get()
        .then(querySnap => {
          querySnap.forEach(snap => {
            console.log(snap.data());
            var data = snap.data();
            var obj = {
              label: data.name,
              value: snap.id
            };
            arr.push(obj);
          });
          resolve(arr)
        });
    })
  },
  loadGroups(cityID) {
    return new Promise((resolve, reject) => {
      var arr = [];
      var city = firebase
        .firestore()
        .collection("cities").doc(cityID)
      firebase
        .firestore()
        .collection("groups")
        .where("city", "==", city)
        .get()
        .then(querySnap => {
          querySnap.forEach(snap => {
            var data = snap.data();
            var obj = {
              label: data.name,
              value: snap.id
            };
            arr.push(obj);
          });
          resolve(arr)
        });
    })
  },
  joinGroup(payload) {
    var obj = {
      groupRef: firebase.firestore().collection('groups').doc(payload.value),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    console.log(payload)
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('groups')
      .add(obj).then((res) => {
        alert('you joined  the group successcully')
      })
    //   firebase
    //     .database()
    //     .ref(
    //       "joinedGroups/" + ctx.state.uid + "/" + payload.value.key
    //     )
    //     .update(obj);
  },
  initBackgroundProcess(uid) {
    
    /**
     * if needed we can attach firestore messages realtime changes listner with pouch DB
     * 
     *only if we want to create a delete functionality
     * 
     */
    // alert(JSON.stringify(cordova.plugins.backgroundMode))
    // cordova.plugins.backgroundMode.enable();
    // cordova.plugins.backgroundMode.setDefaults({
    //   silent: true
    // });
    // cordova.plugins.backgroundMode.on('enable', () => {
    //   alert('enable')

    // });
    // cordova.plugins.backgroundMode.on('activate', () => {
    //   alert('active')
    // });
    // cordova.plugins.backgroundMode.on('deactivate', () => {
    //   alert('deactive')
    // });
  }
}
