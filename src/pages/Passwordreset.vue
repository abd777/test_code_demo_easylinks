<template>
  <div class="row justify-center items-center custom-row gradient-apply">
    <div class="col-12 col-sm-4">
      <q-card flat class="q-px-md bg-transparent">
        <p class="text-h3 q-pb-xl text-center text-uppercase f">Password reset</p>
        <q-form class="q-px-md">
          <q-input
            rounded
            outlined
            v-model="email"
            type="email"
            placeholder="Enter Your Email"
            class="q-mb-md"
          ></q-input>
          <div class="row justify-end">
            <q-btn outlined rounded label="Reset" class="gradient-btn text-white" @click="Reset"></q-btn>
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
      email: null
    };
  },
  methods: {
    Reset() {
      this.$fb.auth().sendPasswordResetEmail(this.email);
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