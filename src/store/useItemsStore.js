import { defineStore } from 'pinia';
import { db } from '../modules/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
export const useItemsStore = defineStore('items', {
  state() {
    return {
      items: [],
      error: null,
    };
  },
  actions: {
    async createItem(item) {
      try {
        const docRef = await addDoc(collection(db, 'items'), item);
        this.items.push({ ...item, id: docRef.id });
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async readItems() {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        this.items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateItem(id, updatedItem) {
      try {
        const docRef = doc(db, 'items', id);
        await updateDoc(docRef, updatedItem);
        this.items = this.items.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item,
        );
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteItem(id) {
      try {
        const docRef = doc(db, 'items', id);
        await deleteDoc(docRef);
        this.items = this.items.filter((item) => item.id !== id);
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
