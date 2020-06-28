<template>
  <div class="row justify-center items-center custom-row gradient-apply">
    <div class="col-12 col-sm-4">
      <q-card flat class="q-px-md bg-transparent">
        <p class="text-h3 q-pb-xl text-center text-uppercase f">Sign In</p>
        <q-form class="q-px-md">
          <q-input
            rounded
            outlined
            v-model="user.email"
            type="email"
            placeholder="Enter Your Email"
            class="q-mb-md"
          ></q-input>
          <q-input
            rounded
            outlined
            v-model="user.password"
            type="password"
            placeholder="Enter Your Password"
          ></q-input>
          <div class="row justify-around q-pt-lg">
            <router-link
              to="/passwordreset"
              tag="span"
              class="pinkish q-mt-sm cursor-pointer text-bold"
            >Forgot Password ?</router-link>

            <q-btn outlined rounded label="Sign In" class="gradient-btn text-white" @click="signIn"></q-btn>
          </div>
          <div class="row justify-around q-ma-md">
            <div>
              <span class="text-grey-9">Have not an account yet?&nbsp;</span>
              <router-link to="/signup" tag="span" class="text-bold pinkish cursor-pointer">Sign Up</router-link>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    signIn() {
      this.$fb
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(res => {
          this.$router.replace("/home");
        })
        .then(err => {
          console.log(err.message);
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
</style>