<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <span v-if="getUploadProgress === 100">
            <v-avatar size="200" @click="showContent">
              <img :src="getProfile||defaultImage" />
              <div class="avator-content" v-if="showUpload">
                <form>
                  <label for="file-input" class="file-lable">
                    <v-icon @click="selectFile">mdi-camera</v-icon>
                    <span>
                      <p v-if="! profilePic">Add Photo</p>
                      <p v-else>Update Photo</p>
                    </span>
                  </label>
                  <input id="file-input" type="file" ref="file" @change="uploadfileSelectedFile" />
                </form>
              </div>
            </v-avatar>
          </span>
          <span v-else>
            <v-avatar size="200" @click="showContent">
              <img :src="profilePic||defaultImage" />
              <div class="avator-content" v-if="showUpload">
                <form>
                  <label for="file-input" class="file-lable">
                    <v-icon @click="selectFile">mdi-camera</v-icon>
                    <span>
                      <p v-if="! profilePic">Add Photo</p>
                      <p v-else>Update Photo</p>
                    </span>
                  </label>
                  <input id="file-input" type="file" ref="file" @change="uploadfileSelectedFile" />
                </form>
              </div>
            </v-avatar>
          </span>
          <!--- the modal boxs starts from here-->
          <div class="modal-box">
            <ModalBox v-if="showModal" @close="showModal = false">
              <!--byou can use custom content here to overwrite
              default content-->
              <div slot="header">
                <v-row>
                  <v-col cols="6">
                    <h4>Upload Photo</h4>
                  </v-col>
                  <v-col cols="6">
                    <v-icon id="close-icon" @click="closeModal">mdi-close</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div slot="body">
                <div id="uploadContainer">
                  <div>
                    <div id="uploadImage">
                      <span v-if="getProfile!=null && getUploadProgress ===100">
                        <img :src="getProfile||image" width="100" height="100" />
                      </span>
                      <span v-else>
                        <img :src="defaultImage" width="100" height="100" />
                      </span>
                    </div>
                    <span v-if="getUploadProgress<100">
                      <v-progress-linear
                        color="success"
                        height="10"
                        :value="getUploadProgress"
                        striped
                      ></v-progress-linear>
                    </span>
                    <span v-else></span>
                  </div>
                  <div class="addImages">
                    <form enctype=" multipart/data">
                      <label for="file-input" class="file-lable">
                        <v-icon id="camera-icon" @click="selectFile">mdi-camera-plus</v-icon>
                      </label>
                      <input type="file" ref="file" @change="uploadfileSelectedFile" />
                    </form>
                  </div>
                </div>
              </div>
            </ModalBox>
          </div>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalBox from "./ModalBox";
export default {
  name: "FileUpload",
  components: {
    ModalBox
  },
  data() {
    return {
      image: "",
      imageUrl: "",
      showUpload: false,
      defaultImage: require("../assets/default.png"),
      showModal: false
    };
  },
  computed: {
    ...mapGetters(["getProfile", "getUploadProgress", "getProfilePic"]),
    profilePic: function() {
      return this.getProfilePic[0];
    }
  },
  methods: {
    ...mapActions(["uploadProfileImage", "fetchProfileAction"]),
    selectFile() {
      this.$refs.file.click();
    },
    showContent() {
      this.showUpload = !this.showUpload;
    },
    // close the modal box when its opened
    closeModal() {
      this.showModal = false;
    },
    uploadfileSelectedFile(events) {
      events.preventDefault();
      const file = events.target.files;
      //validating the image with reqular expression
      if (/\.(jpe?g|png|gif)$/i.test(file[0].name) === false) {
        alert("not an image!");
        return false;
      } else {
        this.showModal = true;
        // loading the files into bits using the filereader Api
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file[0]);
        this.image = file[0];
        this.uploadProfileImage(this.image);
      }
    }
  },
  created() {
    this.fetchProfileAction();
  }
};
</script>
<style scoped>
.v-avatar {
  overflow: hidden;
  position: relative;
  border: 5px solid rgb(240, 236, 236);
}
img {
  position: absolute;
}
.avator-content {
  margin-top: 120px;
  width: 100%;
  height: 50%;
  background: black;
  opacity: 0.6;
  position: absolute;
  display: block;
}

.avator-content > form > label > span > p {
  color: white;
}
.avator-content > form > label > .v-icon {
  margin-top: 10px;
  color: white;
}
.avator-content > form > input {
  display: none;
}
#close-icon {
  float: right;
  font-size: 15px;
}
#uploadImage {
  background: gainsboro;
  height: 100px;
  width: 100px;
  border-radius: 5px;
}
#uploadImage > img {
  border-radius: 5px;
}
#progress-bar {
  margin-top: 5px;
  width: 100px;
}
.addImages {
  background: gainsboro;
  height: 100px;
  width: 100px;
  border-radius: 5px;
  margin-left: 20px;
  border: 3px dashed gray;
}
#uploadContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.addImages > form > label > .v-icon {
  font-size: 30px;
  padding: 30% 30% 30% 30%;
}
.addImages > form > input {
  display: none;
}
.v-progress-linear {
  margin-top: 10px;
  border-radius: 50px;
}
/* .avator-content > form > label > .v-icon {
  
} */
</style>
