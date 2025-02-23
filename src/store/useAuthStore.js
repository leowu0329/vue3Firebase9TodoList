import { defineStore } from 'pinia';
import { auth } from '../modules/firebase'; // 引入初始化後的 Firebase 實例
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: null,
      error: null,
    };
  },
  actions: {
    async signUp(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = userCredential.user;
        this.error = null;
      } catch (error) {
        this.user = null;
        this.error = this.mapFirebaseError(error.code);
      }
    },
    async signIn(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = userCredential.user;
        this.error = null;
      } catch (error) {
        this.user = null;
        this.error = this.mapFirebaseError(error.code);
      }
    },
    async signOut() {
      try {
        await signOut(auth);
        this.user = null;
        this.error = null;
      } catch (error) {
        this.error = this.mapFirebaseError(error.code);
      }
    },
    async resetPassword(email) {
      try {
        await sendPasswordResetEmail(auth, email);
        this.error = null;
      } catch (error) {
        this.error = this.mapFirebaseError(error.code);
      }
    },
    onAuthStateChanged() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
    setError(message) {
      this.error = message;
    },
    mapFirebaseError(code) {
      switch (code) {
        case 'auth/user-not-found':
          return '用戶不存在';
        case 'auth/email-already-in-use':
          return '電子郵件已被使用';
        case 'auth/invalid-email':
          return '無效的電子郵件地址';
        case 'auth/wrong-password':
          return '帳密不符';
        default:
          return '發生未知錯誤';
      }
    },
  },
});
