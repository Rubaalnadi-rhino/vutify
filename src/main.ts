// Components
import vue from 'vue'

import App from './App.vue'
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import '@/assets/scss/basics/_base.scss'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import i18n from './i18n'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8yKuhbhEnWJ7Ez-x5ljCs46oPWpK5BfQ",
  authDomain: "vutify-6bfc1.firebaseapp.com",
  projectId: "vutify-6bfc1",
  storageBucket: "vutify-6bfc1.appspot.com",
  messagingSenderId: "657519073060",
  appId: "1:657519073060:web:f7a6c8a36eb434ef1285b1",
  measurementId: "G-H4EX4G57E6"
};

// Initialize Firebase
const app = createApp(App).use(i18n)
const appFirebaseConfig = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebaseConfig);
// 
registerPlugins(app)
app.mount('#app')
