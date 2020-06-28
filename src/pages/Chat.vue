<template>
  <div class="column" style="height:100vh">
    <div class="row bg-grey-4">
      d
      <q-item v-ripple class>
        <q-item-section avatar>
          <q-icon name="mdi-chevron-left" @click="$router.push('/home')" class="cursor-pointer" />
        </q-item-section>
        <q-item-section avatar>
          <q-avatar>
            <img :src="getLoadedChat.group.imgURL" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="text-h5 text-bold">{{getLoadedChat.group.name}}</q-item-section>
      </q-item>
    </div>
    <div
      style="flex:1;overflow:auto"
      v-chat-scroll="{always: false,smooth:true,notSmoothOnInit: true,scrollonremoved:true}"
      @v-chat-scroll-top-reached="loadMore"
    >
      <div>
        <div v-if="loadingMore" class="row justify-center q-py-lg">
          <q-spinner-tail color="primary" size="3em" />
        </div>
        <div>
          <template v-for="(item) in messages">
            <q-chat-message
              :key="item.id"
              :name="item.sentBy==getUser.uid?'me':item.sentByName||''"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :text="[item.text]"
              text-sanitize
              :sent="item.sentBy==getUser.uid?true:false"
              :stamp="noramlizeTimestamp(item.timestamp)"
            />
          </template>

          <!-- <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="[`doing fine, how r you?`]"
            stamp="4 minutes ago"
          />-->
        </div>
      </div>
    </div>
    <div>
      <q-input rounded outlined v-model="message" placeholder="Type Something ... ">
        <!-- <template v-slot:before>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>

        <template v-slot:append>
          <q-icon class="cursor-pointer" />
        </template>-->

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="send" />
          <q-btn round dense flat icon="mdi-plus" />
          <q-btn round dense flat icon="mdi-camera" />
        </template>
      </q-input>
    </div>
  </div>
</template>    
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      message: "",loadingMore:false,
      messages: []
    };
  },
  computed: {
    ...mapGetters(["getUser", "getLoadedChat"])
  },
  mounted() {
    this.$nextTick(() => {
      var chatToLoad = this.getLoadedChat;
      console.log(chatToLoad);
      var _ = this;

      var dateOBJ = new Date(this.getUser.fbAuth.metadata.creationTime);
      var userCreationTimestamp = new firebase.firestore.Timestamp.fromDate(
        dateOBJ
      );

      if (!this.messages.length) {
        this.$fb
          .firestore()
          .collection("groups")
          .doc(chatToLoad.group.id)
          .collection("messages")
          .where("timestamp", ">", userCreationTimestamp)
          .orderBy("timestamp", "desc")
          .limit(15)
          .get()
          .then(function(snapshot) {
            var arr = [];
            snapshot.forEach(function(doc) {
              var obj = doc.data();
              obj.id = doc.id;
              arr.push(obj);
            });
            _.messages = arr.reverse();
          });
      }
      this.registerMessageAdditionListner();
    });
  },
  methods: {
    noramlizeTimestamp(timestamp) {
      if (timestamp) {
        timestamp = timestamp.toDate();
        var str = "";
        var date = new Date(timestamp);
        str = str + date.getHours() + ":" + date.getMinutes();
        return str;
      } else {
        return "Sending ...";
      }
    },
    send() {
      if (this.message != "") {
        var chatToLoad = this.getLoadedChat;
        console.log(this.getUser);
        var obj = {
          sentBy: this.getUser.fbAuth.uid,
          sentByName: this.getUser.name || "",
          text: this.message,
          timestamp: this.$fb.firestore.FieldValue.serverTimestamp(),
          type: "text"
        };
        var _ = this;
        this.$fb
          .firestore()
          .collection("groups")
          .doc(chatToLoad.group.id)
          .collection("messages")
          .add(obj)
          .then(res => {
            _.$q.notify({
              message: "Message Sent",
              position: "top-right"
            });
            _.messages.pop();
            _.message = "";
          });
      }
    },
    registerMessageAdditionListner() {
      var chatToLoad = this.getLoadedChat;
      var _ = this;
      this.$fb
        .firestore()
        .collection("groups")
        .doc(chatToLoad.group.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot(function(snapshot) {
          snapshot.forEach(function(change) {
            var obj = change.data();
            obj.id = change.id;
            _.messages.push(obj);
          });
        });
    },
    loadMore() {
      this.loadingMore=true
      console.log("just triggered");
      // alert('Handle : LoadMoreHere with the last one '+this.messages[0].text + " and timestamp "+ this.messages[0].timestamp.toDate())
      var chatToLoad = this.getLoadedChat;
      var lastMessageTimestamp = this.messages[0].timestamp;
      var _ = this;
      var dateOBJ = new Date(this.getUser.fbAuth.metadata.creationTime);
      var userCreationTimestamp = new firebase.firestore.Timestamp.fromDate(
        dateOBJ
      );
      this.$fb
        .firestore()
        .collection("groups")
        .doc(chatToLoad.group.id)
        .collection("messages")
        .where("timestamp", "<", lastMessageTimestamp)
        .where("timestamp", ">", userCreationTimestamp)
        .orderBy("timestamp", "desc")
        .limit(15)
        .get()
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(doc) {
            var obj = doc.data();
            obj.id = doc.id;
            arr.push(obj);
          });
          _.messages = arr.reverse().concat(_.messages);
          _.loadingMore=false
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");

.custom-row {
  height: 100vh !important;
}
.gradient-apply {
  background: rgb(222, 183, 3) !important;
  background: linear-gradient(
    135deg,
    rgba(222, 183, 3, 1) 45%,
    rgba(255, 175, 0, 1) 77%
  );
}
.re {
  background-color: aqua;
}
.f {
  font-family: "Comfortaa", cursive;
}
</style>