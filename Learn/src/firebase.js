import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB8XYXeJ4EBXBiFIKZQHF0dCk8i076tHYQ',
  authDomain: 'studio-9063061416-54fce.firebaseapp.com',
  projectId: 'studio-9063061416-54fce',
  storageBucket: 'studio-9063061416-54fce.firebasestorage.app',
  messagingSenderId: '658165025631',
  appId: '1:658165025631:web:3b3e24dda4ebd43b2544ea'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

export async function signInWithGooglePopup() {
  const result = await signInWithPopup(auth, googleProvider)
  return result.user
}

export async function signInWithFacebookPopup() {
  const result = await signInWithPopup(auth, facebookProvider)
  return result.user
}



