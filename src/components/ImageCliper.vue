<template>
  <div>
    <v-row>
      <v-col col-3></v-col>
      <v-col col-6 sm-8>
        <v-avatar size="500">
          <div v-if="uploadedUlrl== true">
            <clipper-fixed
              class="basic lg clipper-fixed"
              :src="imgURL"
              bg-color="none"
              :round="false"
              preview="fixed-preview"
              shadow="rgba(0, 0, 0, 0.60)"
              :rotate="rotation"
              :grid="false"
              :ratio="16/9"
              ref="clipper"
            ></clipper-fixed>
          </div>
          <div class="avatar-content" v-else>
            <form>
              <label>
                <v-icon
                  color="black"
                  size="60"
                  @click="selectfile"
                  class="input-icon"
                >mdi-camera-plus</v-icon>
              </label>
              <input type="file" ref="file" class="file-input" @change="upload" />
            </form>
          </div>
        </v-avatar>
      </v-col>
      <v-col col-3>
        <span>
          <label>
            <v-icon color="black" size="30" @click="cropImage" class="imageCropper">mdi-crop</v-icon>
            <p id="icon-label">crop Image</p>
          </label>
        </span>
        <div v-if="cropped == true" class="preview-image">
          <img :src="cropImageUrl" width="230px" height="150px" />
        </div>
        <div v-else class="preview-image">
          <img :src="imgURL" width="100px" height="100px" />
        </div>
        <span>
          <label @click="uploadImage">
            <v-icon
              color="black"
              size="40"
              @click="cropImage"
              class="imageCropper"
            >mdi-cloud-upload-outline</v-icon>
            <p style="marigin-left:10px; margin-top: -30px;">Upload</p>
          </label>
        </span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { clipperFixed } from "vuejs-clipper";
export default {
  name: "ImageCliper",
  components: {
    clipperFixed
  },
  data() {
    return {
      imgURL: require("../assets/image.png"),
      rotation: 0,
      cropImageUrl: null,
      uploadedUlrl: false,
      cropped: false
    };
  },
  methods: {
    selectfile: function() {
      this.$refs.file.click();
    },
    upload: function(events) {
      events.preventDefault();
      const file = events.target.files;
      if (file !== 0) {
        if (this.imgURL) URL.revokeObjectURL(this.imgURL);
        this.imgURL = window.URL.createObjectURL(events.target.files[0]);
        this.uploadedUlrl = true;
      }
    },
    cropImage: function() {
      const canvas = this.$refs.clipper.clip();
      if (canvas) {
        this.cropImageUrl = canvas.toDataURL("image/jpeg", 1);
        this.cropped = true;
      } else {
        console.log("there is no image uploaded");
      }
    },
    uploadImage: function() {
      alert("booze it");
    }
  }
};
</script>
<style  scoped>
.v-avatar {
  display: block;
  border-radius: 5px;
  border: 5px solid gainsboro;
  overflow: hidden;
}
.clipper-fixed {
  width: 500px;
  height: 500px;
  position: absolute;
}
.file-input {
  display: none;
}
.input-icon {
  margin-top: 40%;
}
.imageCropper {
  margin-top: 20px;
  margin-left: -50px;
}
#icon-label {
  margin-top: -30px;
  margin-left: -15px;
}
.preview-image {
  border: gainsboro 5px solid;
  border-radius: 5px;
  margin-left: -50px;
  height: 150px;
  width: 150px;
  overflow: hidden;
}
</style>