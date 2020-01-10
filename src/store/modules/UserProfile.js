import { firebaseapp, firebaseStore } from '../../firebase/InitConfig'
export default {
    // state for user profiles pics
    state: {
        userProfilePic: {},
        uploadedProfile: [],
        UploadProgress: null
    },
    //mutations for usersprofile pics
    mutations: {
        setProfilePic: (state, payload) => {
            state.userProfilePic = payload
        },
        showUploadProgress: (state, payload) => {
            state.UploadProgress = payload
        },
        setUploadedImages: (state, payload) => {
            state.uploadedProfile = payload
        }

    },
    //getters for userprofiles 
    getters: {
        getProfile: (state) => {
            return state.userProfilePic
        },
        getUploadProgress: (state) => {
            return state.UploadProgress
        },
        getProfilePic: (state) => {
            return state.uploadedProfile
        }
    },
    //actions for userprofiles 
    actions: {
        uploadProfileImage: ({ commit }, payload) => {
            commit('setProfilePic', true)
            const ImageStorageRefs = firebaseapp.storage().ref()
            const uploadTask = ImageStorageRefs.child('images/' + payload.name).put(payload)
            uploadTask.on('state_changed', (snapshot) => {
                // handling the state upload progress 
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                commit('showUploadProgress', progress)
            }, (error) => {
                console.log(error)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    //setting the download url of the image
                    console.log(downloadURL)
                    commit('setProfilePic', downloadURL)
                });
            }
            )
        },
        saveImageUrlTodDB: async ({ state }) => {
            const ImageRefs = await firebaseStore.collection('images').add({
                ImageUrl: state.userProfilePic
            })
            if (!ImageRefs) console.log('error occured while saving the images ')
            console.log('image saved successfully')
        },
        fetchProfileAction: async ({ commit }) => {
            const uploadedImage = []
            await firebaseStore.collection('images').get().then(snapshot => {
                snapshot.forEach((doc) => {
                    uploadedImage.push(doc.data().ImageUrl)
                })
            })
            console.log(uploadedImage)
            commit('setUploadedImages', uploadedImage)
        }
    }
}