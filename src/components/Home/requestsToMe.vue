<template>
  <div class="col column">
    <span class="row justify-between q-pa-md gradient-apply">
      <span class="text-bold f">Requests to me</span>
      <q-icon name="mdi-plus" style="cursor:pointer" @click="requestPrompt=true" />
    </span>
    <div class="inner-div">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(item,index) in 12" :key="index">
          <q-item-section class="q-pb-none">
            <div class="row justify-between">
              <span>
                <span class="text-red-6 text-bold q-mr-sm">Purchase:</span>
                <span>5 Marla in street 4 required...</span>
              </span>
              <span>
                <span class="q-mr-sm">1:45</span>
                <span>28 members viewed</span>
              </span>
            </div>
            <span>5-8g isb</span>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-dialog v-model="requestPrompt" persistent class="q-pt-none">
      <q-card style="width: 60% ">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div>
            <q-list bordered>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section class="text-h4 text-bold">Group 1</q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-section>
          <h5 class="q-my-md text-center text-bold">New Property</h5>
          <div class="q-gutter-sm">
            <q-radio val="Rent" label="Rent" />
            <q-radio val="Sale" label="Sale" />
            <q-radio val="Purchase" label="Purchase" />
          </div>
          <div class="q-gutter-sm">
            <q-radio val="Home" label="Home" />
            <q-radio val="Plot" label="Plot" />
            <q-radio val="Commercial" label="Commercial" />
          </div>
        </q-card-section>
        <q-card-section class="text-h6 bg-grey-4">Address</q-card-section>
        <q-card-section>
          <div class="row q-pt-sm">
            <div class="col-3 text-bold q-mt-md">Number:</div>
            <div class="col-9">
              <q-input rounded outlined type="text" placehoder="Number" />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-3 text-bold q-mt-md">Street:</div>
            <div class="col-9">
              <q-input rounded outlined type="text" placehoder="Number" />
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-3 text-bold q-mt-md">Sector:</div>
            <div class="col-9">
              <q-input rounded outlined type="text" placehoder="Number" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-file outlined rounded label="Choose File">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
        <div class="q-px-md">Any other instruction:</div>
        <q-input rounded outlined type="textarea" class="q-px-md q-py-sm" />
        <q-card-actions align="center" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="send" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      requestPrompt: false
    };
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