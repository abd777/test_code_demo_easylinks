<template>
  <div class style="width: 100%">
    <div class="main-row column">
      <div class="row justify-between q-pa-md gradient-apply" v-if="showHeader">
        <span class="text-bold f text-h6">App Name</span>
        <span>
          <q-btn flat rounded color="black" icon="mdi-magnify" @click="showHeader=!showHeader" />

          <q-btn-dropdown
            rounded
            class="q-pa-none"
            color="black"
            flat
            dropdown-icon="mdi-dots-vertical"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label v-if="getUser">{{getUser.name}}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="signout()">
                <q-item-section>
                  <q-item-label>
                    Sign out
                    <i class="mdi mdi-logout"></i>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>
      </div>
      <div v-else>
        <q-input
          bottom-slots
          v-model="search"
          placeholder="Search Group Names"
          class="q-pa-none gradient-apply"
        >
          <template v-slot:prepend>
            <q-icon class="q-pl-md" name="mdi-magnify" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="showHeader=!showHeader" class="cursor-pointer q-pr-md" />
          </template>
        </q-input>
      </div>
      <app-my-groups></app-my-groups>
      <app-my-requests></app-my-requests>
      <app-requests-to-me></app-requests-to-me>
    </div>
  </div>
</template>
<script>
import myGroups from "../components/Home/myGroups";
import myRequests from "../components/Home/myRequests";
import requestsToMe from "../components/Home/requestsToMe";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showHeader: true,
      requestPrompt: false,
      groupPrompt: false,
      search: null
    };
  },
  mounted() {
    this.$nextTick(() => {
     console.log( this.$pouch)
    });
  },
  methods: {
    goToChat() {
      this.$router.replace("/chat");
    },
    signout() {
      this.$store.dispatch("signout");
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  components: {
    "app-my-groups": myGroups,
    "app-my-requests": myRequests,
    "app-requests-to-me": requestsToMe
  }
};
</script>
<style scoped>
.main-row {
  height: 100vh !important;
}

.gradient-apply {
  background: rgb(236, 231, 206);
  background: linear-gradient(
    135deg,
    rgb(235, 230, 209) 45%,
    rgb(221, 211, 189) 77%
  );
}
</style>