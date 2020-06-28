<template>
  <keep-alive>
    <div class="col column">
      <div class="row justify-between q-pa-md gradient-apply">
        <span class="text-bold f">
          <q-icon name="mdi-menu" class="q-mr-sm" style="cursor:pointer" />My Groups
        </span>
        <q-icon name="mdi-plus" style="cursor:pointer" @click="joinGroupPrompt" />
      </div>
      <div class="inner-div">
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(item,index) in joinedGroups"
            :key="index"
            @click="goToChat(item)"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="item.group.imgURL" />
              </q-avatar>
            </q-item-section>
            <q-item-section v-if="item.group">{{item.group.name}}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-dialog v-model="groupPrompt" persistent class="q-pt-none">
        <q-card style="width: 100% ">
          <q-card-section class="row items-center q-pb-none">
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <q-select
              rounded
              outlined
              :options="cities"
              label="Select City"
              v-model="selectedCity"
              class="q-my-none"
            />
          </q-card-section>
          <q-card-section>
            <q-select
              rounded
              outlined
              :options="groups"
              label="Select Group"
              v-model="selectedGroup"
              class="q-my-none"
            />
          </q-card-section>
          <q-card-actions align="center" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="send" v-close-popup @click="joinGroup" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </keep-alive>
</template>
<script>
import { mapGetters } from "vuex";
import utils from "../../utils";
export default {
  data() {
    return {
      groupPrompt: false,
      cities: [
        {
          label: "Loading ...",
          value: null
        }
      ],
      groups: [
        {
          label: "Loading ...",
          value: null
        }
      ],
      isCitiesLoaded: false,
      selectedCity: null,
      selectedGroup: null
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    joinedGroups() {
      var jG = this.$store.getters.joinedGroups;
      console.log("joined groupds", jG);
      var arr = [];
      for (var i in jG) {
        arr.push(jG[i]);
        //console.log("ruunning_COp");
      }
      console.log("arra", arr);
      return arr;
    }
  },
  watch: {
    selectedCity(option) {
      // If value is not null then load the relevant groups
      if (option.value != null) {
        utils.loadGroups(option.value).then(res => {
          this.groups = res;
        });
      }
    }
  },
  methods: {
    goToChat(item) {
      this.$store.dispatch("loadChat",item)
      this.$router.replace("/chat");
    },
    // This will be called when user clicks on join group icon in the header
    joinGroupPrompt() {
      //checking if cities loaded or not ?
      if (!this.isCitiesLoaded) {
        //loading the cities from database behind the scene
        this.getCities();
      }
      //after calling an async function , opening the prompt
      this.groupPrompt = true;
    },
    getCities() {
      //call  the function from utils
      utils.getCities().then(res => {
        this.cities = res;
        this.isCitiesLoaded = true;
      });
    },
    joinGroup() {
      this.$store.dispatch("handleJoinGroupRequest", this.selectedGroup);
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
  background: rgb(222, 183, 3);
  background: linear-gradient(
    135deg,
    rgba(222, 183, 3, 1) 45%,
    rgba(255, 175, 0, 1) 77%
  );
}

.gradient-btn {
  background: rgb(56, 95, 219);
  background: linear-gradient(
    228deg,
    rgba(56, 95, 219, 1) 15%,
    rgba(16, 0, 255, 1) 73%
  );
}
.f {
  font-family: "Comfortaa", cursive;
}
.inner-div {
  max-width: 100%;
  overflow-y: auto;
  flex: 1;
}
</style>
      