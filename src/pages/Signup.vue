<template>
  <div class="row justify-center items-center custom-row gradient-apply">
    <div class="col-12 col-sm-4">
      <q-card flat class="q-pa-md bg-transparent">
        <p class="text-h3 q-pb-xl text-center q-pt-lg text-uppercase f">Sign Up</p>
        <q-form class="q-py-md">
          <q-input
            rounded
            outlined
            type="name"
            placeholder="Enter Your Name"
            class="q-mb-md"
            v-model="user.name"
          />
          <q-input
            rounded
            outlined
            type="email"
            placeholder="Enter Your Email"
            class="q-mb-md"
            v-model="user.email"
          />
          <q-input
            rounded
            outlined
            type="text"
            placeholder="Enter Your Address"
            class="q-mb-md"
            v-model="user.address"
          />
          <q-input
            rounded
            outlined
            type="tel"
            placeholder="Telephone number"
            class="q-mb-md"
            v-model="user.tel"
          />
          <q-select
            rounded
            outlined
            v-model="user.selectedCity"
            :options="options"
            label="City"
            class="q-mb-md"
          />
          <q-input
            rounded
            outlined
            type="password"
            placeholder="Enter Password"
            class="q-mb-md"
            v-model="password"
          />
          <q-input
            rounded
            outlined
            type="password"
            placeholder="Enter Confirm Password"
            v-model="cPassword"
          />
          <div class="row justify-end">
            <q-btn push label="Sign Up" class="q-mt-lg gradient-btn text-white" @click="signUp"></q-btn>
          </div>
          <div class="row justify-around q-ma-md">
            <div>
              <span class="text-grey-9">Have not an account yet?&nbsp;</span>
              <router-link to="/" tag="span" class="text-bold text-blue-9 cursor-pointer">Sign In</router-link>
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
        name: 'asd',
        email: null,
        address: 'asda',
        tel: 'asdasd',
        selectedCity: 'fsd'
      },
      password: 'aaaaaa',
      cPassword: 'asdasd',
      options: ["fsd", "lhr"]
    };
  },
  methods: {
    signUp() {
      console.log('hi')
      var _ = this;
      this.$fb
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.password)
        .then(
          res => {
            _.user.uid = res.user.uid;
            console.log(res)
            _.$fb
              .firestore()
              .collection("users")
              .doc(res.user.uid)
              .set(_.user)
              .then(() => {
                _.$router.replace("/home", res);
              }).catch((err)=>{
                console.log('err pushing data',err)
              })
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");

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