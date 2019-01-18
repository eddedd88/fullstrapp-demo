import firebase from './firebase'

const firestore = firebase.firestore()

firestore.enablePersistence()

export default firestore
