import Vue from 'vue'
import Vuex from 'vuex'
import { Cropper } from 'vue-advanced-cropper'
import UserProfile from './modules/UserProfile'
Vue.use(Vuex)
Vue.component(Cropper)
export default new Vuex.Store({
    modules: {
        UserProfile: UserProfile
    }
})