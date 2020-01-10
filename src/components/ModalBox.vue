<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="3"></v-col>
                <v-col cols="5" id="buttonContainer">
                  <v-btn small color="success" id="uploadButton" @click="saveImageUrl">
                    <v-icon>mdi-publish</v-icon>upload
                  </v-btn>
                </v-col>
              </v-row>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ModalBox",
  date() {
    return {};
  },
  computed: {
    ...mapGetters(["getProfile", "getUploadProgress"])
  },
  methods: {
    ...mapActions(["saveImageUrlTodDB"]),
    // method responsible for saving various Image URL into the database
    saveImageUrl() {
      this.saveImageUrlTodDB();
    }
  }
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 5px 10px;
  background-color: #f5f6f7;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  padding-left: 0px;
  padding-right: 0px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-header {
  border-bottom: 1px solid gainsboro;
  padding: 0 10px 0 10px;
}
.modal-body {
  margin: 10px 10px 10px 10px;
}
.modal-footer {
  border-top: 1px solid gainsboro;
  padding: 0 10px 0 10px;
}
.modal-default-button {
  float: right;
}
#uploadButton {
  float: right;
  margin-right: 10px;
}
#buttonContainer {
  float: right;
}
#close-button {
  float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>