<template>
  <div>
    <v-app>
      <v-row>
        <v-col col-3></v-col>
        <v-col col-6>
          <v-avatar size="500" color="gray">
            <cropper
              class="cropper"
              :src="imageUrl"
              :stencil-props="{
                  aspectRatio: 16/9,
                  previewClassname:'preview'
              }"
              ref="cropper"
              @change="onchange"
            ></cropper>
            <div v-if="imageUrl"></div>
            <div class="avatar-content" v-else>
              <form enctype="multipart/form-data">
                <label>
                  <v-icon @click="selectImage">mdi-camera-plus</v-icon>
                </label>
                <input type="file" ref="file" @change="handleFileChange" />
              </form>
            </div>
          </v-avatar>
          <v-progress-linear height="15" color="success" :value="getUploadProgress" striped></v-progress-linear>
        </v-col>
        <v-col col-3>
          <span>
            <label>
              <v-icon color="black" size="30" @click="cropImage">mdi-crop</v-icon>crop Image
            </label>
          </span>
          <div class="Image-preview">
            <div v-if="successCrop===true">
              <img :src="destination" ref="destination" width="100" height="100" />
            </div>
            <div v-else>
              <img :src="defaultImage" ref="image" width="100" height="100" />
            </div>
          </div>
          <div>
            <v-btn color="success" @click="upload">Upload</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { Cropper } from "vue-advanced-cropper";
export default {
  name: "FileUpload2",
  components: {
    Cropper
  },
  computed: {
    ...mapGetters(["getUploadProgress", "getProfile"])
  },
  data() {
    return {
      imageUrl: null,
      image: "",
      defaultImage: require("../assets/image.png"),
      successCrop: false,
      croppedImage: null,
      destination: {},
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
    };
  },

  methods: {
    ...mapActions(["uploadProfileImage"]),
    selectImage: function() {
      this.$refs.file.click();
    },
    handleFileChange: function(events) {
      events.preventDefault();
      const file = events.target.files;
      if (/\.(jpe?g|png|gif)$/i.test(file[0].name) === false) {
        alert("not an image!");
        return false;
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file[0]);
        this.image = file[0];
        this.uploadProfileImage(this.image);
      }
    },
    cropImage: function() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      this.imageUrl = canvas.toDataURL();
      this.destination = canvas.toDataURL("image/png");
      this.successCrop = true;
      console.log(this.destination);
    },
    onchange: function({ coordinates, canvas }) {
      console.log(coordinates, canvas);
    },
    upload: function() {
      const file = this.$refs.image;
      console.log(file);
    }
  }
};
</script>
<style  scoped>
.v-avatar {
  border-radius: 5px;
  border: 3px solid gainsboro;
}
form > label > .v-icon {
  color: black;
  font-size: 50px;
  align-items: center;
  margin: -10%;
  position: absolute;
}
img {
  position: absolute;
}
.avatar-content > form > input {
  display: none;
}
.v-progress-linear {
  margin-top: 20px;
  width: 500px;
  border-radius: 10px;
}
.v-btn {
  margin-top: 10px;
  width: 104px;
}
.Image-preview {
  width: 100px;
  border: 2px solid gainsboro;
  height: 100px;
  border-radius: 3px;
  overflow: hidden;
}
div.vue-preview-result__wrapper > img {
  background: yellow;
}
.preview {
  border: dashed 1px rgba(255, 255, 255, 0.25);
}
</style>