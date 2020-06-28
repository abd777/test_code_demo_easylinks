<template>
  <div>
    <q-btn color="primary" label="Get Picture" @click="captureImage" />
    <img :src="imageSrc" height="200px" width="200px" />
    {{JSON.stringify(imageSrc)}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: ""
    };
  },
  methods: {
    captureImage() {
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          destinationType: 0,
          sourceType:0
          // camera options
        }
      );
    }
  }
};
</script>